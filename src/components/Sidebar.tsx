import React from 'react';
import { 
  User, 
  Settings, 
  Globe, 
  HelpCircle, 
  Trash2, 
  Info, 
  LogOut,
  Phone
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { MOCK_STUDENT } from '@/src/constants';

interface SidebarProps {
  children: React.ReactNode;
  onNavigate?: (screen: string) => void;
}

export default function Sidebar({ children, onNavigate }: SidebarProps) {
  const menuItems = [
    { icon: User, label: 'Личные данные', screen: 'profile' },
    { icon: Settings, label: 'Редактировать профиль', screen: 'profile' },
    { icon: Globe, label: 'Изменить язык приложения' },
    { icon: HelpCircle, label: 'Помощь (через Telegram)' },
    { icon: Trash2, label: 'Очистить кэш' },
    { icon: Info, label: 'О приложении' },
  ];

  return (
    <Sheet>
      <SheetTrigger render={children} />
      <SheetContent side="left" className="w-[300px] p-0 border-none bg-white">
        <div className="hemis-gradient p-6 pt-12 text-white">
          <div 
            onClick={() => onNavigate && onNavigate('profile')}
            className="flex items-center gap-4 mb-6 cursor-pointer hover:opacity-90 transition-opacity"
          >
            <Avatar className="h-16 w-16 border-2 border-white/20">
              <AvatarImage src={MOCK_STUDENT.avatarUrl} />
              <AvatarFallback>IM</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-bold text-lg leading-tight">{MOCK_STUDENT.fullName}</h3>
              <div className="flex items-center gap-1 text-white/70 text-xs mt-1">
                <Phone size={12} />
                <span>+998950850720</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-2">
          {menuItems.map((item, idx) => (
            <button 
              key={idx}
              onClick={() => item.screen && onNavigate && onNavigate(item.screen)}
              className="w-full flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors text-left rounded-xl"
            >
              <div className="text-[#1877F2]">
                <item.icon size={20} />
              </div>
              <span className="text-sm font-semibold text-slate-700">{item.label}</span>
            </button>
          ))}
          
          <Separator className="my-2 bg-slate-100" />
          
          <button className="w-full flex items-center gap-4 p-4 hover:bg-red-50 transition-colors text-left rounded-xl text-red-500">
            <LogOut size={20} />
            <span className="text-sm font-bold">Выйти</span>
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
