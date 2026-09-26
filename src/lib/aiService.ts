import { GoogleGenerativeAI } from '@google/generative-ai';
import { ResumeData } from '../types/resume';

// API Key gratuita do Google Gemini - Usuário pode obter em: https://makersuite.google.com/app/apikey
const DEFAULT_API_KEY = ''; // Usuário deve configurar sua própria chave

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
  private genAI: GoogleGenerativeAI | null = null;
  private apiKey: string = DEFAULT_API_KEY;

  constructor() {
    this.initializeAI();
  }

  private initializeAI() {
    const storedKey = localStorage.getItem('gemini-api-key');
    const keyToUse = storedKey || this.apiKey;
    
    if (keyToUse) {
      this.genAI = new GoogleGenerativeAI(keyToUse);
    }
  }

  setApiKey(key: string) {
    this.apiKey = key;
    localStorage.setItem('gemini-api-key', key);
    this.initializeAI();
  }

  getApiKey(): string {
    return this.apiKey;
  }

  isConfigured(): boolean {
    return this.genAI !== null;
  }

  // Gera sugestões de melhoria para o currículo
  async analyzeResume(resumeData: ResumeData): Promise<AISuggestion[]> {
    if (!this.genAI) {
      return this.getFallbackSuggestions(resumeData);
    }

    try {
      const model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });

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
]`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Extrair JSON da resposta
      const jsonMatch = text.match(/\[[\s\S]*\]/);
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
    if (!this.genAI) {
      return this.getFallbackSummary(resumeData);
    }

    try {
      const model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });

      const prompt = `Crie um resumo profissional conciso (3-4 linhas) para:
Cargo: ${resumeData.basics.headline}
Experiências: ${resumeData.experiences.map(e => `${e.position} na ${e.company}`).join(', ')}
Skills: ${resumeData.skills.slice(0, 10).join(', ')}

O resumo deve ser profissional, direto e destacar os pontos fortes.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text().trim();
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
    if (!this.genAI) {
      return this.getFallbackCoverLetter(resumeData, jobDescription, tone);
    }

    try {
      const model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });

      const prompt = `Crie uma carta de apresentação ${tone} em português para:

Candidato: ${resumeData.basics.fullName}
Cargo Desejado: ${resumeData.basics.headline}
Experiências Principais: ${resumeData.experiences.slice(0, 3).map(e => `${e.position} na ${e.company}`).join(', ')}
Skills: ${resumeData.skills.slice(0, 8).join(', ')}

Descrição da Vaga:
${jobDescription}

A carta deve:
- Ter 3-4 parágrafos
- Conectar as experiências do candidato com os requisitos da vaga
- Ser ${tone}
- Ter entre 250-350 palavras`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const content = response.text().trim();

      return {
        content,
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
    if (!this.genAI) {
      return currentDescription;
    }

    try {
      const model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });

      const prompt = `Melhore esta descrição de experiência profissional, tornando-a mais impactante e orientada a resultados:

Cargo: ${position}
Empresa: ${company}
Descrição Atual: ${currentDescription}

Forneça apenas a descrição melhorada, sem explicações adicionais.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text().trim();
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
