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
  totalTimeSpent: number; // em minutos
  averageCompletionRate: number; // percentual
  topSkills: string[];
  weeklyActivity: { date: string; count: number }[];
}

interface AnalyticsStore {
  stats: CVStats;
  recordDownload: (record: Omit<DownloadRecord, 'id' | 'date'>) => void;
  recordCreation: () => void;
  recordTimeSpent: (minutes: number) => void;
  updateCompletionRate: (rate: number) => void;
  updateTopSkills: (skills: string[]) => void;
  recordWeeklyActivity: () => void;
  resetStats: () => void;
  getInsights: () => {
    completionTrend: 'up' | 'down' | 'stable';
    mostActiveDay: string;
    improvementSuggestions: string[];
  };
}

const defaultStats: CVStats = {
  totalDownloads: 0,
  totalCreations: 0,
  averageAtsScore: 0,
  mostUsedTemplate: 'modern',
  lastDownload: null,
  downloads: [],
  totalTimeSpent: 0,
  averageCompletionRate: 0,
  topSkills: [],
  weeklyActivity: [],
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

      recordTimeSpent: (minutes) => {
        const { stats } = get();
        set({
          stats: {
            ...stats,
            totalTimeSpent: stats.totalTimeSpent + minutes,
          },
        });
      },

      updateCompletionRate: (rate) => {
        const { stats } = get();
        const newAverage = stats.averageCompletionRate === 0 
          ? rate 
          : (stats.averageCompletionRate + rate) / 2;
        set({
          stats: {
            ...stats,
            averageCompletionRate: Math.round(newAverage),
          },
        });
      },

      updateTopSkills: (skills) => {
        const { stats } = get();
        const skillCounts: Record<string, number> = {};
        
        // Contar skills dos downloads anteriores
        stats.downloads.forEach(d => {
          // Assumindo que temos acesso às skills de alguma forma
          // Por enquanto, usamos as skills fornecidas
        });
        
        skills.forEach(skill => {
          skillCounts[skill] = (skillCounts[skill] || 0) + 1;
        });
        
        const topSkills = Object.entries(skillCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 10)
          .map(([skill]) => skill);
        
        set({
          stats: {
            ...stats,
            topSkills,
          },
        });
      },

      recordWeeklyActivity: () => {
        const { stats } = get();
        const today = new Date().toISOString().split('T')[0];
        const existingEntry = stats.weeklyActivity.find(a => a.date === today);
        
        let weeklyActivity;
        if (existingEntry) {
          weeklyActivity = stats.weeklyActivity.map(a => 
            a.date === today ? { ...a, count: a.count + 1 } : a
          );
        } else {
          weeklyActivity = [...stats.weeklyActivity, { date: today, count: 1 }]
            .slice(-7); // Manter apenas os últimos 7 dias
        }
        
        set({
          stats: {
            ...stats,
            weeklyActivity,
          },
        });
      },

      getInsights: () => {
        const { stats } = get();
        
        // Tendência de conclusão
        const recentDownloads = stats.downloads.slice(0, 5);
        const olderDownloads = stats.downloads.slice(5, 10);
        
        let completionTrend: 'up' | 'down' | 'stable' = 'stable';
        if (recentDownloads.length > 0 && olderDownloads.length > 0) {
          const recentAvg = recentDownloads.reduce((sum, d) => sum + d.atsScore, 0) / recentDownloads.length;
          const olderAvg = olderDownloads.reduce((sum, d) => sum + d.atsScore, 0) / olderDownloads.length;
          
          if (recentAvg > olderAvg + 5) completionTrend = 'up';
          else if (recentAvg < olderAvg - 5) completionTrend = 'down';
        }
        
        // Dia mais ativo
        const dayCounts: Record<string, number> = {};
        stats.weeklyActivity.forEach(a => {
          const day = new Date(a.date).toLocaleDateString('pt-BR', { weekday: 'long' });
          dayCounts[day] = (dayCounts[day] || 0) + a.count;
        });
        
        const mostActiveDay = Object.entries(dayCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';
        
        // Sugestões de melhoria
        const improvementSuggestions: string[] = [];
        
        if (stats.averageAtsScore < 70) {
          improvementSuggestions.push('Melhore seu ATS Score adicionando mais palavras-chave relevantes');
        }
        
        if (stats.totalDownloads < 5) {
          improvementSuggestions.push('Continue praticando! Quanto mais currículos criar, melhor ficará');
        }
        
        if (stats.mostUsedTemplate === 'modern') {
          improvementSuggestions.push('Experimente outros templates para encontrar o ideal para você');
        }
        
        if (stats.totalTimeSpent < 30) {
          improvementSuggestions.push('Dedique mais tempo para criar um currículo mais completo');
        }
        
        return {
          completionTrend,
          mostActiveDay,
          improvementSuggestions: improvementSuggestions.slice(0, 3),
        };
      },

      resetStats: () => set({ stats: defaultStats }),
    }),
    {
      name: 'cv-builder-analytics',
    }
  )
);
