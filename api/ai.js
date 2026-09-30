const ALLOWED_MODELS = new Set([
  'meta-llama/llama-3-8b-instruct',
  'mistralai/mistral-7b-instruct',
  'openai/gpt-3.5-turbo',
  'openai/gpt-4',
  'openai/gpt-4-turbo',
  'anthropic/claude-3-haiku',
  'anthropic/claude-3-sonnet',
  'meta-llama/llama-3-70b-instruct',
  'mistralai/mixtral-8x7b-instruct',
  'google/gemini-pro',
]);

const MAX_MESSAGES = 8;
const MAX_CONTENT_LENGTH = 20_000;

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return res.status(204).end();
  }
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return res.status(405).json({ error: 'Método não permitido.' });
  }
  if (!process.env.OPENROUTER_API_KEY) {
    return res.status(503).json({ error: 'Serviço de IA não configurado.' });
  }

  const { model, messages } = req.body || {};
  if (!ALLOWED_MODELS.has(model) || !Array.isArray(messages) || messages.length === 0 || messages.length > MAX_MESSAGES) {
    return res.status(400).json({ error: 'Pedido de IA inválido.' });
  }
  const safeMessages = messages.filter((message) =>
    message && ['system', 'user', 'assistant'].includes(message.role) &&
    typeof message.content === 'string' && message.content.length > 0 && message.content.length <= MAX_CONTENT_LENGTH
  );
  if (safeMessages.length !== messages.length) {
    return res.status(400).json({ error: 'Conteúdo da mensagem inválido ou demasiado grande.' });
  }

  try {
    const upstream = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://cv-2090.vercel.app',
        'X-Title': 'CV Builder',
      },
      body: JSON.stringify({ model, messages: safeMessages, temperature: 0.7, max_tokens: 1000 }),
    });
    const data = await upstream.json().catch(() => ({}));
    if (!upstream.ok) {
      return res.status(upstream.status >= 500 ? 502 : upstream.status).json({ error: data.error?.message || 'Erro no provedor de IA.' });
    }
    const content = data.choices?.[0]?.message?.content;
    if (typeof content !== 'string') {
      return res.status(502).json({ error: 'Resposta inválida do provedor de IA.' });
    }
    return res.status(200).json({ content });
  } catch (error) {
    console.error('AI proxy error:', error);
    return res.status(502).json({ error: 'Serviço de IA temporariamente indisponível.' });
  }
}
