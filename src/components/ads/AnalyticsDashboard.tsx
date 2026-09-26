import { useAnalyticsStore } from '../../lib/analytics';
import { Download, FileText, TrendingUp, Award, Calendar, Trash2 } from 'lucide-react';
import { useResumeStore } from '../../lib/store';

interface AnalyticsDashboardProps {
  onClose: () => void;
}

export function AnalyticsDashboard({ onClose }: AnalyticsDashboardProps) {
  const { stats, resetStats } = useAnalyticsStore();
  const theme = useResumeStore((state) => state.theme);
  const isDark = theme === 'dark';

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Nunca';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getAtsColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto`}>
        <div className={`flex items-center justify-between p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <h3 className={`text-lg font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Dashboard de Estatísticas
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={resetStats}
              className="flex items-center gap-1 text-red-500 hover:text-red-700 text-sm"
            >
              <Trash2 className="w-4 h-4" />
              Resetar
            </button>
            <button
              onClick={onClose}
              className={`text-lg font-bold ${isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-600'}`}
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className={`${isDark ? 'bg-gray-700' : 'bg-blue-50'} p-4 rounded-lg`}>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Currículos Criados</p>
                  <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{stats.totalCreations}</p>
                </div>
              </div>
            </div>

            <div className={`${isDark ? 'bg-gray-700' : 'bg-green-50'} p-4 rounded-lg`}>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-600 rounded-lg">
                  <Download className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Downloads</p>
                  <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{stats.totalDownloads}</p>
                </div>
              </div>
            </div>

            <div className={`${isDark ? 'bg-gray-700' : 'bg-purple-50'} p-4 rounded-lg`}>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-600 rounded-lg">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Score ATS Médio</p>
                  <p className={`text-2xl font-bold ${getAtsColor(stats.averageAtsScore)}`}>
                    {stats.averageAtsScore}%
                  </p>
                </div>
              </div>
            </div>

            <div className={`${isDark ? 'bg-gray-700' : 'bg-orange-50'} p-4 rounded-lg`}>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-600 rounded-lg">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Tempo Total</p>
                  <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {stats.totalTimeSpent}min
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* New Metrics Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Completion Rate */}
            <div className={`${isDark ? 'bg-gray-700' : 'bg-white'} p-4 rounded-lg border ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
              <h4 className={`text-sm font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Taxa de Conclusão
              </h4>
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <div className={`w-full ${isDark ? 'bg-gray-600' : 'bg-gray-200'} rounded-full h-3`}>
                    <div
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${stats.averageCompletionRate}%` }}
                    />
                  </div>
                </div>
                <span className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {stats.averageCompletionRate}%
                </span>
              </div>
            </div>

            {/* Top Skills */}
            <div className={`${isDark ? 'bg-gray-700' : 'bg-white'} p-4 rounded-lg border ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
              <h4 className={`text-sm font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Skills Mais Usadas
              </h4>
              {stats.topSkills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {stats.topSkills.slice(0, 5).map((skill, index) => (
                    <span
                      key={index}
                      className={`px-2 py-1 rounded text-xs ${
                        isDark ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Nenhuma skill registrada ainda
                </p>
              )}
            </div>
          </div>

          {/* Weekly Activity Chart */}
          {stats.weeklyActivity.length > 0 && (
            <div className={`${isDark ? 'bg-gray-700' : 'bg-white'} p-4 rounded-lg border ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
              <h4 className={`text-sm font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Atividade Semanal
              </h4>
              <div className="flex items-end gap-2 h-32">
                {stats.weeklyActivity.map((activity, index) => {
                  const maxCount = Math.max(...stats.weeklyActivity.map(a => a.count));
                  const height = (activity.count / maxCount) * 100;
                  const date = new Date(activity.date);
                  const dayName = date.toLocaleDateString('pt-BR', { weekday: 'short' });
                  
                  return (
                    <div key={index} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t transition-all duration-300"
                        style={{ height: `${height}%` }}
                        title={`${activity.count} ações em ${dayName}`}
                      />
                      <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {dayName}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Recent Downloads */}
          {(stats.downloads || []).length > 0 && (
            <div>
              <h4 className={`text-md font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Downloads Recentes
              </h4>
              <div className="space-y-2">
                {(stats.downloads || []).slice(0, 10).map((download) => (
                  <div
                    key={download.id}
                    className={`${isDark ? 'bg-gray-700' : 'bg-gray-50'} p-3 rounded-lg flex items-center justify-between`}
                  >
                    <div className="flex items-center gap-3">
                      <Download className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                      <div>
                        <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          Template: {download.template}
                        </p>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {formatDate(download.date)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`text-sm font-bold ${getAtsColor(download.atsScore)}`}>
                        ATS: {download.atsScore}%
                      </span>
                      {download.hasPhoto && (
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          Com Foto
                        </span>
                      )}
                      <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {download.sectionsCount} seções
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {(!stats.downloads || stats.downloads.length === 0) && (
            <div className="text-center py-12">
              <TrendingUp className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-gray-600' : 'text-gray-300'}`} />
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Nenhuma estatística ainda. Baixe seu primeiro currículo para começar!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
