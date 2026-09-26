import { useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Eye, EyeOff, Edit2, Check, X } from 'lucide-react';
import { useResumeStore } from '../../lib/store';
import { SectionConfig } from '../../types/resume';

interface SortableSectionProps {
  section: SectionConfig;
  onToggle: (id: string) => void;
  onUpdateTitle: (id: string, title: string) => void;
}

function SortableSection({ section, onToggle, onUpdateTitle }: SortableSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(section.title);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleSaveTitle = () => {
    if (editTitle.trim()) {
      onUpdateTitle(section.id, editTitle.trim());
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditTitle(section.title);
    setIsEditing(false);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${
        section.enabled
          ? 'bg-white border-gray-200 hover:border-blue-300'
          : 'bg-gray-50 border-gray-200 opacity-60'
      } ${isDragging ? 'shadow-lg' : ''}`}
    >
      {/* Drag Handle */}
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 touch-none"
        aria-label="Arrastar para reordenar"
      >
        <GripVertical className="w-5 h-5" />
      </button>

      {/* Section Info */}
      <div className="flex-1 min-w-0">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSaveTitle();
                if (e.key === 'Escape') handleCancelEdit();
              }}
              className="flex-1 px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <button
              onClick={handleSaveTitle}
              className="p-1 text-green-600 hover:bg-green-50 rounded"
            >
              <Check className="w-4 h-4" />
            </button>
            <button
              onClick={handleCancelEdit}
              className="p-1 text-gray-600 hover:bg-gray-100 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className={`font-medium ${section.enabled ? 'text-gray-900' : 'text-gray-500'}`}>
              {section.title}
            </span>
            <button
              onClick={() => setIsEditing(true)}
              className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
              title="Editar título"
            >
              <Edit2 className="w-3 h-3" />
            </button>
          </div>
        )}
        <p className="text-xs text-gray-500 mt-1">
          {section.enabled ? 'Visível no currículo' : 'Oculto do currículo'}
        </p>
      </div>

      {/* Toggle Visibility */}
      <button
        onClick={() => onToggle(section.id)}
        className={`p-2 rounded-lg transition-colors ${
          section.enabled
            ? 'bg-blue-100 text-blue-600 hover:bg-blue-200'
            : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
        }`}
        title={section.enabled ? 'Ocultar seção' : 'Mostrar seção'}
      >
        {section.enabled ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
      </button>
    </div>
  );
}

export function CustomTemplateEditor() {
  const sectionsConfig = useResumeStore((state) => state.resumeData.sectionsConfig);
  const updateSectionsConfig = useResumeStore((state) => state.updateSectionsConfig);
  const toggleSection = useResumeStore((state) => state.toggleSection);
  const reorderSections = useResumeStore((state) => state.reorderSections);
  const updateSectionTitle = useResumeStore((state) => state.updateSectionTitle);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = sectionsConfig.findIndex((item) => item.id === active.id);
      const newIndex = sectionsConfig.findIndex((item) => item.id === over.id);
      reorderSections(oldIndex, newIndex);
    }
  }

  const enabledCount = sectionsConfig.filter((s) => s.enabled).length;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">Personalizar Template</h3>
        <p className="text-sm text-gray-600 mb-4">
          Arraste as seções para reordenar, edite os títulos e escolha quais seções exibir no seu currículo.
        </p>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex-1">
          <p className="text-sm font-medium text-blue-900">
            {enabledCount} de {sectionsConfig.length} seções visíveis
          </p>
          <p className="text-xs text-blue-700 mt-1">
            Seções ocultas não aparecerão no preview nem no PDF
          </p>
        </div>
      </div>

      {/* Sections List */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={sectionsConfig.map((s) => s.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-2">
            {sectionsConfig.map((section) => (
              <SortableSection
                key={section.id}
                section={section}
                onToggle={toggleSection}
                onUpdateTitle={updateSectionTitle}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {/* Tips */}
      <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <p className="text-sm font-medium text-yellow-900 mb-2">💡 Dicas:</p>
        <ul className="text-xs text-yellow-800 space-y-1">
          <li>• Arraste pelo ícone ⋮⋮ para reordenar as seções</li>
          <li>• Clique no ícone 👁️ para ocultar/mostrar uma seção</li>
          <li>• Clique no ícone ✏️ para editar o título da seção</li>
          <li>• As mudanças são salvas automaticamente</li>
        </ul>
      </div>
    </div>
  );
}
