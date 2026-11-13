// Demo data. Everything here is invented for the mock-up, except the owner's name.

export const STUDENT = {
  fullName: 'TOHIRJONOV XUMOYUNMIRZO',
  short: 'X.Tohirjonov',
  initials: 'XT',
  studentId: '22014890',
  university: 'O‘zbekiston davlat jahon tillari universiteti',
  faculty: 'Software Engineering',
  specialty: 'Software Engineering',
  group: '611-21',
  course: '3-kurs',
  eduForm: 'Kunduzgi',
  eduType: 'Bakalavr',
  lang: 'Rus',
  payment: 'To‘lov-shartnoma',
  status: 'O‘qimoqda',
  gpa: '4.2',
  year: '2026-2027',
};

export const CURRENT = 5;

export const SEMESTERS = [
  { id: 1, range: '2-sen, 2024 > 18-yan, 2025' },
  { id: 2, range: '3-fev, 2025 > 14-iyn, 2025' },
  { id: 3, range: '1-sen, 2025 > 17-yan, 2026' },
  { id: 4, range: '2-fev, 2026 > 13-iyn, 2026' },
  { id: 5, range: '1-sen, 2026 > 16-yan, 2027' },
  { id: 6, range: '1-fev, 2027 > 12-iyn, 2027' },
  { id: 7, range: '6-sen, 2027 > 15-yan, 2028' },
  { id: 8, range: '7-fev, 2028 > 10-iyn, 2028' },
];

const NAMES: Record<number, string[]> = {
  1: ['Oliy matematika', 'Fizika', 'Dasturlash asoslari', 'Ingliz tili', 'O‘zbekistonning eng yangi tarixi'],
  2: ['Diskret matematika', 'Algoritmlar va ma’lumotlar tuzilmasi', 'Obyektga yo‘naltirilgan dasturlash', 'Ingliz tili', 'Falsafa'],
  3: ['Ma’lumotlar bazasi', 'Kompyuter arxitekturasi', 'Ehtimollar nazariyasi', 'Veb-dasturlash asoslari', 'Operatsion tizimlar'],
  4: ['Kompyuter tarmoqlari', 'Dasturiy ta’minot injiniringi', 'Java dasturlash', 'Tizimli tahlil', 'Akademik yozuv'],
  5: ['Mobil ilovalarni ishlab chiqish', 'Ma’lumotlar bazasi tizimlari', 'Mashinali o‘qitish', 'Veb-ilovalar arxitekturasi', 'Dasturiy ta’minotni testlash', 'Kasbiy ingliz tili'],
  6: ['Sun’iy intellekt asoslari', 'Axborot xavfsizligi', 'Bulutli texnologiyalar', 'Loyihalarni boshqarish', 'Ma’lumotlar tahlili'],
  7: ['Taqsimlangan tizimlar', 'DevOps amaliyoti', 'Inson va kompyuter muloqoti', 'Tanlov fani'],
  8: ['Bitiruv malakaviy ishi', 'Malakaviy amaliyot'],
};

export type Subject = { name: string; kind: string; hours: number; credits: number };

export const subjectsOf = (sem: number): Subject[] =>
  (NAMES[sem] || []).map((name, i) => ({
    name,
    kind: i % 3 === 2 ? 'Tanlov' : 'Majburiy',
    hours: i % 2 ? 120 : 180,
    credits: i % 2 ? 4 : 6,
  }));

// Small seeded generator so the demo grades are the same on every launch.
function rnd(seed: number) {
  let s = seed;
  return () => ((s = (s * 9301 + 49297) % 233280) / 233280);
}

export type Score = [number, number] | null;
export type GradeRow = { subject: string; cur: Score; mid: Score; fin: Score; total: Score };

export function gradesOf(sem: number): GradeRow[] {
  if (sem > CURRENT) return [];
  const r = rnd(sem * 97 + 11);
  return (NAMES[sem] || []).map((subject, i) => {
    const withMid = i % 3 !== 0;
    const curMax = withMid ? 30 : 60;
    const pick = (max: number) => Math.round(max * (0.72 + r() * 0.28));
    if (sem === CURRENT) {
      const cur = Math.round(curMax * (0.3 + r() * 0.3));
      return { subject, cur: [cur, curMax], mid: withMid ? [0, 30] : null, fin: [0, 40], total: [cur, 100] };
    }
    const cur = pick(curMax);
    const mid = withMid ? pick(30) : 0;
    const fin = pick(40);
    return { subject, cur: [cur, curMax], mid: withMid ? [mid, 30] : null, fin: [fin, 40], total: [cur + mid + fin, 100] };
  });
}

const TEACHERS = ['RAHIMOV B. T.', 'YUSUPOVA D. K.', 'NAZAROV O. S.', 'ALIYEV J. R.', 'SODIQOVA M. A.', 'TURSUNOV E. I.'];
const SLOTS = [['08:30', '09:50'], ['10:00', '11:20'], ['11:30', '12:50'], ['13:20', '14:40'], ['14:50', '16:10'], ['16:20', '17:40']];
const TYPES = ['Ma’ruza', 'Amaliy', 'Seminar', 'Laboratoriya'];

// weekday (1 = Monday) -> [slot, subject index, type index, room]
const WEEK: Record<number, [number, number, number, string][]> = {
  1: [[0, 0, 0, 'A-201'], [1, 1, 1, 'B-114'], [2, 5, 1, 'C-305']],
  2: [[3, 2, 0, 'A-108'], [4, 3, 2, 'B-210']],
  3: [[1, 4, 3, 'Lab-2'], [2, 0, 1, 'Lab-4'], [3, 1, 0, 'A-201']],
  4: [[3, 3, 0, 'A-305'], [4, 2, 1, 'Lab-1'], [5, 5, 1, 'C-305']],
  5: [[0, 4, 0, 'A-108'], [1, 0, 3, 'Lab-4']],
};

export type Lesson = { start: string; end: string; subject: string; teacher: string; type: string; room: string };

export function lessonsFor(d: Date): Lesson[] {
  const names = NAMES[CURRENT];
  return (WEEK[d.getDay()] || []).map(([slot, si, ti, room]) => ({
    start: SLOTS[slot][0],
    end: SLOTS[slot][1],
    subject: names[si],
    teacher: TEACHERS[si],
    type: TYPES[ti],
    room,
  }));
}

export const EXAM_KINDS = ['Тек. контр.', 'Промеж. контр.', 'Итоговый'];

export const EXAMS = [
  { day: 17, month: 'Ноябрь', year: 2026, wd: 'Вторник', si: 0, kind: 0, room: 'Lab-4', time: '10:00 - 11:20' },
  { day: 19, month: 'Ноябрь', year: 2026, wd: 'Четверг', si: 2, kind: 0, room: 'Lab-1', time: '14:50 - 16:10' },
  { day: 24, month: 'Ноябрь', year: 2026, wd: 'Вторник', si: 3, kind: 0, room: 'B-210', time: '14:50 - 16:10' },
  { day: 2, month: 'Декабрь', year: 2026, wd: 'Среда', si: 1, kind: 1, room: 'A-201', time: '13:20 - 14:40' },
  { day: 9, month: 'Декабрь', year: 2026, wd: 'Среда', si: 4, kind: 1, room: 'Lab-2', time: '10:00 - 11:20' },
  { day: 11, month: 'Январь', year: 2027, wd: 'Понедельник', si: 0, kind: 2, room: 'A-201', time: '08:30 - 09:50' },
  { day: 14, month: 'Январь', year: 2027, wd: 'Четверг', si: 5, kind: 2, room: 'C-305', time: '10:00 - 11:20' },
].map((e) => ({ ...e, subject: NAMES[CURRENT][e.si], teacher: TEACHERS[e.si], kindName: EXAM_KINDS[e.kind] }));

export const ABSENCES = [
  { si: 0, start: '08:30', end: '09:50', type: 'Ma’ruza', date: '02.11.2026', hours: 2, reason: false },
  { si: 1, start: '10:00', end: '11:20', type: 'Amaliy', date: '26.10.2026', hours: 2, reason: false },
  { si: 3, start: '14:50', end: '16:10', type: 'Seminar', date: '20.10.2026', hours: 2, reason: true },
  { si: 2, start: '13:20', end: '14:40', type: 'Ma’ruza', date: '13.10.2026', hours: 2, reason: false },
  { si: 4, start: '10:00', end: '11:20', type: 'Laboratoriya', date: '07.10.2026', hours: 2, reason: false },
  { si: 0, start: '11:30', end: '12:50', type: 'Amaliy', date: '23.09.2026', hours: 2, reason: false },
].map((a) => ({ ...a, subject: NAMES[CURRENT][a.si], teacher: TEACHERS[a.si].replace(/ (\w)\. \w\.$/, ' $1.') }));

export function attendanceTotals() {
  const total = ABSENCES.reduce((n, a) => n + a.hours, 0);
  const reason = ABSENCES.filter((a) => a.reason).reduce((n, a) => n + a.hours, 0);
  return { total, reason, noReason: total - reason };
}

export const ROADMAP = [
  ['Оценка текущего состояния', 'Анализ GPA и академических показателей, выявление слабых и сильных сторон.'],
  ['Постановка целей', 'Определение целей GPA на семестр и год, планирование баллов по каждому предмету.'],
  ['Составление расписания', 'Создание ежедневного и еженедельного расписания для занятий, самостоятельного обучения и отдыха.'],
  ['Контроль посещаемости', 'Регулярное посещение всех занятий, внимание к отсутствию без уважительной причины.'],
  ['Активное участие', 'Задавать вопросы на занятиях, участвовать в дискуссиях, быть активным на практических занятиях.'],
  ['Дополнительные ресурсы', 'Работа с библиотекой, онлайн-курсами, учебными материалами, расширение знаний.'],
  ['Групповая работа', 'Совместное обучение с одногруппниками, обмен опытом, взаимопомощь.'],
  ['Общение с преподавателями', 'Консультирование по сложным темам, получение обратной связи и совершенствование.'],
  ['Практический опыт', 'Участие в практике, проектах, исследованиях, применение теории на практике.'],
  ['Планы на будущее', 'Определение карьерного направления, накопление опыта работы, внимание к networking и развитию.'],
];

export const STORIES = [
  { title: 'Talabalar hayoti', bg: 'linear-gradient(135deg,#0f766e,#22d3ee)', text: 'Yangi o‘quv yili tadbirlari boshlandi. To‘garaklar va klublarga yozilish ochiq.' },
  { title: 'Karyera kuni', bg: 'linear-gradient(135deg,#b45309,#fbbf24)', text: 'Bitiruvchilar uchun karyera kuni: ish beruvchilar bilan uchrashuvlar va mahorat darslari.' },
  { title: 'Kutubxona', bg: 'linear-gradient(135deg,#7c3aed,#f472b6)', text: 'Elektron kutubxonada yangi darsliklar. Kitoblarni onlayn o‘qish mumkin.' },
  { title: 'Hemis AI', bg: 'linear-gradient(135deg,#e0e7ff,#c4b5fd)', text: 'Raqamli yordamchi o‘quv jarayonini tahlil qiladi va shaxsiy tavsiyalar beradi.', more: true },
];

export const DOCS = [
  { title: 'O‘quv varaqa', tag: 'ACADEMIC_SHEET', rows: [['Kurs:', STUDENT.course], ['O‘quv yili:', STUDENT.year], ['Semestr:', `${CURRENT}-semestr`]] },
  { title: 'Reyting daftarcha', tag: 'ACADEMIC_DATA', rows: [['Mutaxassislik:', STUDENT.specialty], ['Semestr:', `${CURRENT}-semestr`], ['Kurs:', STUDENT.course]] },
  { title: 'Ma’lumotnoma 22014890/1', tag: 'REFERENCE', rows: [] },
];
