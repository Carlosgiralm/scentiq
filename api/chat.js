export default async function handler(req, res) {
  // 1. Validar que sea un POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages, system, fingerprint, userData } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid request' });
  }

  const SUPABASE_URL = 'https://zdftewqlzulsjbfvpklt.supabase.co';
  const SUPABASE_KEY = process.env.SUPABASE_SECRET_KEY;
  const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;

  if (!SUPABASE_KEY || !ANTHROPIC_KEY) {
    return res.status(500).json({ error: 'Faltan variables de entorno' });
  }

  try {
    let userProfile = null;

    // 2. Gestionar Usuario en Supabase
    if (fingerprint) {
      try {
        const findUser = await fetch(`${SUPABASE_URL}/rest/v1/users?fingerprint=eq.${fingerprint}&select=*`, {
          headers: { 
            'apikey': SUPABASE_KEY, 
            'Authorization': `Bearer ${SUPABASE_KEY}`,
            'Content-Type': 'application/json' 
          }
        });
        const users = await findUser.json();
        
        if (users && users.length > 0) {
          userProfile = users[0];
          await fetch(`${SUPABASE_URL}/rest/v1/users?fingerprint=eq.${fingerprint}`, {
            method: 'PATCH',
            headers: { 
              'apikey': SUPABASE_KEY, 
              'Authorization': `Bearer ${SUPABASE_KEY}`, 
              'Content-Type': 'application/json',
              'Prefer': 'return=representation'
            },
            body: JSON.stringify({ last_seen: new Date().toISOString(), visit_count: (userProfile.visit_count || 0) + 1 })
          });
        } else {
          const createUser = await fetch(`${SUPABASE_URL}/rest/v1/users`, {
            method: 'POST',
            headers: { 
              'apikey': SUPABASE_KEY, 
              'Authorization': `Bearer ${SUPABASE_KEY}`, 
              'Content-Type': 'application/json', 
              'Prefer': 'return=representation' 
            },
            body: JSON.stringify({ 
              fingerprint, 
              profile: userData || {}, 
              visit_count: 1, 
              created_at: new Date().toISOString(), 
              last_seen: new Date().toISOString() 
            })
          });
          const newUsers = await createUser.json();
          userProfile = Array.isArray(newUsers) ? newUsers[0] : newUsers;
        }
      } catch (dbError) {
        console.error('Error DB:', dbError);
      }
    }

    // 3. Preparar contexto para Claude
    let enhancedSystem = system || '';
    if (userProfile?.profile) {
      const p = userProfile.profile;
      enhancedSystem += `\n\nMEMORIA: Usuario visitó ${userProfile.visit_count || 1} veces. ${p.nombre ? `Nombre: ${p.nombre}.` : ''} ${p.ciudad ? `Ciudad: ${p.ciudad}.` : ''} Usa esto para personalizar.`;
    }

    // 4. Llamar a Claude
    const claudeRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        'x-api-key': ANTHROPIC_KEY, 
        'anthropic-version': '2023-06-01' 
      },
      body: JSON.stringify({ 
        model: 'claude-3-5-sonnet-20241022', 
        max_tokens: 1500, 
        system: enhancedSystem, 
        messages 
      })
    });

    if (!claudeRes.ok) {
      const err = await claudeRes.text();
      return res.status(500).json({ error: 'Error en Claude', detail: err });
    }

    const claudeData = await claudeRes.json();
    const reply = claudeData.content?.map(b => b.text || '').join('') || '';

    return res.status(200).json({ reply });

  } catch (error) {
    console.error('Error General:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}
