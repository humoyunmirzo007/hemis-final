import { useState, useEffect } from 'react';
import { MOCK_STUDENT } from '@/src/constants';
import { Info, Zap, CheckCircle, MessageSquare, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

export default function HEMISAI() {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { title: 'Этап 1: Оценка текущего состояния', desc: 'Анализ GPA и академических показателей, выявление слабых и сильных сторон.' },
    { title: 'Этап 2: Постановка целей', desc: 'Определение целей GPA на семестр и год, планирование баллов по каждому предмету.' },
    { title: 'Этап 3: Составление расписания', desc: 'Создание ежедневного и еженедельного расписания для занятий, самостоятельного обучения и отдыха.' },
    { title: 'Этап 4: Контроль посещаемости', desc: 'Регулярное посещение всех занятий, внимание к отсутствию без уважительной причины.' },
    { title: 'Этап 5: Активное участие', desc: 'Задавать вопросы на занятиях, участвовать в дискуссиях, быть активным на практических занятиях.' },
    { title: 'Этап 6: Дополнительные ресурсы', desc: 'Работа с библиотекой, онлайн-курсами, учебными материалами, расширение знаний.' },
    { title: 'Этап 7: Групповая работа', desc: 'Сотрудничество с однокурсниками, участие в учебных группах, обмен знаниями.' },
  ];

  useEffect(() => {
    if (isAnalyzing) {
      const timer = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev < steps.length - 1) return prev + 1;
          clearInterval(timer);
          setTimeout(() => setIsAnalyzing(false), 1000);
          return prev;
        });
      }, 1500);
      return () => clearInterval(timer);
    }
  }, [isAnalyzing]);

  const chips = [
    { label: 'Посещаемость' },
    { label: 'GPA и успеваемость' },
    { label: 'Расписание занятий', selected: true },
    { label: 'Финансовое состояние' },
    { label: 'Проверка плагиата' },
    { label: 'Road map' },
  ];

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="p-4 pt-10 border-b border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[17px] font-bold text-slate-900">HEMIS AI</h2>
          <Info size={22} className="text-[#1877F2]" strokeWidth={1.7} />
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-0.5">
            <span className="text-2xl font-black text-slate-900 tracking-tighter">HEMIS</span>
            <span className="text-2xl font-black hemis-ai-gradient tracking-tighter ml-1">AI</span>
            <span className="text-sm hemis-ai-gradient -mt-3 ml-0.5 font-bold">✦</span>
          </div>
          <div className="flex items-center gap-1 text-[#1877F2] text-[13px] font-bold cursor-pointer">
            <Zap size={14} fill="currentColor" /> AI анализ
          </div>
        </div>
        
        <h3 className="text-[22px] font-extrabold text-slate-900 leading-tight">
          Здравствуйте,<br />
          {MOCK_STUDENT.fullName}!
        </h3>
      </div>

      <AnimatePresence mode="wait">
        {isAnalyzing ? (
          <motion.div 
            key="analyzing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col p-6 overflow-y-auto"
          >
            <div className="flex items-center justify-center gap-2 mb-8 py-4">
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 0.6 }}
                className="w-3 h-3 bg-blue-600 rounded-full"
              />
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                className="w-3 h-3 bg-blue-400 rounded-full"
              />
              <span className="text-blue-600 font-bold ml-2">ИИ анализирует...</span>
            </div>

            <div className="space-y-6 relative">
              <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-blue-100"></div>
              {steps.slice(0, currentStep + 1).map((step, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex gap-4 relative z-10"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shrink-0 border-4 border-white">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{step.title}</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 flex flex-col"
          >
            {/* Chips */}
            <div className="flex flex-wrap gap-2 p-4">
              {chips.map((chip, idx) => (
                <button
                  key={idx}
                  className={cn(
                    "px-3.5 py-2 rounded-full border-1.5 text-[13px] font-bold transition-all active:scale-[0.96]",
                    chip.selected 
                      ? "border-[#1877F2] text-[#1877F2] bg-white" 
                      : "border-slate-200 text-slate-800 bg-white"
                  )}
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {/* Result Area */}
            <div className="flex-1 px-4 overflow-y-auto pb-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#F2F2F7] rounded-2xl p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={18} className="text-[#1877F2]" strokeWidth={1.8} />
                    <span className="text-[15px] font-bold text-slate-900">Результат анализа</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 border-1.5 border-slate-200 rounded-xl bg-white text-[12px] font-bold text-[#1877F2] cursor-pointer">
                    <MessageSquare size={14} className="text-[#1877F2]" /> Обсудить
                  </div>
                </div>
                
                <div className="text-sm text-slate-700 leading-relaxed space-y-4">
                  <p>Бугун 2 апрель, пайшанба. Расписание на сегодня:</p>
                  <div className="space-y-3">
                    <div>
                      <p className="font-bold text-slate-900">🕐 13:20–14:40 Umumiy pedagogika</p>
                      <p className="text-[13px] text-slate-500 ml-6">URISHOV SH. M. · Ma'ruza · BB-5M</p>
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">🕐 14:50–16:10 Inklyuziv ta'lim</p>
                      <p className="text-[13px] text-slate-500 ml-6">MOYANOV I. J. · Seminar · B2-201</p>
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">🕐 16:20–17:40 Nutq ko'nikmalari</p>
                      <p className="text-[13px] text-slate-500 ml-6">KARIMOV U. N. · Amaliy · B2-205</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input Row */}
      <div className="p-3 px-4 border-t border-slate-100 flex gap-2.5 bg-white pb-24">
        <input
          className="flex-1 p-3 bg-[#F2F2F7] border-1.5 border-slate-200 rounded-xl text-sm text-slate-900 outline-none focus:border-[#1877F2] transition-all"
          placeholder="Savolni yozing..."
        />
        <button className="w-11 h-11 bg-[#1877F2] rounded-xl flex items-center justify-center text-white active:scale-[0.95] transition-transform">
          <Send size={18} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
