// Configuração da API de IA (Google Gemini - Gratuito)
// Para usar: https://aistudio.google.com/app/apikey

export const AI_CONFIG = {
  // Substitua pela sua chave da API Google Gemini
  apiKey: import.meta.env.VITE_GEMINI_API_KEY || '',
  model: 'gemini-2.0-flash-exp',
  baseUrl: 'https://generativelanguage.googleapis.com/v1beta',
};

export interface AISuggestion {
  type: 'summary' | 'experience' | 'skills' | 'improvement';
  suggestion: string;
  confidence: number;
}

export async function generateAISuggestion(
  prompt: string,
  context?: string
): Promise<string> {
  if (!AI_CONFIG.apiKey) {
    console.warn('API key não configurada. Usando sugestões locais.');
    return getLocalSuggestion(prompt);
  }

  try {
    const response = await fetch(
      `${AI_CONFIG.baseUrl}/models/${AI_CONFIG.model}:generateContent?key=${AI_CONFIG.apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: context ? `${context}\n\n${prompt}` : prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates[0]?.content?.parts[0]?.text || '';
  } catch (error) {
    console.error('Erro ao gerar sugestão com IA:', error);
    return getLocalSuggestion(prompt);
  }
}

// Sugestões locais como fallback
function getLocalSuggestion(prompt: string): string {
  const suggestions: Record<string, string[]> = {
    summary: [
      'Profissional com experiência em desenvolvimento de software, focado em criar soluções escaláveis e de alta qualidade.',
      'Especialista em tecnologias web modernas, com paixão por criar experiências de usuário excepcionais.',
      'Desenvolvedor full-stack com habilidades em React, Node.js e bancos de dados SQL/NoSQL.',
    ],
    experience: [
      'Desenvolvi e mantive aplicações web usando React e TypeScript, melhorando a performance em 40%.',
      'Liderei equipe de 5 desenvolvedores, implementando metodologias ágeis e reduzindo tempo de entrega em 30%.',
      'Criei APIs RESTful com Node.js e Express, servindo mais de 100 mil requisições diárias.',
    ],
    skills: [
      'JavaScript, TypeScript, React, Node.js, Python, SQL, Git, Docker, AWS',
      'HTML5, CSS3, Tailwind CSS, Redux, GraphQL, PostgreSQL, MongoDB',
      'Agile, Scrum, CI/CD, Testes Automatizados, Code Review, Mentoria',
    ],
    improvement: [
      'Adicione métricas quantificáveis às suas experiências (ex: "aumentou performance em 40%")',
      'Use verbos de ação fortes: "Desenvolvi", "Liderei", "Implementei", "Otimizei"',
      'Inclua palavras-chave relevantes para a vaga desejada',
      'Destaque conquistas específicas, não apenas responsabilidades',
    ],
  };

  const type = Object.keys(suggestions).find((key) =>
    prompt.toLowerCase().includes(key)
  );

  if (type) {
    const options = suggestions[type];
    return options[Math.floor(Math.random() * options.length)];
  }

  return 'Continue preenchendo seu currículo com informações detalhadas e específicas.';
}

export async function analyzeResumeForATS(
  resumeData: any,
  jobDescription?: string
): Promise<{
  score: number;
  suggestions: string[];
  missingKeywords: string[];
}> {
  const prompt = jobDescription
    ? `Analise este currículo em relação à descrição da vaga e sugira melhorias:\n\nVaga: ${jobDescription}\n\nCurrículo: ${JSON.stringify(resumeData)}`
    : `Analise este currículo e sugira melhorias para otimização ATS:\n\n${JSON.stringify(resumeData)}`;

  const analysis = await generateAISuggestion(prompt);

  // Extrair palavras-chave sugeridas (simplificado)
  const keywords = extractKeywords(analysis);

  return {
    score: calculateATSScore(resumeData),
    suggestions: analysis.split('\n').filter((s) => s.trim()),
    missingKeywords: keywords,
  };
}

function extractKeywords(text: string): string[] {
  // Extração simples de palavras-chave (pode ser melhorada com NLP)
  const commonTechWords = [
    'React', 'Node.js', 'TypeScript', 'JavaScript', 'Python',
    'SQL', 'AWS', 'Docker', 'Git', 'Agile', 'Scrum',
  ];

  return commonTechWords.filter((word) =>
    text.toLowerCase().includes(word.toLowerCase())
  );
}

function calculateATSScore(data: any): number {
  let score = 0;
  const maxScore = 100;

  if (data.basics?.fullName?.trim()) score += 15;
  if (data.basics?.headline?.trim()) score += 10;
  if (data.basics?.email?.trim()) score += 10;
  if (data.basics?.phone?.trim()) score += 5;
  if (data.basics?.location?.trim()) score += 5;
  if (data.basics?.summary?.trim().length > 50) score += 15;
  else if (data.basics?.summary?.trim().length > 20) score += 8;

  if (data.experiences?.length > 0) {
    score += Math.min(20, data.experiences.length * 7);
    if (data.experiences.some((e: any) => e.description?.length > 50)) score += 5;
  }

  if (data.education?.length > 0) score += 10;
  if (data.skills?.length >= 5) score += 10;
  else if (data.skills?.length >= 3) score += 7;
  else if (data.skills?.length > 0) score += 4;

  return Math.min(score, maxScore);
}
