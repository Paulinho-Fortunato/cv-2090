import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ResumeData, defaultResumeData } from '../types/resume';

export interface SavedResume {
  id: string;
  name: string;
  data: ResumeData;
  createdAt: string;
  updatedAt: string;
  isDefault: boolean;
}

interface ResumeManagerStore {
  resumes: SavedResume[];
  currentResumeId: string;
  
  // Actions
  createResume: (name: string) => void;
  deleteResume: (id: string) => void;
  renameResume: (id: string, name: string) => void;
  duplicateResume: (id: string) => void;
  switchResume: (id: string) => void;
  updateCurrentResume: (data: ResumeData) => void;
  getCurrentResume: () => SavedResume | null;
}

const generateId = () => Math.random().toString(36).substring(2, 11);

const defaultResume: SavedResume = {
  id: 'default',
  name: 'Meu Primeiro Currículo',
  data: defaultResumeData,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  isDefault: true,
};

export const useResumeManager = create<ResumeManagerStore>()(
  persist(
    (set, get) => ({
      resumes: [defaultResume],
      currentResumeId: 'default',

      createResume: (name) => {
        const newResume: SavedResume = {
          id: generateId(),
          name,
          data: defaultResumeData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isDefault: false,
        };
        set((state) => ({
          resumes: [...state.resumes, newResume],
          currentResumeId: newResume.id,
        }));
      },

      deleteResume: (id) => {
        set((state) => {
          const resumes = state.resumes.filter((r) => r.id !== id);
          // Se deletou o atual, volta para o primeiro
          const currentResumeId = state.currentResumeId === id 
            ? (resumes[0]?.id || 'default')
            : state.currentResumeId;
          
          return { resumes, currentResumeId };
        });
      },

      renameResume: (id, name) => {
        set((state) => ({
          resumes: state.resumes.map((r) =>
            r.id === id ? { ...r, name, updatedAt: new Date().toISOString() } : r
          ),
        }));
      },

      duplicateResume: (id) => {
        const resumeToDuplicate = get().resumes.find((r) => r.id === id);
        if (!resumeToDuplicate) return;

        const newId = generateId();
        const duplicatedResume: SavedResume = {
          id: newId,
          name: `${resumeToDuplicate.name} (Cópia)`,
          data: JSON.parse(JSON.stringify(resumeToDuplicate.data)),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isDefault: false,
        };

        set((state) => ({
          resumes: [...state.resumes, duplicatedResume],
          currentResumeId: newId,
        }));
      },

      switchResume: (id) => {
        set({ currentResumeId: id });
      },

      updateCurrentResume: (data) => {
        set((state) => ({
          resumes: state.resumes.map((r) =>
            r.id === state.currentResumeId
              ? { ...r, data, updatedAt: new Date().toISOString() }
              : r
          ),
        }));
      },

      getCurrentResume: () => {
        const { resumes, currentResumeId } = get();
        return resumes.find((r) => r.id === currentResumeId) || null;
      },
    }),
    {
      name: 'cv-builder-resumes',
    }
  )
);
