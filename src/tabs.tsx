import { useState } from 'react';
import {
  BadgeCheck, BellRing, BookOpen, CalendarDays, CalendarX, ChartColumn, ChevronLeft, ChevronRight, CircleCheck,
  ClipboardList, FileText, Folder, House, IdCard, Info, LayoutGrid, Library, ListChecks, LogOut, Map as MapIcon, Menu,
  MessageSquareText, NotebookText, QrCode, ReceiptText, ScanLine, Search, Sparkles, TrendingUp, X, Zap,
} from 'lucide-react';
import { CURRENT, STORIES, STUDENT, attendanceTotals, gradesOf, lessonsFor, subjectsOf } from './data';
import { Avatar, Dots, SemPick, StatusRow, cx, useNav } from './ui';

/* ------------------------------------------------------------------ Home */

const GRID = [
  { icon: TrendingUp, label: 'Успеваемость', to: 'grades' },
  { icon: ListChecks, label: 'Экзамены', to: 'exams' },
  { icon: MapIcon, label: 'Дорожная карта', to: 'roadmap' },
  { icon: CalendarDays, label: 'Расписание экзаменов', to: 'examSchedule' },
  { icon: Folder, label: 'Документы', to: 'docs' },
  { icon: BadgeCheck, label: 'Career Edu', web: 'career.edu.uz' },
  { icon: FileText, label: 'Kontrakt Edu', web: 'kontrakt.edu.uz' },
  { icon: ClipboardList, label: 'Опросы', to: 'surveys' },
  { icon: ReceiptText, label: 'Финансовый платеж', to: 'finance' },
];

export function Home() {
  const nav = useNav();
  const [q, setQ] = useState('');
  const [small, setSmall] = useState(false);
  const query = q.trim().toLowerCase();
  const items = GRID.filter((g) => g.label.toLowerCase().includes(query));
  const a = attendanceTotals();

  return (
    <div
      className="h-full overflow-y-auto no-scrollbar bg-[#f2f3f7]"
      onScroll={(e) => {
        const y = e.currentTarget.scrollTop;
        if (y > 48 && !small) setSmall(true);
        if (y < 4 && small) setSmall(false);
      }}
    >
      <div className="g-head sticky top-0 z-20 rounded-b-[28px] pb-5 shadow-[0_6px_16px_rgba(21,96,189,.28)]">
        <StatusRow light />
        <div className="flex items-center gap-3 px-4 h-14">
          <button onClick={() => nav.push('profile')} aria-label="Профиль"><Avatar text={STUDENT.initials} /></button>
          <button onClick={() => nav.push('profile')} className="flex-1 text-left text-white text-[22px] font-semibold truncate">
            {STUDENT.short}
          </button>
          <button onClick={() => nav.push('qr')} aria-label="QR-посещаемость" className="w-10 h-10 grid place-items-center text-white">
            <QrCode size={22} />
          </button>
        </div>
        <div className={cx('flex gap-3 px-4 overflow-x-auto no-scrollbar transition-all duration-300', small ? 'max-h-0 opacity-0' : 'max-h-28 opacity-100 pb-4')}>
          {STORIES.map((s, i) => (
            <button
              key={s.title}
              onClick={() => nav.push('story', { i })}
              className="relative shrink-0 w-[82px] h-[82px] rounded-xl overflow-hidden border border-white/50 text-left"
              style={{ background: s.bg }}
            >
              {s.more && <span className="absolute inset-x-0 top-5 text-center whitespace-nowrap text-[12px] font-extrabold text-slate-900">HEMIS <i className="g-ai not-italic">AI</i></span>}
              <span className="absolute inset-x-0 bottom-0 px-1.5 pb-1.5 pt-4 text-[10px] leading-tight font-semibold text-white bg-gradient-to-t from-black/60 to-transparent">
                {s.title}
              </span>
            </button>
          ))}
        </div>
        <label className="mx-4 flex items-center gap-3 h-[52px] px-4 bg-white rounded-full shadow">
          <Search size={20} className="shrink-0" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Поиск..." className="flex-1 min-w-0 bg-transparent outline-none text-[15px]" />
          {q && <button onClick={() => setQ('')} aria-label="Очистить"><X size={18} /></button>}
        </label>
      </div>

      <div className="p-4 space-y-4 pb-32">
        {!query && (
          <>
            <button onClick={() => nav.push('qr')} className="g-btn w-full flex items-center gap-3 p-4 rounded-2xl text-left text-white">
              <span className="w-10 h-10 shrink-0 grid place-items-center rounded-xl bg-white/20"><ScanLine size={22} /></span>
              <span className="flex-1 min-w-0">
                <b className="block text-[15px] font-semibold">QR-Посещаемость</b>
                <span className="block text-[11px] opacity-80 mt-0.5">Отметьте посещаемость через QR код</span>
              </span>
              <ChevronRight size={18} />
            </button>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => nav.push('attendance')} className="g-btn rounded-2xl p-4 text-left text-white">
                <b className="block text-[16px] font-semibold">Посещаемость</b>
                <span className="block text-[10px] opacity-80 mt-1.5 truncate">Просмотр расписания и предметов</span>
              </button>
              <button onClick={() => nav.push('tasks')} className="g-btn rounded-2xl p-4 text-left text-white">
                <b className="block text-[16px] font-semibold">ЗАДАНИЯ</b>
                <span className="block text-[10px] opacity-80 mt-1.5 truncate">Проверка сроков и заданий</span>
              </button>
            </div>
          </>
        )}

        <div className="grid grid-cols-3 gap-3.5 pt-1">
          {items.map((g) => (
            <button
              key={g.label}
              onClick={() => (g.web ? nav.askWeb(g.web) : nav.push(g.to!))}
              className="h-[104px] bg-white rounded-2xl flex flex-col items-center justify-center gap-2.5 px-1 shadow-[0_1px_3px_rgba(0,0,0,.05)] active:scale-95 transition-transform"
            >
              <g.icon size={26} className="text-[#2f7cf6]" />
              <span className="text-[12px] font-semibold leading-tight text-center">{g.label}</span>
            </button>
          ))}
        </div>
        {query && !items.length && <p className="text-center text-slate-500 py-8">Ничего не найдено</p>}

        {!query && (
          <div className="bg-white rounded-3xl p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-[17px] font-semibold">Посещаемость — {CURRENT}-семестр</h3>
              <button onClick={() => nav.push('attendance')} className="text-brand text-[15px] font-medium">Все</button>
            </div>
            <div className="grid grid-cols-3 gap-2.5 mt-5 pb-2">
              {([['Итого', a.total, 'text-violet-700'], ['Причина', a.reason, 'text-green-600'], ['Без причины', a.noReason, 'text-pink-600']] as const).map(([label, n, color]) => (
                <div key={label} className="rounded-2xl p-3.5 shadow-[0_4px_14px_rgba(0,0,0,.09)]">
                  <p className={color}><b className="text-[20px]">{n}</b> <span className="text-[10px]">часов</span></p>
                  <p className="text-[12px] text-slate-500 mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- Schedule */

const MONTHS = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];
const MONTHS_GEN = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
const WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const sameDay = (a: Date, b: Date) => a.toDateString() === b.toDateString();

export function Schedule() {
  const nav = useNav();
  const today = new Date();
  const [sel, setSel] = useState(today);
  const [view, setView] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const offset = (view.getDay() + 6) % 7;
  const cells = Array.from({ length: 42 }, (_, i) => new Date(view.getFullYear(), view.getMonth(), i - offset + 1));
  const lessons = lessonsFor(sel);
  const shift = (n: number) => setView(new Date(view.getFullYear(), view.getMonth() + n, 1));

  return (
    <div className="flex flex-col h-full bg-[#f7f7fb]">
      <div className="g-head shrink-0 rounded-b-[28px] pb-6 text-white">
        <StatusRow light />
        <div className="flex items-center justify-between px-4 h-14">
          <button onClick={nav.openDrawer} aria-label="Меню" className="w-10 h-10 grid place-items-center"><Menu size={26} /></button>
          <h1 className="text-[20px] font-semibold">Расписание</h1>
          <button onClick={() => nav.push('notifications')} aria-label="Уведомления" className="w-11 h-11 grid place-items-center rounded-xl bg-white text-brand-dark">
            <BellRing size={20} />
          </button>
        </div>
        <div className="flex items-center justify-between px-8 py-2">
          <button onClick={() => shift(-1)} aria-label="Предыдущий месяц"><ChevronLeft size={20} /></button>
          <b className="text-[22px] font-bold">{MONTHS[view.getMonth()]}</b>
          <button onClick={() => shift(1)} aria-label="Следующий месяц"><ChevronRight size={20} /></button>
        </div>
        <div className="grid grid-cols-7 px-3 pt-3 text-center">
          {WEEKDAYS.map((d) => <span key={d} className="text-[11px] font-semibold opacity-70 pb-2">{d}</span>)}
          {cells.map((d) => {
            const other = d.getMonth() !== view.getMonth();
            return (
              <button key={d.toISOString()} onClick={() => setSel(d)} className="h-[34px] grid place-items-center">
                <span
                  className={cx(
                    'w-8 h-8 grid place-items-center rounded-full text-[14px] font-medium',
                    sameDay(d, sel) ? 'bg-white text-brand-dark font-bold' : sameDay(d, today) ? 'bg-white/30' : '',
                    (other || d.getDay() === 0) && !sameDay(d, sel) && 'opacity-45',
                  )}
                >
                  {d.getDate()}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-4 pt-4 pb-28 space-y-3">
        {lessons.map((l) => (
          <div key={l.start} className="fade-in flex bg-white rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,.07)]">
            <div className="g-time w-[66px] shrink-0 flex flex-col items-center justify-between py-4 text-white">
              <b className="text-[15px] tracking-wider">{l.start}</b>
              <span className="text-[12px] font-semibold">{l.end}</span>
            </div>
            <div className="flex-1 min-w-0 p-3.5">
              <p className="text-[15px] font-semibold truncate">{l.subject}</p>
              <p className="text-[11px] text-slate-500 mt-3">{l.teacher}</p>
              <div className="flex justify-between text-[12px] text-slate-600 mt-3"><span>{l.type}</span><span>{l.room}</span></div>
            </div>
          </div>
        ))}
        {!lessons.length && (
          <div className="fade-in flex flex-col items-center pt-16 text-center">
            <CalendarX size={52} strokeWidth={1.5} className="text-slate-400" />
            <p className="mt-5 text-[16px] font-medium">{sel.getDate()} {MONTHS_GEN[sel.getMonth()]} {sel.getFullYear()} г.</p>
            <p className="mt-2 text-[13px] text-slate-500">На этот день занятия не найдены</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- HEMIS AI */

const AI_CHIPS = ['Посещаемость', 'GPA и успеваемость', 'Расписание занятий', 'Финансовое состояние', 'Проверка плагиата', 'Road map'];

function aiAnswer(topic: string): string[] {
  const a = attendanceTotals();
  if (topic === 'Посещаемость') {
    return [`В ${CURRENT}-семестре пропущено ${a.total} ч.: ${a.reason} ч. по уважительной причине и ${a.noReason} ч. без причины.`, 'Рекомендация: не пропускайте практические занятия — они сильнее всего влияют на текущий контроль.'];
  }
  if (topic === 'GPA и успеваемость') {
    const rows = gradesOf(CURRENT - 1).slice().sort((x, y) => y.total![0] - x.total![0]);
    return [`Средний балл (GPA): ${STUDENT.gpa}.`, `Лучший результат прошлого семестра: ${rows[0].subject} — ${rows[0].total![0]} / 100.`, `Требует внимания: ${rows[rows.length - 1].subject} — ${rows[rows.length - 1].total![0]} / 100.`];
  }
  if (topic === 'Расписание занятий') {
    const list = lessonsFor(new Date());
    return list.length ? ['Расписание на сегодня:', ...list.map((l) => `${l.start}–${l.end}  ${l.subject} · ${l.type} · ${l.room}`)] : ['Сегодня занятий нет. Хорошее время для самостоятельной подготовки.'];
  }
  if (topic === 'Финансовое состояние') return ['Договор на оплату не найден.', 'Сведения о платежах появятся после заключения договора.'];
  return ['Документы, проверенные через систему антиплагиата, не найдены.'];
}

export function Ai() {
  const nav = useNav();
  const [topic, setTopic] = useState('');
  const [busy, setBusy] = useState(false);

  const choose = (t: string) => {
    if (t === 'Road map') return nav.push('roadmap');
    setTopic(t);
    setBusy(true);
    setTimeout(() => setBusy(false), 1100);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <StatusRow />
      <div className="h-14 shrink-0 flex items-center justify-center relative">
        <h1 className="text-[20px] font-medium">HEMIS AI</h1>
        <Info size={22} className="absolute right-4 text-brand" />
      </div>
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 pb-28">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <span className="text-[30px] font-extrabold tracking-tight">HEMIS <span className="g-ai relative">AI<Sparkles size={12} className="absolute -left-2 -top-1 text-violet-500" /></span></span>
          <span className="flex items-center gap-1 text-[13px] font-medium text-violet-600"><Zap size={13} fill="currentColor" /> AI анализ</span>
        </div>
        <h2 className="text-[22px] font-semibold leading-snug mt-4">Здравствуйте, {STUDENT.fullName}</h2>
        <div className="flex flex-wrap gap-2.5 mt-4">
          {AI_CHIPS.map((c) => (
            <button
              key={c}
              onClick={() => choose(c)}
              className={cx('px-3.5 py-2 rounded-lg text-[14px] border-[1.5px]', topic === c ? 'border-violet-500 bg-white' : 'border-transparent bg-slate-100')}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-3">
          <div className="flex items-center justify-between px-1 pb-3">
            <span className="flex items-center gap-2 text-[14px] font-semibold"><CircleCheck size={17} className="text-violet-600" /> Результат анализа</span>
            <button onClick={() => topic && choose(topic)} className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-[14px]">
              <MessageSquareText size={15} className="text-brand" /> Обсудить
            </button>
          </div>
          <div className="min-h-[230px] rounded-xl p-4 text-[15px] leading-relaxed" style={{ background: 'linear-gradient(135deg,#eef0f6,#f6ecee)' }}>
            {busy ? <Dots label="ИИ анализирует..." /> : topic ? (
              <div className="fade-in space-y-2">{aiAnswer(topic).map((line) => <p key={line}>{line}</p>)}</div>
            ) : (
              <p className="text-slate-500">Выберите тему выше, и ассистент проанализирует ваши учебные данные.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- Subjects */

export function Subjects() {
  const nav = useNav();
  const [sem, setSem] = useState(CURRENT);
  const list = subjectsOf(sem);
  return (
    <div className="flex flex-col h-full bg-[#f2f3f7]">
      <div className="shrink-0 bg-[#e6e9f1]">
        <StatusRow />
        <div className="h-14 flex items-center px-3 relative">
          <button onClick={nav.openDrawer} aria-label="Меню" className="w-10 h-10 grid place-items-center"><Menu size={26} /></button>
          <h1 className="absolute left-1/2 -translate-x-1/2 text-[20px] font-medium">Предметы</h1>
          <span className="ml-auto"><SemPick value={sem} onChange={setSem} /></span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 pt-3 pb-28 space-y-3.5">
        {list.map((s) => (
          <div key={s.name} className="bg-white rounded-xl border border-slate-200/80 shadow-[0_1px_4px_rgba(0,0,0,.06)] p-4">
            <p className="text-[15px] font-semibold">{s.name}</p>
            <p className="text-[13px] text-slate-700 mt-2.5">{s.kind} <i className="not-italic text-slate-400 mx-1.5">|</i> {s.hours} часов <i className="not-italic text-slate-400 mx-1.5">|</i> {s.credits} кредитов</p>
            <div className="flex items-end gap-5 mt-5">
              <div className="text-brand"><b className="text-[19px] font-semibold">0 / 0</b><p className="text-[13px] mt-0.5">Задания</p></div>
              <div className="flex-1 h-1 rounded-full bg-blue-100 mb-7" />
              <span className="text-brand text-[13px] font-medium mb-5">0%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------- All */

const ALL = [
  { label: 'Unilibrary', icon: Library, web: 'unilibrary.uz' },
  { label: 'Баллы GPA', icon: TrendingUp, to: 'gpa' },
  { label: 'Все документы', icon: Folder, to: 'docs' },
  { label: 'Дневные оценки', icon: NotebookText, to: 'daily' },
  { label: 'Задания', icon: ListChecks, to: 'tasks' },
  { label: 'О высшем учебном заведении', icon: Info, to: 'university' },
  { label: 'Опросы', icon: ClipboardList, to: 'surveys' },
  { label: 'Посещаемость', icon: CircleCheck, to: 'attendance' },
  { label: 'Предметы', icon: BookOpen, tab: 'subjects' },
  { label: 'Расписание экзаменов', icon: CalendarDays, to: 'examSchedule' },
  { label: 'Рейтинговая книжка', icon: ChartColumn, to: 'grades' },
  { label: 'Студенческий ID — удостоверение', icon: IdCard, to: 'studentId' },
  { label: 'Успеваемость', icon: TrendingUp, to: 'grades' },
  { label: 'Финансовый платеж', icon: ReceiptText, to: 'finance' },
];

export function All() {
  const nav = useNav();
  return (
    <div className="flex flex-col h-full bg-[#f2f3f7]">
      <div className="shrink-0 bg-[#1560bd] text-white">
        <StatusRow light />
        <div className="h-14 flex items-center justify-between px-3">
          <button onClick={nav.openDrawer} aria-label="Меню" className="w-10 h-10 grid place-items-center"><Menu size={26} /></button>
          <h1 className="text-[20px] font-medium">Все</h1>
          <button onClick={nav.logout} aria-label="Выйти" className="w-10 h-10 grid place-items-center"><LogOut size={22} /></button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto no-scrollbar grid grid-cols-2 gap-3 content-start px-4 pt-3 pb-28">
        {ALL.map((it) => (
          <button
            key={it.label}
            onClick={() => (it.web ? nav.askWeb(it.web) : it.tab ? nav.setTab(it.tab) : nav.push(it.to!))}
            className="h-[76px] bg-white rounded-xl flex items-center gap-2 px-3 text-left shadow-[0_1px_3px_rgba(0,0,0,.05)] active:scale-[.97] transition-transform"
          >
            <span className="flex-1 text-[14px] font-medium leading-snug line-clamp-2">{it.label}</span>
            <it.icon size={19} className="shrink-0 text-[#2f7cf6]" />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ Bottom nav */

const TABS = [
  { id: 'home', label: 'Главная', icon: House },
  { id: 'schedule', label: 'Расписание', icon: CalendarDays },
  { id: 'ai', label: 'HEMIS AI', icon: Sparkles },
  { id: 'subjects', label: 'Предметы', icon: BookOpen },
  { id: 'all', label: 'Все', icon: LayoutGrid },
];

export function BottomNav({ tab, onChange }: { tab: string; onChange: (t: string) => void }) {
  return (
    <nav className="absolute inset-x-0 bottom-0 z-30 h-[84px] bg-white flex items-start justify-around px-1 pt-2.5 shadow-[0_-2px_10px_rgba(0,0,0,.05)]">
      {TABS.map((t) => {
        const on = tab === t.id;
        return (
          <button key={t.id} onClick={() => onChange(t.id)} className="flex-1 flex flex-col items-center gap-1.5">
            <span className={cx('w-[66px] h-9 grid place-items-center rounded-full transition-colors', on ? 'bg-brand-dark text-white' : 'text-[#2f8be6]')}>
              {t.id === 'ai' ? <b className="relative text-[18px] font-extrabold">AI<Sparkles size={10} className="absolute -left-2.5 -top-0.5" /></b> : <t.icon size={24} strokeWidth={1.8} />}
            </span>
            <span className={cx('text-[11px]', on ? 'font-bold text-slate-900' : 'font-medium text-slate-700')}>{t.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
