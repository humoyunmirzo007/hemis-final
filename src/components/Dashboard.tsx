import { MOCK_STUDENT } from '@/src/constants';
import { Card, CardContent } from '@/components/ui/card';
import { Search, QrCode, TrendingUp, CheckSquare, Book, Calendar as CalendarIcon, FileText, Users, CreditCard, MessageSquare, Wallet, ChevronRight, Menu, Bell, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import Sidebar from './Sidebar';

interface DashboardProps {
  onNavigate: (screen: string) => void;
  onOpenNotifications: () => void;
}

export default function Dashboard({ onNavigate, onOpenNotifications }: DashboardProps) {
  const gridItems = [
    { icon: TrendingUp, label: 'Успеваемость' },
    { icon: CheckSquare, label: 'Экзамены' },
    { icon: Book, label: 'Дорожная карта' },
    { icon: CalendarIcon, label: 'Расписание экзаменов' },
    { icon: FileText, label: 'Документы' },
    { icon: Users, label: 'Career Edu' },
    { icon: CreditCard, label: 'Kontrakt Edu' },
    { icon: MessageSquare, label: 'Опросы' },
    { icon: Wallet, label: 'Финансовый платеж' },
  ];

  return (
    <div className="flex flex-col min-h-full bg-[#F2F2F7]">
      {/* Header */}
      <div className="hemis-gradient pt-10 pb-4 px-4 flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3 text-white">
            <Sidebar onNavigate={onNavigate}>
              <button className="p-1 hover:bg-white/10 rounded-full transition-colors text-white">
                <Menu size={24} />
              </button>
            </Sidebar>
            <div className="text-white">
              <p className="text-[13px] font-medium opacity-75">Xush kelibsiz 👋</p>
              <h2 className="text-lg font-extrabold leading-tight max-w-[220px]">{MOCK_STUDENT.fullName}</h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={onOpenNotifications}
              className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center cursor-pointer relative text-white"
            >
              <Bell size={20} />
              <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-blue-600"></div>
            </button>
            <div className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center cursor-pointer">
              <QrCode size={22} className="text-white" />
            </div>
          </div>
        </div>

        {/* News Thumbs */}
        <div className="flex gap-2.5 overflow-x-auto no-scrollbar">
          <div className="w-[108px] h-[72px] rounded-xl overflow-hidden flex-shrink-0 relative border-1.5 border-white/15 bg-white/10">
            <div className="w-full h-full bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center">
              <Book size={32} className="text-white/40" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-1.5 bg-gradient-to-t from-black/70 to-transparent">
              <p className="text-[9px] font-bold text-white leading-tight">Jamiyatda sog'lom mu...</p>
            </div>
          </div>
          <div className="w-[108px] h-[72px] rounded-xl overflow-hidden flex-shrink-0 relative border-1.5 border-white/15 bg-white/10">
            <div className="w-full h-full bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center">
              <FileText size={32} className="text-white/40" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-1.5 bg-gradient-to-t from-black/70 to-transparent">
              <p className="text-[9px] font-bold text-white leading-tight">Jinoyat jazosiz qol...</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white/95 rounded-xl p-3 flex items-center gap-2 shadow-sm">
          <Search size={16} className="text-slate-400" />
          <span className="text-sm text-slate-400 font-medium">Поиск...</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* GPA & Attendance Stats */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="border-none shadow-sm rounded-2xl bg-white overflow-hidden group active:scale-[0.98] transition-all">
            <CardContent className="p-4 flex flex-col gap-1 items-center">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-1">
                <TrendingUp size={20} className="text-[#1877F2]" />
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">O'rtacha ball (GPA)</p>
              <h3 className="text-xl font-black text-slate-900">{MOCK_STUDENT.gpa}</h3>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm rounded-2xl bg-white overflow-hidden active:scale-[0.98] transition-all">
            <CardContent className="p-4 flex flex-col gap-1 items-center">
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center mb-1">
                <CheckCircle size={20} className="text-green-600" />
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Davomat</p>
              <h3 className="text-xl font-black text-green-600">{MOCK_STUDENT.attendancePercentage}%</h3>
            </CardContent>
          </Card>
        </div>

        {/* QR Banner */}
        <div className="bg-white rounded-2xl p-4 flex items-center gap-3 shadow-sm active:scale-[0.98] transition-transform cursor-pointer">
          <div className="w-11 h-11 bg-[#E3F2FD] rounded-xl flex items-center justify-center flex-shrink-0">
            <QrCode size={26} className="text-[#1877F2]" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-slate-900">QR-Посещаемость</p>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5">Отметьте посещаемость через QR кода</p>
          </div>
          <ChevronRight size={16} className="text-slate-300" />
        </div>

        {/* Big 2 Buttons */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="bg-[#1877F2] rounded-2xl p-4 cursor-pointer active:scale-[0.98] transition-transform">
            <p className="text-sm font-extrabold text-white">Посещаемость</p>
            <p className="text-[11px] text-white/75 font-medium mt-1 leading-tight">Просмотр расписания и пред...</p>
          </div>
          <div 
            onClick={() => onNavigate('assignments')}
            className="bg-[#0d5fcc] rounded-2xl p-4 cursor-pointer active:scale-[0.98] transition-transform"
          >
            <p className="text-sm font-extrabold text-white uppercase">Задания</p>
            <p className="text-[11px] text-white/75 font-medium mt-1 leading-tight">Проверка сроков и заданий</p>
          </div>
        </div>

        {/* 3x3 Grid */}
        <div className="grid grid-cols-3 gap-2">
          {gridItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => {
                if (item.label === 'Kontrakt Edu') onNavigate('contract');
                if (item.label === 'Экзамены') onNavigate('assignments');
              }}
              className="bg-white rounded-2xl p-3.5 flex flex-col items-center gap-2 shadow-sm active:scale-[0.95] transition-transform cursor-pointer"
            >
              <item.icon size={28} className="text-[#1877F2]" strokeWidth={1.7} />
              <span className="text-[11px] font-bold text-slate-800 text-center leading-tight">{item.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Attendance Section */}
        <div className="space-y-3 pt-2">
          <div className="flex justify-between items-center px-1">
            <h3 className="font-bold text-slate-800">Посещаемость — 2-семестр</h3>
            <button className="text-xs font-bold text-[#1877F2]">Все</button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <Card className="border-none shadow-sm bg-white rounded-2xl">
              <CardContent className="p-3 text-center">
                <p className="text-lg font-black text-purple-600">32</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Итого</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm bg-white rounded-2xl">
              <CardContent className="p-3 text-center">
                <p className="text-lg font-black text-green-600">0</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Причина</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm bg-white rounded-2xl">
              <CardContent className="p-3 text-center">
                <p className="text-lg font-black text-red-500">32</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Без причины</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="h-24" />
    </div>
  );
}
