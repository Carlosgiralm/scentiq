export default async function handler(req, res) {
  // Respuesta rápida para ver si la API funciona
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { messages } = req.body;
    const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;
    
    // Verificación de seguridad
    if (!ANTHROPIC_KEY) {
      return res.status(500).json({ error: 'Falta ANTHROPIC_API_KEY' });
    }

    console.log("Iniciando conexión con Claude...");

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        'x-api-key': ANTHROPIC_KEY, 
        'anthropic-version': '2023-06-01' 
      },
      body: JSON.stringify({ 
        model: 'claude-3-5-sonnet-latest', 
        max_tokens: 500, 
        messages 
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Error desde Claude:", data);
      return res.status(500).json({ error: 'Error de Claude', detail: data });
    }

    return res.status(200).json({ reply: data.content[0].text });

  } catch (err) {
    console.error("Error crítico en el servidor:", err);
    return res.status(500).json({ error: 'Error interno', detail: err.message });
  }
}
