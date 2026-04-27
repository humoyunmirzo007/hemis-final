import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight, Inbox } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export default function Assignments() {
  const [activeTab, setActiveTab] = useState('Выдано');
  const tabs = ['Все', 'Выдано', 'Отправлено', 'Оценено'];

  const assignments = [
    {
      title: 'mustaqil ta\'lim',
      subject: 'O\'zbek tilining sohada qo\'llanilishi,',
      status: 'Выдано',
      teacher: 'Amaliy',
      deadline: '10-aprel, 15:00'
    }
  ];

  return (
    <div className="flex flex-col min-h-full bg-white">
      {/* Tabs */}
      <div className="flex border-b border-slate-100 sticky top-0 bg-white z-10">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "flex-1 py-4 text-[13px] font-bold transition-all relative",
              activeTab === tab ? "text-[#1877F2]" : "text-slate-400"
            )}
          >
            {tab}
            {activeTab === tab && (
              <motion.div 
                layoutId="activeTab"
                className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-[#1877F2] rounded-full"
              />
            )}
          </button>
        ))}
      </div>

      <div className="flex-1 p-4">
        {activeTab === 'Выдано' ? (
          <div className="space-y-3">
            {assignments.map((item, idx) => (
              <Card key={idx} className="border-none shadow-sm bg-[#F2F2F7] rounded-2xl">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5 leading-tight">{item.subject}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <span className="text-[10px] font-black bg-blue-100 text-[#1877F2] px-2 py-0.5 rounded uppercase">
                        {item.status}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400">
                        {item.teacher} · Срок: {item.deadline}
                      </span>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-slate-300" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mb-4">
              <Inbox size={40} className="text-slate-200" />
            </div>
            <p className="text-slate-900 font-bold">Задания отсутствуют</p>
          </div>
        )}
      </div>
    </div>
  );
}
