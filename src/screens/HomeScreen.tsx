import React, { useState, useMemo } from 'react';
import {
  Search,
  Plus,
  Target,
  Calendar as CalendarIcon,
  BookOpen,
  Bell,
  CheckCircle2,
  Circle,
  Flame,
  ChevronRight,
  Code2,
  Clock,
  Sparkles,
  Award,
  Filter,
  Layers,
  ArrowUpRight,
  TrendingUp,
  X,
  Play,
  RotateCcw,
} from 'lucide-react';
import { HomeTab, LearningCard, ScheduleItem, StudentProfile, TaskItem } from '../types';
import { PathWiseLogo } from '../components/PathWiseLogo';
import { AddTaskModal } from '../components/modals/AddTaskModal';
import { SetGoalsModal } from '../components/modals/SetGoalsModal';
import { CalendarModal } from '../components/modals/CalendarModal';
import { LearnModal } from '../components/modals/LearnModal';
import { ProfileModal } from '../components/modals/ProfileModal';
import { initialProfile, initialTasks, mockSchedule, recommendedLearningCards } from '../data/mockData';

interface HomeScreenProps {
  onLogout: () => void;
  showToast: (msg: string) => void;
  userName?: string;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onLogout,
  showToast,
  userName = 'Alex Chen',
}) => {
  // Navigation tab state
  const [activeTab, setActiveTab] = useState<HomeTab>('home');

  // Search query
  const [searchQuery, setSearchQuery] = useState('');

  // Notifications popup
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState([
    { id: 'n1', title: 'DSA Lab Exam', time: 'Tomorrow at 10:00 AM', read: false },
    { id: 'n2', title: 'Assignment 3 graded: 98/100', time: '2 hours ago', read: false },
    { id: 'n3', title: 'Weekly LeetCode streak: 14 days!', time: 'Yesterday', read: true },
  ]);

  // Tasks state
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);

  // Student profile state
  const [profile, setProfile] = useState<StudentProfile>({
    ...initialProfile,
    name: userName || initialProfile.name,
  });

  // Learning cards state
  const [learningCards, setLearningCards] = useState<LearningCard[]>(recommendedLearningCards);

  // Modals state
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isSetGoalsOpen, setIsSetGoalsOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedLearnCard, setSelectedLearnCard] = useState<LearningCard | null>(null);

  // Learn tab category filter
  const [learnFilter, setLearnFilter] = useState<'All' | 'Java' | 'DSA'>('All');

  // Active day in weekly progress
  const [selectedStreakDay, setSelectedStreakDay] = useState<'M' | 'T' | 'W' | 'T2' | 'F' | 'S' | 'S2'>('W');

  // Toggle task completion
  const handleToggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const nextCompleted = !t.completed;
          showToast(
            nextCompleted
              ? `Task completed: "${t.title}" ✓`
              : `Marked "${t.title}" as in-progress`
          );
          return { ...t, completed: nextCompleted };
        }
        return t;
      })
    );
  };

  // Add task handler
  const handleAddTask = (newTask: TaskItem) => {
    setTasks([newTask, ...tasks]);
    showToast(`New task added: "${newTask.title}"`);
  };

  // Filtered learning cards based on search or category
  const filteredLearningCards = useMemo(() => {
    return learningCards.filter((card) => {
      const matchesSearch =
        card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.topics.some((topic) => topic.toLowerCase().includes(searchQuery.toLowerCase())) ||
        card.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        learnFilter === 'All' ? true : card.category === learnFilter;

      return matchesSearch && matchesCategory;
    });
  }, [learningCards, searchQuery, learnFilter]);

  // Filtered tasks based on search
  const filteredTasks = useMemo(() => {
    if (!searchQuery.trim()) return tasks;
    return tasks.filter(
      (t) =>
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.tag.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [tasks, searchQuery]);

  // Calculated completion percentage
  const completedTasksCount = tasks.filter((t) => t.completed).length;
  const progressPercentage = Math.round((completedTasksCount / Math.max(tasks.length, 1)) * 100);

  return (
    <div className="min-h-screen bg-[#f4f7f4] flex flex-col pb-24 text-slate-800">
      {/* Top Mobile/Desktop Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-emerald-100/80 px-4 sm:px-6 py-3 transition-all">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          {/* Brand Wordmark */}
          <PathWiseLogo size="sm" />

          {/* Quick status / User profile trigger */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="w-10 h-10 rounded-2xl bg-[#f0f5f1] hover:bg-[#e8f5e9] flex items-center justify-center text-[#1b4332] transition relative"
                aria-label="View notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadNotifications.some((n) => !n.read) && (
                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-600 ring-2 ring-white" />
                )}
              </button>

              {/* Notification Popover Drawer */}
              {showNotifications && (
                <div className="absolute right-0 top-12 w-80 bg-white rounded-3xl shadow-xl border border-emerald-100 p-4 z-40 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-emerald-100">
                    <span className="text-xs font-bold text-[#081c15]">Academic Notifications</span>
                    <button
                      onClick={() => {
                        setUnreadNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
                        showToast('All notifications marked as read');
                      }}
                      className="text-[10px] font-medium text-[#2d6a4f] hover:underline"
                    >
                      Mark all read
                    </button>
                  </div>
                  <div className="space-y-2">
                    {unreadNotifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-2.5 rounded-xl text-xs transition ${
                          notif.read ? 'bg-[#f7faf7] text-slate-600' : 'bg-[#e8f5e9]/70 text-[#081c15] font-medium'
                        }`}
                      >
                        <p className="font-semibold leading-tight">{notif.title}</p>
                        <span className="text-[10px] text-slate-500">{notif.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar Button */}
            <button
              onClick={() => setIsProfileOpen(true)}
              className="flex items-center gap-2.5 p-1 sm:pr-3 rounded-2xl hover:bg-[#e8f5e9] transition border border-transparent hover:border-emerald-200"
              aria-label="Open student profile"
            >
              <div className="relative w-9 h-9 rounded-xl overflow-hidden ring-2 ring-[#2d6a4f]/20 bg-emerald-100 shrink-0">
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-[#081c15] leading-tight truncate max-w-[100px]">{profile.name}</p>
                <p className="text-[10px] text-[#2d6a4f] font-semibold flex items-center gap-0.5">
                  <Flame className="w-3 h-3 text-orange-500 fill-orange-500" />
                  {profile.streakDays}d streak
                </p>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Main Tabbed Container */}
      <main className="max-w-4xl w-full mx-auto px-4 sm:px-6 pt-5 pb-8 flex-1">
        {/* ==================== TAB 1: HOME DASHBOARD ==================== */}
        {activeTab === 'home' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Student Welcome Greeting Card */}
            <section className="bg-gradient-to-br from-[#1b4332] via-[#24523f] to-[#132a22] text-white rounded-3xl p-5 sm:p-6 shadow-xl shadow-emerald-950/10 relative overflow-hidden">
              {/* Soft decorative background circles */}
              <div className="absolute -right-8 -top-8 w-40 h-40 bg-white/5 rounded-full blur-xl pointer-events-none" />
              <div className="absolute right-20 -bottom-10 w-32 h-32 bg-[#52b788]/10 rounded-full blur-xl pointer-events-none" />

              <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs text-[#95d5b2] font-semibold mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Fall Semester 2026 · Week 7</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
                    Good morning, {profile.name.split(' ')[0]} 👋
                  </h2>
                  <p className="text-xs sm:text-sm text-emerald-100/80 mt-1 max-w-md">
                    You have <strong className="text-[#95d5b2]">{tasks.filter((t) => !t.completed).length} pending tasks</strong> today and 1 upcoming Java lab submission.
                  </p>
                </div>

                <button
                  onClick={() => setIsAddTaskOpen(true)}
                  className="px-4 py-2.5 bg-[#d8f3dc] hover:bg-[#b7e4c7] text-[#1b4332] text-xs font-bold rounded-2xl shadow-sm flex items-center gap-1.5 transition active:scale-95 shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  Quick Add Task
                </button>
              </div>
            </section>

            {/* Interactive Live Search Bar */}
            <section className="relative">
              <div className="relative flex items-center">
                <Search className="w-4 h-4 text-[#52796f] absolute left-4 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search coursework, Java lessons, DSA algorithms, or tasks..."
                  className="w-full pl-11 pr-10 py-3.5 bg-white border border-emerald-100 rounded-2xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2d6a4f] shadow-sm transition"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              {searchQuery && (
                <div className="mt-1 text-[11px] text-[#52796f] px-1 flex items-center justify-between">
                  <span>Filtering by "{searchQuery}"</span>
                  <span>{filteredTasks.length} tasks · {filteredLearningCards.length} modules</span>
                </div>
              )}
            </section>

            {/* Quick Action Cards (4 cards: Add Task, Set Goals, Calendar, Learn) */}
            <section>
              <div className="flex items-center justify-between mb-3 px-1">
                <h3 className="text-sm font-bold text-[#081c15] uppercase tracking-wider">
                  Quick Actions
                </h3>
                <span className="text-xs text-[#52796f]">Tap to interact</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {/* 1. Add Task */}
                <button
                  onClick={() => setIsAddTaskOpen(true)}
                  className="p-4 rounded-2xl bg-white border border-emerald-100/90 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all text-left group flex flex-col justify-between min-h-[110px]"
                >
                  <div className="w-10 h-10 rounded-2xl bg-[#e8f5e9] text-[#1b4332] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Plus className="w-5 h-5 text-[#2d6a4f]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#081c15] group-hover:text-[#2d6a4f] transition-colors">
                      Add Task
                    </h4>
                    <p className="text-[11px] text-[#52796f]">Log new homework</p>
                  </div>
                </button>

                {/* 2. Set Goals */}
                <button
                  onClick={() => setIsSetGoalsOpen(true)}
                  className="p-4 rounded-2xl bg-white border border-emerald-100/90 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all text-left group flex flex-col justify-between min-h-[110px]"
                >
                  <div className="w-10 h-10 rounded-2xl bg-[#d8f3dc] text-[#1b4332] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Target className="w-5 h-5 text-[#1b4332]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#081c15] group-hover:text-[#2d6a4f] transition-colors">
                      Set Goals
                    </h4>
                    <p className="text-[11px] text-[#52796f]">Weekly benchmarks</p>
                  </div>
                </button>

                {/* 3. Calendar */}
                <button
                  onClick={() => setIsCalendarOpen(true)}
                  className="p-4 rounded-2xl bg-white border border-emerald-100/90 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all text-left group flex flex-col justify-between min-h-[110px]"
                >
                  <div className="w-10 h-10 rounded-2xl bg-[#e8f5e9] text-[#1b4332] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <CalendarIcon className="w-5 h-5 text-[#2d6a4f]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#081c15] group-hover:text-[#2d6a4f] transition-colors">
                      Calendar
                    </h4>
                    <p className="text-[11px] text-[#52796f]">Class timetable</p>
                  </div>
                </button>

                {/* 4. Learn */}
                <button
                  onClick={() => setActiveTab('learn')}
                  className="p-4 rounded-2xl bg-white border border-emerald-100/90 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all text-left group flex flex-col justify-between min-h-[110px]"
                >
                  <div className="w-10 h-10 rounded-2xl bg-[#d8f3dc] text-[#1b4332] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <BookOpen className="w-5 h-5 text-[#1b4332]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#081c15] group-hover:text-[#2d6a4f] transition-colors">
                      Learn
                    </h4>
                    <p className="text-[11px] text-[#52796f]">Java & DSA Hub</p>
                  </div>
                </button>
              </div>
            </section>

            {/* Weekly Progress Card */}
            <section className="bg-white rounded-3xl p-5 border border-emerald-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#e8f5e9] text-[#1b4332] flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-[#2d6a4f]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#081c15]">Weekly Study Momentum</h3>
                    <p className="text-[11px] text-[#52796f]">Oct 18 – Oct 24, 2026</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-extrabold text-[#1b4332] font-mono">{progressPercentage}%</span>
                  <p className="text-[10px] text-slate-500 font-medium">Weekly Goal</p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full h-3 bg-[#f0f5f1] rounded-full overflow-hidden mb-4 border border-emerald-100">
                <div
                  className="h-full bg-gradient-to-r from-[#2d6a4f] via-[#52b788] to-[#74c69d] rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>

              {/* Streak Day-by-Day Interactive Scroller */}
              <div className="grid grid-cols-7 gap-1.5 sm:gap-2 pt-1">
                {[
                  { key: 'M', label: 'Mon', num: 19, active: true },
                  { key: 'T', label: 'Tue', num: 20, active: true },
                  { key: 'W', label: 'Wed', num: 21, active: true },
                  { key: 'T2', label: 'Thu', num: 22, active: true, today: true },
                  { key: 'F', label: 'Fri', num: 23, active: false },
                  { key: 'S', label: 'Sat', num: 24, active: false },
                  { key: 'S2', label: 'Sun', num: 25, active: false },
                ].map((item) => {
                  const isSelected = selectedStreakDay === item.key;
                  return (
                    <button
                      key={item.key}
                      onClick={() => {
                        setSelectedStreakDay(item.key as any);
                        showToast(`Viewed study records for ${item.label} (Oct ${item.num})`);
                      }}
                      className={`flex flex-col items-center py-2 px-1 rounded-2xl text-xs transition-all ${
                        isSelected
                          ? 'bg-[#1b4332] text-white shadow-md'
                          : item.today
                          ? 'bg-[#e8f5e9] text-[#1b4332] font-bold border border-emerald-300'
                          : item.active
                          ? 'bg-[#f7faf7] text-slate-700 hover:bg-[#e8f5e9]/50'
                          : 'bg-white text-slate-400 hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-[10px] uppercase font-semibold">{item.label}</span>
                      <span className="text-xs font-bold font-mono mt-0.5">{item.num}</span>
                      {item.active && !isSelected && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Quick stats footer row */}
              <div className="mt-4 pt-3 border-t border-emerald-100 flex items-center justify-between text-xs text-[#405648]">
                <span className="flex items-center gap-1 font-medium">
                  <Clock className="w-3.5 h-3.5 text-emerald-600" />
                  <strong>26.5 hrs</strong> logged this week
                </span>
                <span className="flex items-center gap-1 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <strong>{completedTasksCount} of {tasks.length}</strong> tasks completed
                </span>
              </div>
            </section>

            {/* Today's Tasks Section */}
            <section>
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-[#081c15] uppercase tracking-wider">
                    Today's Priority Tasks
                  </h3>
                  <span className="text-xs text-[#2d6a4f] bg-[#e8f5e9] px-2 py-0.5 rounded-full font-semibold">
                    {tasks.filter((t) => !t.completed).length} remaining
                  </span>
                </div>
                <button
                  onClick={() => setIsAddTaskOpen(true)}
                  className="text-xs font-semibold text-[#2d6a4f] hover:underline flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Task
                </button>
              </div>

              <div className="space-y-2.5">
                {filteredTasks.length > 0 ? (
                  filteredTasks.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => handleToggleTask(task.id)}
                      className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                        task.completed
                          ? 'bg-[#f7faf7] border-emerald-100 text-slate-400 opacity-75'
                          : 'bg-white border-emerald-100 hover:border-emerald-300 shadow-sm hover:shadow'
                      }`}
                    >
                      <button
                        type="button"
                        className="mt-0.5 text-emerald-600 shrink-0"
                        aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
                      >
                        {task.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-[#2d6a4f] fill-[#d8f3dc]" />
                        ) : (
                          <Circle className="w-5 h-5 text-slate-300 hover:text-[#2d6a4f]" />
                        )}
                      </button>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p
                            className={`text-xs sm:text-sm font-bold truncate ${
                              task.completed ? 'line-through text-slate-400' : 'text-[#081c15]'
                            }`}
                          >
                            {task.title}
                          </p>
                          <span
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded-md shrink-0 ${
                              task.priority === 'high'
                                ? 'bg-rose-50 text-rose-700'
                                : task.priority === 'medium'
                                ? 'bg-amber-50 text-amber-700'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {task.priority}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-[11px] text-[#52796f] mt-1">
                          <span>{task.course}</span>
                          <span>·</span>
                          <span className="font-mono">{task.dueTime}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 bg-white rounded-2xl border border-dashed border-emerald-200">
                    <p className="text-xs text-slate-500">No tasks match your search.</p>
                  </div>
                )}
              </div>
            </section>

            {/* Recommended Java & DSA Learning Cards (Requested Feature) */}
            <section>
              <div className="flex items-center justify-between mb-3 px-1">
                <div>
                  <h3 className="text-sm font-bold text-[#081c15] uppercase tracking-wider">
                    Recommended Java & DSA Pathways
                  </h3>
                  <p className="text-xs text-[#52796f]">Tailored for your CSE curriculum</p>
                </div>
                <button
                  onClick={() => setActiveTab('learn')}
                  className="text-xs font-semibold text-[#2d6a4f] hover:underline flex items-center gap-1"
                >
                  View All <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredLearningCards.slice(0, 2).map((card) => (
                  <div
                    key={card.id}
                    className="p-5 rounded-3xl bg-white border border-emerald-100/90 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#2d6a4f] bg-[#e8f5e9] px-2.5 py-0.5 rounded-md border border-emerald-200">
                          {card.category} · {card.level}
                        </span>
                        <span className="text-xs font-mono font-bold text-[#1b4332]">{card.progress}%</span>
                      </div>

                      <h4 className="text-sm font-bold text-[#081c15] mb-1.5 leading-snug">
                        {card.title}
                      </h4>

                      <p className="text-xs text-[#52796f] line-clamp-2 leading-relaxed mb-4">
                        {card.description}
                      </p>
                    </div>

                    <div>
                      {/* Progress bar */}
                      <div className="w-full h-2 bg-[#f0f5f1] rounded-full overflow-hidden mb-3 border border-emerald-100">
                        <div
                          className="h-full bg-[#2d6a4f] rounded-full"
                          style={{ width: `${card.progress}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[11px] text-slate-500">
                          {card.completedModules}/{card.totalModules} modules
                        </span>
                        <button
                          onClick={() => setSelectedLearnCard(card)}
                          className="px-3.5 py-1.5 bg-[#1b4332] hover:bg-[#2d6a4f] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition active:scale-95 shadow-sm"
                        >
                          <Play className="w-3 h-3 fill-current" />
                          Continue
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ==================== TAB 2: LEARN & DSA PATHWAYS ==================== */}
        {activeTab === 'learn' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Learn Header Banner */}
            <div className="bg-gradient-to-r from-[#1b4332] to-[#2d6a4f] text-white rounded-3xl p-6 shadow-md">
              <div className="flex items-center gap-2 text-xs text-[#95d5b2] font-semibold mb-1">
                <BookOpen className="w-4 h-4" />
                <span>Computer Science & DSA Roadmap</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                Curated Learning Modules
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100/80 mt-1 max-w-xl">
                Master core Java primitives, asymptotic algorithm analysis, dynamic programming, and systems concurrency.
              </p>
            </div>

            {/* Category Filter Buttons */}
            <div className="flex items-center gap-2">
              {(['All', 'Java', 'DSA'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setLearnFilter(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    learnFilter === cat
                      ? 'bg-[#1b4332] text-white shadow-sm'
                      : 'bg-white text-slate-600 hover:bg-[#e8f5e9] border border-emerald-100'
                  }`}
                >
                  {cat === 'All' ? 'All Pathways' : `${cat} Focus`}
                </button>
              ))}
            </div>

            {/* All Recommended Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredLearningCards.map((card) => (
                <div
                  key={card.id}
                  className="p-5 rounded-3xl bg-white border border-emerald-100 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#2d6a4f] bg-[#e8f5e9] px-2.5 py-0.5 rounded-md border border-emerald-200">
                        {card.category} · {card.level}
                      </span>
                      <span className="text-xs font-mono font-bold text-[#1b4332]">{card.progress}%</span>
                    </div>

                    <h4 className="text-base font-bold text-[#081c15] mb-2 leading-snug">
                      {card.title}
                    </h4>

                    <p className="text-xs text-[#52796f] leading-relaxed mb-4">
                      {card.description}
                    </p>

                    <div className="space-y-1 mb-4">
                      {card.topics.slice(0, 2).map((t, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-600">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span className="truncate">{t}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="w-full h-2 bg-[#f0f5f1] rounded-full overflow-hidden mb-3 border border-emerald-100">
                      <div
                        className="h-full bg-[#2d6a4f] rounded-full"
                        style={{ width: `${card.progress}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[11px] text-slate-500 font-mono">
                        {card.completedModules}/{card.totalModules} completed
                      </span>
                      <button
                        onClick={() => setSelectedLearnCard(card)}
                        className="px-4 py-2 bg-[#1b4332] hover:bg-[#2d6a4f] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition active:scale-95 shadow-sm"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        Open Lesson
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== TAB 3: SCHEDULE & TIMETABLE ==================== */}
        {activeTab === 'schedule' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm flex items-center justify-between">
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-[#081c15]">Academic Timetable</h2>
                <p className="text-xs text-[#52796f] mt-0.5">Fall Semester 2026 Course Schedule</p>
              </div>
              <button
                onClick={() => setIsCalendarOpen(true)}
                className="px-3.5 py-2 bg-[#e8f5e9] text-[#1b4332] text-xs font-bold rounded-xl hover:bg-[#d8f3dc] transition"
              >
                Expand Calendar
              </button>
            </div>

            <div className="space-y-3">
              {mockSchedule.map((item) => (
                <div
                  key={item.id}
                  className="p-4 bg-white rounded-2xl border border-emerald-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#e8f5e9] text-[#1b4332] flex items-center justify-center font-bold text-xs shrink-0">
                      {item.day}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-[#081c15]">{item.title}</h4>
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                            item.type === 'Lecture'
                              ? 'bg-blue-50 text-blue-700'
                              : item.type === 'Lab'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {item.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-500 mt-1 font-mono">
                        <span className="text-[#2d6a4f] font-semibold">{item.time}</span>
                        <span>·</span>
                        <span>{item.location}</span>
                        <span>·</span>
                        <span>{item.instructor}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => showToast(`Reminder set for: ${item.title}`)}
                    className="self-end sm:self-auto px-3 py-1.5 bg-[#f7faf7] hover:bg-[#e8f5e9] text-[#1b4332] text-xs font-semibold rounded-xl border border-emerald-100 transition"
                  >
                    Set Reminder
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== TAB 4: PROFILE & ANALYTICS ==================== */}
        {activeTab === 'profile' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Student Profile Card */}
            <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden ring-4 ring-[#2d6a4f]/20 bg-emerald-100 shrink-0">
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h2 className="text-xl font-extrabold text-[#081c15]">{profile.name}</h2>
                    <p className="text-xs font-semibold text-[#2d6a4f]">{profile.major}</p>
                    <p className="text-xs text-slate-500">{profile.university} · {profile.year}</p>
                  </div>
                  <button
                    onClick={() => setIsProfileOpen(true)}
                    className="px-4 py-2 bg-[#1b4332] text-white text-xs font-semibold rounded-xl hover:bg-[#2d6a4f] transition shrink-0"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>

            {/* Performance Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-2xl bg-white border border-emerald-100 shadow-sm text-center">
                <span className="text-[11px] text-slate-500 font-semibold uppercase">Daily Streak</span>
                <p className="text-xl font-extrabold text-[#081c15] mt-1 font-mono flex items-center justify-center gap-1">
                  <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
                  {profile.streakDays} Days
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-emerald-100 shadow-sm text-center">
                <span className="text-[11px] text-slate-500 font-semibold uppercase">DSA Solved</span>
                <p className="text-xl font-extrabold text-[#081c15] mt-1 font-mono text-[#1b4332]">
                  {profile.solvedProblems}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-emerald-100 shadow-sm text-center">
                <span className="text-[11px] text-slate-500 font-semibold uppercase">Weekly Hours</span>
                <p className="text-xl font-extrabold text-[#081c15] mt-1 font-mono text-[#1b4332]">
                  {profile.studyHoursThisWeek}h
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-emerald-100 shadow-sm text-center">
                <span className="text-[11px] text-slate-500 font-semibold uppercase">Cumulative GPA</span>
                <p className="text-xl font-extrabold text-[#081c15] mt-1 font-mono text-[#1b4332]">
                  {profile.gpa} / 4.0
                </p>
              </div>
            </div>

            {/* Session Actions */}
            <div className="bg-white rounded-3xl p-5 border border-emerald-100 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-[#081c15]">Prototype Session</p>
                <p className="text-[11px] text-slate-500">Sign out or return to welcome screen</p>
              </div>
              <button
                onClick={onLogout}
                className="px-4 py-2 bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 text-xs font-semibold rounded-xl transition"
              >
                Log Out
              </button>
            </div>
          </div>
        )}
      </main>

      {/* ==================== FIXED BOTTOM NAVIGATION BAR ==================== */}
      <nav
        role="navigation"
        aria-label="Bottom Navigation"
        className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-emerald-100/90 shadow-lg shadow-emerald-950/5"
      >
        <div className="max-w-md mx-auto grid grid-cols-4 items-center h-16 px-2">
          {/* Tab 1: Home */}
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center justify-center h-full min-h-[44px] transition-colors relative ${
              activeTab === 'home' ? 'text-[#1b4332]' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <PathWiseNavHomeIcon active={activeTab === 'home'} />
            <span className={`text-[10px] mt-1 tracking-tight ${activeTab === 'home' ? 'font-bold' : 'font-medium'}`}>
              Home
            </span>
            {activeTab === 'home' && (
              <span className="absolute bottom-1 w-5 h-1 rounded-full bg-[#1b4332]" />
            )}
          </button>

          {/* Tab 2: Learn */}
          <button
            onClick={() => setActiveTab('learn')}
            className={`flex flex-col items-center justify-center h-full min-h-[44px] transition-colors relative ${
              activeTab === 'learn' ? 'text-[#1b4332]' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <BookOpen className={`w-5 h-5 ${activeTab === 'learn' ? 'text-[#1b4332] stroke-[2.5]' : ''}`} />
            <span className={`text-[10px] mt-1 tracking-tight ${activeTab === 'learn' ? 'font-bold' : 'font-medium'}`}>
              Learn
            </span>
            {activeTab === 'learn' && (
              <span className="absolute bottom-1 w-5 h-1 rounded-full bg-[#1b4332]" />
            )}
          </button>

          {/* Tab 3: Schedule */}
          <button
            onClick={() => setActiveTab('schedule')}
            className={`flex flex-col items-center justify-center h-full min-h-[44px] transition-colors relative ${
              activeTab === 'schedule' ? 'text-[#1b4332]' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <CalendarIcon className={`w-5 h-5 ${activeTab === 'schedule' ? 'text-[#1b4332] stroke-[2.5]' : ''}`} />
            <span className={`text-[10px] mt-1 tracking-tight ${activeTab === 'schedule' ? 'font-bold' : 'font-medium'}`}>
              Schedule
            </span>
            {activeTab === 'schedule' && (
              <span className="absolute bottom-1 w-5 h-1 rounded-full bg-[#1b4332]" />
            )}
          </button>

          {/* Tab 4: Profile */}
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center justify-center h-full min-h-[44px] transition-colors relative ${
              activeTab === 'profile' ? 'text-[#1b4332]' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <div className={`w-5 h-5 rounded-full overflow-hidden ring-1 ${activeTab === 'profile' ? 'ring-2 ring-[#1b4332]' : 'ring-slate-300'}`}>
              <img
                src={profile.avatarUrl}
                alt="Profile"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <span className={`text-[10px] mt-1 tracking-tight ${activeTab === 'profile' ? 'font-bold' : 'font-medium'}`}>
              Profile
            </span>
            {activeTab === 'profile' && (
              <span className="absolute bottom-1 w-5 h-1 rounded-full bg-[#1b4332]" />
            )}
          </button>
        </div>
      </nav>

      {/* ==================== INTERACTIVE MODALS ==================== */}
      <AddTaskModal
        isOpen={isAddTaskOpen}
        onClose={() => setIsAddTaskOpen(false)}
        onAddTask={handleAddTask}
      />

      <SetGoalsModal
        isOpen={isSetGoalsOpen}
        onClose={() => setIsSetGoalsOpen(false)}
        onSave={(msg) => showToast(msg)}
      />

      <CalendarModal
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        onSelectAction={(msg) => showToast(msg)}
      />

      <LearnModal
        card={selectedLearnCard}
        isOpen={!!selectedLearnCard}
        onClose={() => setSelectedLearnCard(null)}
        onCompleteModule={(cardId) => {
          setLearningCards((prev) =>
            prev.map((c) =>
              c.id === cardId ? { ...c, progress: Math.min(100, c.progress + 15) } : c
            )
          );
          showToast('Progress updated for this module!');
        }}
      />

      <ProfileModal
        profile={profile}
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onLogout={onLogout}
        onSaveProfile={(updated) => {
          setProfile(updated);
          showToast('Profile updated successfully!');
        }}
      />
    </div>
  );
};

// Custom Home Icon for Navigation with active styling
const PathWiseNavHomeIcon = ({ active }: { active: boolean }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={`w-5 h-5 ${active ? 'stroke-[#1b4332] stroke-[2.5]' : 'stroke-slate-400 stroke-2'}`}
  >
    <path
      d="M3 10.5L12 3L21 10.5V20C21 20.5523 20.5523 21 20 21H15V15H9V21H4C3.44772 21 3 20.5523 3 20V10.5Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
