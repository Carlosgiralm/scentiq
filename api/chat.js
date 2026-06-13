export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { messages, system, fingerprint, userData } = req.body;
  if (!messages || !Array.isArray(messages)) return res.status(400).json({ error: 'Invalid request' });

  const SUPABASE_URL = 'https://zdftewqlzulsjbfvpklt.supabase.co';
  const SUPABASE_KEY = process.env.SUPABASE_SECRET_KEY;
  const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;

  // Validación de seguridad para llaves vacías
  if (!SUPABASE_KEY || !ANTHROPIC_KEY) {
    console.error('Faltan variables de entorno en Vercel (SUPABASE_SECRET_KEY o ANTHROPIC_API_KEY)');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    // 1. Get or create user profile by fingerprint
    let userProfile = null;
    if (fingerprint) {
      try {
        const findUser = await fetch(`${SUPABASE_URL}/rest/v1/users?fingerprint=eq.${fingerprint}&select=*`, {
          headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
        });
        const users = await findUser.json();
        
        if (users && users.length > 0) {
          userProfile = users[0];
          // Update last_seen
          await fetch(`${SUPABASE_URL}/rest/v1/users?fingerprint=eq.${fingerprint}`, {
            method: 'PATCH',
            headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ last_seen: new Date().toISOString(), visit_count: (userProfile.visit_count || 0) + 1 })
          });
        } else {
          // Create new user
          const createUser = await fetch(`${SUPABASE_URL}/rest/v1/users`, {
            method: 'POST',
            headers: { 
              'apikey': SUPABASE_KEY, 
              'Authorization': `Bearer ${SUPABASE_KEY}`, 
              'Content-Type': 'application/json', 
              'Prefer': 'return=representation' 
            },
            body: JSON.stringify({ fingerprint, profile: userData || {}, visit_count: 1, created_at: new Date().toISOString(), last_seen: new Date().toISOString() })
          });
          const newUsers = await createUser.json();
          if (newUsers && newUsers.length > 0) {
            userProfile = newUsers[0];
          }
        }
      } catch (dbError) {
        console.error('Supabase Error (User fetching/creation):', dbError);
        // No bloqueamos la ejecución, permitimos que el chat funcione aunque falle la DB
      }
    }

    // 2. Build enhanced system with user memory
    let enhancedSystem = system || '';
    if (userProfile && userProfile.profile && Object.keys(userProfile.profile).length > 0) {
      const p = userProfile.profile;
      enhancedSystem += `\n\nMEMORIA DEL USUARIO (visitas anteriores):
Este usuario ha visitado ScentIQ ${userProfile.visit_count || 1} veces.
${p.nombre ? `Se llama ${p.nombre}.` : ''}
${p.genero ? `Género: ${p.genero}.` : ''}
${p.ciudad ? `Ciudad: ${p.ciudad}.` : ''}
${p.presupuesto ? `Presupuesto habitual: ${p.presupuesto}.` : ''}
${p.perfumes_tiene ? `Perfumes que tiene: ${p.perfumes_tiene}.` : ''}
${p.familias_favoritas ? `Familias olfativas favoritas: ${p.familias_favoritas}.` : ''}
${p.notas_gustadas ? `Notas que le gustan: ${p.notas_gustadas}.` : ''}
${p.notas_no_gustadas ? `Notas que NO le gustan: ${p.notas_no_gustadas}.` : ''}
USA ESTA INFORMACIÓN para personalizar la conversación. Salúdalo como si lo conocieras. No repitas preguntas que ya respondió antes.`;
    }

    // 3. Call Claude API
    const claudeRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': ANTHROPIC_KEY, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ 
        model: 'claude-3-5-sonnet-20241022', 
        max_tokens: 1500, 
        system: enhancedSystem, 
        messages 
      })
    });

    if (!claudeRes.ok) {
      const err = await claudeRes.text();
      console.error('Anthropic API error:', err);
      return res.status(500).json({ error: 'Anthropic API error', detail: err });
    }

    const claudeData = await claudeRes.json();
    const reply = claudeData.content?.map(b => b.text || '').join('') || '';

    // 4. Extract profile updates from conversation (Protección contra fallos)
    if (fingerprint && userProfile) {
      try {
        const allText = messages.map(m => m.content).join(' ').toLowerCase();
        const profileUpdate = { ...((userProfile.profile) || {}) };

        if (allText.match(/\bsoy hombre\b|\bmasculin/)) profileUpdate.genero = 'Hombre';
        else if (allText.match(/\bsoy mujer\b|\bfemenin/)) profileUpdate.genero = 'Mujer';
        
        const ciudades = ['bogotá','bogota','medellín','medellin','cali','barranquilla','santa marta','cartagena','bucaramanga','pereira'];
        ciudades.forEach(c => { if(allText.includes(c)) profileUpdate.ciudad = c.charAt(0).toUpperCase()+c.slice(1); });
        
        const budgetMatch = allText.match(/\$(\d+)/);
        if (budgetMatch) profileUpdate.presupuesto = budgetMatch[0];
        
        if (allText.includes('lattafa') || allText.includes('árabe') || allText.includes('oud')) profileUpdate.familias_favoritas = 'Oriental/Árabe';
        if (allText.includes('fresco') || allText.includes('cítrico')) profileUpdate.familias_favoritas = (profileUpdate.familias_favoritas || '') + ' Fresco';

        await fetch(`${SUPABASE_URL}/rest/v1/users?fingerprint=eq.${fingerprint}`, {
          method: 'PATCH',
          headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ profile: profileUpdate })
        });
      } catch (updateError) {
        console.error('Error updating user profile keywords:', updateError);
      }
    }

    // 5. Save conversation to DB (Con ID verificado)
    if (fingerprint && userProfile && userProfile.id) {
      try {
        await fetch(`${SUPABASE_URL}/rest/v1/conversations`, {
          method: 'POST',
          headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: userProfile.id,
            fingerprint,
            messages: messages,
            reply,
            created_at: new Date().toISOString(),
            metadata: { msg_count: messages.length }
          })
        });
      } catch (convError) {
        console.error('Error saving conversation to Supabase:', convError);
      }
    }

    return res.status(200).json({ reply, userProfile: userProfile ? { visitCount: userProfile.visit_count, profile: userProfile.profile } : null });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Server error', detail: error.message });
  }
}
