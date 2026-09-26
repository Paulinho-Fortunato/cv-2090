import { useCallback } from 'react';
import { User, Mail, Phone, MapPin, FileText, Briefcase, Globe, Link2, Camera, X, Info } from 'lucide-react';
import { useResumeStore } from '../../../lib/store';
import { translations } from '../../../types/resume';

export function BasicsForm() {
  const basics = useResumeStore((state) => state.resumeData.basics);
  const photo = useResumeStore((state) => state.resumeData.photo);
  const updateBasics = useResumeStore((state) => state.updateBasics);
  const setPhoto = useResumeStore((state) => state.setPhoto);
  const language = useResumeStore((state) => state.language);
  const theme = useResumeStore((state) => state.theme);

  const t = translations[language];
  const isDark = theme === 'dark';

  const handleChange = useCallback((field: string, value: string) => {
    updateBasics({ [field]: value });
  }, [updateBasics]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhoto(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const inputClass = `w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
    isDark ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' : 'border-gray-300'
  }`;
  const labelClass = `block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`;

  const tips: Record<string, string> = {
    fullName: language === 'pt' ? 'Use seu nome completo como aparece em documentos oficiais' : 'Use your full name as it appears on official documents',
    headline: language === 'pt' ? 'Ex: Desenvolvedor Full Stack, Designer UX, Gerente de Projetos' : 'Ex: Full Stack Developer, UX Designer, Project Manager',
    summary: language === 'pt' ? 'Máximo 3-4 linhas destacando suas principais conquistas e habilidades' : 'Max 3-4 lines highlighting your main achievements and skills',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <User className="w-5 h-5 text-blue-600" />
        <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{t.basics}</h2>
      </div>

      {/* Photo Upload */}
      <div>
        <label className={labelClass}>{t.photo}</label>
        <div className="flex items-center gap-4">
          {photo ? (
            <div className="relative">
              <img src={photo} alt="" className="w-16 h-16 rounded-full object-cover border-2 border-blue-200" />
              <button
                onClick={() => setPhoto('')}
                className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div className={`w-16 h-16 rounded-full border-2 border-dashed flex items-center justify-center ${isDark ? 'border-gray-600' : 'border-gray-300'}`}>
              <Camera className={`w-5 h-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
            </div>
          )}
          <label className={`cursor-pointer px-4 py-2 rounded-lg text-sm font-medium border ${
            isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-800' : 'border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}>
            {t.uploadPhoto}
            <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>
            {t.fullName}
            <span className="inline-flex ml-1 group relative">
              <Info className="w-3.5 h-3.5 text-gray-400 cursor-help" />
              <span className="absolute bottom-full left-0 mb-2 hidden group-hover:block w-48 p-2 text-xs bg-gray-900 text-white rounded shadow-lg z-10">
                {tips.fullName}
              </span>
            </span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={basics.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              className={inputClass}
              placeholder="João Silva"
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>
            {t.headline}
            <span className="inline-flex ml-1 group relative">
              <Info className="w-3.5 h-3.5 text-gray-400 cursor-help" />
              <span className="absolute bottom-full left-0 mb-2 hidden group-hover:block w-48 p-2 text-xs bg-gray-900 text-white rounded shadow-lg z-10">
                {tips.headline}
              </span>
            </span>
          </label>
          <div className="relative">
            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={basics.headline}
              onChange={(e) => handleChange('headline', e.target.value)}
              className={inputClass}
              placeholder="Desenvolvedor Full Stack"
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>{t.email}</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="email"
              value={basics.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className={inputClass}
              placeholder="joao@email.com"
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>{t.phone}</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={basics.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className={inputClass}
              placeholder="(11) 99999-9999"
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>{t.location}</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={basics.location}
              onChange={(e) => handleChange('location', e.target.value)}
              className={inputClass}
              placeholder="São Paulo, SP - Brasil"
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>{t.website}</label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={basics.website}
              onChange={(e) => handleChange('website', e.target.value)}
              className={inputClass}
              placeholder="www.seusite.com"
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>{t.linkedin}</label>
          <div className="relative">
            <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={basics.linkedin}
              onChange={(e) => handleChange('linkedin', e.target.value)}
              className={inputClass}
              placeholder="linkedin.com/in/seu-perfil"
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>{t.github}</label>
          <div className="relative">
            <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={basics.github}
              onChange={(e) => handleChange('github', e.target.value)}
              className={inputClass}
              placeholder="github.com/seu-usuario"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className={labelClass}>
            {t.summary}
            <span className="inline-flex ml-1 group relative">
              <Info className="w-3.5 h-3.5 text-gray-400 cursor-help" />
              <span className="absolute bottom-full left-0 mb-2 hidden group-hover:block w-64 p-2 text-xs bg-gray-900 text-white rounded shadow-lg z-10">
                {tips.summary}
              </span>
            </span>
          </label>
          <div className="relative">
            <FileText className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <textarea
              value={basics.summary}
              onChange={(e) => handleChange('summary', e.target.value)}
              rows={4}
              className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none ${
                isDark ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' : 'border-gray-300'
              }`}
              placeholder={language === 'pt' ? 'Descreva brevemente sua experiência e objetivos...' : 'Briefly describe your experience and goals...'}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
