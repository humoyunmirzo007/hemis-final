import { useEffect, useState, type ReactNode } from 'react';
import {
  Award, Building2, ChevronDown, ChevronRight, CreditCard, Download, Eye, File as FileIcon, FileCheck, FileText, Files,
  Gavel, House, IdCard, Inbox, Info, Landmark, List, MapPin, Megaphone, Plus, ReceiptText, RefreshCw, SwitchCamera,
  TriangleAlert, User, X, ZapOff,
} from 'lucide-react';
import {
  ABSENCES, CURRENT, DOCS, EXAMS, EXAM_KINDS, ROADMAP, SEMESTERS, STORIES, STUDENT, attendanceTotals, gradesOf,
  type Score,
} from './data';
import { Avatar, Chips, Dots, EmptyBox, Page, SemPick, Skeletons, StatusRow, cx, useLoaded, useNav } from './ui';

/* ---------------------------------------------------------------- Grades */

function Pill({ v, total }: { v: Score; total?: boolean }) {
  if (!v) return <span className="pill border-slate-300 text-slate-400">— / —</span>;
  const ratio = v[1] ? v[0] / v[1] : 0;
  const color = total ? 'border-brand text-slate-900' : ratio === 0 ? 'border-red-400 text-red-500' : ratio >= 0.85 ? 'border-green-500 text-green-600' : 'border-amber-500 text-amber-600';
  return <span className={cx('pill', color)}>{v[0]} / {v[1]}</span>;
}

function GradeTable({ sem }: { sem: number }) {
  const ok = useLoaded(600, sem);
  const rows = gradesOf(sem);
  const cols = 'grid grid-cols-[1fr_54px_54px_54px_58px] items-center gap-1';
  return (
    <div className="px-4 pb-4">
      <div className={cx(cols, 'text-[10px] font-semibold text-center pb-2')}>
        <span className="text-left text-[13px]">Предметы</span><span>Тек. контр.</span><span>Промеж. контр.</span><span>Итоговый</span><span>Общий</span>
      </div>
      {!ok && <div className="h-1 rounded-full bg-indigo-100 overflow-hidden"><div className="bar-run h-full w-1/3 rounded-full bg-indigo-800" /></div>}
      {ok && !rows.length && <p className="text-center text-[13px] text-slate-500 py-3">Данные за этот семестр пока отсутствуют</p>}
      {ok && rows.map((r) => (
        <div key={r.subject} className={cx(cols, 'fade-in text-center py-2.5 border-t border-slate-100')}>
          <span className="text-left text-[11px] font-medium leading-tight line-clamp-2">{r.subject}</span>
          <span><Pill v={r.cur} /></span><span><Pill v={r.mid} /></span><span><Pill v={r.fin} /></span><span><Pill v={r.total} total /></span>
        </div>
      ))}
    </div>
  );
}

function Grades() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <Page title="Успеваемость">
      <div className="space-y-3 pt-2">
        {SEMESTERS.map((s) => (
          <div key={s.id} className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_4px_rgba(0,0,0,.05)]">
            <button onClick={() => setOpen(open === s.id ? null : s.id)} className="w-full h-[62px] flex items-center px-4 text-left">
              <b className="text-[19px] font-extrabold">{s.id}-semestr</b>
              <span className="flex-1 ml-2 text-[12px] text-slate-500 truncate">({s.range})</span>
              <ChevronRight size={18} className={cx('text-brand-dark transition-transform', open === s.id && 'rotate-90')} />
            </button>
            {open === s.id && <GradeTable sem={s.id} />}
          </div>
        ))}
      </div>
    </Page>
  );
}

/* --------------------------------------------------------- Simple lists */

function Tasks() {
  const [sem, setSem] = useState(CURRENT);
  const [tab, setTab] = useState('Выдано');
  return (
    <Page title="Задания" right={<SemPick value={sem} onChange={setSem} />}>
      <div className="flex gap-7 px-2 border-b border-transparent">
        {['Все', 'Выдано', 'Отправлено', 'Оценено'].map((t) => (
          <button key={t} onClick={() => setTab(t)} className={cx('py-3 text-[14px] font-medium border-b-2', tab === t ? 'text-brand border-brand' : 'text-slate-600 border-transparent')}>{t}</button>
        ))}
      </div>
      <EmptyBox title="Задания отсутствуют" />
    </Page>
  );
}

function Exams() {
  const ok = useLoaded(900);
  return <Page title="Экзамены">{ok ? <EmptyBox title="Тесты отсутствуют" sub="Тесты пока не найдены" /> : <Skeletons n={3} h="h-[240px]" />}</Page>;
}

function Daily() {
  const ok = useLoaded(700);
  return <Page title="Дневные оценки">{ok ? <EmptyBox title="Оценки отсутствуют" sub="За текущий семестр оценок пока нет" /> : <Skeletons />}</Page>;
}

function Notifications() {
  return <Page title="Уведомления"><EmptyBox title="Уведомлений нет" /></Page>;
}

/* --------------------------------------------------------------- Roadmap */

function Roadmap() {
  const [run, setRun] = useState(0);
  const [shown, setShown] = useState(-1);
  useEffect(() => {
    setShown(-1);
    let n = -1;
    let id: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      id = setInterval(() => {
        n += 1;
        setShown(n);
        if (n >= ROADMAP.length - 1) clearInterval(id);
      }, 550);
    }, 1200);
    return () => { clearTimeout(start); clearInterval(id); };
  }, [run]);

  return (
    <Page
      title="Путь к успеху"
      bg="bg-white"
      blueTitle
      right={<button onClick={() => setRun(run + 1)} aria-label="Обновить" className="w-10 h-10 grid place-items-center text-brand"><RefreshCw size={20} /></button>}
    >
      {shown < 0 ? <Dots label="ИИ анализирует..." /> : (
        <div className="pt-4 pl-2">
          {ROADMAP.slice(0, shown + 1).map(([title, text], i) => (
            <div key={title} className="fade-in relative flex gap-6 pb-7">
              <span className="absolute left-[17px] top-9 bottom-0 w-[3px] rounded bg-sky-300" />
              <span className="relative z-10 w-9 h-9 shrink-0 grid place-items-center rounded-full bg-brand text-white text-[15px] font-bold shadow-md">{i + 1}</span>
              <div className="pt-0.5">
                <h3 className="text-[18px] font-semibold leading-snug text-brand-dark">Этап {i + 1}: {title}</h3>
                <p className="text-[14px] leading-relaxed text-brand mt-3">{text}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Page>
  );
}

/* ------------------------------------------------------------- Exam list */

function ExamSchedule() {
  const [sem, setSem] = useState(CURRENT);
  const [kind, setKind] = useState('Все');
  const list = sem === CURRENT ? EXAMS.filter((e) => kind === 'Все' || e.kindName === kind) : [];
  return (
    <Page title="Расписание экзаменов" right={<SemPick value={sem} onChange={setSem} />}>
      <Chips items={['Все', ...EXAM_KINDS]} value={kind} onChange={setKind} />
      <div className="space-y-3.5 mt-4">
        {list.map((e) => (
          <div key={e.subject + e.day} className="fade-in flex bg-white rounded-2xl p-3.5 shadow-[0_1px_4px_rgba(0,0,0,.05)]">
            <div className="w-[84px] shrink-0 border-r border-slate-200 pr-2">
              <b className="text-[19px]">{e.day}</b>
              <p className="text-[11px] leading-[1.5] font-medium mt-1">{e.month}<br />{e.year} г.<br />{e.wd}</p>
            </div>
            <div className="flex-1 min-w-0 pl-3.5">
              <div className="flex items-start gap-2">
                <p className="flex-1 text-[15px] font-medium leading-snug line-clamp-2">{e.subject}</p>
                <span className="shrink-0 px-2 py-1 rounded-md bg-slate-100 text-[9px] font-bold tracking-wide uppercase text-brand-dark">{e.kindName}</span>
              </div>
              <p className="flex items-center gap-2 text-[13px] font-medium mt-2"><User size={14} className="text-slate-400" />{e.teacher}</p>
              <p className="flex items-center gap-2 text-[13px] font-medium mt-1.5"><MapPin size={14} className="text-slate-400" /><span className="flex-1">{e.room}</span><span>{e.time}</span></p>
            </div>
          </div>
        ))}
        {!list.length && <EmptyBox title="Экзамены не найдены" />}
      </div>
    </Page>
  );
}

/* ------------------------------------------------------------- Documents */

const DOC_MENU = [
  { kind: 'all', title: 'Все документы студента', icon: Files },
  { kind: 'ref', title: 'O‘qish joyidan ma’lumotnoma', icon: IdCard },
  { kind: 'call', title: 'Повестка', icon: Megaphone },
  { kind: 'pay', title: 'Сведения о платежном договоре студента за текущий год', icon: ReceiptText },
  { kind: 'orders', title: 'Приказы студента', icon: Gavel },
  { kind: 'other', title: 'Другие документы студента', icon: FileText },
  { kind: 'cert', title: 'Сведения о сертификатах студента', icon: Award },
  { kind: 'plag', title: 'Документы студента, проверенные через систему антиплагиата', icon: FileCheck },
];

function Docs() {
  const nav = useNav();
  return (
    <Page title="Все документы">
      <div className="space-y-2.5 pt-2">
        {DOC_MENU.map((d) => (
          <button key={d.kind} onClick={() => nav.push('docList', d)} className="w-full min-h-[72px] flex items-center gap-3.5 bg-white rounded-xl px-3.5 py-3 text-left shadow-[0_1px_3px_rgba(0,0,0,.06)]">
            <span className="w-11 h-11 shrink-0 grid place-items-center rounded-lg bg-slate-100 text-brand-dark"><d.icon size={21} /></span>
            <span className="flex-1 text-[15px] font-medium leading-snug">{d.title}</span>
            <ChevronRight size={18} className="text-slate-400" />
          </button>
        ))}
      </div>
    </Page>
  );
}

function DocCard({ title, tag, rows, action }: { title: string; tag: string; rows: string[][]; action: ReactNode }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-[0_2px_8px_rgba(0,0,0,.06)]">
      <div className="flex items-center gap-3.5">
        <span className="w-11 h-11 shrink-0 grid place-items-center rounded-lg bg-slate-100 text-brand-dark"><FileIcon size={21} /></span>
        <div className="flex-1 min-w-0"><p className="text-[14px] font-medium line-clamp-2">{title}</p><p className="text-[11px] tracking-wide text-slate-500 mt-1">{tag}</p></div>
        {action}
      </div>
      {rows.length > 0 && (
        <div className="mt-5 px-2 space-y-2">
          {rows.map(([k, v]) => <p key={k} className="flex text-[12px]"><span className="w-[130px] shrink-0 font-medium">{k}</span><span>{v}</span></p>)}
        </div>
      )}
    </div>
  );
}

function DocList({ kind, title }: { kind: string; title: string }) {
  const ok = useLoaded(800);
  let body: ReactNode = <EmptyBox title="Документы не найдены" />;
  if (kind === 'all' || kind === 'other') {
    body = <div className="space-y-3.5 pt-2">{DOCS.map((d) => <div key={d.title}><DocCard {...d} action={<Eye size={24} />} /></div>)}</div>;
  }
  if (kind === 'orders') {
    body = (
      <div className="pt-2">
        <DocCard
          title="Talabalar safiga qabul qilish to‘g‘risida"
          tag="FILE   2-сентября, 2024"
          rows={[['Номер:', '000-son'], ['Тип приказа:', 'O‘qishga qabul qilish'], ['Отдел:', STUDENT.faculty], ['Дата:', '02.09.2024']]}
          action={<Download size={22} />}
        />
      </div>
    );
  }
  return (
    <Page title={title} bg="bg-[#f9f8fd]">
      {ok ? body : <Skeletons />}
      {ok && kind === 'ref' && (
        <span className="absolute right-5 bottom-8 w-[60px] h-[60px] grid place-items-center rounded-2xl bg-brand text-white shadow-lg"><Plus size={24} /></span>
      )}
    </Page>
  );
}

/* --------------------------------------------------------------- Surveys */

function Surveys() {
  const ok = useLoaded(800);
  const groups = [['Не начато', 'bg-amber-700'], ['В процессе', 'bg-fuchsia-600'], ['Завершено', 'bg-green-600']];
  return (
    <Page title="Опросы">
      {!ok ? <Skeletons n={4} h="h-[150px]" /> : groups.map(([name, bar]) => (
        <div key={name} className="fade-in mb-7">
          <div className="flex items-center gap-3 mb-4"><i className={cx('w-1 h-6 rounded', bar)} /><b className="text-[17px] font-semibold">{name}</b><span className="px-3 py-1 rounded-full bg-slate-200 text-[12px] font-semibold">0</span></div>
          <div className="h-[220px] bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center gap-4 text-slate-400">
            <Inbox size={56} strokeWidth={1.4} />
            <p className="text-[15px] font-medium text-slate-500">Опросы отсутствуют</p>
          </div>
        </div>
      ))}
    </Page>
  );
}

/* --------------------------------------------------------------- Finance */

const FIN = [
  { title: 'Платеж по контракту', icon: CreditCard, to: 'contract', tab: 0 },
  { title: 'Договор кредитного модуля', icon: Landmark, to: 'plain', name: 'Договор кредитного модуля' },
  { title: 'Платежи за аренду', icon: Building2, to: 'plain', name: 'Платежи за аренду' },
  { title: 'Договор общежития', icon: House, to: 'contract', tab: 1 },
];

function Finance() {
  const nav = useNav();
  return (
    <Page title="Финансовый платеж" right={<span className="w-10 h-10 grid place-items-center"><List size={20} /></span>}>
      <div className="grid grid-cols-2 gap-3 pt-2">
        {FIN.map((f) => (
          <button key={f.title} onClick={() => nav.push(f.to, f)} className="h-[76px] flex items-center gap-2 bg-white rounded-xl px-3 text-left shadow-[0_1px_3px_rgba(0,0,0,.05)]">
            <span className="flex-1 text-[14px] font-medium leading-snug line-clamp-2">{f.title}</span>
            <f.icon size={19} className="shrink-0 text-[#2f7cf6]" />
          </button>
        ))}
      </div>
    </Page>
  );
}

function Contract({ tab = 0 }: { tab?: number }) {
  const [cur, setCur] = useState(tab);
  const ok = useLoaded(900, cur);
  return (
    <Page title="Финансовый платеж">
      <div className="flex">
        {['Платеж по контракту', 'Договор общежития'].map((t, i) => (
          <button key={t} onClick={() => setCur(i)} className={cx('flex-1 py-3 text-[13px] font-medium border-b-2', cur === i ? 'text-brand border-brand' : 'text-slate-500 border-transparent')}>{t}</button>
        ))}
      </div>
      {!ok ? <Dots /> : cur === 0 ? (
        <div className="fade-in mt-5 bg-white rounded-xl border border-slate-200 shadow-sm p-5 text-center">
          <p className="flex items-center justify-center gap-2 text-[17px] font-semibold text-red-500"><TriangleAlert size={17} /> Договор не найден!</p>
          <p className="text-[15px] leading-relaxed mt-3">Если вы студент государственного вуза, <b className="text-brand font-semibold">kontrakt.edu.uz</b>, если вы студент негосударственного вуза <b className="text-brand font-semibold">shartnoma.edu.uz</b> через указанную систему вы можете получить информацию о ваших платежах.</p>
        </div>
      ) : (
        <div className="fade-in mt-5 flex items-center gap-3.5 bg-white rounded-xl border border-slate-200 shadow-sm p-4">
          <span className="w-11 h-11 grid place-items-center rounded-full bg-slate-100 text-brand-dark"><Info size={20} /></span>
          <b className="text-[14px] font-semibold">Договор общежития не найден</b>
        </div>
      )}
    </Page>
  );
}

function Plain({ name }: { name: string }) {
  const ok = useLoaded(1100);
  return <Page title={name}>{ok ? <EmptyBox title="Данные не найдены" /> : <Dots />}</Page>;
}

/* ------------------------------------------------------------ Attendance */

function Attendance() {
  const [subject, setSubject] = useState('Все');
  const a = attendanceTotals();
  const names = ['Все', ...Array.from(new Set(ABSENCES.map((x) => x.subject)))];
  const list = ABSENCES.filter((x) => subject === 'Все' || x.subject === subject);
  const stats = [['Итого', a.total, 'bg-slate-200/80'], ['Причина', a.reason, 'bg-green-100'], ['Без причины', a.noReason, 'bg-red-100']] as const;
  return (
    <Page title="Посещаемость" right={<span className="px-2 text-[17px] font-medium">{CURRENT} -семестр</span>}>
      <div className="grid grid-cols-3 gap-2 pt-1">
        {stats.map(([label, n, bg]) => (
          <div key={label} className={cx('rounded-xl py-2.5 text-center', bg)}><p className="text-[12px] font-medium">{label}</p><b className="text-[15px] font-semibold">{n} часов</b></div>
        ))}
      </div>
      <div className="mt-4"><Chips items={names} value={subject} onChange={setSubject} /></div>
      <div className="space-y-3 mt-4">
        {list.map((x) => (
          <div key={x.date + x.start} className="fade-in flex bg-white rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,.08)]">
            <div className="w-[68px] shrink-0 bg-slate-100 flex flex-col items-center justify-between py-4 text-slate-600">
              <b className="text-[15px] tracking-wider">{x.start}</b><span className="text-[11px] tracking-wider">{x.end}</span>
            </div>
            <div className="flex-1 min-w-0 px-3.5 py-3">
              <p className="flex justify-between text-[13px] font-semibold"><span>{x.type}</span><span>{x.date}</span></p>
              <p className="text-[13px] font-semibold mt-1.5">{x.teacher}</p>
              <p className="flex items-center justify-between mt-1 text-[15px]">
                <span>Итого: <b>{x.hours}</b></span>
                <span className={cx('px-2.5 py-1 rounded-lg text-[11px] font-semibold', x.reason ? 'bg-green-100 text-green-700' : 'bg-red-50 text-red-600')}>{x.reason ? 'Причина' : 'Без причины'}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </Page>
  );
}

/* ------------------------------------------------------- QR and stories */

function Qr() {
  const { pop } = useNav();
  return (
    <div className="screen-in flex flex-col h-full bg-black text-white">
      <StatusRow light />
      <div className="h-14 flex items-center gap-1 px-2">
        <button onClick={pop} aria-label="Назад" className="w-10 h-10 grid place-items-center"><X size={22} /></button>
        <h1 className="flex-1 text-[20px] font-medium text-white/80">QR-Посещаемость</h1>
        <ZapOff size={20} className="mx-2" /><SwitchCamera size={20} className="mx-2" />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center gap-10 px-8 text-center">
        <div className="w-[240px] h-[240px] rounded-3xl border-2 border-white/60" />
        <p className="text-[14px] text-white/60">Поместите QR код в рамку</p>
      </div>
    </div>
  );
}

function Story({ i = 0 }: { i?: number }) {
  const nav = useNav();
  const [n, setN] = useState(i);
  const s = STORIES[n];
  useEffect(() => {
    const id = setTimeout(() => (n < STORIES.length - 1 ? setN(n + 1) : nav.pop()), 5000);
    return () => clearTimeout(id);
  }, [n]);
  return (
    <div className="fade-in relative flex flex-col h-full bg-[#111] text-white" onClick={() => (n < STORIES.length - 1 ? setN(n + 1) : nav.pop())}>
      <StatusRow light />
      <div className="flex gap-1 px-2">
        {STORIES.map((x, k) => (
          <span key={x.title} className="flex-1 h-[3px] rounded bg-white/30 overflow-hidden">
            <span key={n} className="block h-full bg-white" style={k < n ? { width: '100%' } : k === n ? { animation: 'story 5s linear forwards' } : { width: 0 }} />
          </span>
        ))}
      </div>
      <div className="flex items-start gap-2 p-3">
        <p className="flex-1 text-[17px] font-medium">{s.title}</p>
        <button onClick={(e) => { e.stopPropagation(); nav.pop(); }} aria-label="Закрыть"><X size={22} /></button>
      </div>
      <div className="flex-1 flex items-center"><div className="w-full h-[250px]" style={{ background: s.bg }} /></div>
      <div className="p-4 pb-8 space-y-3">
        <p className="rounded-lg bg-white/10 p-3.5 text-[14px] leading-relaxed">{s.text}</p>
        {s.more && <button onClick={(e) => { e.stopPropagation(); nav.pop(); nav.setTab('ai'); }} className="w-full h-12 rounded-full bg-[#2196f3] text-[15px] font-medium">Подробнее</button>}
      </div>
    </div>
  );
}

/* ---------------------------------------------------- Profile, ID, misc */

const PROFILE: [string, string[][]][] = [
  ['Паспортные данные', [['Ф.И.О.', STUDENT.fullName], ['Гражданство', 'O‘zbekiston'], ['Паспорт', 'AA •••••••']]],
  ['Образовательная информация', [
    ['Университет', STUDENT.university], ['Факультет', STUDENT.faculty], ['Специальность', STUDENT.specialty], ['Группа', STUDENT.group],
    ['Курс', STUDENT.course], ['Форма обучения', STUDENT.eduForm], ['Тип обучения', STUDENT.eduType], ['Язык обучения', STUDENT.lang],
    ['Форма оплаты', STUDENT.payment], ['Статус студента', STUDENT.status], ['Средний балл', STUDENT.gpa],
  ]],
  ['Постоянный адрес', [['Регион', 'Toshkent shahri'], ['Адрес', 'Yunusobod tumani']]],
  ['Текущий адрес', [['Место проживания', 'O‘z uyida'], ['Социальная категория', 'Boshqa']]],
  ['Дополнительная информация', [['Адрес электронной почты', 'student@example.com'], ['Телефон', '+998 00 000 00 00']]],
];

function Profile() {
  const [open, setOpen] = useState(1);
  return (
    <Page title="Личные данные" bg="bg-[#f9f8fd]">
      <div className="space-y-3 pt-2">
        {PROFILE.map(([name, rows], i) => (
          <div key={name} className="bg-white rounded-xl shadow-[0_1px_4px_rgba(0,0,0,.06)]">
            <button onClick={() => setOpen(open === i ? -1 : i)} className="w-full h-[62px] flex items-center justify-between px-4 text-[15px] font-semibold">
              {name}<ChevronDown size={20} className={cx('transition-transform', open === i && 'rotate-180')} />
            </button>
            {open === i && (
              <div className="fade-in px-4 pb-4 space-y-3">
                {rows.map(([k, v]) => <p key={k} className="flex gap-4 text-[14px]"><span className="w-[42%] shrink-0 text-slate-500">{k}</span><span className="flex-1 text-right">{v}</span></p>)}
              </div>
            )}
          </div>
        ))}
      </div>
    </Page>
  );
}

/** A QR-looking pattern that is deliberately not a valid code. */
function FakeQr() {
  const N = 25;
  let seed = 7;
  const next = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
  const cells: ReactNode[] = [];
  const finder = (x: number, y: number) => [[0, 0], [N - 7, 0], [0, N - 7]].some(([fx, fy]) => x >= fx && x < fx + 7 && y >= fy && y < fy + 7);
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) if (!finder(x, y) && next() > 0.52) cells.push(<rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" />);
  return (
    <svg viewBox={`-1 -1 ${N + 2} ${N + 2}`} className="w-full" role="img" aria-label="Демо QR">
      {cells}
      {[[0, 0], [N - 7, 0], [0, N - 7]].map(([x, y]) => (
        <g key={`${x}${y}`}><rect x={x} y={y} width="7" height="7" /><rect x={x + 1} y={y + 1} width="5" height="5" fill="#fff" /><rect x={x + 2} y={y + 2} width="3" height="3" /></g>
      ))}
      <rect x="6.5" y="9.5" width="12" height="6" rx="1" fill="#fff" stroke="#e11d48" strokeWidth=".3" />
      <text x="12.5" y="13.8" textAnchor="middle" fontSize="3.2" fontWeight="800" fill="#e11d48">DEMO</text>
    </svg>
  );
}

function StudentId() {
  const rows = [['Вуз', STUDENT.university], ['Ф.И.О', STUDENT.fullName], ['ID студента', STUDENT.studentId], ['Факультет', STUDENT.faculty]];
  return (
    <Page title="Студенческий ID — удостоверение" bg="bg-[#f9f8fd]">
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 p-4 mt-2" style={{ background: 'linear-gradient(120deg,#e3f1ee,#eaf0fb 50%,#e6f3ea)' }}>
        <p className="text-[13px] font-bold tracking-wide pb-3 border-b border-slate-300/70">СТУДЕНЧЕСКИЙ БИЛЕТ</p>
        <div className="flex gap-3 pt-3">
          <span className="w-[84px] h-[108px] shrink-0 grid place-items-center rounded-lg bg-slate-300/60"><Avatar size={52} text={STUDENT.initials} /></span>
          <div className="flex-1 min-w-0 space-y-1.5">
            {rows.map(([k, v]) => <p key={k} className="text-[10px] leading-tight"><span className="block text-slate-500">{k}</span>{v}</p>)}
            <p className="flex gap-8 text-[10px] leading-tight"><span><span className="block text-slate-500">Курс</span>{STUDENT.course}</span><span><span className="block text-slate-500">Форма обучения</span>{STUDENT.eduType}</span></p>
          </div>
        </div>
        <span className="pointer-events-none absolute inset-0 grid place-items-center text-[34px] font-black tracking-widest text-rose-600/25 -rotate-[18deg]">ОБРАЗЕЦ</span>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 p-4 mt-6"><FakeQr /></div>
      <p className="text-center text-[12px] text-slate-500 mt-4">Демо-макет. Не является документом, QR-код не считывается.</p>
    </Page>
  );
}

function Gpa() {
  const years = [['2024-2025', '1-kurs', '4.1', 60], ['2025-2026', '2-kurs', '4.3', 60], ['2026-2027', '3-kurs', STUDENT.gpa, 30]];
  return (
    <Page title="Баллы GPA">
      <div className="space-y-3 pt-2">
        {years.map(([year, course, gpa, credits]) => (
          <div key={year} className="flex items-center bg-white rounded-xl p-4 shadow-[0_1px_4px_rgba(0,0,0,.06)]">
            <div className="flex-1"><b className="text-[16px] font-semibold">{year}</b><p className="text-[13px] text-slate-500 mt-1">{course} · {credits} кредитов</p></div>
            <span className="pill border-brand text-brand !h-9 !min-w-[64px] !text-[15px]">{gpa}</span>
          </div>
        ))}
      </div>
    </Page>
  );
}

function University() {
  const rows = [['Название', STUDENT.university], ['Факультет', STUDENT.faculty], ['Учебный год', STUDENT.year], ['Город', 'Toshkent']];
  return (
    <Page title="О высшем учебном заведении">
      <div className="bg-white rounded-xl p-4 mt-2 space-y-3 shadow-[0_1px_4px_rgba(0,0,0,.06)]">
        {rows.map(([k, v]) => <p key={k} className="flex gap-4 text-[14px]"><span className="w-[38%] shrink-0 text-slate-500">{k}</span><span className="flex-1 text-right">{v}</span></p>)}
      </div>
    </Page>
  );
}

export const SCREENS: Record<string, (props: any) => ReactNode> = {
  grades: Grades, tasks: Tasks, exams: Exams, daily: Daily, notifications: Notifications, roadmap: Roadmap,
  examSchedule: ExamSchedule, docs: Docs, docList: DocList, surveys: Surveys, finance: Finance, contract: Contract,
  plain: Plain, attendance: Attendance, qr: Qr, story: Story, profile: Profile, studentId: StudentId, gpa: Gpa,
  university: University,
};
