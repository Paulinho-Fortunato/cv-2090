import { memo, useMemo } from 'react';
import { useResumeStore } from '../../lib/store';
import { Mail, Phone, MapPin, Briefcase, GraduationCap, Award, Globe, Link2, FolderKanban, Code, Linkedin, Github, Twitter, Instagram, Youtube, Calendar, Flag, Target, DollarSign, Languages, Sparkles, Heart } from 'lucide-react';
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

  // Template: Moderno (Padrão)
  const renderModern = () => (
    <div className={`shadow-lg rounded-lg overflow-hidden w-full max-w-[600px] ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
      {/* Header com gradiente */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 sm:p-6">
        <div className="flex items-center gap-3 sm:gap-4">
          {photo && (
            <img 
              src={photo} 
              alt="" 
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-white/30 flex-shrink-0" 
            />
          )}
          <div className="flex-1 min-w-0">
            <h1 className="text-lg sm:text-2xl font-bold truncate">
              {basics.fullName || 'Seu Nome'}
            </h1>
            <p className="text-blue-100 text-xs sm:text-sm mt-0.5 sm:mt-1 truncate">
              {basics.headline || 'Sua Profissão'}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-4 mt-3 sm:mt-4 text-xs">
          {basics.email && (
            <span className="flex items-center gap-1 text-blue-100 truncate">
              <Mail className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{basics.email}</span>
            </span>
          )}
          {basics.phone && (
            <span className="flex items-center gap-1 text-blue-100 truncate">
              <Phone className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{basics.phone}</span>
            </span>
          )}
          {basics.location && (
            <span className="flex items-center gap-1 text-blue-100 truncate">
              <MapPin className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{basics.location}</span>
            </span>
          )}
          {basics.website && (
            <span className="flex items-center gap-1 text-blue-100 truncate">
              <Globe className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{basics.website}</span>
            </span>
          )}
          {basics.linkedin && (
            <span className="flex items-center gap-1 text-blue-100 truncate">
              <Linkedin className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{basics.linkedin}</span>
            </span>
          )}
        </div>
      </div>
      
      <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
        {basics.summary && (
          <p className={`text-xs sm:text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
            {basics.summary}
          </p>
        )}

        {/* Informações Pessoais */}
        {(basics.birthDate || basics.nationality || basics.maritalStatus || basics.languages.length > 0 || basics.objectives) && (
          <div>
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <Heart className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <h3 className={`text-xs sm:text-sm font-bold uppercase tracking-wide ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                {t.personalInfo}
              </h3>
            </div>
            <div className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} space-y-1`}>
              {basics.birthDate && (
                <p className="flex items-center gap-2">
                  <Calendar className="w-3 h-3 flex-shrink-0" />
                  <span>{new Date(basics.birthDate).toLocaleDateString(language === 'pt' ? 'pt-BR' : language === 'en' ? 'en-US' : 'es-ES')}</span>
                </p>
              )}
              {basics.nationality && (
                <p className="flex items-center gap-2">
                  <Flag className="w-3 h-3 flex-shrink-0" />
                  <span>{basics.nationality}</span>
                </p>
              )}
              {basics.maritalStatus && (
                <p className="flex items-center gap-2">
                  <Heart className="w-3 h-3 flex-shrink-0" />
                  <span>{basics.maritalStatus}</span>
                </p>
              )}
              {basics.languages.length > 0 && (
                <p className="flex items-center gap-2">
                  <Languages className="w-3 h-3 flex-shrink-0" />
                  <span>{basics.languages.join(', ')}</span>
                </p>
              )}
              {basics.objectives && (
                <p className="flex items-start gap-2 mt-2">
                  <Target className="w-3 h-3 flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{basics.objectives}</span>
                </p>
              )}
            </div>
          </div>
        )}

        {/* Endereço Completo */}
        {(basics.street || basics.city || basics.state || basics.zipCode || basics.country) && (
          <div>
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <h3 className={`text-xs sm:text-sm font-bold uppercase tracking-wide ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                {t.address}
              </h3>
            </div>
            <p className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {[basics.street, basics.city, basics.state, basics.zipCode, basics.country].filter(Boolean).join(', ')}
            </p>
          </div>
        )}

        {/* Redes Sociais */}
        {(basics.twitter || basics.instagram || basics.behance || basics.dribbble || basics.medium || basics.youtube) && (
          <div>
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <Link2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <h3 className={`text-xs sm:text-sm font-bold uppercase tracking-wide ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                {t.socialMedia}
              </h3>
            </div>
            <div className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} space-y-1`}>
              {basics.twitter && (
                <p className="flex items-center gap-2">
                  <Twitter className="w-3 h-3 flex-shrink-0" />
                  <span>{basics.twitter}</span>
                </p>
              )}
              {basics.instagram && (
                <p className="flex items-center gap-2">
                  <Instagram className="w-3 h-3 flex-shrink-0" />
                  <span>{basics.instagram}</span>
                </p>
              )}
              {basics.behance && (
                <p className="flex items-center gap-2">
                  <Link2 className="w-3 h-3 flex-shrink-0" />
                  <span>{basics.behance}</span>
                </p>
              )}
              {basics.dribbble && (
                <p className="flex items-center gap-2">
                  <Link2 className="w-3 h-3 flex-shrink-0" />
                  <span>{basics.dribbble}</span>
                </p>
              )}
              {basics.medium && (
                <p className="flex items-center gap-2">
                  <Link2 className="w-3 h-3 flex-shrink-0" />
                  <span>{basics.medium}</span>
                </p>
              )}
              {basics.youtube && (
                <p className="flex items-center gap-2">
                  <Youtube className="w-3 h-3 flex-shrink-0" />
                  <span>{basics.youtube}</span>
                </p>
              )}
            </div>
          </div>
        )}

        {/* Informações Adicionais */}
        {(basics.interests.length > 0 || basics.availability || basics.salaryExpectation) && (
          <div>
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <Sparkles className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <h3 className={`text-xs sm:text-sm font-bold uppercase tracking-wide ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                {t.additionalInfo}
              </h3>
            </div>
            <div className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} space-y-1`}>
              {basics.interests.length > 0 && (
                <p className="flex items-center gap-2">
                  <Sparkles className="w-3 h-3 flex-shrink-0" />
                  <span>{basics.interests.join(', ')}</span>
                </p>
              )}
              {basics.availability && (
                <p className="flex items-center gap-2">
                  <Calendar className="w-3 h-3 flex-shrink-0" />
                  <span>{basics.availability}</span>
                </p>
              )}
              {basics.salaryExpectation && (
                <p className="flex items-center gap-2">
                  <DollarSign className="w-3 h-3 flex-shrink-0" />
                  <span>{basics.salaryExpectation}</span>
                </p>
              )}
            </div>
          </div>
        )}
        
        {experiences.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <Briefcase className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <h3 className={`text-xs sm:text-sm font-bold uppercase tracking-wide ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                {t.professionalExperience}
              </h3>
            </div>
            <div className="space-y-2 sm:space-y-3">
              {experiences.map((exp) => (
                <div key={exp.id} className={`border-l-2 ${isDark ? 'border-blue-800' : 'border-blue-200'} pl-2 sm:pl-3`}>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                    <div className="min-w-0 flex-1">
                      <p className={`text-xs sm:text-sm font-semibold ${isDark ? 'text-gray-100' : 'text-gray-900'} truncate`}>
                        {exp.position || 'Cargo'}
                      </p>
                      <p className="text-xs text-blue-600 font-medium truncate">
                        {exp.company || 'Organização'}
                      </p>
                    </div>
                    <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} whitespace-nowrap flex-shrink-0`}>
                      {formatDate(exp.startDate)}{exp.endDate ? ` - ${formatDate(exp.endDate)}` : exp.current ? ' - Atual' : ''}
                    </span>
                  </div>
                  {exp.description && (
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} mt-1 leading-relaxed line-clamp-3`}>
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {education.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <GraduationCap className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <h3 className={`text-xs sm:text-sm font-bold uppercase tracking-wide ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                {t.academicEducation}
              </h3>
            </div>
            <div className="space-y-2 sm:space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className={`border-l-2 ${isDark ? 'border-blue-800' : 'border-blue-200'} pl-2 sm:pl-3`}>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                    <div className="min-w-0 flex-1">
                      <p className={`text-xs sm:text-sm font-semibold ${isDark ? 'text-gray-100' : 'text-gray-900'} truncate`}>
                        {edu.degree} {edu.field && `- ${edu.field}`}
                      </p>
                      <p className="text-xs text-blue-600 font-medium truncate">
                        {edu.institution || 'Instituição de Ensino'}
                      </p>
                    </div>
                    <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} whitespace-nowrap flex-shrink-0`}>
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
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <FolderKanban className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <h3 className={`text-xs sm:text-sm font-bold uppercase tracking-wide ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                {t.projectsLabel}
              </h3>
            </div>
            <div className="space-y-2 sm:space-y-3">
              {projects.map((proj) => (
                <div key={proj.id} className={`border-l-2 ${isDark ? 'border-blue-800' : 'border-blue-200'} pl-2 sm:pl-3`}>
                  <p className={`text-xs sm:text-sm font-semibold ${isDark ? 'text-gray-100' : 'text-gray-900'} truncate`}>
                    {proj.name}
                  </p>
                  {proj.technologies && (
                    <p className="text-xs text-blue-600 truncate">{proj.technologies}</p>
                  )}
                  {proj.description && (
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} mt-1 line-clamp-2`}>
                      {proj.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {skills.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <Award className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <h3 className={`text-xs sm:text-sm font-bold uppercase tracking-wide ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                {t.skillsLabel}
              </h3>
            </div>
            <div className="flex flex-wrap gap-1 sm:gap-1.5">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className={`${isDark ? 'bg-blue-900/30 text-blue-300 border-blue-800' : 'bg-blue-50 text-blue-700 border-blue-100'} px-1.5 sm:px-2 py-0.5 rounded text-[10px] sm:text-xs font-medium border`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {!basics.fullName && experiences.length === 0 && education.length === 0 && skills.length === 0 && (
          <div className={`text-center py-8 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            <p className="text-xs sm:text-sm">Preencha os seus dados para ver o preview do currículo</p>
          </div>
        )}
      </div>
    </div>
  );

  // Template: Executivo (Formal)
  const renderExecutive = () => (
    <div className={`shadow-lg rounded-lg overflow-hidden w-full max-w-[600px] ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Header minimalista com linha */}
      <div className={`p-4 sm:p-6 border-b-2 ${isDark ? 'border-gray-700' : 'border-gray-900'}`}>
        <div className="flex items-center gap-3 sm:gap-4">
          {photo && (
            <img 
              src={photo} 
              alt="" 
              className="w-14 h-14 sm:w-20 sm:h-20 rounded-lg object-cover flex-shrink-0" 
            />
          )}
          <div className="flex-1 min-w-0">
            <h1 className={`text-xl sm:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} truncate`}>
              {basics.fullName || 'Seu Nome'}
            </h1>
            <p className={`text-sm sm:text-base ${isDark ? 'text-gray-400' : 'text-gray-600'} mt-1 truncate`}>
              {basics.headline || 'Seu Cargo'}
            </p>
          </div>
        </div>
        <div className={`flex flex-wrap gap-x-4 gap-y-1 mt-3 sm:mt-4 text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          {basics.email && <span className="truncate">{basics.email}</span>}
          {basics.phone && <span className="truncate">{basics.phone}</span>}
          {basics.location && <span className="truncate">{basics.location}</span>}
          {basics.linkedin && (
            <span className="flex items-center gap-1 truncate">
              <Linkedin className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{basics.linkedin}</span>
            </span>
          )}
        </div>
      </div>
      
      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        {basics.summary && (
          <div>
            <h3 className={`text-xs sm:text-sm font-bold uppercase tracking-wider mb-2 ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>
              {t.professionalSummary}
            </h3>
            <p className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-700'} leading-relaxed`}>
              {basics.summary}
            </p>
          </div>
        )}
        
        {experiences.length > 0 && (
          <div>
            <h3 className={`text-xs sm:text-sm font-bold uppercase tracking-wider mb-3 ${isDark ? 'text-gray-300' : 'text-gray-900'} border-b ${isDark ? 'border-gray-700' : 'border-gray-300'} pb-1`}>
              {t.professionalExperience}
            </h3>
            <div className="space-y-3 sm:space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                    <div className="min-w-0 flex-1">
                      <p className={`text-sm sm:text-base font-bold ${isDark ? 'text-white' : 'text-gray-900'} truncate`}>
                        {exp.position}
                      </p>
                      <p className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} italic truncate`}>
                        {exp.company}
                      </p>
                    </div>
                    <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} whitespace-nowrap flex-shrink-0`}>
                      {formatDate(exp.startDate)} - {exp.current ? 'Atual' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  {exp.description && (
                    <p className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-700'} mt-2 leading-relaxed`}>
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {education.length > 0 && (
          <div>
            <h3 className={`text-xs sm:text-sm font-bold uppercase tracking-wider mb-3 ${isDark ? 'text-gray-300' : 'text-gray-900'} border-b ${isDark ? 'border-gray-700' : 'border-gray-300'} pb-1`}>
              {t.academicEducation}
            </h3>
            <div className="space-y-2 sm:space-y-3">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                    <div className="min-w-0 flex-1">
                      <p className={`text-sm sm:text-base font-bold ${isDark ? 'text-white' : 'text-gray-900'} truncate`}>
                        {edu.degree} {edu.field && `- ${edu.field}`}
                      </p>
                      <p className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} truncate`}>
                        {edu.institution}
                      </p>
                    </div>
                    <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} whitespace-nowrap flex-shrink-0`}>
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {skills.length > 0 && (
          <div>
            <h3 className={`text-xs sm:text-sm font-bold uppercase tracking-wider mb-3 ${isDark ? 'text-gray-300' : 'text-gray-900'} border-b ${isDark ? 'border-gray-700' : 'border-gray-300'} pb-1`}>
              {t.skillsLabel}
            </h3>
            <p className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
              {skills.join(' • ')}
            </p>
          </div>
        )}
        
        {!basics.fullName && experiences.length === 0 && education.length === 0 && skills.length === 0 && (
          <div className={`text-center py-8 ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
            <p className="text-xs sm:text-sm">Preencha os dados para ver o preview</p>
          </div>
        )}
      </div>
    </div>
  );

  // Template: Tech/Developer
  const renderTech = () => (
    <div className={`shadow-lg rounded-lg overflow-hidden w-full max-w-[600px] ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header com estilo tech */}
      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-4 sm:p-6 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex items-center gap-3 sm:gap-4">
          {photo && (
            <div className="relative flex-shrink-0">
              <img 
                src={photo} 
                alt="" 
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg object-cover" 
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4 text-green-500 flex-shrink-0" />
              <h1 className={`text-lg sm:text-xl font-mono font-bold ${isDark ? 'text-white' : 'text-gray-900'} truncate`}>
                {basics.fullName || 'dev_name'}
              </h1>
            </div>
            <p className={`text-xs sm:text-sm font-mono ${isDark ? 'text-green-400' : 'text-green-600'} mt-1 truncate`}>
              {basics.headline || '// your_role'}
            </p>
          </div>
        </div>
        <div className={`flex flex-wrap gap-2 sm:gap-3 mt-3 sm:mt-4 text-xs font-mono ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          {basics.email && (
            <span className="flex items-center gap-1 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded truncate">
              <Mail className="w-3 h-3 text-green-500 flex-shrink-0" />
              <span className="truncate">{basics.email}</span>
            </span>
          )}
          {basics.phone && (
            <span className="flex items-center gap-1 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded truncate">
              <Phone className="w-3 h-3 text-green-500 flex-shrink-0" />
              <span className="truncate">{basics.phone}</span>
            </span>
          )}
          {basics.github && (
            <span className="flex items-center gap-1 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded truncate">
              <Github className="w-3 h-3 text-green-500 flex-shrink-0" />
              <span className="truncate">{basics.github}</span>
            </span>
          )}
        </div>
      </div>
      
      <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
        {basics.summary && (
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-3 sm:p-4 rounded-lg border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <p className={`text-xs sm:text-sm font-mono ${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
              {basics.summary}
            </p>
          </div>
        )}
        
        {experiences.length > 0 && (
          <div>
            <h3 className={`text-xs sm:text-sm font-mono font-bold mb-3 ${isDark ? 'text-green-400' : 'text-green-600'}`}>
              {'>'} {t.professionalExperience}
            </h3>
            <div className="space-y-3">
              {experiences.map((exp) => (
                <div key={exp.id} className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-3 rounded-lg border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                    <div className="min-w-0 flex-1">
                      <p className={`text-xs sm:text-sm font-mono font-bold ${isDark ? 'text-white' : 'text-gray-900'} truncate`}>
                        {exp.position}
                      </p>
                      <p className={`text-xs font-mono ${isDark ? 'text-green-400' : 'text-green-600'} truncate`}>
                        @ {exp.company}
                      </p>
                    </div>
                    <span className={`text-xs font-mono ${isDark ? 'text-gray-500' : 'text-gray-500'} whitespace-nowrap flex-shrink-0`}>
                      {formatDate(exp.startDate)} → {exp.current ? 'now' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  {exp.description && (
                    <p className={`text-xs font-mono ${isDark ? 'text-gray-400' : 'text-gray-600'} mt-2 leading-relaxed`}>
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {skills.length > 0 && (
          <div>
            <h3 className={`text-xs sm:text-sm font-mono font-bold mb-3 ${isDark ? 'text-green-400' : 'text-green-600'}`}>
              {'>'} {t.skillsLabel}
            </h3>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className={`font-mono text-xs px-2 py-1 rounded border ${
                    isDark 
                      ? 'bg-green-900/20 text-green-300 border-green-800' 
                      : 'bg-green-50 text-green-700 border-green-200'
                  }`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {projects.length > 0 && (
          <div>
            <h3 className={`text-xs sm:text-sm font-mono font-bold mb-3 ${isDark ? 'text-green-400' : 'text-green-600'}`}>
              {'>'} {t.projectsLabel}
            </h3>
            <div className="space-y-2">
              {projects.map((proj) => (
                <div key={proj.id} className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-3 rounded-lg border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <p className={`text-xs sm:text-sm font-mono font-bold ${isDark ? 'text-white' : 'text-gray-900'} truncate`}>
                    {proj.name}
                  </p>
                  {proj.technologies && (
                    <p className={`text-xs font-mono ${isDark ? 'text-green-400' : 'text-green-600'} truncate`}>
                      [{proj.technologies}]
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {!basics.fullName && experiences.length === 0 && skills.length === 0 && (
          <div className={`text-center py-8 font-mono ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
            <p className="text-xs sm:text-sm">// fill_data_to_preview()</p>
          </div>
        )}
      </div>
    </div>
  );

  // Template: Compacto (Uma página)
  const renderCompact = () => (
    <div className={`shadow-lg rounded-lg overflow-hidden w-full max-w-[600px] ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
      {/* Header compacto */}
      <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-100'} px-4 py-3`}>
        <div className="flex items-center gap-3">
          {photo && (
            <img 
              src={photo} 
              alt="" 
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0" 
            />
          )}
          <div className="flex-1 min-w-0">
            <h1 className={`text-base sm:text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'} truncate`}>
              {basics.fullName || 'Seu Nome'}
            </h1>
            <p className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'} truncate`}>
              {basics.headline || 'Seu Cargo'}
            </p>
          </div>
        </div>
        <div className={`flex flex-wrap gap-x-3 gap-y-1 mt-2 text-[10px] sm:text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          {basics.email && <span className="truncate">{basics.email}</span>}
          {basics.phone && <span className="truncate">{basics.phone}</span>}
          {basics.location && <span className="truncate">{basics.location}</span>}
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        {basics.summary && (
          <p className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed line-clamp-3`}>
            {basics.summary}
          </p>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Coluna esquerda */}
          <div className="space-y-3">
            {experiences.length > 0 && (
              <div>
                <h3 className={`text-xs font-bold uppercase mb-2 ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                  {t.experience}
                </h3>
                <div className="space-y-2">
                  {experiences.slice(0, 3).map((exp) => (
                    <div key={exp.id}>
                      <p className={`text-xs font-semibold ${isDark ? 'text-gray-200' : 'text-gray-900'} truncate`}>
                        {exp.position}
                      </p>
                      <p className={`text-[10px] ${isDark ? 'text-gray-400' : 'text-gray-600'} truncate`}>
                        {exp.company} | {formatDate(exp.startDate)} - {exp.current ? 'Atual' : formatDate(exp.endDate)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {education.length > 0 && (
              <div>
                <h3 className={`text-xs font-bold uppercase mb-2 ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                  {t.education}
                </h3>
                <div className="space-y-1">
                  {education.slice(0, 2).map((edu) => (
                    <div key={edu.id}>
                      <p className={`text-xs font-semibold ${isDark ? 'text-gray-200' : 'text-gray-900'} truncate`}>
                        {edu.degree}
                      </p>
                      <p className={`text-[10px] ${isDark ? 'text-gray-400' : 'text-gray-600'} truncate`}>
                        {edu.institution}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Coluna direita */}
          <div className="space-y-3">
            {skills.length > 0 && (
              <div>
                <h3 className={`text-xs font-bold uppercase mb-2 ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                  {t.skillsLabel}
                </h3>
                <div className="flex flex-wrap gap-1">
                  {skills.slice(0, 12).map((skill, index) => (
                    <span
                      key={index}
                      className={`text-[10px] px-1.5 py-0.5 rounded ${
                        isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {projects.length > 0 && (
              <div>
                <h3 className={`text-xs font-bold uppercase mb-2 ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>
                  {t.projectsLabel}
                </h3>
                <div className="space-y-1">
                  {projects.slice(0, 2).map((proj) => (
                    <div key={proj.id}>
                      <p className={`text-xs font-semibold ${isDark ? 'text-gray-200' : 'text-gray-900'} truncate`}>
                        {proj.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {!basics.fullName && experiences.length === 0 && skills.length === 0 && (
          <div className={`text-center py-8 ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
            <p className="text-xs">Preencha os dados</p>
          </div>
        )}
      </div>
    </div>
  );

  // Template: Criativo Colorido
  const renderCreative = () => (
    <div className={`shadow-lg rounded-lg overflow-hidden w-full max-w-[600px] ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
      {/* Header com gradiente colorido */}
      <div className="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 text-white p-4 sm:p-6">
        <div className="flex items-center gap-3 sm:gap-4">
          {photo && (
            <img 
              src={photo} 
              alt="" 
              className="w-14 h-14 sm:w-20 sm:h-20 rounded-full object-cover border-3 border-white flex-shrink-0 shadow-lg" 
            />
          )}
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-3xl font-bold truncate drop-shadow-lg">
              {basics.fullName || 'Seu Nome'}
            </h1>
            <p className="text-white/90 text-xs sm:text-sm mt-1 truncate">
              {basics.headline || 'Seu Cargo'}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3 mt-3 sm:mt-4 text-xs">
          {basics.email && (
            <span className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full truncate">
              <Mail className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{basics.email}</span>
            </span>
          )}
          {basics.phone && (
            <span className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full truncate">
              <Phone className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{basics.phone}</span>
            </span>
          )}
          {basics.location && (
            <span className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full truncate">
              <MapPin className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{basics.location}</span>
            </span>
          )}
        </div>
      </div>
      
      <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
        {basics.summary && (
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-3 sm:p-4 rounded-lg">
            <p className={`text-xs sm:text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed italic`}>
              "{basics.summary}"
            </p>
          </div>
        )}
        
        {experiences.length > 0 && (
          <div>
            <h3 className="text-xs sm:text-sm font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              {t.professionalExperience}
            </h3>
            <div className="space-y-3">
              {experiences.map((exp) => (
                <div key={exp.id} className="relative pl-4 border-l-2 border-gradient-to-b from-purple-500 to-pink-500">
                  <div className="absolute left-0 top-0 w-2 h-2 bg-purple-500 rounded-full -translate-x-[5px]"></div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                    <div className="min-w-0 flex-1">
                      <p className={`text-xs sm:text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'} truncate`}>
                        {exp.position}
                      </p>
                      <p className="text-xs text-purple-600 font-medium truncate">
                        {exp.company}
                      </p>
                    </div>
                    <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} whitespace-nowrap flex-shrink-0`}>
                      {formatDate(exp.startDate)} - {exp.current ? 'Atual' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  {exp.description && (
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} mt-1 leading-relaxed line-clamp-2`}>
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {skills.length > 0 && (
          <div>
            <h3 className="text-xs sm:text-sm font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              {t.skillsLabel}
            </h3>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="text-xs px-2 sm:px-3 py-1 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {!basics.fullName && experiences.length === 0 && skills.length === 0 && (
          <div className={`text-center py-8 ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
            <p className="text-xs sm:text-sm">✨ Preencha os dados para ver a mágica</p>
          </div>
        )}
      </div>
    </div>
  );

  switch (template) {
    case 'executive': return renderExecutive();
    case 'tech': return renderTech();
    case 'compact': return renderCompact();
    case 'creative': return renderCreative();
    default: return renderModern();
  }
}

export const Preview = memo(PreviewComponent);
