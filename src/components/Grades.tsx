import { useState } from 'react';
import { MOCK_GRADES, MOCK_STUDENT } from '@/src/constants';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown, Menu, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Sidebar from './Sidebar';

export default function Grades() {
  const [selectedSemester, setSelectedSemester] = useState<number | null>(null);

  const semesters = [
    { id: 1, label: '1-semestr', date: '(8-sent, 2025 > 20-dek, 2025)' },
    { id: 2, label: '2-semestr', date: '(26-yan, 2026 > 9-may, 2026)', active: true },
    { id: 3, label: '3-semestr', date: '(7-sent, 2026 > 2-yan, 2027)' },
    { id: 4, label: '4-semestr', date: '(4-yan, 2027 > 5-iyun, 2027)' },
    { id: 5, label: '5-semestr', date: '(6-sent, 2027 > 1-yan, 2028)' },
    { id: 6, label: '6-semestr', date: '(3-yan, 2028 > 3-iyun, 2028)' },
    { id: 7, label: '7-sent, 2028 > 30-dek, 2028' },
    { id: 8, label: '1-yan, 2029 > 2-iyun, 2029' },
  ];

  if (selectedSemester === 2) {
    return (
      <div className="flex flex-col min-h-full bg-[#F2F2F7]">
        {/* Back Button for sub-view within Grades */}
        <div className="p-4 bg-white/50 backdrop-blur-sm sticky top-0 z-10 flex items-center gap-3">
          <button onClick={() => setSelectedSemester(null)} className="p-2 bg-white rounded-xl shadow-sm text-slate-900 active:scale-95 transition-transform"><ChevronLeft size={20} /></button>
          <h2 className="text-[17px] font-black text-slate-900">2-semestr natijalari</h2>
        </div>

        <div className="p-4 space-y-3">
          <div className="bg-white rounded-2xl p-5 shadow-sm mb-2">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-900">Semester ko'rsatkichlari</h3>
              <div className="bg-blue-50 text-[#1877F2] px-3 py-1 rounded-xl text-xs font-bold font-mono">GPA: {MOCK_STUDENT.gpa}</div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500 font-medium">O'zlashtirish</span>
                <span className="text-slate-900 font-bold">85%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full w-[85%]" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-5 text-[10px] font-bold text-slate-400 uppercase px-2 mb-1">
            <div className="col-span-2">Предметы</div>
            <div className="text-center">Тек. контр.</div>
            <div className="text-center">Промеж. контр.</div>
            <div className="text-center">Итоговый</div>
          </div>
          {MOCK_GRADES.map((grade, idx) => (
            <Card key={idx} className="border-none shadow-sm rounded-2xl">
              <CardContent className="p-4">
                <div className="grid grid-cols-5 items-center gap-2">
                  <div className="col-span-2">
                    <h4 className="font-bold text-slate-900 text-[13px] leading-tight">{grade.subject}</h4>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full border-2 border-orange-100 flex items-center justify-center text-[12px] font-bold text-orange-600">50 / 60</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full border-2 border-slate-100 flex items-center justify-center text-[12px] font-bold text-slate-400">— / —</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full border-2 border-blue-100 flex items-center justify-center text-[12px] font-bold text-blue-600">30 / 40</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full bg-[#F2F2F7]">
      {/* Semesters List */}
      <div className="p-4 space-y-3 pt-4">
        {semesters.map((sem) => (
          <motion.div
            key={sem.id}
            whileTap={{ scale: 0.98 }}
            onClick={() => sem.id === 2 && setSelectedSemester(2)}
          >
            <Card className="border-none shadow-sm rounded-2xl cursor-pointer">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-[15px]">{sem.label || `Semestr ${sem.id}`}</h4>
                  <p className="text-[11px] text-slate-400 font-medium mt-0.5">{sem.date}</p>
                </div>
                <ChevronRight size={18} className="text-slate-300" />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
