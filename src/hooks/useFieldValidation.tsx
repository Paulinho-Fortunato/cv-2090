import { useState, useEffect, useCallback, ReactNode } from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface ValidationRule {
  test: (value: string) => boolean;
  message: string;
  type: 'error' | 'warning' | 'success';
}

interface UseFieldValidationProps {
  value: string;
  rules?: ValidationRule[];
  validateOnChange?: boolean;
}

export function useFieldValidation({ 
  value, 
  rules = [], 
  validateOnChange = true 
}: UseFieldValidationProps) {
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [message, setMessage] = useState<string>('');
  const [type, setType] = useState<'error' | 'warning' | 'success'>('success');
  const [touched, setTouched] = useState(false);

  const validate = useCallback(() => {
    if (!value.trim()) {
      setIsValid(null);
      setMessage('');
      return;
    }

    for (const rule of rules) {
      if (!rule.test(value)) {
        setIsValid(false);
        setMessage(rule.message);
        setType(rule.type);
        return;
      }
    }

    setIsValid(true);
    setMessage('Válido');
    setType('success');
  }, [value, rules]);

  useEffect(() => {
    if (validateOnChange && touched) {
      validate();
    }
  }, [value, validateOnChange, touched, validate]);

  const handleBlur = () => {
    setTouched(true);
    validate();
  };

  const getBorderColor = () => {
    if (!touched || isValid === null) return 'border-gray-300';
    if (isValid) return 'border-green-500';
    if (type === 'warning') return 'border-yellow-500';
    return 'border-red-500';
  };

  const getIcon = (): ReactNode => {
    if (!touched || isValid === null) return null;
    if (isValid) return <CheckCircle className="w-4 h-4 text-green-500" />;
    if (type === 'warning') return <AlertCircle className="w-4 h-4 text-yellow-500" />;
    return <XCircle className="w-4 h-4 text-red-500" />;
  };

  return {
    isValid,
    message,
    type,
    touched,
    handleBlur,
    getBorderColor,
    getIcon,
  };
}

// Regras de validação comuns
export const validationRules = {
  email: {
    test: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message: 'Email inválido',
    type: 'error' as const,
  },
  phone: {
    test: (value: string) => /^[\d\s\-\+\(\)]{10,}$/.test(value),
    message: 'Telefone inválido (mínimo 10 dígitos)',
    type: 'error' as const,
  },
  required: {
    test: (value: string) => value.trim().length > 0,
    message: 'Campo obrigatório',
    type: 'error' as const,
  },
  minLength: (min: number) => ({
    test: (value: string) => value.trim().length >= min,
    message: `Mínimo ${min} caracteres`,
    type: 'error' as const,
  }),
  maxLength: (max: number) => ({
    test: (value: string) => value.trim().length <= max,
    message: `Máximo ${max} caracteres`,
    type: 'warning' as const,
  }),
  summary: {
    test: (value: string) => {
      const words = value.trim().split(/\s+/).length;
      return words >= 20 && words <= 100;
    },
    message: 'Resumo deve ter entre 20-100 palavras',
    type: 'warning' as const,
  },
};
