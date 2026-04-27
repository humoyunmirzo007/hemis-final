import { LogOut, Book, TrendingUp, FileText, List, CheckSquare, Info, MessageSquare, CheckCircle, GraduationCap, BarChart2, Wallet, CreditCard, FileCheck, Library } from 'lucide-react';
import { motion } from 'motion/react';

interface ProfileProps {
  onLogout?: () => void;
  onNavigate: (screen: string) => void;
}

export default function Profile({ onLogout, onNavigate }: ProfileProps) {
  const allItems = [
    { label: 'Unilibrary', icon: Book },
    { label: 'Ma\'lumotnomalar', icon: FileCheck, screen: 'certificates' },
    { label: 'O\'quv materiallari', icon: Library, screen: 'materials' },
    { label: 'GPA ballari', icon: TrendingUp },
    { label: 'Barcha hujjatlar', icon: FileText, screen: 'certificates' },
    { label: 'Topshiriqlar', icon: CheckSquare, screen: 'assignments' },
    { label: 'Oliy ta\'lim haqida', icon: Info },
    { label: 'So\'rovnomalar', icon: MessageSquare },
    { label: 'Davomat', icon: CheckCircle },
    { label: 'Fanlar ro\'yxati', icon: Book, screen: 'subjects' },
    { label: 'Imtihon jadvali', icon: GraduationCap },
    { label: 'Reyting daftarcha', icon: BarChart2 },
    { label: 'Talaba ID', icon: CreditCard },
    { label: 'O\'zlashtirish', icon: TrendingUp },
    { label: 'To\'lov-shartnoma', icon: Wallet, screen: 'contract' },
  ];

  return (
    <div className="flex flex-col min-h-full bg-white">
      {/* Header */}
      <div className="bg-[#1877F2] p-4 pt-10 flex items-center justify-between sticky top-0 z-10">
        <button className="text-white"><List size={22} strokeWidth={2.5} /></button>
        <h2 className="text-lg font-bold text-white">Barcha xizmatlar</h2>
        <button onClick={onLogout} className="text-white"><LogOut size={22} strokeWidth={2} /></button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-2.5 p-4">
        {allItems.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.03 }}
            onClick={() => item.screen && onNavigate(item.screen)}
            className="bg-[#F2F2F7] rounded-3xl p-4 flex flex-col justify-between aspect-square active:scale-[0.97] transition-all cursor-pointer group hover:bg-[#E3F2FD] border border-transparent hover:border-blue-100"
          >
            <div className="bg-white p-2.5 rounded-2xl w-fit group-hover:bg-[#1877F2] transition-colors">
              <item.icon size={22} className="text-[#1877F2] group-hover:text-white transition-colors" strokeWidth={1.8} />
            </div>
            <span className="text-[13px] font-bold text-slate-800 leading-tight pr-2">{item.label}</span>
          </motion.div>
        ))}
      </div>
      <div className="h-20" />
    </div>
  );
}
