import { useState } from 'react';
import { MOCK_LESSONS } from '@/src/constants';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Bell, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import Sidebar from './Sidebar';

const DAYS_HEADER = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

interface ScheduleProps {
  onOpenNotifications?: () => void;
  onNavigate?: (screen: string) => void;
}

export default function Schedule({ onOpenNotifications, onNavigate }: ScheduleProps) {
  const [selectedDay, setSelectedDay] = useState(4);
  const [activeTab, setActiveTab] = useState('Все');
  const filteredLessons = MOCK_LESSONS.filter(l => l.dayOfWeek === selectedDay);

  const tabs = ['Все', 'Тек. контр.', 'Промеж. контр.', 'Итоговый'];

  const calendarDays = [
    { day: 30, other: true }, { day: 31, other: true }, { day: 1, other: false },
    { day: 2, other: false, today: true }, { day: 3, other: false }, { day: 4, other: false }, { day: 5, other: true },
    { day: 6, other: false }, { day: 7, other: false }, { day: 8, other: false }, { day: 9, other: false }, { day: 10, other: false }, { day: 11, other: false }, { day: 12, other: true },
    { day: 13, other: false }, { day: 14, other: false }, { day: 15, other: false }, { day: 16, other: false }, { day: 17, other: false }, { day: 18, other: false }, { day: 19, other: true },
  ];

  return (
    <div className="flex flex-col min-h-full bg-[#F2F2F7]">
      {/* Calendar Header Section (Still needed but without the top-bar) */}
      <div className="hemis-gradient pt-2 pb-0 flex flex-col">
        {/* Calendar Card */}
        <div className="bg-white rounded-t-[22px] p-4 pb-6 shadow-sm">
          <div className="flex justify-between items-center mb-4 px-2">
            <ChevronLeft size={20} className="text-[#1877F2] cursor-pointer" />
            <span className="text-lg font-extrabold text-slate-900">апрель</span>
            <ChevronRight size={20} className="text-[#1877F2] cursor-pointer" />
          </div>
          
          <div className="grid grid-cols-7 gap-y-2">
            {DAYS_HEADER.map(d => (
              <div key={d} className="text-center text-[12px] font-bold text-slate-400 pb-2">{d}</div>
            ))}
            {calendarDays.map((d, idx) => (
              <div
                key={idx}
                className={cn(
                  "text-center text-sm font-bold py-1.5 cursor-pointer rounded-lg transition-all",
                  d.other ? "text-slate-300" : "text-slate-900",
                  d.today ? "bg-[#1877F2] text-white" : ""
                )}
              >
                {d.day}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-4 overflow-x-auto no-scrollbar bg-[#F2F2F7]">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-4 py-2 rounded-xl text-[13px] font-bold whitespace-nowrap transition-all",
              activeTab === tab ? "bg-white text-[#1877F2] shadow-sm" : "text-slate-400"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Lessons List */}
      <div className="flex-1 px-4 space-y-3">
        <AnimatePresence mode="wait">
          {filteredLessons.length > 0 ? (
            <motion.div
              key={selectedDay}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              {filteredLessons.map((lesson, idx) => (
                <Card key={lesson.id} className="border-none shadow-sm overflow-hidden rounded-2xl">
                  <div className="flex">
                    <div className="bg-[#1877F2] min-w-[64px] py-4 flex flex-col items-center justify-center gap-1">
                      <span className="text-sm font-extrabold text-white">{lesson.startTime}</span>
                      <span className="text-[11px] font-bold text-white/70">{lesson.endTime}</span>
                    </div>
                    <CardContent className="p-3.5 flex-1 relative">
                      <div className="absolute top-3 right-3">
                        <span className="text-[9px] font-black bg-blue-50 text-[#1877F2] px-1.5 py-0.5 rounded border border-blue-100 uppercase">
                          {idx % 2 === 0 ? 'Тек. контр.' : 'Промеж. контр.'}
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm leading-tight mb-1 pr-16">{lesson.subject}</h4>
                      <p className="text-[12px] font-bold text-slate-400 mb-2 uppercase tracking-tight">{lesson.teacher}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-[12px] font-bold text-[#1877F2]">{lesson.type}</span>
                        <span className="text-[12px] font-bold text-slate-400">{lesson.room}</span>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </motion.div>
          ) : (
            <div className="py-12 text-center text-slate-400 italic text-sm">
              No lessons scheduled for this day
            </div>
          )}
        </AnimatePresence>
      </div>
      <div className="h-24" />
    </div>
  );
}
