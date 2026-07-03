import { Sparkles, GraduationCap, ClipboardList } from 'lucide-react';

interface QuickActionsProps {
  onAction: (action: string) => void;
}

const QuickActions = ({ onAction }: QuickActionsProps) => {
  const actions = [
    {
      id: 'summarize',
      label: 'Resumir',
      icon: Sparkles,
      description: 'Criar um resumo do documento',
    },
    {
      id: 'flashcards',
      label: 'Flashcards',
      icon: GraduationCap,
      description: 'Criar cartões de estudo',
    },
    {
      id: 'quiz',
      label: 'Quiz',
      icon: ClipboardList,
      description: 'Criar questionário',
    },
  ];

  return (
    <section className="px-6 py-4 border-t border-gray-200 bg-white">
      <p className="text-xs font-medium text-gray-500 mb-3">Ações rápidas</p>
      <div className="flex gap-2 flex-wrap">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={() => onAction(action.id)}
              className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-sm font-medium text-gray-700"
            >
              <Icon className="w-4 h-4" />
              {action.label}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default QuickActions;
