export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { messages } = req.body;
    const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;

    if (!ANTHROPIC_KEY) {
      return res.status(500).json({ error: 'Configuración faltante: ANTHROPIC_API_KEY' });
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307', 
        max_tokens: 1024,
        messages: messages
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Error desde Claude:", data);
      return res.status(500).json({ error: 'Error en la API de Anthropic', detail: data.error.message });
    }

    return res.status(200).json({ reply: data.content[0].text });

  } catch (error) {
    console.error("Error en servidor:", error);
    return res.status(500).json({ error: error.message });
  }
}
