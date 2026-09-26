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
