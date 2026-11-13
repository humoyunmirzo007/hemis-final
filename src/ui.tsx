import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { ArrowLeft, BatteryMedium, ChevronDown, Signal, Wifi } from 'lucide-react';
import { SEMESTERS } from './data';

export type NavApi = {
  push: (name: string, params?: any) => void;
  pop: () => void;
  setTab: (tab: string) => void;
  logout: () => void;
  openDrawer: () => void;
  askWeb: (host: string) => void;
};

export const NavCtx = createContext<NavApi>(null as any);
export const useNav = () => useContext(NavCtx);

export const cx = (...parts: any[]) => parts.filter(Boolean).join(' ');

const clock = () => new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

/** Fake phone status bar. */
export function StatusRow({ light }: { light?: boolean }) {
  const [time, setTime] = useState(clock());
  useEffect(() => {
    const id = setInterval(() => setTime(clock()), 20000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className={cx('h-11 shrink-0 flex items-end justify-between px-6 pb-1.5 text-[14px] font-semibold', light ? 'text-white' : 'text-slate-900')}>
      <span>{time}</span>
      <span className="flex items-center gap-1.5">
        <Signal size={14} />
        <Wifi size={14} />
        <BatteryMedium size={18} />
      </span>
    </div>
  );
}

type PageProps = {
  title: string;
  right?: ReactNode;
  children?: ReactNode;
  bg?: string;
  blueTitle?: boolean;
  pad?: boolean;
};

/** Inner screen: status bar, back arrow, title, scrolling body. */
export function Page({ title, right, children, bg = 'bg-[#f2f3f7]', blueTitle, pad = true }: PageProps) {
  const { pop } = useNav();
  return (
    <div className={cx('screen-in flex flex-col h-full', bg)}>
      <StatusRow />
      <div className="h-14 shrink-0 flex items-center gap-1 px-2">
        <button onClick={pop} aria-label="Назад" className="w-10 h-10 shrink-0 grid place-items-center rounded-full active:bg-black/5">
          <ArrowLeft size={22} />
        </button>
        <h1 className={cx('flex-1 truncate text-[20px] font-semibold', blueTitle && 'text-brand text-center')}>{title}</h1>
        {right}
      </div>
      <div className={cx('flex-1 overflow-y-auto no-scrollbar', pad && 'px-4 pb-8')}>{children}</div>
    </div>
  );
}

export function EmptyBox({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="fade-in flex flex-col items-center pt-14 text-center">
      <svg width="210" height="178" viewBox="0 0 200 170" fill="none" aria-hidden="true">
        <path d="M150 12h28a10 10 0 0 1 10 10v16a10 10 0 0 1-10 10h-14l-10 9v-9h-4a10 10 0 0 1-10-10V22a10 10 0 0 1 10-10z" fill="#d9dce3" />
        <circle cx="158" cy="30" r="3" fill="#fff" />
        <rect x="165" y="27" width="6" height="6" fill="#fff" />
        <circle cx="178" cy="30" r="3" fill="#fff" />
        <rect x="52" y="40" width="96" height="90" rx="6" fill="#f3f4f7" />
        <rect x="66" y="54" width="68" height="34" rx="3" fill="#dcdfe6" />
        <rect x="66" y="98" width="68" height="5" rx="2.5" fill="#dcdfe6" />
        <rect x="66" y="110" width="68" height="5" rx="2.5" fill="#dcdfe6" />
        <path d="M30 118l22-30v30z" fill="#b4bcc8" />
        <path d="M170 118l-22-30v30z" fill="#b4bcc8" />
        <path d="M30 118h40a6 6 0 0 1 6 6 6 6 0 0 0 6 6h36a6 6 0 0 0 6-6 6 6 0 0 1 6-6h40v38a8 8 0 0 1-8 8H38a8 8 0 0 1-8-8z" fill="#dcdfe6" />
      </svg>
      <p className="mt-6 text-[16px] font-semibold text-slate-700">{title}</p>
      {sub && <p className="mt-2 text-[14px] text-slate-500">{sub}</p>}
    </div>
  );
}

export function Skeletons({ n = 6, h = 'h-[92px]' }: { n?: number; h?: string }) {
  return (
    <div className="space-y-3 pt-2">
      {Array.from({ length: n }, (_, i) => (
        <div key={i} className={cx('skel rounded-2xl', h)} />
      ))}
    </div>
  );
}

export function Dots({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-5 min-h-[420px]">
      <div className="dots grid grid-cols-2 gap-3">
        <i /><i /><i /><i />
      </div>
      {label && <p className="text-brand text-[17px] font-semibold">{label}</p>}
    </div>
  );
}

/** Imitates a network request: false first, true after the delay. */
export function useLoaded(ms = 700, key: any = 0) {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    setOk(false);
    const id = setTimeout(() => setOk(true), ms);
    return () => clearTimeout(id);
  }, [ms, key]);
  return ok;
}

export function SemPick({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative shrink-0">
      <button onClick={() => setOpen(!open)} className="flex items-center gap-1 px-2 py-2 text-[15px] font-medium">
        {value}-semestr
        <ChevronDown size={16} />
      </button>
      {open && (
        <div className="fade-in absolute right-1 top-10 z-30 w-36 max-h-72 overflow-y-auto bg-white rounded-xl shadow-xl py-1">
          {SEMESTERS.map((s) => (
            <button
              key={s.id}
              onClick={() => { onChange(s.id); setOpen(false); }}
              className={cx('block w-full text-left px-4 py-2 text-[14px]', s.id === value && 'text-brand font-semibold')}
            >
              {s.id}-semestr
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function Chips({ items, value, onChange }: { items: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 py-1">
      {items.map((it) => (
        <button
          key={it}
          onClick={() => onChange(it)}
          className={cx(
            'shrink-0 px-4 py-2 rounded-xl border text-[14px] font-semibold whitespace-nowrap',
            value === it ? 'bg-blue-50 border-brand text-brand' : 'bg-white border-slate-200 text-slate-800',
          )}
        >
          {it}
        </button>
      ))}
    </div>
  );
}

export function Avatar({ size = 36, text }: { size?: number; text: string }) {
  return (
    <span
      className="shrink-0 grid place-items-center rounded-full bg-white text-brand font-bold"
      style={{ width: size, height: size, fontSize: size * 0.36 }}
    >
      {text}
    </span>
  );
}
