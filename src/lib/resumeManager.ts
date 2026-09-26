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
  currentResumeId: string | null;
  
  createResume: (name: string) => string;
  deleteResume: (id: string) => void;
  renameResume: (id: string, name: string) => void;
  switchResume: (id: string) => void;
  duplicateResume: (id: string) => string;
  updateCurrentResume: (data: ResumeData) => void;
  getCurrentResume: () => SavedResume | null;
  setCurrentAsDefault: () => void;
}

const generateId = () => Math.random().toString(36).substring(2, 11);

export const useResumeManager = create<ResumeManagerStore>()(
  persist(
    (set, get) => ({
      resumes: [
        {
          id: 'default',
          name: 'Meu Primeiro Currículo',
          data: defaultResumeData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isDefault: true,
        },
      ],
      currentResumeId: 'default',

      createResume: (name) => {
        const id = generateId();
        const newResume: SavedResume = {
          id,
          name,
          data: defaultResumeData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isDefault: false,
        };

        set((state) => ({
          resumes: [...state.resumes, newResume],
          currentResumeId: id,
        }));

        return id;
      },

      deleteResume: (id) => {
        set((state) => {
          const resumeToDelete = state.resumes.find((r) => r.id === id);
          if (resumeToDelete?.isDefault) {
            alert('Não é possível excluir o currículo padrão.');
            return state;
          }

          const newResumes = state.resumes.filter((r) => r.id !== id);
          const newCurrentId =
            state.currentResumeId === id
              ? newResumes[0]?.id || null
              : state.currentResumeId;

          return {
            resumes: newResumes,
            currentResumeId: newCurrentId,
          };
        });
      },

      renameResume: (id, name) => {
        set((state) => ({
          resumes: state.resumes.map((r) =>
            r.id === id ? { ...r, name, updatedAt: new Date().toISOString() } : r
          ),
        }));
      },

      switchResume: (id) => {
        set({ currentResumeId: id });
      },

      duplicateResume: (id) => {
        const state = get();
        const resumeToDuplicate = state.resumes.find((r) => r.id === id);
        if (!resumeToDuplicate) return '';

        const newId = generateId();
        const copiedData = JSON.parse(JSON.stringify(resumeToDuplicate.data));
        const duplicatedResume: SavedResume = {
          id: newId,
          name: `${resumeToDuplicate.name} (Cópia)`,
          data: copiedData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isDefault: false,
        };

        set((state) => ({
          resumes: [...state.resumes, duplicatedResume],
          currentResumeId: newId,
        }));

        return newId;
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
        const state = get();
        return state.resumes.find((r) => r.id === state.currentResumeId) || null;
      },

      setCurrentAsDefault: () => {
        set((state) => ({
          resumes: state.resumes.map((r) => ({
            ...r,
            isDefault: r.id === state.currentResumeId,
          })),
        }));
      },
    }),
    {
      name: 'cv-builder-multi-resumes',
    }
  )
);
