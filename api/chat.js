export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { messages, fingerprint, userData } = req.body;
    const SUPABASE_URL = 'https://zdftewqlzulsjbfvpklt.supabase.co';
    const SUPABASE_KEY = process.env.SUPABASE_SECRET_KEY;
    const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;

    if (!SUPABASE_KEY || !ANTHROPIC_KEY) {
      return res.status(500).json({ error: 'Configuración faltante en Vercel' });
    }

    // 1. Lógica de Supabase (Simplificada para evitar errores de conexión)
    let userProfile = null;
    // ... [Aquí iría tu lógica de Supabase] ...

    // 2. Llamada a Anthropic (Claude)
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20240620',
        max_tokens: 1024,
        messages: messages
      })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(JSON.stringify(data));

    return res.status(200).json({ reply: data.content[0].text });

  } catch (error) {
    console.error("Error en chat.js:", error);
    return res.status(500).json({ error: error.message });
  }
}
