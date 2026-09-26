import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { GraduationCap, Plus, Trash2, Building2, Calendar, BookOpen } from 'lucide-react';
import { useResumeStore } from '../../../lib/store';
import { useEffect } from 'react';

const educationSchema = z.object({
  education: z.array(
    z.object({
      id: z.string(),
      institution: z.string().min(1, 'Instituição é obrigatória'),
      degree: z.string().min(1, 'Grau é obrigatório'),
      field: z.string(),
      startDate: z.string().min(1, 'Data de início é obrigatória'),
      endDate: z.string(),
    })
  ),
});

type EducationFormData = z.infer<typeof educationSchema>;

export function EducationForm() {
  const { education, addEducation, updateEducation, removeEducation } =
    useResumeStore((state) => ({
      education: state.data.education,
      addEducation: state.addEducation,
      updateEducation: state.updateEducation,
      removeEducation: state.removeEducation,
    }));

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<EducationFormData>({
    resolver: zodResolver(educationSchema),
    defaultValues: { education },
  });

  const { fields } = useFieldArray({
    control,
    name: 'education',
  });

  useEffect(() => {
    reset({ education });
  }, [education, reset]);

  const onSubmit = (data: EducationFormData) => {
    data.education.forEach((edu) => {
      updateEducation(edu.id, edu);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <GraduationCap className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-900">Formação Acadêmica</h2>
        </div>
        <button
          type="button"
          onClick={addEducation}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          Adicionar
        </button>
      </div>

      {fields.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <GraduationCap className="w-10 h-10 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500">Nenhuma formação adicionada</p>
          <p className="text-sm text-gray-400 mt-1">Clique em "Adicionar" para começar</p>
        </div>
      )}

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="bg-white border border-gray-200 rounded-lg p-4 space-y-4"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">
              Formação #{index + 1}
            </span>
            <button
              type="button"
              onClick={() => removeEducation(field.id)}
              className="text-red-500 hover:text-red-700 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Instituição
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  {...register(`education.${index}.institution` as const)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Universidade / Instituição"
                />
              </div>
              {errors.education?.[index]?.institution && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.education[index]?.institution?.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Grau
              </label>
              <div className="relative">
                <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  {...register(`education.${index}.degree` as const)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Bacharelado, Mestrado, etc."
                />
              </div>
              {errors.education?.[index]?.degree && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.education[index]?.degree?.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Área de Estudo
              </label>
              <div className="relative">
                <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  {...register(`education.${index}.field` as const)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ciência da Computação"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Data de Início
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  {...register(`education.${index}.startDate` as const)}
                  type="month"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Data de Término
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  {...register(`education.${index}.endDate` as const)}
                  type="month"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      {fields.length > 0 && (
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Salvar Formação
        </button>
      )}
    </form>
  );
}
