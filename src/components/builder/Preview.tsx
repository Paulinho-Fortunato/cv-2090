import { memo } from 'react';
import { useResumeStore } from '../../lib/store';
import { Mail, Phone, MapPin, Briefcase, GraduationCap, Award } from 'lucide-react';

function PreviewComponent() {
  const { basics, experiences, education, skills } = useResumeStore((state) => ({
    basics: state.data.basics,
    experiences: state.data.experiences,
    education: state.data.education,
    skills: state.data.skills,
  }));

  const formatDate = (date: string) => {
    if (!date) return '';
    const [year, month] = date.split('-');
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    return `${months[parseInt(month) - 1]} ${year}`;
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden" style={{ width: '100%', maxWidth: '600px' }}>
      {/* Header */}
      <div className="bg-blue-600 text-white p-6">
        <h1 className="text-2xl font-bold">
          {basics.fullName || 'Seu Nome'}
        </h1>
        <p className="text-blue-100 text-sm mt-1">
          {basics.headline || 'Seu Cargo'}
        </p>
        <div className="flex flex-wrap gap-4 mt-4 text-xs text-blue-100">
          {basics.email && (
            <span className="flex items-center gap-1">
              <Mail className="w-3 h-3" />
              {basics.email}
            </span>
          )}
          {basics.phone && (
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3" />
              {basics.phone}
            </span>
          )}
          {basics.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {basics.location}
            </span>
          )}
        </div>
      </div>

      <div className="p-6 space-y-5">
        {/* Summary */}
        {basics.summary && (
          <div>
            <p className="text-xs text-gray-600 leading-relaxed">
              {basics.summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Briefcase className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                Experiência Profissional
              </h3>
            </div>
            <div className="space-y-3">
              {experiences.map((exp) => (
                <div key={exp.id} className="border-l-2 border-blue-200 pl-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {exp.position || 'Cargo'}
                      </p>
                      <p className="text-xs text-blue-600 font-medium">
                        {exp.company || 'Empresa'}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {formatDate(exp.startDate)}
                      {exp.endDate ? ` - ${formatDate(exp.endDate)}` : exp.current ? ' - Atual' : ''}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <GraduationCap className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                Formação Acadêmica
              </h3>
            </div>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="border-l-2 border-blue-200 pl-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {edu.degree} {edu.field && `- ${edu.field}`}
                      </p>
                      <p className="text-xs text-blue-600 font-medium">
                        {edu.institution || 'Instituição'}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {formatDate(edu.startDate)}
                      {edu.endDate ? ` - ${formatDate(edu.endDate)}` : ''}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                Habilidades
              </h3>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs font-medium border border-blue-100"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {!basics.fullName && !basics.summary && experiences.length === 0 && education.length === 0 && skills.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <p className="text-sm">Preencha os dados para ver o preview do currículo</p>
          </div>
        )}
      </div>
    </div>
  );
}

export const Preview = memo(PreviewComponent);
