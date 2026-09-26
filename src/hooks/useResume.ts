import { useMemo } from 'react';
import { useResumeStore } from '../lib/store';
import { ResumeData, Language, TemplateId } from '../types/resume';

// Helper hook para acessar dados do resume de forma otimizada
export function useResumeData() {
  return useResumeStore((state) => state.resumeData);
}

export function useResumeBasics() {
  return useResumeStore((state) => state.resumeData.basics);
}

export function useResumeExperiences() {
  return useResumeStore((state) => state.resumeData.experiences);
}

export function useResumeEducation() {
  return useResumeStore((state) => state.resumeData.education);
}

export function useResumeProjects() {
  return useResumeStore((state) => state.resumeData.projects);
}

export function useResumeSkills() {
  return useResumeStore((state) => state.resumeData.skills);
}

export function useResumePhoto() {
  return useResumeStore((state) => state.resumeData.photo);
}

export function useTheme() {
  return useResumeStore((state) => state.theme);
}

export function useLanguage() {
  return useResumeStore((state) => state.language);
}

export function useTemplate() {
  return useResumeStore((state) => state.template);
}

export function useActiveSection() {
  return useResumeStore((state) => state.activeSection);
}

// Hook para progresso calculado de forma memoizada
export function useProgress() {
  const resumeData = useResumeData();
  
  return useMemo(() => {
    let total = 0;
    let filled = 0;
    const { basics, experiences, education, projects, skills } = resumeData;

    const basicsFields = [basics.fullName, basics.headline, basics.email, basics.phone, basics.location, basics.summary];
    total += basicsFields.length;
    filled += basicsFields.filter((f) => f.trim() !== '').length;

    total += 1;
    if (experiences.length > 0 && experiences.some((e) => e.company && e.position)) filled += 1;

    total += 1;
    if (education.length > 0 && education.some((e) => e.institution && e.degree)) filled += 1;

    total += 1;
    if (projects.length > 0 && projects.some((p) => p.name)) filled += 1;

    total += 1;
    if (skills && skills.length >= 3) filled += 1;

    return Math.round((filled / total) * 100);
  }, [resumeData]);
}
