import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface DownloadRecord {
  id: string;
  date: string;
  template: string;
  atsScore: number;
  hasPhoto: boolean;
  sectionsCount: number;
}

export interface CVStats {
  totalDownloads: number;
  totalCreations: number;
  averageAtsScore: number;
  mostUsedTemplate: string;
  lastDownload: string | null;
  downloads: DownloadRecord[];
}

interface AnalyticsStore {
  stats: CVStats;
  recordDownload: (record: Omit<DownloadRecord, 'id' | 'date'>) => void;
  recordCreation: () => void;
  resetStats: () => void;
}

const defaultStats: CVStats = {
  totalDownloads: 0,
  totalCreations: 0,
  averageAtsScore: 0,
  mostUsedTemplate: 'modern',
  lastDownload: null,
  downloads: [],
};

export const useAnalyticsStore = create<AnalyticsStore>()(
  persist(
    (set, get) => ({
      stats: defaultStats,

      recordDownload: (record) => {
        const { stats } = get();
        const newDownload: DownloadRecord = {
          ...record,
          id: Math.random().toString(36).substring(2, 11),
          date: new Date().toISOString(),
        };

        const downloads = [newDownload, ...stats.downloads].slice(0, 50); // Keep last 50
        const totalDownloads = stats.totalDownloads + 1;
        const averageAtsScore = Math.round(
          downloads.reduce((sum, d) => sum + d.atsScore, 0) / downloads.length
        );

        // Calculate most used template
        const templateCounts: Record<string, number> = {};
        downloads.forEach((d) => {
          templateCounts[d.template] = (templateCounts[d.template] || 0) + 1;
        });
        const mostUsedTemplate = Object.entries(templateCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'modern';

        set({
          stats: {
            ...stats,
            totalDownloads,
            averageAtsScore,
            mostUsedTemplate,
            lastDownload: newDownload.date,
            downloads,
          },
        });
      },

      recordCreation: () => {
        const { stats } = get();
        set({
          stats: {
            ...stats,
            totalCreations: stats.totalCreations + 1,
          },
        });
      },

      resetStats: () => set({ stats: defaultStats }),
    }),
    {
      name: 'cv-builder-analytics',
    }
  )
);
