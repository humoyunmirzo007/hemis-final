export interface Student {
  id: string;
  fullName: string;
  studentId: string;
  university: string;
  faculty: string;
  department: string;
  group: string;
  course: number;
  semester: number;
  gpa: number;
  attendancePercentage: number;
  avatarUrl?: string;
}

export interface Lesson {
  id: string;
  subject: string;
  teacher: string;
  room: string;
  startTime: string;
  endTime: string;
  type: 'Lecture' | 'Practice' | 'Seminar' | 'Laboratory';
  dayOfWeek: number; // 1-7
}

export interface Grade {
  id: string;
  subject: string;
  score: number;
  maxScore: number;
  date: string;
  type: 'Midterm' | 'Final' | 'Current';
}

export interface Attendance {
  id: string;
  subject: string;
  date: string;
  status: 'Present' | 'Absent' | 'Late';
}

export interface Material {
  id: string;
  title: string;
  subject: string;
  fileType: 'pdf' | 'ppt' | 'xls' | 'doc';
  size: string;
  date: string;
  url: string;
}

export interface Certificate {
  id: string;
  title: string;
  status: 'Pending' | 'Ready' | 'Rejected';
  requestDate: string;
  readyDate?: string;
}

export interface AppNotification {
  id: string;
  title: string;
  content: string;
  date: string;
  isRead: boolean;
  type: 'info' | 'warning' | 'success';
}
