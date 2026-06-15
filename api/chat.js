export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Solo POST' });

  const { messages, system, fingerprint, userData } = req.body;
  if (!messages || !Array.isArray(messages)) return res.status(400).json({ error: 'Invalid request' });

  const SUPABASE_URL = 'https://zdftewqlzulsjbfvpklt.supabase.co';
  const SUPABASE_KEY = process.env.SUPABASE_SECRET_KEY;
  const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;

  try {
    let userProfile = null;
    if (fingerprint) {
      const findUser = await fetch(`${SUPABASE_URL}/rest/v1/users?fingerprint=eq.${fingerprint}&select=*`, {
        headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
      });
      const users = await findUser.json();
      if (users && users.length > 0) {
        userProfile = users[0];
        await fetch(`${SUPABASE_URL}/rest/v1/users?fingerprint=eq.${fingerprint}`, {
          method: 'PATCH',
          headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ last_seen: new Date().toISOString(), visit_count: (userProfile.visit_count || 0) + 1 })
        });
      } else {
        const createUser = await fetch(`${SUPABASE_URL}/rest/v1/users`, {
          method: 'POST',
          headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json', 'Prefer': 'return=representation' },
          body: JSON.stringify({ fingerprint, profile: userData || {}, visit_count: 1, created_at: new Date().toISOString(), last_seen: new Date().toISOString() })
        });
        const newUsers = await createUser.json();
        userProfile = newUsers[0] || null;
      }
    }

    let enhancedSystem = system;
    if (userProfile && userProfile.profile && Object.keys(userProfile.profile).length > 0) {
      const p = userProfile.profile;
      enhancedSystem += `\n\nMEMORIA USUARIO (${userProfile.visit_count} visitas): ${p.nombre ? `Nombre: ${p.nombre}.` : ''} ${p.genero ? `Género: ${p.genero}.` : ''} ${p.ciudad ? `Ciudad: ${p.ciudad}.` : ''} ${p.edad ? `Edad: ${p.edad}.` : ''} ${p.presupuesto ? `Presupuesto: ${p.presupuesto}.` : ''} ${p.familias_favoritas ? `Gustos: ${p.familias_favoritas}.` : ''} ${p.perfumes_tiene ? `Tiene: ${p.perfumes_tiene}.` : ''} Salúdalo si lo conoces. No repitas preguntas.`;
    }

    const claudeRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': ANTHROPIC_KEY, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: 'claude-sonnet-4-5', max_tokens: 1500, system: enhancedSystem, messages })
    });

    if (!claudeRes.ok) {
      const err = await claudeRes.text();
      console.error('Anthropic error:', err);
      return res.status(500).json({ error: 'API error', detail: err });
    }

    const claudeData = await claudeRes.json();
    const reply = claudeData.content?.map(b => b.text || '').join('') || '';

    if (fingerprint && userProfile) {
      const allText = messages.map(m => m.content).join(' ').toLowerCase();
      const profileUpdate = { ...((userProfile.profile) || {}) };
      if (allText.match(/\bsoy hombre\b|\bhombre\b/)) profileUpdate.genero = 'Hombre';
      else if (allText.match(/\bsoy mujer\b|\bmujer\b/)) profileUpdate.genero = 'Mujer';
      ['bogotá','bogota','medellín','medellin','cali','barranquilla','cartagena','santa marta','bucaramanga','pereira','manizales','ibagué'].forEach(c => {
        if (allText.includes(c)) profileUpdate.ciudad = c.charAt(0).toUpperCase() + c.slice(1);
      });
      if (allText.includes('lattafa') || allText.includes('árabe') || allText.includes('oud') || allText.includes('rasasi') || allText.includes('jo milano')) profileUpdate.familias_favoritas = 'Oriental/Árabe';
      await fetch(`${SUPABASE_URL}/rest/v1/users?fingerprint=eq.${fingerprint}`, {
        method: 'PATCH',
        headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile: profileUpdate })
      });
    }

    if (fingerprint && userProfile?.id) {
      await fetch(`${SUPABASE_URL}/rest/v1/conversations`, {
        method: 'POST',
        headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userProfile.id, fingerprint, messages, reply, created_at: new Date().toISOString(), metadata: { msg_count: messages.length } })
      });
    }

    return res.status(200).json({ reply, userProfile: userProfile ? { visitCount: userProfile.visit_count, profile: userProfile.profile } : null });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Server error', detail: error.message });
  }
}
