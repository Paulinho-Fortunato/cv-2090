import { useCallback } from 'react';
import { BadgeCheck, Plus, Trash2, Building2, Calendar, FileText, GripVertical, ChevronUp, ChevronDown, ExternalLink } from 'lucide-react';
import { useResumeStore } from '../../../lib/store';
import { translations } from '../../../types/resume';
import { useLanguage, useTheme } from '../../../hooks/useResume';

export function CertificationsForm() {
  const certifications = useResumeStore((state) => state.resumeData.certifications);
  const addCertification = useResumeStore((state) => state.addCertification);
  const updateCertification = useResumeStore((state) => state.updateCertification);
  const removeCertification = useResumeStore((state) => state.removeCertification);
  const reorderCertifications = useResumeStore((state) => state.reorderCertifications);
  const language = useLanguage();
  const theme = useTheme();

  const t = translations[language];
  const isDark = theme === 'dark';

  const inputClass = `w-full pl-10 pr-4 py-2 sm:py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base ${
    isDark ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' : 'border-gray-300'
  }`;
  const labelClass = `block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`;

  const handleMoveUp = useCallback((index: number) => {
    if (index > 0) reorderCertifications(index, index - 1);
  }, [reorderCertifications]);

  const handleMoveDown = useCallback((index: number) => {
    if (index < certifications.length - 1) reorderCertifications(index, index + 1);
  }, [reorderCertifications, certifications.length]);

  return (
    <div className="space-y-6" data-tour="certifications-form">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <BadgeCheck className="w-5 h-5 text-blue-600" />
          <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{t.certifications}</h2>
        </div>
        <button
          onClick={addCertification}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          {t.add}
        </button>
      </div>

      {certifications.length === 0 && (
        <div className={`text-center py-12 rounded-lg border-2 border-dashed ${isDark ? 'border-gray-600 bg-gray-800/50' : 'border-gray-300 bg-gray-50'}`}>
          <BadgeCheck className={`w-10 h-10 mx-auto mb-3 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
          <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>Nenhuma habilitação profissional adicionada</p>
          <p className={`text-sm mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            Adicione cursos, certificações e formações profissionais
          </p>
        </div>
      )}

      {certifications.map((cert, index) => (
        <div
          key={cert.id}
          className={`border rounded-lg p-4 space-y-4 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GripVertical className={`w-4 h-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
              <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                #{index + 1}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => handleMoveUp(index)}
                disabled={index === 0}
                className={`p-1 rounded ${isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'} disabled:opacity-30`}
              >
                <ChevronUp className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleMoveDown(index)}
                disabled={index === certifications.length - 1}
                className={`p-1 rounded ${isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'} disabled:opacity-30`}
              >
                <ChevronDown className="w-4 h-4" />
              </button>
              <button
                onClick={() => removeCertification(cert.id)}
                className="text-red-500 hover:text-red-700 p-1"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className={labelClass}>Nome do Curso/Certificação</label>
              <div className="relative">
                <BadgeCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  value={cert.name}
                  onChange={(e) => updateCertification(cert.id, { name: e.target.value })}
                  className={inputClass}
                  placeholder="Ex: Curso de Desenvolvimento Web, Certificação AWS"
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Instituição/Empresa</label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  value={cert.institution}
                  onChange={(e) => updateCertification(cert.id, { institution: e.target.value })}
                  className={inputClass}
                  placeholder="Ex: Udemy, Coursera, Microsoft"
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Data de Conclusão</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  value={cert.date}
                  onChange={(e) => updateCertification(cert.id, { date: e.target.value })}
                  type="month"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Duração/Carga Horária</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  value={cert.duration}
                  onChange={(e) => updateCertification(cert.id, { duration: e.target.value })}
                  className={inputClass}
                  placeholder="Ex: 40 horas, 3 meses"
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>URL do Certificado (opcional)</label>
              <div className="relative">
                <ExternalLink className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  value={cert.certificateUrl}
                  onChange={(e) => updateCertification(cert.id, { certificateUrl: e.target.value })}
                  className={inputClass}
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>Descrição</label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <textarea
                  value={cert.description}
                  onChange={(e) => updateCertification(cert.id, { description: e.target.value })}
                  rows={3}
                  className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                    isDark ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' : 'border-gray-300'
                  }`}
                  placeholder="Descreva o que aprendeu neste curso/certificação..."
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
