import { ResumeData } from '../types/resume';

interface KeywordMatch {
  keyword: string;
  found: boolean;
  location: string;
  count: number;
}

interface ATSAnalysis {
  score: number;
  totalKeywords: number;
  matchedKeywords: number;
  missingKeywords: string[];
  matchedList: KeywordMatch[];
  suggestions: string[];
}

// Palavras-chave comuns por área
const commonKeywords = {
  tech: [
    'JavaScript', 'TypeScript', 'React', 'Angular', 'Vue', 'Node.js', 'Python', 'Java',
    'SQL', 'Git', 'Docker', 'AWS', 'Azure', 'API', 'REST', 'GraphQL', 'HTML', 'CSS',
    'Desenvolvimento', 'Programação', 'Software', 'Sistema', 'Banco de dados', 'Cloud',
    'Agile', 'Scrum', 'Testes', 'Debug', 'Deploy', 'CI/CD', 'Microservices',
  ],
  business: [
    'Gestão', 'Gerenciamento', 'Liderança', 'Estratégia', 'Planejamento', 'Análise',
    'Negócios', 'Marketing', 'Vendas', 'Financeiro', 'Orçamento', 'Projetos', 'Equipe',
    'Resultados', 'Metas', 'KPI', 'ROI', 'Crescimento', 'Inovação', 'Processos',
  ],
  design: [
    'Design', 'UX', 'UI', 'Figma', 'Adobe', 'Photoshop', 'Illustrator', 'Prototipagem',
    'Wireframe', 'User Experience', 'Interface', 'Visual', 'Criativo', 'Layout',
    'Tipografia', 'Cores', 'Branding', 'Identidade Visual', 'Design System',
  ],
  general: [
    'Comunicação', 'Trabalho em equipe', 'Proativo', 'Organizado', 'Responsável',
    'Dedicado', 'Experiência', 'Formação', 'Certificação', 'Curso', 'Idioma',
    'Inglês', 'Espanhol', 'Português', 'Disponibilidade', 'Flexibilidade',
  ],
};

export function analyzeATSKeywords(
  resumeData: ResumeData,
  jobDescription: string
): ATSAnalysis {
  // Extrair texto completo do currículo
  const resumeText = extractResumeText(resumeData);
  
  // Extrair palavras-chave da descrição da vaga
  const jobKeywords = extractKeywordsFromText(jobDescription);
  
  // Adicionar palavras-chave comuns
  const allKeywords = [
    ...jobKeywords,
    ...commonKeywords.general,
  ];
  
  // Adicionar palavras-chave específicas por área (baseado no cargo)
  const headline = resumeData.basics.headline.toLowerCase();
  if (headline.includes('dev') || headline.includes('program') || headline.includes('software')) {
    allKeywords.push(...commonKeywords.tech);
  }
  if (headline.includes('design') || headline.includes('ux') || headline.includes('ui')) {
    allKeywords.push(...commonKeywords.design);
  }
  if (headline.includes('manager') || headline.includes('gest') || headline.includes('coord')) {
    allKeywords.push(...commonKeywords.business);
  }

  // Remover duplicatas e normalizar
  const uniqueKeywords = Array.from(new Set(allKeywords.map(k => k.toLowerCase())));
  
  // Verificar correspondências
  const matches: KeywordMatch[] = uniqueKeywords.map(keyword => {
    const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
    const matches = resumeText.match(regex);
    const count = matches ? matches.length : 0;
    
    // Determinar onde foi encontrado
    let location = '';
    if (count > 0) {
      if (resumeData.basics.summary.toLowerCase().includes(keyword)) {
        location = 'Resumo';
      } else if (resumeData.experiences.some(e => 
        e.description.toLowerCase().includes(keyword) || 
        e.position.toLowerCase().includes(keyword)
      )) {
        location = 'Experiência';
      } else if (resumeData.skills.some(s => s.toLowerCase().includes(keyword))) {
        location = 'Habilidades';
      } else if (resumeData.education.some(e => 
        e.degree.toLowerCase().includes(keyword) || 
        e.field.toLowerCase().includes(keyword)
      )) {
        location = 'Educação';
      } else {
        location = 'Geral';
      }
    }
    
    return {
      keyword,
      found: count > 0,
      location,
      count,
    };
  });

  const matchedKeywords = matches.filter(m => m.found);
  const missingKeywords = matches.filter(m => !m.found).map(m => m.keyword);
  
  // Calcular score
  const score = uniqueKeywords.length > 0
    ? Math.round((matchedKeywords.length / uniqueKeywords.length) * 100)
    : 0;

  // Gerar sugestões
  const suggestions = generateSuggestions(matches, resumeData);

  return {
    score,
    totalKeywords: uniqueKeywords.length,
    matchedKeywords: matchedKeywords.length,
    missingKeywords: missingKeywords.slice(0, 20), // Limitar a 20
    matchedList: matchedKeywords,
    suggestions,
  };
}

function extractResumeText(resumeData: ResumeData): string {
  const parts: string[] = [];
  
  // Dados básicos
  parts.push(resumeData.basics.fullName);
  parts.push(resumeData.basics.headline);
  parts.push(resumeData.basics.summary);
  
  // Experiências
  resumeData.experiences.forEach(exp => {
    parts.push(exp.position);
    parts.push(exp.company);
    parts.push(exp.description);
  });
  
  // Educação
  resumeData.education.forEach(edu => {
    parts.push(edu.degree);
    parts.push(edu.field);
    parts.push(edu.institution);
  });
  
  // Certificações
  resumeData.certifications.forEach(cert => {
    parts.push(cert.name);
    parts.push(cert.institution);
    parts.push(cert.description);
  });
  
  // Projetos
  resumeData.projects.forEach(proj => {
    parts.push(proj.name);
    parts.push(proj.description);
    parts.push(proj.technologies);
  });
  
  // Skills
  parts.push(...resumeData.skills);
  
  return parts.join(' ').toLowerCase();
}

function extractKeywordsFromText(text: string): string[] {
  // Palavras comuns para ignorar
  const stopWords = new Set([
    'a', 'o', 'as', 'os', 'de', 'da', 'do', 'das', 'dos', 'em', 'no', 'na',
    'nos', 'nas', 'por', 'para', 'com', 'sem', 'sob', 'sobre', 'entre',
    'que', 'qual', 'quais', 'quando', 'onde', 'como', 'porque', 'se',
    'e', 'ou', 'mas', 'porém', 'todavia', 'contudo', 'entretanto',
    'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with',
    'by', 'from', 'as', 'is', 'was', 'are', 'been', 'be', 'have', 'has', 'had',
    'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might',
    'can', 'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it',
    'we', 'they', 'me', 'him', 'her', 'us', 'them', 'my', 'your', 'his',
  ]);

  // Extrair palavras com pelo menos 3 caracteres
  const words = text.toLowerCase().match(/\b[a-zà-ú]{3,}\b/g) || [];
  
  // Filtrar stop words e contar frequência
  const wordCount: Record<string, number> = {};
  words.forEach(word => {
    if (!stopWords.has(word)) {
      wordCount[word] = (wordCount[word] || 0) + 1;
    }
  });
  
  // Retornar palavras que aparecem pelo menos 2 vezes ou são técnicas
  const keywords = Object.entries(wordCount)
    .filter(([word, count]) => count >= 2 || isTechnicalTerm(word))
    .map(([word]) => word);
  
  return keywords;
}

function isTechnicalTerm(word: string): boolean {
  // Lista de termos técnicos comuns
  const technicalTerms = [
    'javascript', 'typescript', 'react', 'angular', 'vue', 'node', 'python',
    'java', 'sql', 'docker', 'kubernetes', 'aws', 'azure', 'api', 'rest',
    'graphql', 'html', 'css', 'git', 'linux', 'agile', 'scrum', 'devops',
    'frontend', 'backend', 'fullstack', 'database', 'cloud', 'mobile',
  ];
  
  return technicalTerms.includes(word.toLowerCase());
}

function generateSuggestions(matches: KeywordMatch[], resumeData: ResumeData): string[] {
  const suggestions: string[] = [];
  
  const missingSkills = matches.filter(m => !m.found && isSkill(m.keyword));
  const missingInSummary = matches.filter(m => !m.found && m.location !== 'Resumo');
  
  // Sugestões baseadas em palavras-chave faltantes
  if (missingSkills.length > 0) {
    const topMissing = missingSkills.slice(0, 5).map(m => m.keyword);
    suggestions.push(
      `Adicione estas habilidades técnicas ao seu currículo: ${topMissing.join(', ')}`
    );
  }
  
  // Sugestão para melhorar o resumo
  if (resumeData.basics.summary.length < 100) {
    suggestions.push(
      'Seu resumo profissional está muito curto. Inclua mais detalhes sobre suas experiências e conquistas.'
    );
  }
  
  // Sugestão para experiências
  if (resumeData.experiences.length === 0) {
    suggestions.push(
      'Adicione suas experiências profissionais para aumentar sua pontuação ATS.'
    );
  } else {
    const shortDescriptions = resumeData.experiences.filter(
      e => e.description.length < 50
    );
    if (shortDescriptions.length > 0) {
      suggestions.push(
        `${shortDescriptions.length} experiência(s) com descrições muito curtas. Adicione mais detalhes.`
      );
    }
  }
  
  // Sugestão para habilidades
  if (resumeData.skills.length < 5) {
    suggestions.push(
      'Adicione mais habilidades técnicas e comportamentais ao seu currículo.'
    );
  }
  
  // Sugestão para certificações
  if (resumeData.certifications.length === 0) {
    suggestions.push(
      'Considere adicionar certificações profissionais para aumentar sua credibilidade.'
    );
  }
  
  // Limitar a 5 sugestões
  return suggestions.slice(0, 5);
}

function isSkill(keyword: string): boolean {
  const skillPatterns = [
    'javascript', 'typescript', 'react', 'angular', 'vue', 'node', 'python',
    'java', 'sql', 'docker', 'kubernetes', 'aws', 'azure', 'git', 'linux',
    'html', 'css', 'php', 'ruby', 'go', 'rust', 'c++', 'c#',
  ];
  
  return skillPatterns.includes(keyword.toLowerCase());
}
