import { ResumeData } from '../types/resume';
import { AVAILABLE_MODELS, DEFAULT_MODEL, requestAI } from './aiClient';

export { AVAILABLE_MODELS };
export type { AIMessage } from './aiClient';

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
  private model = DEFAULT_MODEL;

  constructor() {
    try {
      const storedModel = localStorage.getItem('openrouter-model');
      if (AVAILABLE_MODELS.some((item) => item.id === storedModel)) this.model = storedModel as string;
    } catch {
      // O modelo padrão permanece em memória quando o storage não está disponível.
    }
  }

  getApiKey(): string {
    return '';
  }

  setModel(modelId: string) {
    if (!AVAILABLE_MODELS.some((item) => item.id === modelId)) return;
    this.model = modelId;
    try { localStorage.setItem('openrouter-model', modelId); } catch { /* sessão atual */ }
  }

  getModel() { return this.model; }
  isConfigured() { return true; }

  private async makeRequest(messages: { role: 'system' | 'user' | 'assistant'; content: string }[]) {
    return requestAI(messages, this.model);
  }

  async analyzeResume(resumeData: ResumeData): Promise<AISuggestion[]> {
    try {
      const prompt = `Analise este currículo e forneça 3-5 sugestões específicas e acionáveis em JSON. Responda apenas com um array JSON com type, title, content e confidence.\nNome: ${resumeData.basics.fullName}\nCargo: ${resumeData.basics.headline}\nResumo: ${resumeData.basics.summary}\nExperiências: ${resumeData.experiences.length}\nEducação: ${resumeData.education.length}\nSkills: ${resumeData.skills.join(', ')}`;
      const response = await this.makeRequest([
        { role: 'system', content: 'Você é um especialista em currículos. Responda apenas em JSON quando solicitado.' },
        { role: 'user', content: prompt },
      ]);
      const jsonMatch = response.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        if (Array.isArray(parsed) && parsed.length > 0 && parsed.every((item) => item?.type && item?.title && item?.content)) return parsed;
      }
    } catch (error) {
      console.error('Erro ao analisar currículo com IA:', error);
    }
    return this.getFallbackSuggestions(resumeData);
  }

  async generateSummary(resumeData: ResumeData): Promise<string> {
    try {
      return await this.makeRequest([
        { role: 'system', content: 'Você é um especialista em escrita de currículos profissionais.' },
        { role: 'user', content: `Crie um resumo profissional conciso (3-4 linhas) para ${resumeData.basics.headline}. Experiências: ${resumeData.experiences.map((item) => `${item.position} na ${item.company}`).join(', ')}. Skills: ${resumeData.skills.slice(0, 10).join(', ')}. Responda apenas com o resumo.` },
      ]);
    } catch (error) {
      console.error('Erro ao gerar resumo:', error);
      return this.getFallbackSummary(resumeData);
    }
  }

  async generateCoverLetter(resumeData: ResumeData, jobDescription: string, tone: 'formal' | 'casual' | 'enthusiastic' = 'formal'): Promise<CoverLetter> {
    try {
      const content = await this.makeRequest([
        { role: 'system', content: 'Você é um especialista em cartas de apresentação profissionais.' },
        { role: 'user', content: `Crie uma carta de apresentação ${tone} em português para ${resumeData.basics.fullName}, cargo ${resumeData.basics.headline}. Skills: ${resumeData.skills.slice(0, 8).join(', ')}. Descrição da vaga:\n${jobDescription}. Escreva 3-4 parágrafos, entre 250-350 palavras.` },
      ]);
      return { content: content.trim(), tone, wordCount: content.trim().split(/\s+/).filter(Boolean).length };
    } catch (error) {
      console.error('Erro ao gerar carta:', error);
      return this.getFallbackCoverLetter(resumeData, tone);
    }
  }

  async improveExperienceDescription(position: string, company: string, currentDescription: string) {
    try {
      return await this.makeRequest([{ role: 'user', content: `Melhore esta descrição de experiência orientando-a a resultados. Cargo: ${position}. Empresa: ${company}. Descrição: ${currentDescription}. Responda apenas com a descrição melhorada.` }]);
    } catch { return currentDescription; }
  }

  private getFallbackSuggestions(data: ResumeData): AISuggestion[] {
    const suggestions: AISuggestion[] = [];
    if (!data.basics.summary || data.basics.summary.length < 50) suggestions.push({ type: 'summary', title: 'Resumo Profissional', content: 'Adicione um resumo profissional detalhado, destacando competências e objetivos.', confidence: 0.9 });
    if (!data.experiences.length) suggestions.push({ type: 'experience', title: 'Experiência Profissional', content: 'Adicione pelo menos uma experiência e quantifique resultados quando possível.', confidence: 0.95 });
    else if (!data.experiences.some((item) => item.description?.length > 50)) suggestions.push({ type: 'experience', title: 'Descrições das Experiências', content: 'Detalhe responsabilidades, conquistas e resultados mensuráveis.', confidence: 0.85 });
    if (data.skills.length < 5) suggestions.push({ type: 'skills', title: 'Habilidades', content: 'Adicione mais habilidades relevantes para sua área.', confidence: 0.8 });
    if (!data.basics.linkedin && !data.basics.github) suggestions.push({ type: 'improvement', title: 'Links Profissionais', content: 'Adicione links para LinkedIn ou GitHub.', confidence: 0.75 });
    return suggestions;
  }

  private getFallbackSummary(data: ResumeData) {
    return `Profissional ${data.experiences[0]?.position ? `com experiência como ${data.experiences[0].position}` : ''} com habilidades em ${data.skills.slice(0, 5).join(', ')}. Busco oportunidades para contribuir na área de ${data.basics.headline || 'atuação'}.`;
  }

  private getFallbackCoverLetter(data: ResumeData, tone: string): CoverLetter {
    const content = `Prezados,\n\nSubmeto minha candidatura à oportunidade apresentada. Como profissional ${data.basics.headline || 'da área'}, acredito que minhas competências estão alinhadas com os requisitos da posição.\n\nDesenvolvi habilidades em ${data.skills.slice(0, 5).join(', ')}, que me permitem contribuir para os objetivos da empresa.\n\nAgradeço a atenção e coloco-me à disposição para uma entrevista.\n\nAtenciosamente,\n${data.basics.fullName}`;
    return { content, tone, wordCount: content.split(/\s+/).length };
  }
}

export const aiService = new AIService();
