// ... dentro de tu función handler
const response = await fetch('https://api.anthropic.com/v1/messages', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': ANTHROPIC_KEY,
    'anthropic-version': '2023-06-01'
  },
  body: JSON.stringify({
    model: 'claude-3-haiku-20240307', // Cambiado a este modelo estable
    max_tokens: 1024,
    messages: messages
  })
});
// ...
