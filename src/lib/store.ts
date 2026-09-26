import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ResumeData, defaultResumeData, Experience, Education } from '../types/resume';

interface ResumeStore {
  data: ResumeData;
  activeSection: string;
  setData: (data: ResumeData) => void;
  updateBasics: (basics: Partial<ResumeData['basics']>) => void;
  addExperience: () => void;
  updateExperience: (id: string, experience: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  addEducation: () => void;
  updateEducation: (id: string, education: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  addSkill: (skill: string) => void;
  removeSkill: (index: number) => void;
  setActiveSection: (section: string) => void;
  resetAll: () => void;
  importData: (data: ResumeData) => void;
}

const generateId = () => Math.random().toString(36).substring(2, 11);

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      data: defaultResumeData,
      activeSection: 'basics',

      setData: (data) => set({ data }),

      updateBasics: (basics) =>
        set((state) => ({
          data: {
            ...state.data,
            basics: { ...state.data.basics, ...basics },
          },
        })),

      addExperience: () =>
        set((state) => ({
          data: {
            ...state.data,
            experiences: [
              ...state.data.experiences,
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
          data: {
            ...state.data,
            experiences: state.data.experiences.map((exp) =>
              exp.id === id ? { ...exp, ...experience } : exp
            ),
          },
        })),

      removeExperience: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            experiences: state.data.experiences.filter((exp) => exp.id !== id),
          },
        })),

      addEducation: () =>
        set((state) => ({
          data: {
            ...state.data,
            education: [
              ...state.data.education,
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
          data: {
            ...state.data,
            education: state.data.education.map((edu) =>
              edu.id === id ? { ...edu, ...education } : edu
            ),
          },
        })),

      removeEducation: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            education: state.data.education.filter((edu) => edu.id !== id),
          },
        })),

      addSkill: (skill) =>
        set((state) => ({
          data: {
            ...state.data,
            skills: [...state.data.skills, skill],
          },
        })),

      removeSkill: (index) =>
        set((state) => ({
          data: {
            ...state.data,
            skills: state.data.skills.filter((_, i) => i !== index),
          },
        })),

      setActiveSection: (section) => set({ activeSection: section }),

      resetAll: () => set({ data: defaultResumeData }),

      importData: (data) => set({ data }),
    }),
    {
      name: 'cv-builder-storage',
    }
  )
);
