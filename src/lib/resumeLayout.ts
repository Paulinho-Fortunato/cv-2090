import { Basics, Certification, Education, Experience, Project, ResumeData } from '../types/resume';

const clean = (value: unknown): string => typeof value === 'string' ? value.trim() : '';

const hasText = (...values: unknown[]) => values.some((value) => clean(value) !== '');

export function normalizeResumeData(data: Partial<ResumeData>): ResumeData {
  const basics = (data.basics || {}) as Partial<Basics>;
  const experiences = (data.experiences || []) as Experience[];
  const education = (data.education || []) as Education[];
  const certifications = (data.certifications || []) as Certification[];
  const projects = (data.projects || []) as Project[];

  return {
    basics: {
      ...basics,
      fullName: clean(basics.fullName),
      headline: clean(basics.headline),
      email: clean(basics.email),
      phone: clean(basics.phone),
      location: clean(basics.location),
      summary: clean(basics.summary),
      website: clean(basics.website),
      linkedin: clean(basics.linkedin),
      github: clean(basics.github),
      birthDate: clean(basics.birthDate),
      nationality: clean(basics.nationality),
      maritalStatus: clean(basics.maritalStatus),
      street: clean(basics.street),
      city: clean(basics.city),
      state: clean(basics.state),
      zipCode: clean(basics.zipCode),
      country: clean(basics.country),
      twitter: clean(basics.twitter),
      instagram: clean(basics.instagram),
      behance: clean(basics.behance),
      dribbble: clean(basics.dribbble),
      medium: clean(basics.medium),
      youtube: clean(basics.youtube),
      languages: Array.isArray(basics.languages) ? basics.languages.map(clean).filter(Boolean) : [],
      interests: Array.isArray(basics.interests) ? basics.interests.map(clean).filter(Boolean) : [],
      objectives: clean(basics.objectives),
      availability: clean(basics.availability),
      salaryExpectation: clean(basics.salaryExpectation),
    } as Basics,
    experiences: experiences.filter((item) => hasText(item.position, item.company, item.description, item.startDate, item.endDate)).map((item) => ({ ...item, company: clean(item.company), position: clean(item.position), startDate: clean(item.startDate), endDate: clean(item.endDate), description: clean(item.description) })),
    education: education.filter((item) => hasText(item.institution, item.degree, item.field, item.startDate, item.endDate)).map((item) => ({ ...item, institution: clean(item.institution), degree: clean(item.degree), field: clean(item.field), startDate: clean(item.startDate), endDate: clean(item.endDate) })),
    certifications: certifications.filter((item) => hasText(item.name, item.institution, item.description, item.date)).map((item) => ({ ...item, name: clean(item.name), institution: clean(item.institution), date: clean(item.date), duration: clean(item.duration), description: clean(item.description), certificateUrl: clean(item.certificateUrl) })),
    projects: projects.filter((item) => hasText(item.name, item.description, item.technologies, item.url)).map((item) => ({ ...item, name: clean(item.name), description: clean(item.description), url: clean(item.url), technologies: clean(item.technologies) })),
    skills: Array.isArray(data.skills) ? data.skills.map(clean).filter(Boolean) : [],
    photo: clean(data.photo),
    sectionsConfig: Array.isArray(data.sectionsConfig) ? data.sectionsConfig : [],
  };
}

export type ResumeDensity = 'initial' | 'standard' | 'dense';

export function getResumeDensity(data: Partial<ResumeData>): ResumeDensity {
  const normalized = normalizeResumeData(data);
  const contentUnits = normalized.experiences.length + normalized.education.length + normalized.certifications.length + normalized.projects.length + normalized.skills.length;
  const textLength = [normalized.basics.summary, ...normalized.experiences.map((item) => item.description), ...normalized.projects.map((item) => item.description)].join(' ').length;
  if (contentUnits <= 2 && textLength < 350) return 'initial';
  if (contentUnits >= 9 || textLength > 1800) return 'dense';
  return 'standard';
}

export function getResumeReadiness(data: Partial<ResumeData>) {
  const normalized = normalizeResumeData(data);
  const hasIdentity = Boolean(normalized.basics.fullName);
  const hasContact = Boolean(normalized.basics.email || normalized.basics.phone || normalized.basics.location);
  const hasEvidence = normalized.experiences.length > 0 || normalized.education.length > 0 || normalized.projects.length > 0 || normalized.skills.length > 0;
  const recommendations: string[] = [];
  if (!hasIdentity) recommendations.push('adicione o seu nome');
  if (!normalized.basics.headline) recommendations.push('indique o cargo desejado');
  if (!hasContact) recommendations.push('adicione pelo menos um contacto');
  if (!normalized.basics.summary) recommendations.push('adicione um resumo profissional');
  if (!hasEvidence) recommendations.push('adicione experiência, formação, projetos ou competências');
  return { canExport: hasIdentity, hasIdentity, hasContact, hasEvidence, recommendations, density: getResumeDensity(normalized) };
}
