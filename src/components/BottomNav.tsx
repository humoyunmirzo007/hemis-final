import { Home, Calendar, Sparkles, BookOpen, LayoutGrid } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: 'dashboard', label: 'Главная', icon: Home },
    { id: 'schedule', label: 'Расписание', icon: Calendar },
    { id: 'ai', label: 'HEMIS AI', icon: Sparkles },
    { id: 'subjects', label: 'Предметы', icon: BookOpen },
    { id: 'all', label: 'Все', icon: LayoutGrid },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[393px] bg-white border-t border-slate-200 flex justify-between items-start pt-2 pb-safe z-50 h-[82px]">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex-1 flex flex-col items-center gap-1 transition-colors",
              isActive ? "text-[#1877F2]" : "text-slate-400"
            )}
          >
            <div className={cn(
              "w-14 h-8 rounded-2xl flex items-center justify-center transition-all",
              isActive ? "bg-[#1877F2] text-white" : ""
            )}>
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
            </div>
            <span className="text-[10px] font-bold">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
