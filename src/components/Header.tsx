import { Bell, Menu } from 'lucide-react';
import Sidebar from './Sidebar';

interface HeaderProps {
  title: string;
  onOpenNotifications?: () => void;
  onNavigate?: (screen: string) => void;
}

export default function Header({ title, onOpenNotifications, onNavigate }: HeaderProps) {
  return (
    <header className="sticky top-0 left-0 right-0 bg-[#1877F2] text-white px-4 py-4 flex justify-between items-center z-40 shadow-sm">
      <div className="flex items-center gap-3">
        <Sidebar onNavigate={onNavigate}>
          <button className="p-1 hover:bg-white/10 rounded-full transition-colors text-white">
            <Menu size={24} />
          </button>
        </Sidebar>
        <h1 className="text-lg font-bold">{title}</h1>
      </div>
      <button 
        onClick={onOpenNotifications}
        className="p-1 hover:bg-white/10 rounded-full transition-colors relative text-white"
      >
        <Bell size={24} />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-[#1877F2]"></span>
      </button>
    </header>
  );
}
