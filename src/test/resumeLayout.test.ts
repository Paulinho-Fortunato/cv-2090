import { describe, expect, it } from 'vitest';
import { defaultResumeData } from '../types/resume';
import { getResumeDensity, getResumeReadiness, normalizeResumeData } from '../lib/resumeLayout';

describe('resumeLayout', () => {
  it('remove entradas vazias e limpa texto antes da renderização', () => {
    const normalized = normalizeResumeData({
      ...defaultResumeData,
      basics: { ...defaultResumeData.basics, fullName: '  Ana Silva  ' },
      experiences: [{ id: 'empty', company: ' ', position: '', startDate: '', endDate: '', current: false, description: '' }],
      skills: [' React ', '', '  '],
    });

    expect(normalized.basics.fullName).toBe('Ana Silva');
    expect(normalized.experiences).toHaveLength(0);
    expect(normalized.skills).toEqual(['React']);
  });

  it('considera um currículo sem nome incompleto para exportação', () => {
    const readiness = getResumeReadiness(defaultResumeData);
    expect(readiness.canExport).toBe(false);
    expect(readiness.recommendations).toContain('adicione o seu nome');
    expect(readiness.density).toBe('initial');
  });

  it('classifica um currículo com muito conteúdo como denso', () => {
    const dense = {
      ...defaultResumeData,
      basics: { ...defaultResumeData.basics, fullName: 'Ana Silva', summary: 'Resumo profissional '.repeat(40) },
      experiences: Array.from({ length: 5 }, (_, index) => ({ id: String(index), company: 'Empresa', position: 'Cargo', startDate: '2020-01', endDate: '', current: true, description: 'Resultado profissional '.repeat(30) })),
      education: Array.from({ length: 2 }, (_, index) => ({ id: String(index), institution: 'Universidade', degree: 'Licenciatura', field: 'Tecnologia', startDate: '2018-01', endDate: '2020-01' })),
      skills: Array.from({ length: 8 }, (_, index) => `Skill ${index}`),
    };

    expect(getResumeDensity(dense)).toBe('dense');
    expect(getResumeReadiness(dense).canExport).toBe(true);
  });
});
