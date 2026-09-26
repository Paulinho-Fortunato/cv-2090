import { useCallback, useMemo, useState } from 'react';
import { User, Mail, Phone, MapPin, FileText, Briefcase, Globe, Link2, Camera, X, Info, Calendar, Flag, Heart, Home, Twitter, Instagram, Youtube, Target, DollarSign, Languages, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { useResumeStore } from '../../../lib/store';
import { translations } from '../../../types/resume';
import { useShallow } from 'zustand/react/shallow';

export function BasicsForm() {
  const { basics, photo, language, theme } = useResumeStore(
    useShallow((state) => ({
      basics: state.resumeData.basics,
      photo: state.resumeData.photo,
      language: state.language,
      theme: state.theme,
    }))
  );
  
  const updateBasics = useResumeStore((state) => state.updateBasics);
  const setPhoto = useResumeStore((state) => state.setPhoto);

  const t = translations[language];
  const isDark = theme === 'dark';

  // Estados para controlar seções colapsáveis
  const [expandedSections, setExpandedSections] = useState({
    personal: true,
    address: false,
    social: false,
    additional: false,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleChange = useCallback((field: string, value: string) => {
    updateBasics({ [field]: value });
  }, [updateBasics]);

  const handleArrayChange = useCallback((field: 'languages' | 'interests', value: string) => {
    const items = value.split(',').map(s => s.trim()).filter(s => s.length > 0);
    updateBasics({ [field]: items });
  }, [updateBasics]);

  const handlePhotoUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhoto(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [setPhoto]);

  const inputClass = useMemo(() => `w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
    isDark ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' : 'border-gray-300'
  }`, [isDark]);
  
  const labelClass = useMemo(() => `block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`, [isDark]);

  const sectionHeaderClass = useMemo(() => `flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
    isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'
  }`, [isDark]);

  const tips = useMemo(() => ({
    fullName: language === 'pt' ? 'Use seu nome completo como aparece em documentos oficiais' : 'Use your full name as it appears on official documents',
    headline: language === 'pt' ? 'Ex: Desenvolvedor Full Stack, Designer UX, Gerente de Projetos' : 'Ex: Full Stack Developer, UX Designer, Project Manager',
    summary: language === 'pt' ? 'Máximo 3-4 linhas destacando suas principais conquistas e habilidades' : 'Max 3-4 lines highlighting your main achievements and skills',
    languages: language === 'pt' ? 'Separe os idiomas por vírgula. Ex: Português, Inglês, Espanhol' : 'Separate languages by comma. Ex: Portuguese, English, Spanish',
    interests: language === 'pt' ? 'Separe os interesses por vírgula. Ex: Tecnologia, Design, Música' : 'Separate interests by comma. Ex: Technology, Design, Music',
  }), [language]);

  const SectionHeader = ({ title, icon: Icon, section }: { title: string; icon: any; section: keyof typeof expandedSections }) => (
    <div className={sectionHeaderClass} onClick={() => toggleSection(section)}>
      <div className="flex items-center gap-2">
        <Icon className="w-5 h-5 text-blue-600" />
        <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
      </div>
      {expandedSections[section] ? (
        <ChevronUp className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
      ) : (
        <ChevronDown className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
      )}
    </div>
  );

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

      {/* Informações Básicas */}
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

      {/* Informações Pessoais */}
      <div className="space-y-4">
        <SectionHeader title={t.personalInfo} icon={Heart} section="personal" />
        {expandedSections.personal && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg ${isDark ? 'border-gray-700' : 'border-gray-200'}">
            <div>
              <label className={labelClass}>{t.birthDate}</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="date"
                  value={basics.birthDate}
                  onChange={(e) => handleChange('birthDate', e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>{t.nationality}</label>
              <div className="relative">
                <Flag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  value={basics.nationality}
                  onChange={(e) => handleChange('nationality', e.target.value)}
                  className={inputClass}
                  placeholder="Brasileiro(a)"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>{t.maritalStatus}</label>
              <div className="relative">
                <Heart className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  value={basics.maritalStatus}
                  onChange={(e) => handleChange('maritalStatus', e.target.value)}
                  className={inputClass}
                >
                  <option value="">Selecione...</option>
                  <option value="Solteiro(a)">Solteiro(a)</option>
                  <option value="Casado(a)">Casado(a)</option>
                  <option value="Divorciado(a)">Divorciado(a)</option>
                  <option value="Viúvo(a)">Viúvo(a)</option>
                  <option value="União Estável">União Estável</option>
                  <option value="Prefiro não informar">Prefiro não informar</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Endereço Completo */}
      <div className="space-y-4">
        <SectionHeader title={t.address} icon={Home} section="address" />
        {expandedSections.address && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg ${isDark ? 'border-gray-700' : 'border-gray-200'}">
            <div className="md:col-span-2">
              <label className={labelClass}>{t.street}</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  value={basics.street}
                  onChange={(e) => handleChange('street', e.target.value)}
                  className={inputClass}
                  placeholder="Rua das Flores, 123"
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>{t.city}</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  value={basics.city}
                  onChange={(e) => handleChange('city', e.target.value)}
                  className={inputClass}
                  placeholder="São Paulo"
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>{t.state}</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  value={basics.state}
                  onChange={(e) => handleChange('state', e.target.value)}
                  className={inputClass}
                  placeholder="SP"
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>{t.zipCode}</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  value={basics.zipCode}
                  onChange={(e) => handleChange('zipCode', e.target.value)}
                  className={inputClass}
                  placeholder="01234-567"
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>{t.country}</label>
              <div className="relative">
                <Flag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  value={basics.country}
                  onChange={(e) => handleChange('country', e.target.value)}
                  className={inputClass}
                  placeholder="Brasil"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Redes Sociais */}
      <div className="space-y-4">
        <SectionHeader title={t.socialMedia} icon={Twitter} section="social" />
        {expandedSections.social && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg ${isDark ? 'border-gray-700' : 'border-gray-200'}">
            <div>
              <label className={labelClass}>{t.twitter}</label>
              <div className="relative">
                <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  value={basics.twitter}
                  onChange={(e) => handleChange('twitter', e.target.value)}
                  className={inputClass}
                  placeholder="@seuusuario"
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>{t.instagram}</label>
              <div className="relative">
                <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  value={basics.instagram}
                  onChange={(e) => handleChange('instagram', e.target.value)}
                  className={inputClass}
                  placeholder="@seuusuario"
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>{t.behance}</label>
              <div className="relative">
                <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  value={basics.behance}
                  onChange={(e) => handleChange('behance', e.target.value)}
                  className={inputClass}
                  placeholder="behance.net/seuusuario"
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>{t.dribbble}</label>
              <div className="relative">
                <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  value={basics.dribbble}
                  onChange={(e) => handleChange('dribbble', e.target.value)}
                  className={inputClass}
                  placeholder="dribbble.com/seuusuario"
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>{t.medium}</label>
              <div className="relative">
                <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  value={basics.medium}
                  onChange={(e) => handleChange('medium', e.target.value)}
                  className={inputClass}
                  placeholder="medium.com/@seuusuario"
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>{t.youtube}</label>
              <div className="relative">
                <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  value={basics.youtube}
                  onChange={(e) => handleChange('youtube', e.target.value)}
                  className={inputClass}
                  placeholder="youtube.com/@seucanal"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Informações Adicionais */}
      <div className="space-y-4">
        <SectionHeader title={t.additionalInfo} icon={Sparkles} section="additional" />
        {expandedSections.additional && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg ${isDark ? 'border-gray-700' : 'border-gray-200'}">
            <div className="md:col-span-2">
              <label className={labelClass}>
                {t.languages}
                <span className="inline-flex ml-1 group relative">
                  <Info className="w-3.5 h-3.5 text-gray-400 cursor-help" />
                  <span className="absolute bottom-full left-0 mb-2 hidden group-hover:block w-64 p-2 text-xs bg-gray-900 text-white rounded shadow-lg z-10">
                    {tips.languages}
                  </span>
                </span>
              </label>
              <div className="relative">
                <Languages className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  value={basics.languages.join(', ')}
                  onChange={(e) => handleArrayChange('languages', e.target.value)}
                  className={inputClass}
                  placeholder="Português, Inglês, Espanhol"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>
                {t.interests}
                <span className="inline-flex ml-1 group relative">
                  <Info className="w-3.5 h-3.5 text-gray-400 cursor-help" />
                  <span className="absolute bottom-full left-0 mb-2 hidden group-hover:block w-64 p-2 text-xs bg-gray-900 text-white rounded shadow-lg z-10">
                    {tips.interests}
                  </span>
                </span>
              </label>
              <div className="relative">
                <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  value={basics.interests.join(', ')}
                  onChange={(e) => handleArrayChange('interests', e.target.value)}
                  className={inputClass}
                  placeholder="Tecnologia, Design, Música"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>{t.objectives}</label>
              <div className="relative">
                <Target className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <textarea
                  value={basics.objectives}
                  onChange={(e) => handleChange('objectives', e.target.value)}
                  rows={3}
                  className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none ${
                    isDark ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' : 'border-gray-300'
                  }`}
                  placeholder={language === 'pt' ? 'Descreva seus objetivos profissionais...' : 'Describe your professional goals...'}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>{t.availability}</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  value={basics.availability}
                  onChange={(e) => handleChange('availability', e.target.value)}
                  className={inputClass}
                >
                  <option value="">Selecione...</option>
                  <option value="Imediata">Imediata</option>
                  <option value="15 dias">15 dias</option>
                  <option value="30 dias">30 dias</option>
                  <option value="A combinar">A combinar</option>
                </select>
              </div>
            </div>

            <div>
              <label className={labelClass}>{t.salaryExpectation}</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  value={basics.salaryExpectation}
                  onChange={(e) => handleChange('salaryExpectation', e.target.value)}
                  className={inputClass}
                  placeholder="R$ 5.000,00"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
