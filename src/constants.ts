import { Student, Lesson, Grade, Attendance, Material, Certificate, AppNotification } from './types';

export const MOCK_STUDENT: Student = {
  id: '1',
  fullName: 'Tohirjonov Xumoyunmirzo',
  studentId: '22014890',
  university: "O'zbekiston davlat Jahon Tillar Universiteti",
  faculty: 'Software Engineering',
  department: 'Software Engineering',
  group: '611-21',
  course: 3,
  semester: 6,
  gpa: 4.2,
  attendancePercentage: 92,
  avatarUrl: 'https://picsum.photos/seed/student/200/200',
};

export const MOCK_LESSONS: Lesson[] = [
  {
    id: '1',
    subject: 'Umumiy pedagogika',
    teacher: 'URISHOV SH. M.',
    room: 'BB-5M zali',
    startTime: '13:20',
    endTime: '14:40',
    type: 'Lecture',
    dayOfWeek: 4,
  },
  {
    id: '2',
    subject: "Inklyuziv ta'lim. Gospital pedagogi...",
    teacher: 'MOYANOV I. J.',
    room: 'B2-201',
    startTime: '14:50',
    endTime: '16:10',
    type: 'Seminar',
    dayOfWeek: 4,
  },
  {
    id: '3',
    subject: "Nutq ko'nikmalari integratsiyasi",
    teacher: 'KARIMOV U. N.',
    room: 'B2-205',
    startTime: '16:20',
    endTime: '17:40',
    type: 'Practice',
    dayOfWeek: 4,
  },
];

export const MOCK_GRADES: Grade[] = [
  { id: '1', subject: "Chet tillarni o'qitishning uslub va tamoyillari", score: 0, maxScore: 0, date: '2024-03-15', type: 'Midterm' },
  { id: '2', subject: 'Dinshunoslik', score: 0, maxScore: 0, date: '2024-03-10', type: 'Midterm' },
  { id: '3', subject: 'Ikkinchi chet tili (Arab tili)', score: 0, maxScore: 0, date: '2024-03-05', type: 'Current' },
];

export const MOCK_ATTENDANCE: Attendance[] = [
  { id: '1', subject: 'Mobile Application Development', date: '2024-03-20', status: 'Present' },
  { id: '2', subject: 'Database Systems', date: '2024-03-20', status: 'Absent' },
  { id: '3', subject: 'Artificial Intelligence', date: '2024-03-19', status: 'Present' },
];

export const MOCK_MATERIALS: Material[] = [
  { id: '1', title: 'Interactive Web Apps with React', subject: 'Web Development', fileType: 'pdf', size: '2.4 MB', date: '2024-04-01', url: '#' },
  { id: '2', title: 'DBMS Fundamentals', subject: 'Database Systems', fileType: 'ppt', size: '5.1 MB', date: '2024-03-28', url: '#' },
  { id: '3', title: 'Neural Networks 101', subject: 'Artificial Intelligence', fileType: 'doc', size: '1.2 MB', date: '2024-04-05', url: '#' },
  { id: '4', title: 'Midterm Preparation Guide', subject: 'Software Engineering', fileType: 'pdf', size: '840 KB', date: '2024-04-10', url: '#' },
];

export const MOCK_CERTIFICATES: Certificate[] = [
  { id: '1', title: "O'qish joyidan ma'lumotnoma", status: 'Ready', requestDate: '2024-04-10', readyDate: '2024-04-12' },
  { id: '2', title: "Akademik ma'lumotnoma", status: 'Pending', requestDate: '2024-04-20' },
];

export const MOCK_NOTIFICATIONS: AppNotification[] = [
  { id: '1', title: 'Yangi vazifa!', content: 'Mobile Application predmetidan 3-vazifa yuklandi.', date: '2024-04-26 10:00', isRead: false, type: 'info' },
  { id: '2', title: "Kontrakt to'lovi", content: "Sizning kontrakt bo'yicha qarzingiz mavjud.", date: '2024-04-25 15:30', isRead: true, type: 'warning' },
];
