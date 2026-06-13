export default async function handler(req, res) {
  // 1. Verificamos que sea POST
  if (req.method !== 'POST') return res.status(405).end();

  try {
    // 2. FORZAMOS el cuerpo a ser un objeto simple para descartar errores de formato
    const messages = req.body.messages;
    
    if (!messages) {
       return res.status(400).json({ error: "No llegaron mensajes" });
    }

    // 3. Llamada mínima a la API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01', // La versión de la API que Anthropic exige para /messages
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20240620',
        max_tokens: 1024,
        messages: messages
      })
    });

    const data = await response.json();
    return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json({ error: "Error en el servidor: " + err.message });
  }
}
