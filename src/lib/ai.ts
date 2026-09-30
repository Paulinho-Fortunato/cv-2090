import { requestAI } from './aiClient';

export interface AISuggestion {
  type: 'summary' | 'experience' | 'skills' | 'improvement';
  suggestion: string;
  confidence: number;
}

export async function generateAISuggestion(prompt: string, context?: string): Promise<string> {
  try {
    return await requestAI([
      { role: 'system', content: 'Você é um especialista em currículos. Responda em português de forma prática e concisa.' },
      { role: 'user', content: context ? `${context}\n\n${prompt}` : prompt },
    ]);
  } catch (error) {
    console.warn('IA indisponível; usando sugestão local:', error);
    return getLocalSuggestion(prompt);
  }
}

export async function analyzeResumeForATS(resumeData: any, jobDescription?: string): Promise<{ score: number; suggestions: string[]; missingKeywords: string[] }> {
  const prompt = jobDescription
    ? `Analise este currículo em relação à descrição da vaga e sugira melhorias:\n\nVaga: ${jobDescription}\n\nCurrículo: ${JSON.stringify(resumeData)}`
    : `Analise este currículo e sugira melhorias para otimização ATS:\n\n${JSON.stringify(resumeData)}`;
  const analysis = await generateAISuggestion(prompt);
  return { score: calculateATSScore(resumeData), suggestions: analysis.split('\n').filter((item) => item.trim()), missingKeywords: extractKeywords(analysis) };
}

function getLocalSuggestion(prompt: string): string {
  const suggestions: Record<string, string[]> = {
    summary: ['Profissional com experiência em desenvolvimento de software, focado em criar soluções escaláveis e de alta qualidade.', 'Especialista em tecnologias web modernas, com paixão por criar experiências de usuário excepcionais.'],
    experience: ['Desenvolvi e mantive aplicações web usando React e TypeScript, melhorando a performance em 40%.', 'Liderei equipe de 5 desenvolvedores, implementando metodologias ágeis e reduzindo tempo de entrega em 30%.'],
    skills: ['JavaScript, TypeScript, React, Node.js, Python, SQL, Git, Docker, AWS', 'HTML5, CSS3, Tailwind CSS, Redux, GraphQL, PostgreSQL, MongoDB'],
    improvement: ['Adicione métricas quantificáveis às suas experiências.', 'Use verbos de ação fortes e inclua palavras-chave relevantes para a vaga.'],
  };
  const type = Object.keys(suggestions).find((key) => prompt.toLowerCase().includes(key));
  return type ? suggestions[type][Math.floor(Math.random() * suggestions[type].length)] : 'Continue preenchendo seu currículo com informações detalhadas e específicas.';
}

function extractKeywords(text: string): string[] {
  return ['React', 'Node.js', 'TypeScript', 'JavaScript', 'Python', 'SQL', 'AWS', 'Docker', 'Git', 'Agile', 'Scrum'].filter((word) => text.toLowerCase().includes(word.toLowerCase()));
}

function calculateATSScore(data: any): number {
  let score = 0;
  if (data.basics?.fullName?.trim()) score += 15;
  if (data.basics?.headline?.trim()) score += 10;
  if (data.basics?.email?.trim()) score += 10;
  if (data.basics?.phone?.trim()) score += 5;
  if (data.basics?.location?.trim()) score += 5;
  if (data.basics?.summary?.trim().length > 50) score += 15;
  else if (data.basics?.summary?.trim().length > 20) score += 8;
  if (data.experiences?.length > 0) {
    score += Math.min(20, data.experiences.length * 7);
    if (data.experiences.some((experience: any) => experience.description?.length > 50)) score += 5;
  }
  if (data.education?.length > 0) score += 10;
  if (data.skills?.length >= 5) score += 10;
  else if (data.skills?.length >= 3) score += 7;
  else if (data.skills?.length > 0) score += 4;
  return Math.min(score, 100);
}
