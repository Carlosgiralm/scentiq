export default async function handler(req, res) {
  // Permitir solo POST
  if (req.method !== 'POST') return res.status(405).json({ error: 'Solo POST' });

  try {
    // Anthropic requiere que el cuerpo tenga 'model', 'max_tokens' y 'messages'
    const payload = {
      model: "claude-3-5-sonnet-20240620",
      max_tokens: 1024,
      messages: req.body.messages
    };

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01', // Cambiamos a la versión básica recomendada
        'content-type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    
    // Devolvemos exactamente lo que nos responde Anthropic
    return res.status(response.status).json(data);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
