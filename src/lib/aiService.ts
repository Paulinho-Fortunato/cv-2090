import { ResumeData } from '../types/resume';

// OpenRouter API - https://openrouter.ai/
// API Key configurada via variável de ambiente na Vercel
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY || '';

// Modelos disponíveis na OpenRouter
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

export interface AISuggestion {
  type: 'summary' | 'experience' | 'skills' | 'improvement';
  title: string;
  content: string;
  confidence: number;
}

export interface CoverLetter {
  content: string;
  tone: string;
  wordCount: number;
}

class AIService {
  private model: string = 'meta-llama/llama-3-8b-instruct'; // Modelo gratuito padrão

  constructor() {
    this.loadConfig();
  }

  private loadConfig() {
    const storedModel = localStorage.getItem('openrouter-model');
    if (storedModel) {
      this.model = storedModel;
    }
  }

  getApiKey(): string {
    return OPENROUTER_API_KEY;
  }

  setModel(modelId: string) {
    this.model = modelId;
    localStorage.setItem('openrouter-model', modelId);
  }

  getModel(): string {
    return this.model;
  }

  isConfigured(): boolean {
    return OPENROUTER_API_KEY.length > 0;
  }

  private async makeRequest(messages: any[]): Promise<string> {
    if (!this.isConfigured()) {
      throw new Error('API Key não configurada');
    }

    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'CV Builder',
      },
      body: JSON.stringify({
        model: this.model,
        messages,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Erro na API');
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || '';
  }

  // Gera sugestões de melhoria para o currículo
  async analyzeResume(resumeData: ResumeData): Promise<AISuggestion[]> {
    if (!this.isConfigured()) {
      return this.getFallbackSuggestions(resumeData);
    }

    try {
      const prompt = `Analise este currículo e forneça sugestões de melhoria em formato JSON:

Nome: ${resumeData.basics.fullName}
Cargo: ${resumeData.basics.headline}
Resumo: ${resumeData.basics.summary}
Experiências: ${resumeData.experiences.length}
Educação: ${resumeData.education.length}
Skills: ${resumeData.skills.join(', ')}

Forneça 3-5 sugestões específicas e acionáveis em JSON:
[
  {
    "type": "summary|experience|skills|improvement",
    "title": "Título curto",
    "content": "Sugestão detalhada",
    "confidence": 0.85
  }
]

Responda APENAS com o JSON, sem texto adicional.`;

      const response = await this.makeRequest([
        { role: 'system', content: 'Você é um especialista em currículos e carreiras. Responda apenas em JSON quando solicitado.' },
        { role: 'user', content: prompt }
      ]);

      // Extrair JSON da resposta
      const jsonMatch = response.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }

      return this.getFallbackSuggestions(resumeData);
    } catch (error) {
      console.error('Erro ao analisar currículo com IA:', error);
      return this.getFallbackSuggestions(resumeData);
    }
  }

  // Gera resumo profissional baseado nos dados
  async generateSummary(resumeData: ResumeData): Promise<string> {
    if (!this.isConfigured()) {
      return this.getFallbackSummary(resumeData);
    }

    try {
      const prompt = `Crie um resumo profissional conciso (3-4 linhas) para:
Cargo: ${resumeData.basics.headline}
Experiências: ${resumeData.experiences.map(e => `${e.position} na ${e.company}`).join(', ')}
Skills: ${resumeData.skills.slice(0, 10).join(', ')}

O resumo deve ser profissional, direto e destacar os pontos fortes. Responda apenas com o resumo.`;

      return await this.makeRequest([
        { role: 'system', content: 'Você é um especialista em escrita de currículos profissionais.' },
        { role: 'user', content: prompt }
      ]);
    } catch (error) {
      console.error('Erro ao gerar resumo:', error);
      return this.getFallbackSummary(resumeData);
    }
  }

  // Gera carta de apresentação
  async generateCoverLetter(
    resumeData: ResumeData,
    jobDescription: string,
    tone: 'formal' | 'casual' | 'enthusiastic' = 'formal'
  ): Promise<CoverLetter> {
    if (!this.isConfigured()) {
      return this.getFallbackCoverLetter(resumeData, jobDescription, tone);
    }

    try {
      const toneDescription = {
        formal: 'formal e profissional',
        casual: 'casual e amigável',
        enthusiastic: 'entusiasta e motivado'
      }[tone];

      const prompt = `Crie uma carta de apresentação ${toneDescription} em português para:

Candidato: ${resumeData.basics.fullName}
Cargo Desejado: ${resumeData.basics.headline}
Experiências Principais: ${resumeData.experiences.slice(0, 3).map(e => `${e.position} na ${e.company}`).join(', ')}
Skills: ${resumeData.skills.slice(0, 8).join(', ')}

Descrição da Vaga:
${jobDescription}

A carta deve:
- Ter 3-4 parágrafos
- Conectar as experiências do candidato com os requisitos da vaga
- Ser ${toneDescription}
- Ter entre 250-350 palavras
- Ser persuasiva e profissional`;

      const content = await this.makeRequest([
        { role: 'system', content: 'Você é um especialista em escrita de cartas de apresentação profissionais.' },
        { role: 'user', content: prompt }
      ]);

      return {
        content: content.trim(),
        tone,
        wordCount: content.split(/\s+/).length,
      };
    } catch (error) {
      console.error('Erro ao gerar carta de apresentação:', error);
      return this.getFallbackCoverLetter(resumeData, jobDescription, tone);
    }
  }

  // Sugere melhorias para uma experiência específica
  async improveExperienceDescription(
    position: string,
    company: string,
    currentDescription: string
  ): Promise<string> {
    if (!this.isConfigured()) {
      return currentDescription;
    }

    try {
      const prompt = `Melhore esta descrição de experiência profissional, tornando-a mais impactante e orientada a resultados:

Cargo: ${position}
Empresa: ${company}
Descrição Atual: ${currentDescription}

Forneça apenas a descrição melhorada, sem explicações adicionais.`;

      return await this.makeRequest([
        { role: 'system', content: 'Você é um especialista em otimização de currículos profissionais.' },
        { role: 'user', content: prompt }
      ]);
    } catch (error) {
      console.error('Erro ao melhorar descrição:', error);
      return currentDescription;
    }
  }

  // Fallback suggestions quando IA não está configurada
  private getFallbackSuggestions(resumeData: ResumeData): AISuggestion[] {
    const suggestions: AISuggestion[] = [];

    if (!resumeData.basics.summary || resumeData.basics.summary.length < 50) {
      suggestions.push({
        type: 'summary',
        title: 'Resumo Profissional',
        content: 'Adicione um resumo profissional mais detalhado (mínimo 50 caracteres) destacando suas principais competências e objetivos de carreira.',
        confidence: 0.9,
      });
    }

    if (resumeData.experiences.length === 0) {
      suggestions.push({
        type: 'experience',
        title: 'Experiência Profissional',
        content: 'Adicione pelo menos uma experiência profissional. Use verbos de ação e quantifique resultados quando possível.',
        confidence: 0.95,
      });
    } else {
      const hasDescription = resumeData.experiences.some(e => e.description && e.description.length > 50);
      if (!hasDescription) {
        suggestions.push({
          type: 'experience',
          title: 'Descrições das Experiências',
          content: 'Detalhe melhor suas experiências profissionais. Inclua responsabilidades, conquistas e resultados mensuráveis.',
          confidence: 0.85,
        });
      }
    }

    if (resumeData.skills.length < 5) {
      suggestions.push({
        type: 'skills',
        title: 'Habilidades',
        content: 'Adicione mais habilidades técnicas e comportamentais relevantes para sua área. Recomenda-se pelo menos 8-10 skills.',
        confidence: 0.8,
      });
    }

    if (!resumeData.basics.linkedin && !resumeData.basics.github) {
      suggestions.push({
        type: 'improvement',
        title: 'Links Profissionais',
        content: 'Adicione links para seu LinkedIn e/ou GitHub para aumentar sua credibilidade profissional.',
        confidence: 0.75,
      });
    }

    return suggestions;
  }

  private getFallbackSummary(resumeData: ResumeData): string {
    const skills = resumeData.skills.slice(0, 5).join(', ');
    const experience = resumeData.experiences.length > 0 
      ? `com experiência em ${resumeData.experiences[0].position}` 
      : '';

    return `Profissional ${experience} com habilidades em ${skills}. Busco oportunidades para contribuir com minha expertise e desenvolver novas competências na área de ${resumeData.basics.headline || 'atuação'}.`;
  }

  private getFallbackCoverLetter(
    resumeData: ResumeData,
    jobDescription: string,
    tone: string
  ): CoverLetter {
    const content = `Prezados,

Com grande entusiasmo, submeto minha candidatura à vaga apresentada. Como profissional com experiência em ${resumeData.basics.headline || 'minha área de atuação'}, acredito que minhas competências estão alinhadas com os requisitos da posição.

Ao longo da minha trajetória, desenvolvi habilidades em ${resumeData.skills.slice(0, 5).join(', ')}, que me permitem contribuir efetivamente para os objetivos da empresa. ${resumeData.experiences.length > 0 ? `Minha experiência mais recente como ${resumeData.experiences[0].position} na ${resumeData.experiences[0].company} me proporcionou insights valiosos sobre ${resumeData.experiences[0].description?.substring(0, 100) || 'a área'}.` : ''}

Estou motivado(a) pela oportunidade de aplicar meu conhecimento e crescer profissionalmente em sua organização. Acredito que minha combinação de habilidades técnicas e compromisso com resultados pode agregar valor significativo à equipe.

Agradeço a atenção e coloco-me à disposição para uma entrevista.

Atenciosamente,
${resumeData.basics.fullName}`;

    return {
      content,
      tone,
      wordCount: content.split(/\s+/).length,
    };
  }
}

export const aiService = new AIService();
