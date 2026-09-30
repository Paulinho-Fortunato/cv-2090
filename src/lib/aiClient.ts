export interface AIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export const AVAILABLE_MODELS = [
  { id: 'meta-llama/llama-3-8b-instruct', name: 'Llama 3 8B', provider: 'Meta', free: true },
  { id: 'mistralai/mistral-7b-instruct', name: 'Mistral 7B', provider: 'Mistral', free: true },
  { id: 'openai/gpt-3.5-turbo', name: 'GPT-3.5 Turbo', provider: 'OpenAI', free: false },
  { id: 'openai/gpt-4', name: 'GPT-4', provider: 'OpenAI', free: false },
  { id: 'openai/gpt-4-turbo', name: 'GPT-4 Turbo', provider: 'OpenAI', free: false },
  { id: 'anthropic/claude-3-haiku', name: 'Claude 3 Haiku', provider: 'Anthropic', free: false },
  { id: 'anthropic/claude-3-sonnet', name: 'Claude 3 Sonnet', provider: 'Anthropic', free: false },
  { id: 'meta-llama/llama-3-70b-instruct', name: 'Llama 3 70B', provider: 'Meta', free: false },
  { id: 'mistralai/mixtral-8x7b-instruct', name: 'Mixtral 8x7B', provider: 'Mistral', free: false },
  { id: 'google/gemini-pro', name: 'Gemini Pro', provider: 'Google', free: false },
];

const DEFAULT_MODEL = AVAILABLE_MODELS[0].id;

export async function requestAI(messages: AIMessage[], model = DEFAULT_MODEL): Promise<string> {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 30_000);

  try {
    const response = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model, messages }),
      signal: controller.signal,
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(data.error || 'Não foi possível contactar o serviço de IA.');
    }

    return typeof data.content === 'string' ? data.content : '';
  } finally {
    window.clearTimeout(timeout);
  }
}

export { DEFAULT_MODEL };
