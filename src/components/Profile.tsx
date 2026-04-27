import { MOCK_STUDENT } from '@/src/constants';
import { Card, CardContent } from '@/components/ui/card';
import { User, Mail, School, Building2, Users2, CreditCard, Wallet, Settings, Bell, Shield, LogOut, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileProps {
  onLogout: () => void;
}

export default function Profile({ onLogout }: ProfileProps) {
  return (
    <div className="flex flex-col min-h-full bg-[#F2F2F7]">
      <div className="p-4 space-y-4">
        {/* Profile Card */}
        <Card className="border-none shadow-sm rounded-[32px] bg-white overflow-hidden">
          <CardContent className="p-0">
            <div className="hemis-gradient h-24 w-full" />
            <div className="px-6 pb-6 -mt-12 text-center">
              <Avatar className="h-24 w-24 mx-auto border-4 border-white shadow-md mb-3">
                <AvatarImage src={MOCK_STUDENT.avatarUrl} />
                <AvatarFallback>IM</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-black text-slate-900">{MOCK_STUDENT.fullName}</h2>
              <p className="text-[13px] font-bold text-slate-400 mt-1 uppercase tracking-wider">ID: {MOCK_STUDENT.studentId}</p>
            </div>
            
            <div className="grid grid-cols-2 border-t border-slate-50">
              <div className="p-4 text-center border-r border-slate-50">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Guruh</p>
                <p className="text-sm font-black text-slate-800">{MOCK_STUDENT.group}</p>
              </div>
              <div className="p-4 text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Kurs</p>
                <p className="text-sm font-black text-slate-800">{MOCK_STUDENT.course}-kurs</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Balance Card */}
        <Card className="border-none shadow-sm rounded-[24px] bg-white overflow-hidden">
          <CardContent className="p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
                <Wallet className="text-[#1877F2]" size={24} />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tight">O'quv balansi</p>
                <p className="text-lg font-black text-slate-900">7 130 000 сум</p>
              </div>
            </div>
            <button className="bg-[#1877F2] text-white px-4 py-2 rounded-xl text-xs font-bold active:scale-95 transition-transform">
              To'lash
            </button>
          </CardContent>
        </Card>

        {/* Details Section */}
        <h3 className="font-bold text-slate-800 text-sm px-1 pt-2 uppercase tracking-widest">Ma'lumotlar</h3>
        <Card className="border-none shadow-sm rounded-[24px] bg-white overflow-hidden">
          <CardContent className="p-2">
            <div className="flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors">
              <div className="p-2.5 bg-slate-100 rounded-xl text-slate-500">
                <Building2 size={20} />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Universitet</p>
                <p className="text-[13px] font-bold text-slate-800 leading-tight">{MOCK_STUDENT.university}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors">
              <div className="p-2.5 bg-slate-100 rounded-xl text-slate-500">
                <Users2 size={20} />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Fakultet</p>
                <p className="text-[13px] font-bold text-slate-800">{MOCK_STUDENT.faculty}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Settings Section */}
        <h3 className="font-bold text-slate-800 text-sm px-1 pt-2 uppercase tracking-widest">Sozlamalar</h3>
        <Card className="border-none shadow-sm rounded-[24px] bg-white overflow-hidden">
          <CardContent className="p-2">
            {[
              { icon: Bell, label: 'Bildirishnomalar', color: 'text-blue-500' },
              { icon: Shield, label: 'Xavfsizlik', color: 'text-green-500' },
              { icon: Settings, label: 'Til (O\'zbekcha)', color: 'text-purple-500' },
            ].map((item, idx) => (
              <button key={idx} className="w-full flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors text-left group">
                <div className={`p-2.5 bg-slate-100 rounded-xl ${item.color} group-hover:scale-110 transition-transform`}>
                  <item.icon size={20} />
                </div>
                <span className="text-[13px] font-bold text-slate-700 flex-1">{item.label}</span>
                <ChevronRight size={16} className="text-slate-300" />
              </button>
            ))}
            <div className="h-[1px] bg-slate-50 mx-4" />
            <button 
              onClick={onLogout}
              className="w-full flex items-center gap-4 p-4 hover:bg-red-50 transition-colors text-left group text-red-500"
            >
              <div className="p-2.5 bg-red-50 rounded-xl group-hover:scale-110 transition-transform">
                <LogOut size={20} />
              </div>
              <span className="text-[13px] font-bold flex-1">Tizimdan chiqish</span>
            </button>
          </CardContent>
        </Card>
      </div>
      <div className="h-24" />
    </div>
  );
}
