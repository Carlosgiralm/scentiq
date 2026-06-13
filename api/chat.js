export default async function handler(req, res) {
  // 1. Validar que sea un método POST
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
    console.error('Faltan variables de entorno');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    let userProfile = null;

    // 2. Gestionar Usuario en Supabase
    if (fingerprint) {
      try {
        const findUser = await fetch(`${SUPABASE_URL}/rest/v1/users?fingerprint=eq.${fingerprint}&select=*`, {
          headers: { 
            'apikey': SUPABASE_KEY, 
            'Authorization': `Bearer ${SUPABASE_KEY}` 
          }
        });
        const users = await findUser.json();
        
        if (users && users.length > 0) {
          userProfile = users[0];
          // Actualizar última visita
          await fetch(`${SUPABASE_URL}/rest/v1/users?fingerprint=eq.${fingerprint}`, {
            method: 'PATCH',
            headers: { 
              'apikey': SUPABASE_KEY, 
              'Authorization': `Bearer ${SUPABASE_KEY}`, 
              'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ 
              last_seen: new Date().toISOString(), 
              visit_count: (userProfile.visit_count || 0) + 1 
            })
          });
        } else {
          // Crear nuevo usuario
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

    // 3. Preparar contexto mejorado
    let enhancedSystem = system || '';
    if (userProfile?.profile) {
      const p = userProfile.profile;
      enhancedSystem += `\n\nMEMORIA: Usuario visitó ${userProfile.visit_count || 1} veces. ${p.nombre ? `Nombre: ${p.nombre}.` : ''} ${p.ciudad ? `Ciudad: ${p.ciudad}.` : ''} Usa esto para personalizar.`;
    }

    // 4. Llamar a Claude API (MODELO CORREGIDO)
    const claudeRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        'x-api-key': ANTHROPIC_KEY, 
        'anthropic-version': '2023-06-01' 
      },
      body: JSON.stringify({ 
        model: 'claude-3-5-sonnet-latest', 
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

    return res.status(200).json({ reply });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Internal server error', detail: error.message });
  }
}
