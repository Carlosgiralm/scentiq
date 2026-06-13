export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "API Key no configurada" });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2024-06-20',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20240620',
        max_tokens: 1024,
        messages: Array.isArray(req.body.messages) ? req.body.messages : [{role: 'user', content: 'Hola'}]
      })
    });

    const data = await response.json();
    
    // Si la API responde con error, lo detectamos aquí
    if (!response.ok) {
       console.error("Error de Anthropic:", data);
       return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error("Error en la ejecución:", err);
    return res.status(500).json({ error: err.message });
  }
}
