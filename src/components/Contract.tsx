import { Card, CardContent } from '@/components/ui/card';
import { Download, Wallet } from 'lucide-react';
import { motion } from 'motion/react';

export default function Contract() {
  return (
    <div className="flex flex-col min-h-full bg-[#F2F2F7] p-4 space-y-4">
      <Card className="border-none shadow-sm rounded-2xl bg-white">
        <CardContent className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <Wallet size={22} className="text-[#1877F2]" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase">Сумма договора</p>
              <p className="text-lg font-black text-slate-900">9 485 300 сум</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 font-medium">Оплачено</span>
              <span className="text-green-600 font-bold">7 130 000 сум</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 rounded-full w-[75%]" />
            </div>
            <div className="flex justify-between text-sm pt-1">
              <span className="text-slate-500 font-medium">Остаток</span>
              <span className="text-red-500 font-bold">2 355 300 сум</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <h3 className="font-bold text-slate-800 px-1">Договоры</h3>
        <Card className="border-none shadow-sm rounded-2xl bg-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-bold text-slate-900">№ B3012566822/K</h4>
                <p className="text-[11px] text-slate-400 font-medium">22.10.2025</p>
              </div>
              <button className="p-2 bg-blue-50 text-[#1877F2] rounded-xl active:scale-95 transition-transform">
                <Download size={20} />
              </button>
            </div>
            
            <div className="space-y-2.5">
              <div className="flex justify-between text-[13px]">
                <span className="text-slate-400 font-medium">Тип договора</span>
                <span className="text-slate-900 font-bold">Bazoviy shartnoma</span>
              </div>
              <div className="flex justify-between text-[13px]">
                <span className="text-slate-400 font-medium">Учебный год</span>
                <span className="text-slate-900 font-bold">2025-2026 o'quv yili</span>
              </div>
              <div className="flex justify-between text-[13px]">
                <span className="text-slate-400 font-medium">ИНН организации</span>
                <span className="text-slate-900 font-bold">202217655</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
