export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  
  // Log de diagnóstico
  console.log("API Key existe:", !!apiKey);

  if (!apiKey) {
    return res.status(500).json({ error: "API Key no configurada en Vercel" });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2024-06-20'
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20240620',
        max_tokens: 1024,
        messages: req.body.messages
      })
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    console.error("Error en fetch:", err);
    return res.status(500).json({ error: err.message });
  }
}
