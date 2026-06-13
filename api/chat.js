export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  
  const { messages } = req.body;
  const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;

  try {
    const claudeRes = await fetch('https://api.anthropic.com/v1/messages', {
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

    const data = await claudeRes.json();
    
    if (!claudeRes.ok) {
        return res.status(500).json({ error: 'Error de Claude', detail: data });
    }

    return res.status(200).json({ reply: data.content?.[0]?.text || "Sin respuesta" });

  } catch (error) {
    return res.status(500).json({ error: 'Error de conexión: ' + error.message });
  }
}
