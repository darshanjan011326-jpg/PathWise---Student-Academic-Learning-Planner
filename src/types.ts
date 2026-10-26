export type ScreenType = 'welcome' | 'auth' | 'home';

export type AuthMode = 'signup' | 'login';

export type HomeTab = 'home' | 'learn' | 'schedule' | 'profile';

export interface TaskItem {
  id: string;
  title: string;
  course: string;
  dueTime: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  tag: string;
}

export interface LearningCard {
  id: string;
  title: string;
  category: 'Java' | 'DSA' | 'Algorithms' | 'System Design';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  progress: number;
  totalModules: number;
  completedModules: number;
  estimatedHours: number;
  description: string;
  topics: string[];
  codeSnippet?: string;
}

export interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  location: string;
  instructor: string;
  type: 'Lecture' | 'Lab' | 'Study Session' | 'Deadline';
  day: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri';
}

export interface StudentProfile {
  name: string;
  email: string;
  major: string;
  year: string;
  university: string;
  studentId: string;
  streakDays: number;
  solvedProblems: number;
  studyHoursThisWeek: number;
  gpa: number;
  avatarUrl: string;
}
