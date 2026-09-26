import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  ResumeData,
  defaultResumeData,
  Experience,
  Education,
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
}

const generateId = () => Math.random().toString(36).substring(2, 11);

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      resumeData: defaultResumeData,
      activeSection: 'basics',
      theme: 'light',
      language: 'pt',
      template: 'modern',

      setResumeData: (resumeData) => set({ resumeData }),

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
      resetAll: () => set({ resumeData: defaultResumeData }),
      importData: (resumeData) => set({ resumeData }),
    }),
    {
      name: 'cv-builder-storage',
    }
  )
);
