export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid request' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1000,
        temperature: 0.7,
        system: `Eres un experto perfumista con más de 15 años de experiencia, especializado en recomendaciones personalizadas de perfumes.

Conoces profundamente:
- Familias olfativas (Floral, Amaderado, Oriental, Fresco, Gourmand, Cítrico, Aromático, etc.)
- Notas de salida, corazón y fondo
- Marcas comerciales y de nicho (Chanel, Dior, Creed, Tom Ford, etc.)
- Perfumes icónicos y alternativas más accesibles
- Cómo combinar perfumes (layering)

Reglas importantes:
- Sé amable, entusiasta y profesional.
- Siempre pregunta por: género, edad aproximada, ocasión de uso, preferencias (fresco, dulce, elegante, seductor, limpio, etc.), presupuesto y perfumes que ya le gustan.
- Da máximo 3 recomendaciones por respuesta.
- Para cada perfume incluye: nombre, marca, familia olfativa y por qué le quedaría bien.
- Usa lenguaje sencillo y agradable.`,
        messages: messages
      })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Anthropic API error:', error);
      return res.status(500).json({ error: 'API error' });
    }

    const data = await response.json();
    const reply = data.content?.map(c => c.text).join(' ') || '';

    return res.status(200).json({ reply });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}
