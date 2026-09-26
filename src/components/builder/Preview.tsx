import { memo, useMemo } from 'react';
import { useResumeStore } from '../../lib/store';
import { Mail, Phone, MapPin, Briefcase, GraduationCap, Award, Globe, Link2, FolderKanban } from 'lucide-react';
import { translations } from '../../types/resume';
import { useResumeBasics, useResumeExperiences, useResumeEducation, useResumeProjects, useResumeSkills, useResumePhoto, useLanguage, useTemplate, useTheme } from '../../hooks/useResume';

function PreviewComponent() {
  const basics = useResumeBasics();
  const experiences = useResumeExperiences();
  const education = useResumeEducation();
  const projects = useResumeProjects();
  const skills = useResumeSkills();
  const photo = useResumePhoto();
  const language = useLanguage();
  const template = useTemplate();
  const theme = useTheme();

  const t = translations[language];

  const formatDate = useMemo(() => (date: string) => {
    if (!date) return '';
    const [year, month] = date.split('-');
    const months = language === 'en'
      ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      : ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    return `${months[parseInt(month) - 1]} ${year}`;
  }, [language]);

  const isDark = theme === 'dark';
  const bgClass = isDark ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900';
  const mutedClass = isDark ? 'text-gray-400' : 'text-gray-600';
  const borderClass = isDark ? 'border-gray-600' : 'border-blue-200';

  const renderClassic = () => (
    <div className={`${bgClass} shadow-lg rounded-lg overflow-hidden`} style={{ width: '100%', maxWidth: '600px' }}>
      <div className={`p-6 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex items-center gap-4">
          {photo && <img src={photo} alt="" className="w-16 h-16 rounded-full object-cover" />}
          <div>
            <h1 className="text-2xl font-bold">{basics.fullName || 'Seu Nome'}</h1>
            <p className={`text-sm ${mutedClass} mt-1`}>{basics.headline || 'Seu Cargo'}</p>
          </div>
        </div>
        <div className={`flex flex-wrap gap-4 mt-4 text-xs ${mutedClass}`}>
          {basics.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{basics.email}</span>}
          {basics.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{basics.phone}</span>}
          {basics.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{basics.location}</span>}
          {basics.website && <span className="flex items-center gap-1"><Globe className="w-3 h-3" />{basics.website}</span>}
          {basics.linkedin && <span className="flex items-center gap-1"><Link2 className="w-3 h-3" />{basics.linkedin}</span>}
        </div>
      </div>
      <div className="p-6 space-y-5">
        {basics.summary && (
          <div>
            <h3 className={`text-sm font-bold uppercase tracking-wide mb-2 ${mutedClass}`}>{t.professionalSummary}</h3>
            <p className={`text-xs ${mutedClass} leading-relaxed`}>{basics.summary}</p>
          </div>
        )}
        {experiences.length > 0 && (
          <div>
            <h3 className={`text-sm font-bold uppercase tracking-wide mb-3 ${mutedClass} flex items-center gap-2`}>
              <Briefcase className="w-4 h-4" />{t.professionalExperience}
            </h3>
            <div className="space-y-3">
              {experiences.map((exp) => (
                <div key={exp.id} className={`border-l-2 ${borderClass} pl-3`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold">{exp.position || 'Cargo'}</p>
                      <p className="text-xs text-blue-600 font-medium">{exp.company || 'Empresa'}</p>
                    </div>
                    <span className={`text-xs ${mutedClass} whitespace-nowrap`}>
                      {formatDate(exp.startDate)}{exp.endDate ? ` - ${formatDate(exp.endDate)}` : exp.current ? ' - Atual' : ''}
                    </span>
                  </div>
                  {exp.description && <p className={`text-xs ${mutedClass} mt-1 leading-relaxed`}>{exp.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
        {education.length > 0 && (
          <div>
            <h3 className={`text-sm font-bold uppercase tracking-wide mb-3 ${mutedClass} flex items-center gap-2`}>
              <GraduationCap className="w-4 h-4" />{t.academicEducation}
            </h3>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className={`border-l-2 ${borderClass} pl-3`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold">{edu.degree} {edu.field && `- ${edu.field}`}</p>
                      <p className="text-xs text-blue-600 font-medium">{edu.institution || 'Instituição'}</p>
                    </div>
                    <span className={`text-xs ${mutedClass} whitespace-nowrap`}>
                      {formatDate(edu.startDate)}{edu.endDate ? ` - ${formatDate(edu.endDate)}` : ''}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {projects.length > 0 && (
          <div>
            <h3 className={`text-sm font-bold uppercase tracking-wide mb-3 ${mutedClass} flex items-center gap-2`}>
              <FolderKanban className="w-4 h-4" />{t.projectsLabel}
            </h3>
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id} className={`border-l-2 ${borderClass} pl-3`}>
                  <p className="text-sm font-semibold">{proj.name}</p>
                  {proj.technologies && <p className="text-xs text-blue-600">{proj.technologies}</p>}
                  {proj.description && <p className={`text-xs ${mutedClass} mt-1`}>{proj.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
        {skills.length > 0 && (
          <div>
            <h3 className={`text-sm font-bold uppercase tracking-wide mb-3 ${mutedClass} flex items-center gap-2`}>
              <Award className="w-4 h-4" />{t.skillsLabel}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className={`${isDark ? 'bg-blue-900/30 text-blue-300 border-blue-800' : 'bg-blue-50 text-blue-700 border-blue-100'} px-2 py-0.5 rounded text-xs font-medium border`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
        {!basics.fullName && experiences.length === 0 && education.length === 0 && skills.length === 0 && (
          <div className={`text-center py-8 ${mutedClass}`}>
            <p className="text-sm">Preencha os dados para ver o preview</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderModern = () => (
    <div className={`${bgClass} shadow-lg rounded-lg overflow-hidden`} style={{ width: '100%', maxWidth: '600px' }}>
      <div className="bg-blue-600 text-white p-6">
        <div className="flex items-center gap-4">
          {photo && <img src={photo} alt="" className="w-16 h-16 rounded-full object-cover border-2 border-white/30" />}
          <div>
            <h1 className="text-2xl font-bold">{basics.fullName || 'Seu Nome'}</h1>
            <p className="text-blue-100 text-sm mt-1">{basics.headline || 'Seu Cargo'}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 mt-4 text-xs text-blue-100">
          {basics.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{basics.email}</span>}
          {basics.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{basics.phone}</span>}
          {basics.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{basics.location}</span>}
          {basics.website && <span className="flex items-center gap-1"><Globe className="w-3 h-3" />{basics.website}</span>}
        </div>
      </div>
      <div className="p-6 space-y-5">
        {basics.summary && <p className={`text-xs ${mutedClass} leading-relaxed`}>{basics.summary}</p>}
        {experiences.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Briefcase className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-bold uppercase tracking-wide">{t.professionalExperience}</h3>
            </div>
            <div className="space-y-3">
              {experiences.map((exp) => (
                <div key={exp.id} className={`border-l-2 ${borderClass} pl-3`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold">{exp.position || 'Cargo'}</p>
                      <p className="text-xs text-blue-600 font-medium">{exp.company || 'Empresa'}</p>
                    </div>
                    <span className={`text-xs ${mutedClass} whitespace-nowrap`}>
                      {formatDate(exp.startDate)}{exp.endDate ? ` - ${formatDate(exp.endDate)}` : exp.current ? ' - Atual' : ''}
                    </span>
                  </div>
                  {exp.description && <p className={`text-xs ${mutedClass} mt-1 leading-relaxed`}>{exp.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
        {education.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <GraduationCap className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-bold uppercase tracking-wide">{t.academicEducation}</h3>
            </div>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className={`border-l-2 ${borderClass} pl-3`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold">{edu.degree} {edu.field && `- ${edu.field}`}</p>
                      <p className="text-xs text-blue-600 font-medium">{edu.institution || 'Instituição'}</p>
                    </div>
                    <span className={`text-xs ${mutedClass} whitespace-nowrap`}>
                      {formatDate(edu.startDate)}{edu.endDate ? ` - ${formatDate(edu.endDate)}` : ''}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {projects.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FolderKanban className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-bold uppercase tracking-wide">{t.projectsLabel}</h3>
            </div>
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id} className={`border-l-2 ${borderClass} pl-3`}>
                  <p className="text-sm font-semibold">{proj.name}</p>
                  {proj.technologies && <p className="text-xs text-blue-600">{proj.technologies}</p>}
                  {proj.description && <p className={`text-xs ${mutedClass} mt-1`}>{proj.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
        {skills.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-bold uppercase tracking-wide">{t.skillsLabel}</h3>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className={`${isDark ? 'bg-blue-900/30 text-blue-300 border-blue-800' : 'bg-blue-50 text-blue-700 border-blue-100'} px-2 py-0.5 rounded text-xs font-medium border`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
        {!basics.fullName && experiences.length === 0 && education.length === 0 && skills.length === 0 && (
          <div className={`text-center py-8 ${mutedClass}`}>
            <p className="text-sm">Preencha os dados para ver o preview</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderMinimal = () => (
    <div className={`${bgClass} shadow-lg rounded-lg p-8`} style={{ width: '100%', maxWidth: '600px' }}>
      <div className="text-center mb-6">
        {photo && <img src={photo} alt="" className="w-20 h-20 rounded-full object-cover mx-auto mb-3" />}
        <h1 className="text-2xl font-light tracking-wide">{basics.fullName || 'Seu Nome'}</h1>
        <p className={`text-sm ${mutedClass} mt-1`}>{basics.headline || ''}</p>
        <div className={`flex flex-wrap justify-center gap-4 mt-3 text-xs ${mutedClass}`}>
          {basics.email && <span>{basics.email}</span>}
          {basics.phone && <span>{basics.phone}</span>}
          {basics.location && <span>{basics.location}</span>}
        </div>
      </div>
      <div className="space-y-5">
        {basics.summary && <p className={`text-xs ${mutedClass} leading-relaxed text-center italic`}>"{basics.summary}"</p>}
        {experiences.length > 0 && (
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-3 text-center">{t.professionalExperience}</h3>
            {experiences.map((exp) => (
              <div key={exp.id} className="mb-3">
                <p className="text-sm font-medium">{exp.position} - {exp.company}</p>
                <p className={`text-xs ${mutedClass}`}>{formatDate(exp.startDate)} - {exp.current ? 'Atual' : formatDate(exp.endDate)}</p>
                {exp.description && <p className={`text-xs ${mutedClass} mt-1`}>{exp.description}</p>}
              </div>
            ))}
          </div>
        )}
        {skills.length > 0 && (
          <div className="text-center">
            <h3 className="text-xs font-bold uppercase tracking-widest mb-3">{t.skillsLabel}</h3>
            <p className={`text-xs ${mutedClass}`}>{skills.join(' · ')}</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderCreative = () => (
    <div className={`${bgClass} shadow-lg rounded-lg overflow-hidden flex`} style={{ width: '100%', maxWidth: '600px', minHeight: '700px' }}>
      <div className="w-1/3 bg-gradient-to-b from-blue-600 to-purple-700 text-white p-5">
        {photo && <img src={photo} alt="" className="w-20 h-20 rounded-full object-cover mx-auto mb-3 border-2 border-white/30" />}
        <h1 className="text-lg font-bold text-center">{basics.fullName || 'Seu Nome'}</h1>
        <p className="text-xs text-blue-100 text-center mt-1">{basics.headline || ''}</p>
        <div className="mt-6 space-y-2 text-xs">
          {basics.email && <p className="flex items-center gap-1"><Mail className="w-3 h-3" />{basics.email}</p>}
          {basics.phone && <p className="flex items-center gap-1"><Phone className="w-3 h-3" />{basics.phone}</p>}
          {basics.location && <p className="flex items-center gap-1"><MapPin className="w-3 h-3" />{basics.location}</p>}
        </div>
        {skills.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xs font-bold uppercase mb-2">{t.skillsLabel}</h3>
            <div className="flex flex-wrap gap-1">
              {skills.map((skill, i) => (
                <span key={i} className="bg-white/20 px-2 py-0.5 rounded text-xs">{skill}</span>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="flex-1 p-5 space-y-4">
        {basics.summary && <p className={`text-xs ${mutedClass} leading-relaxed`}>{basics.summary}</p>}
        {experiences.length > 0 && (
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wide text-blue-600 mb-2">{t.professionalExperience}</h3>
            {experiences.map((exp) => (
              <div key={exp.id} className="mb-3">
                <p className="text-sm font-semibold">{exp.position}</p>
                <p className="text-xs text-blue-600">{exp.company} | {formatDate(exp.startDate)} - {exp.current ? 'Atual' : formatDate(exp.endDate)}</p>
                {exp.description && <p className={`text-xs ${mutedClass} mt-1`}>{exp.description}</p>}
              </div>
            ))}
          </div>
        )}
        {education.length > 0 && (
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wide text-blue-600 mb-2">{t.academicEducation}</h3>
            {education.map((edu) => (
              <div key={edu.id} className="mb-2">
                <p className="text-sm font-semibold">{edu.degree}</p>
                <p className="text-xs text-blue-600">{edu.institution}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  switch (template) {
    case 'classic': return renderClassic();
    case 'minimal': return renderMinimal();
    case 'creative': return renderCreative();
    default: return renderModern();
  }
}

export const Preview = memo(PreviewComponent);
