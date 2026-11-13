import { useEffect, useState } from 'react';
import { IdCard, LogOut, User } from 'lucide-react';
import { STUDENT } from './data';
import { SCREENS } from './screens';
import { Ai, All, BottomNav, Home, Schedule, Subjects } from './tabs';
import { Avatar, NavCtx, StatusRow, type NavApi } from './ui';

type Route = { name: string; params?: any; id: number };

const TAB_VIEWS: Record<string, () => any> = { home: Home, schedule: Schedule, ai: Ai, subjects: Subjects, all: All };

function Logo({ size = 120 }: { size?: number }) {
  return (
    <span className="grid place-items-center rounded-full bg-[#0a84ff] text-white font-black" style={{ width: size, height: size, fontSize: size * 0.62, lineHeight: 1 }}>
      H
    </span>
  );
}

/** Splash, then the entry screen. There are no credential fields on purpose. */
function Welcome({ onEnter }: { onEnter: () => void }) {
  const [splash, setSplash] = useState(true);
  useEffect(() => {
    const id = setTimeout(() => setSplash(false), 1100);
    return () => clearTimeout(id);
  }, []);
  if (splash) {
    return <div className="h-full bg-[#f2f3f7] flex flex-col"><StatusRow /><div className="flex-1 grid place-items-center pb-16"><Logo size={136} /></div></div>;
  }
  return (
    <div className="fade-in g-head h-full flex flex-col text-white">
      <StatusRow light />
      <div className="flex-1 flex flex-col items-center justify-center gap-5 px-8 text-center">
        <Logo size={84} />
        <h1 className="text-[32px] font-extrabold tracking-tight">HEMIS</h1>
        <p className="text-[14px] leading-relaxed opacity-85">Студенческий кабинет</p>
        <button onClick={onEnter} className="mt-4 w-full h-[54px] rounded-2xl bg-white text-brand-dark text-[17px] font-bold active:scale-[.98] transition-transform">
          Войти
        </button>
      </div>
    </div>
  );
}

function Drawer({ nav, onClose }: { nav: NavApi; onClose: () => void }) {
  const go = (fn: () => void) => () => { onClose(); fn(); };
  return (
    <div className="fade-in absolute inset-0 z-40 bg-black/40" onClick={onClose}>
      <div className="h-full w-[78%] bg-white flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="g-head text-white pb-5">
          <StatusRow light />
          <div className="flex items-center gap-3 px-4 pt-3">
            <Avatar size={52} text={STUDENT.initials} />
            <div className="min-w-0"><b className="block text-[16px] truncate">{STUDENT.short}</b><span className="text-[12px] opacity-80">{STUDENT.group} · {STUDENT.course}</span></div>
          </div>
        </div>
        <div className="flex-1 py-2 text-[15px] font-medium">
          <button onClick={go(() => nav.push('profile'))} className="w-full flex items-center gap-4 px-5 h-[52px]"><User size={20} className="text-brand" /> Личные данные</button>
          <button onClick={go(() => nav.push('studentId'))} className="w-full flex items-center gap-4 px-5 h-[52px]"><IdCard size={20} className="text-brand" /> Студенческий ID</button>
          <button onClick={go(nav.logout)} className="w-full flex items-center gap-4 px-5 h-[52px] text-red-600"><LogOut size={20} /> Выйти</button>
        </div>
      </div>
    </div>
  );
}

function WebDialog({ host, onClose }: { host: string; onClose: () => void }) {
  return (
    <div className="fade-in absolute inset-0 z-50 grid place-items-center bg-black/45 px-7" onClick={onClose}>
      <div className="w-full bg-[#eceaf4] rounded-[28px] p-6" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-[22px]">Переход на веб-сайт</h2>
        <p className="text-[14px] leading-relaxed mt-4">Разрешаете ли вы переход на веб-сайт {host}?</p>
        <div className="flex justify-end items-center gap-3 mt-7">
          <button onClick={onClose} className="px-5 h-10 text-[14px] font-medium text-brand-dark">Нет</button>
          <a href={`https://${host}`} target="_blank" rel="noopener noreferrer" onClick={onClose} className="grid place-items-center px-6 h-10 rounded-full bg-[#2196f3] text-white text-[14px] font-medium">Да</a>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [entered, setEntered] = useState(false);
  const [tab, setTab] = useState('home');
  const [stack, setStack] = useState<Route[]>([]);
  const [drawer, setDrawer] = useState(false);
  const [web, setWeb] = useState('');

  const nav: NavApi = {
    push: (name, params) => setStack((s) => [...s, { name, params, id: Date.now() }]),
    pop: () => setStack((s) => s.slice(0, -1)),
    setTab: (t) => { setStack([]); setTab(t); },
    logout: () => { setStack([]); setDrawer(false); setTab('home'); setEntered(false); },
    openDrawer: () => setDrawer(true),
    askWeb: setWeb,
  };

  const top = stack[stack.length - 1];
  const Screen = top && SCREENS[top.name];
  const TabView = TAB_VIEWS[tab];

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center sm:py-4">
      <div className="relative w-full h-[100dvh] sm:w-[393px] sm:h-[852px] sm:max-h-[calc(100dvh-64px)] overflow-hidden bg-[#f2f3f7] sm:rounded-[48px] sm:border-[3px] sm:border-black/15 sm:shadow-2xl">
        <div className="hidden sm:block absolute top-0 left-1/2 -translate-x-1/2 w-[112px] h-[30px] bg-[#111] rounded-b-[20px] z-[100]" />
        <NavCtx.Provider value={nav}>
          {!entered ? <Welcome onEnter={() => setEntered(true)} /> : Screen ? (
            <Screen key={top.id} {...top.params} />
          ) : (
            <>
              <TabView />
              <BottomNav tab={tab} onChange={nav.setTab} />
            </>
          )}
          {drawer && <Drawer nav={nav} onClose={() => setDrawer(false)} />}
          {web && <WebDialog host={web} onClose={() => setWeb('')} />}
        </NavCtx.Provider>
      </div>
    </div>
  );
}
