import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  ResumeData,
  defaultResumeData,
  Experience,
  Education,
  Certification,
  Project,
  TemplateId,
  Language,
} from '../types/resume';

interface ResumeStore {
  resumeData: ResumeData;
  activeSection: string;
  theme: 'light' | 'dark';
  language: Language;
  template: TemplateId;
  history: ResumeData[];
  historyIndex: number;
  setResumeData: (resumeData: ResumeData) => void;
  updateBasics: (basics: Partial<ResumeData['basics']>) => void;
  setPhoto: (photo: string) => void;
  addExperience: () => void;
  updateExperience: (id: string, experience: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  reorderExperiences: (fromIndex: number, toIndex: number) => void;
  addEducation: () => void;
  updateEducation: (id: string, education: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  reorderEducation: (fromIndex: number, toIndex: number) => void;
  addCertification: () => void;
  updateCertification: (id: string, certification: Partial<Certification>) => void;
  removeCertification: (id: string) => void;
  reorderCertifications: (fromIndex: number, toIndex: number) => void;
  addProject: () => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  removeProject: (id: string) => void;
  reorderProjects: (fromIndex: number, toIndex: number) => void;
  addSkill: (skill: string) => void;
  removeSkill: (index: number) => void;
  setActiveSection: (section: string) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setLanguage: (language: Language) => void;
  setTemplate: (template: TemplateId) => void;
  resetAll: () => void;
  importData: (resumeData: ResumeData) => void;
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
}

const generateId = () => Math.random().toString(36).substring(2, 11);

// Função para migrar dados antigos e garantir que todos os campos existam
const migrateResumeData = (data: any): ResumeData => {
  if (!data || !data.basics) return defaultResumeData;
  
  return {
    basics: {
      fullName: data.basics.fullName || '',
      headline: data.basics.headline || '',
      email: data.basics.email || '',
      phone: data.basics.phone || '',
      location: data.basics.location || '',
      summary: data.basics.summary || '',
      website: data.basics.website || '',
      linkedin: data.basics.linkedin || '',
      github: data.basics.github || '',
      birthDate: data.basics.birthDate || '',
      nationality: data.basics.nationality || '',
      maritalStatus: data.basics.maritalStatus || '',
      street: data.basics.street || '',
      city: data.basics.city || '',
      state: data.basics.state || '',
      zipCode: data.basics.zipCode || '',
      country: data.basics.country || '',
      twitter: data.basics.twitter || '',
      instagram: data.basics.instagram || '',
      behance: data.basics.behance || '',
      dribbble: data.basics.dribbble || '',
      medium: data.basics.medium || '',
      youtube: data.basics.youtube || '',
      languages: Array.isArray(data.basics.languages) ? data.basics.languages : [],
      interests: Array.isArray(data.basics.interests) ? data.basics.interests : [],
      objectives: data.basics.objectives || '',
      availability: data.basics.availability || '',
      salaryExpectation: data.basics.salaryExpectation || '',
    },
    experiences: Array.isArray(data.experiences) ? data.experiences : [],
    education: Array.isArray(data.education) ? data.education : [],
    certifications: Array.isArray(data.certifications) ? data.certifications : [],
    projects: Array.isArray(data.projects) ? data.projects : [],
    skills: Array.isArray(data.skills) ? data.skills : [],
    photo: data.photo || '',
  };
};

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set, get) => ({
      resumeData: defaultResumeData,
      activeSection: 'basics',
      theme: 'light',
      language: 'pt',
      template: 'modern',
      history: [defaultResumeData],
      historyIndex: 0,

      setResumeData: (resumeData) => {
        const { history, historyIndex } = get();
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push(resumeData);
        if (newHistory.length > 50) newHistory.shift(); // Limitar histórico a 50 ações
        set({ 
          resumeData, 
          history: newHistory, 
          historyIndex: newHistory.length - 1 
        });
      },

      updateBasics: (basics) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            basics: { ...state.resumeData.basics, ...basics },
          },
        })),

      setPhoto: (photo) =>
        set((state) => ({
          resumeData: { ...state.resumeData, photo },
        })),

      addExperience: () =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            experiences: [
              ...state.resumeData.experiences,
              {
                id: generateId(),
                company: '',
                position: '',
                startDate: '',
                endDate: '',
                current: false,
                description: '',
              },
            ],
          },
        })),

      updateExperience: (id, experience) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            experiences: state.resumeData.experiences.map((exp) =>
              exp.id === id ? { ...exp, ...experience } : exp
            ),
          },
        })),

      removeExperience: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            experiences: state.resumeData.experiences.filter((exp) => exp.id !== id),
          },
        })),

      reorderExperiences: (fromIndex, toIndex) =>
        set((state) => {
          const newExperiences = [...state.resumeData.experiences];
          const [moved] = newExperiences.splice(fromIndex, 1);
          newExperiences.splice(toIndex, 0, moved);
          return { resumeData: { ...state.resumeData, experiences: newExperiences } };
        }),

      addEducation: () =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            education: [
              ...state.resumeData.education,
              {
                id: generateId(),
                institution: '',
                degree: '',
                field: '',
                startDate: '',
                endDate: '',
              },
            ],
          },
        })),

      updateEducation: (id, education) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            education: state.resumeData.education.map((edu) =>
              edu.id === id ? { ...edu, ...education } : edu
            ),
          },
        })),

      removeEducation: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            education: state.resumeData.education.filter((edu) => edu.id !== id),
          },
        })),

      reorderEducation: (fromIndex, toIndex) =>
        set((state) => {
          const newEducation = [...state.resumeData.education];
          const [moved] = newEducation.splice(fromIndex, 1);
          newEducation.splice(toIndex, 0, moved);
          return { resumeData: { ...state.resumeData, education: newEducation } };
        }),

      addCertification: () =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            certifications: [
              ...state.resumeData.certifications,
              {
                id: generateId(),
                name: '',
                institution: '',
                date: '',
                duration: '',
                description: '',
                certificateUrl: '',
              },
            ],
          },
        })),

      updateCertification: (id, certification) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            certifications: state.resumeData.certifications.map((cert) =>
              cert.id === id ? { ...cert, ...certification } : cert
            ),
          },
        })),

      removeCertification: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            certifications: state.resumeData.certifications.filter((cert) => cert.id !== id),
          },
        })),

      reorderCertifications: (fromIndex, toIndex) =>
        set((state) => {
          const newCertifications = [...state.resumeData.certifications];
          const [moved] = newCertifications.splice(fromIndex, 1);
          newCertifications.splice(toIndex, 0, moved);
          return { resumeData: { ...state.resumeData, certifications: newCertifications } };
        }),

      addProject: () =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            projects: [
              ...state.resumeData.projects,
              {
                id: generateId(),
                name: '',
                description: '',
                url: '',
                technologies: '',
              },
            ],
          },
        })),

      updateProject: (id, project) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            projects: state.resumeData.projects.map((proj) =>
              proj.id === id ? { ...proj, ...project } : proj
            ),
          },
        })),

      removeProject: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            projects: state.resumeData.projects.filter((proj) => proj.id !== id),
          },
        })),

      reorderProjects: (fromIndex, toIndex) =>
        set((state) => {
          const newProjects = [...state.resumeData.projects];
          const [moved] = newProjects.splice(fromIndex, 1);
          newProjects.splice(toIndex, 0, moved);
          return { resumeData: { ...state.resumeData, projects: newProjects } };
        }),

      addSkill: (skill) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            skills: [...state.resumeData.skills, skill],
          },
        })),

      removeSkill: (index) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            skills: state.resumeData.skills.filter((_, i) => i !== index),
          },
        })),

      setActiveSection: (section) => set({ activeSection: section }),
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
      setTemplate: (template) => set({ template }),
      resetAll: () => set({
        resumeData: defaultResumeData,
        activeSection: 'basics',
        theme: 'light',
        language: 'pt',
        template: 'modern',
      }),
      importData: (resumeData) => set({ resumeData }),
      
      undo: () => {
        const { history, historyIndex } = get();
        if (historyIndex > 0) {
          const newIndex = historyIndex - 1;
          set({ 
            resumeData: history[newIndex], 
            historyIndex: newIndex 
          });
        }
      },
      
      redo: () => {
        const { history, historyIndex } = get();
        if (historyIndex < history.length - 1) {
          const newIndex = historyIndex + 1;
          set({ 
            resumeData: history[newIndex], 
            historyIndex: newIndex 
          });
        }
      },
      
      canUndo: () => {
        const { historyIndex } = get();
        return historyIndex > 0;
      },
      
      canRedo: () => {
        const { history, historyIndex } = get();
        return historyIndex < history.length - 1;
      },
    }),
    {
      name: 'cv-builder-storage',
      version: 1,
      migrate: (persistedState: any, version: number) => {
        // Migra dados antigos para a nova estrutura
        if (persistedState && persistedState.resumeData) {
          return {
            ...persistedState,
            resumeData: migrateResumeData(persistedState.resumeData),
            // Garantir que todos os campos existam com valores padrão
            language: persistedState.language || 'pt',
            theme: persistedState.theme || 'light',
            template: persistedState.template || 'modern',
            activeSection: persistedState.activeSection || 'basics',
          };
        }
        return persistedState;
      },
    }
  )
);
