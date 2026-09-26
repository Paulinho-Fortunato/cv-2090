import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';

interface AutoCompleteProps {
  value: string;
  onChange: (value: string) => void;
  suggestions: string[];
  placeholder?: string;
  label?: string;
  maxSuggestions?: number;
}

export function AutoComplete({
  value,
  onChange,
  suggestions,
  placeholder = 'Digite para buscar...',
  label,
  maxSuggestions = 5,
}: AutoCompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (value.trim()) {
      const filtered = suggestions
        .filter(s => s.toLowerCase().includes(value.toLowerCase()))
        .slice(0, maxSuggestions);
      setFilteredSuggestions(filtered);
      setIsOpen(filtered.length > 0);
    } else {
      setFilteredSuggestions([]);
      setIsOpen(false);
    }
    setSelectedIndex(-1);
  }, [value, suggestions, maxSuggestions]);

  const handleSelect = (suggestion: string) => {
    onChange(suggestion);
    setIsOpen(false);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < filteredSuggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && filteredSuggestions[selectedIndex]) {
          handleSelect(filteredSuggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  useEffect(() => {
    if (selectedIndex >= 0 && listRef.current) {
      const items = listRef.current.querySelectorAll('li');
      items[selectedIndex]?.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  return (
    <div className="relative">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => value.trim() && setIsOpen(filteredSuggestions.length > 0)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {value && (
          <button
            onClick={() => onChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {isOpen && filteredSuggestions.length > 0 && (
        <ul
          ref={listRef}
          className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
        >
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={suggestion}
              onClick={() => handleSelect(suggestion)}
              className={`px-4 py-2 cursor-pointer transition-colors ${
                index === selectedIndex
                  ? 'bg-blue-50 text-blue-700'
                  : 'hover:bg-gray-50'
              }`}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Sugestões comuns para cargos
export const jobTitleSuggestions = [
  'Desenvolvedor Front-end',
  'Desenvolvedor Back-end',
  'Desenvolvedor Full Stack',
  'Engenheiro de Software',
  'Arquiteto de Software',
  'DevOps Engineer',
  'Data Scientist',
  'Data Engineer',
  'Product Manager',
  'Product Designer',
  'UX Designer',
  'UI Designer',
  'Analista de Sistemas',
  'Analista de Dados',
  'Gerente de Projetos',
  'Scrum Master',
  'Tech Lead',
  'CTO',
  'CEO',
  'Consultor de TI',
  'Administrador de Sistemas',
  'Analista de Qualidade',
  'QA Engineer',
  'Mobile Developer',
  'iOS Developer',
  'Android Developer',
  'React Developer',
  'Angular Developer',
  'Vue Developer',
  'Node.js Developer',
  'Python Developer',
  'Java Developer',
  'PHP Developer',
  'Ruby Developer',
  'Go Developer',
  'Rust Developer',
];

// Sugestões comuns para habilidades
export const skillSuggestions = [
  'JavaScript',
  'TypeScript',
  'React',
  'Angular',
  'Vue.js',
  'Node.js',
  'Python',
  'Java',
  'PHP',
  'Ruby',
  'Go',
  'Rust',
  'C++',
  'C#',
  'SQL',
  'PostgreSQL',
  'MongoDB',
  'Redis',
  'Docker',
  'Kubernetes',
  'AWS',
  'Azure',
  'Google Cloud',
  'Git',
  'CI/CD',
  'REST API',
  'GraphQL',
  'HTML5',
  'CSS3',
  'SASS',
  'Tailwind CSS',
  'Redux',
  'Next.js',
  'Nuxt.js',
  'Express.js',
  'Django',
  'Flask',
  'Spring Boot',
  'Laravel',
  'Ruby on Rails',
  'Machine Learning',
  'Deep Learning',
  'Data Analysis',
  'Data Visualization',
  'Agile',
  'Scrum',
  'Kanban',
  'TDD',
  'BDD',
  'Microservices',
  'Linux',
  'Bash',
  'PowerShell',
  'Figma',
  'Adobe XD',
  'Photoshop',
  'Illustrator',
  'Communication',
  'Leadership',
  'Problem Solving',
  'Teamwork',
  'English',
  'Spanish',
  'French',
  'German',
  'Portuguese',
];
