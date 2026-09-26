export interface ResumeData {
  basics: Basics;
  experiences: Experience[];
  education: Education[];
  projects: Project[];
  skills: string[];
  photo: string;
}

export interface Basics {
  fullName: string;
  headline: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  website: string;
  linkedin: string;
  github: string;
  // Novos campos
  birthDate: string;
  nationality: string;
  maritalStatus: string;
  // Endereço completo
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  // Redes sociais
  twitter: string;
  instagram: string;
  behance: string;
  dribbble: string;
  medium: string;
  youtube: string;
  // Informações adicionais
  languages: string[];
  interests: string[];
  objectives: string;
  availability: string;
  salaryExpectation: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  url: string;
  technologies: string;
}

export const defaultResumeData: ResumeData = {
  basics: {
    fullName: '',
    headline: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
    website: '',
    linkedin: '',
    github: '',
    // Novos campos
    birthDate: '',
    nationality: '',
    maritalStatus: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    twitter: '',
    instagram: '',
    behance: '',
    dribbble: '',
    medium: '',
    youtube: '',
    languages: [],
    interests: [],
    objectives: '',
    availability: '',
    salaryExpectation: '',
  },
  experiences: [],
  education: [],
  projects: [],
  skills: [],
  photo: '',
};

export type TemplateId = 'modern' | 'executive' | 'tech' | 'compact' | 'creative';

export type Language = 'pt' | 'en' | 'es';

export interface Translations {
  basics: string;
  experience: string;
  education: string;
  skillsSection: string;
  projectsSection: string;
  downloadPdf: string;
  clearAll: string;
  export: string;
  import: string;
  fullName: string;
  headline: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  website: string;
  linkedin: string;
  github: string;
  // Novos campos
  birthDate: string;
  nationality: string;
  maritalStatus: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  twitter: string;
  instagram: string;
  behance: string;
  dribbble: string;
  medium: string;
  youtube: string;
  languages: string;
  interests: string;
  objectives: string;
  availability: string;
  salaryExpectation: string;
  personalInfo: string;
  address: string;
  socialMedia: string;
  additionalInfo: string;
  // Fim novos campos
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: string;
  description: string;
  institution: string;
  degree: string;
  field: string;
  add: string;
  save: string;
  cancel: string;
  confirm: string;
  delete: string;
  professionalSummary: string;
  professionalExperience: string;
  academicEducation: string;
  projectsLabel: string;
  skillsLabel: string;
  progress: string;
  atsScore: string;
  print: string;
  share: string;
  copied: string;
  saved: string;
  darkMode: string;
  lightMode: string;
  language: string;
  template: string;
  photo: string;
  uploadPhoto: string;
  removePhoto: string;
  projectName: string;
  projectUrl: string;
  technologies: string;
  tip: string;
}

export const translations: Record<Language, Translations> = {
  pt: {
    basics: 'Dados Pessoais',
    experience: 'Experiência',
    education: 'Educação',
    skillsSection: 'Habilidades',
    projectsSection: 'Projetos',
    downloadPdf: 'Baixar PDF',
    clearAll: 'Limpar Tudo',
    export: 'Exportar',
    import: 'Importar',
    fullName: 'Nome Completo',
    headline: 'Cargo Desejado',
    email: 'Email',
    phone: 'Telefone',
    location: 'Localização',
    summary: 'Resumo Profissional',
    website: 'Website',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    birthDate: 'Data de Nascimento',
    nationality: 'Nacionalidade',
    maritalStatus: 'Estado Civil',
    street: 'Rua',
    city: 'Cidade',
    state: 'Estado',
    zipCode: 'CEP',
    country: 'País',
    twitter: 'Twitter/X',
    instagram: 'Instagram',
    behance: 'Behance',
    dribbble: 'Dribbble',
    medium: 'Medium',
    youtube: 'YouTube',
    languages: 'Idiomas',
    interests: 'Interesses',
    objectives: 'Objetivos',
    availability: 'Disponibilidade',
    salaryExpectation: 'Pretensão Salarial',
    personalInfo: 'Informações Pessoais',
    address: 'Endereço',
    socialMedia: 'Redes Sociais',
    additionalInfo: 'Informações Adicionais',
    company: 'Empresa',
    position: 'Cargo',
    startDate: 'Data de Início',
    endDate: 'Data de Término',
    current: 'Trabalho aqui atualmente',
    description: 'Descrição',
    institution: 'Instituição',
    degree: 'Grau',
    field: 'Área de Estudo',
    add: 'Adicionar',
    save: 'Salvar',
    cancel: 'Cancelar',
    confirm: 'Confirmar',
    delete: 'Excluir',
    professionalSummary: 'Resumo Profissional',
    professionalExperience: 'Experiência Profissional',
    academicEducation: 'Formação Acadêmica',
    projectsLabel: 'Projetos',
    skillsLabel: 'Habilidades',
    progress: 'Progresso',
    atsScore: 'Pontuação ATS',
    print: 'Imprimir',
    share: 'Compartilhar',
    copied: 'Link copiado!',
    saved: 'Salvo automaticamente',
    darkMode: 'Modo Escuro',
    lightMode: 'Modo Claro',
    language: 'Idioma',
    template: 'Template',
    photo: 'Foto',
    uploadPhoto: 'Enviar Foto',
    removePhoto: 'Remover Foto',
    projectName: 'Nome do Projeto',
    projectUrl: 'URL do Projeto',
    technologies: 'Tecnologias',
    tip: 'Dica',
  },
  en: {
    basics: 'Personal Info',
    experience: 'Experience',
    education: 'Education',
    skillsSection: 'Skills',
    projectsSection: 'Projects',
    downloadPdf: 'Download PDF',
    clearAll: 'Clear All',
    export: 'Export',
    import: 'Import',
    fullName: 'Full Name',
    headline: 'Job Title',
    email: 'Email',
    phone: 'Phone',
    location: 'Location',
    summary: 'Professional Summary',
    website: 'Website',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    birthDate: 'Date of Birth',
    nationality: 'Nationality',
    maritalStatus: 'Marital Status',
    street: 'Street',
    city: 'City',
    state: 'State',
    zipCode: 'ZIP Code',
    country: 'Country',
    twitter: 'Twitter/X',
    instagram: 'Instagram',
    behance: 'Behance',
    dribbble: 'Dribbble',
    medium: 'Medium',
    youtube: 'YouTube',
    languages: 'Languages',
    interests: 'Interests',
    objectives: 'Objectives',
    availability: 'Availability',
    salaryExpectation: 'Salary Expectation',
    personalInfo: 'Personal Information',
    address: 'Address',
    socialMedia: 'Social Media',
    additionalInfo: 'Additional Information',
    company: 'Company',
    position: 'Position',
    startDate: 'Start Date',
    endDate: 'End Date',
    current: 'I currently work here',
    description: 'Description',
    institution: 'Institution',
    degree: 'Degree',
    field: 'Field of Study',
    add: 'Add',
    save: 'Save',
    cancel: 'Cancel',
    confirm: 'Confirm',
    delete: 'Delete',
    professionalSummary: 'Professional Summary',
    professionalExperience: 'Professional Experience',
    academicEducation: 'Academic Education',
    projectsLabel: 'Projects',
    skillsLabel: 'Skills',
    progress: 'Progress',
    atsScore: 'ATS Score',
    print: 'Print',
    share: 'Share',
    copied: 'Link copied!',
    saved: 'Auto-saved',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    language: 'Language',
    template: 'Template',
    photo: 'Photo',
    uploadPhoto: 'Upload Photo',
    removePhoto: 'Remove Photo',
    projectName: 'Project Name',
    projectUrl: 'Project URL',
    technologies: 'Technologies',
    tip: 'Tip',
  },
  es: {
    basics: 'Datos Personales',
    experience: 'Experiencia',
    education: 'Educación',
    skillsSection: 'Habilidades',
    projectsSection: 'Proyectos',
    downloadPdf: 'Descargar PDF',
    clearAll: 'Limpiar Todo',
    export: 'Exportar',
    import: 'Importar',
    fullName: 'Nombre Completo',
    headline: 'Cargo Deseado',
    email: 'Email',
    phone: 'Teléfono',
    location: 'Ubicación',
    summary: 'Resumen Profesional',
    website: 'Sitio Web',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    birthDate: 'Fecha de Nacimiento',
    nationality: 'Nacionalidad',
    maritalStatus: 'Estado Civil',
    street: 'Calle',
    city: 'Ciudad',
    state: 'Estado',
    zipCode: 'Código Postal',
    country: 'País',
    twitter: 'Twitter/X',
    instagram: 'Instagram',
    behance: 'Behance',
    dribbble: 'Dribbble',
    medium: 'Medium',
    youtube: 'YouTube',
    languages: 'Idiomas',
    interests: 'Intereses',
    objectives: 'Objetivos',
    availability: 'Disponibilidad',
    salaryExpectation: 'Expectativa Salarial',
    personalInfo: 'Información Personal',
    address: 'Dirección',
    socialMedia: 'Redes Sociales',
    additionalInfo: 'Información Adicional',
    company: 'Empresa',
    position: 'Cargo',
    startDate: 'Fecha de Inicio',
    endDate: 'Fecha de Término',
    current: 'Trabajo aquí actualmente',
    description: 'Descripción',
    institution: 'Institución',
    degree: 'Grado',
    field: 'Área de Estudio',
    add: 'Agregar',
    save: 'Guardar',
    cancel: 'Cancelar',
    confirm: 'Confirmar',
    delete: 'Eliminar',
    professionalSummary: 'Resumen Profesional',
    professionalExperience: 'Experiencia Profesional',
    academicEducation: 'Formación Académica',
    projectsLabel: 'Proyectos',
    skillsLabel: 'Habilidades',
    progress: 'Progreso',
    atsScore: 'Puntuación ATS',
    print: 'Imprimir',
    share: 'Compartir',
    copied: '¡Enlace copiado!',
    saved: 'Guardado automáticamente',
    darkMode: 'Modo Oscuro',
    lightMode: 'Modo Claro',
    language: 'Idioma',
    template: 'Plantilla',
    photo: 'Foto',
    uploadPhoto: 'Subir Foto',
    removePhoto: 'Eliminar Foto',
    projectName: 'Nombre del Proyecto',
    projectUrl: 'URL del Proyecto',
    technologies: 'Tecnologías',
    tip: 'Consejo',
  },
};
