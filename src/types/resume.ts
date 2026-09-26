export interface Basics {
  fullName: string;
  headline: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
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

export interface ResumeData {
  basics: Basics;
  experiences: Experience[];
  education: Education[];
  skills: string[];
}

export const defaultResumeData: ResumeData = {
  basics: {
    fullName: '',
    headline: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
  },
  experiences: [],
  education: [],
  skills: [],
};
