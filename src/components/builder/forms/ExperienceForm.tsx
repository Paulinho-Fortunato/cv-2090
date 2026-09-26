import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Briefcase, Plus, Trash2, Building2, Calendar } from 'lucide-react';
import { useResumeStore } from '../../../lib/store';
import { useEffect } from 'react';

const experienceSchema = z.object({
  experiences: z.array(
    z.object({
      id: z.string(),
      company: z.string().min(1, 'Empresa é obrigatória'),
      position: z.string().min(1, 'Cargo é obrigatório'),
      startDate: z.string().min(1, 'Data de início é obrigatória'),
      endDate: z.string(),
      current: z.boolean(),
      description: z.string(),
    })
  ),
});

type ExperienceFormData = z.infer<typeof experienceSchema>;

export function ExperienceForm() {
  const { experiences, addExperience, updateExperience, removeExperience } =
    useResumeStore((state) => ({
      experiences: state.data.experiences,
      addExperience: state.addExperience,
      updateExperience: state.updateExperience,
      removeExperience: state.removeExperience,
    }));

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ExperienceFormData>({
    resolver: zodResolver(experienceSchema),
    defaultValues: { experiences },
  });

  const { fields } = useFieldArray({
    control,
    name: 'experiences',
  });

  useEffect(() => {
    reset({ experiences });
  }, [experiences, reset]);

  const onSubmit = (data: ExperienceFormData) => {
    data.experiences.forEach((exp) => {
      updateExperience(exp.id, exp);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Briefcase className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-900">Experiência Profissional</h2>
        </div>
        <button
          type="button"
          onClick={addExperience}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          Adicionar
        </button>
      </div>

      {fields.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <Briefcase className="w-10 h-10 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500">Nenhuma experiência adicionada</p>
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
              Experiência #{index + 1}
            </span>
            <button
              type="button"
              onClick={() => removeExperience(field.id)}
              className="text-red-500 hover:text-red-700 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Empresa
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  {...register(`experiences.${index}.company` as const)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nome da empresa"
                />
              </div>
              {errors.experiences?.[index]?.company && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.experiences[index]?.company?.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cargo
              </label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  {...register(`experiences.${index}.position` as const)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Seu cargo"
                />
              </div>
              {errors.experiences?.[index]?.position && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.experiences[index]?.position?.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Data de Início
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  {...register(`experiences.${index}.startDate` as const)}
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
                  {...register(`experiences.${index}.endDate` as const)}
                  type="month"
                  disabled={field.current}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center gap-2">
                <input
                  {...register(`experiences.${index}.current` as const)}
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Trabalho aqui atualmente</span>
              </label>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descrição
              </label>
              <textarea
                {...register(`experiences.${index}.description` as const)}
                rows={3}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Descreva suas responsabilidades e conquistas..."
              />
            </div>
          </div>
        </div>
      ))}

      {fields.length > 0 && (
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Salvar Experiências
        </button>
      )}
    </form>
  );
}
