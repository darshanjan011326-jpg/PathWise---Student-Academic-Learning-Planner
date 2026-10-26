import { LearningCard, ScheduleItem, StudentProfile, TaskItem } from '../types';

export const initialProfile: StudentProfile = {
  name: 'Alex Chen',
  email: 'alex.chen@state.edu',
  major: 'Computer Science & Engineering',
  year: 'Year 3 (Junior)',
  university: 'Metropolitan Institute of Technology',
  studentId: 'MIT-2024-CS88',
  streakDays: 14,
  solvedProblems: 142,
  studyHoursThisWeek: 26.5,
  gpa: 3.88,
  avatarUrl: '/src/assets/images/pathwise_avatar_student_1792670712260.jpg',
};

export const initialTasks: TaskItem[] = [
  {
    id: 't-1',
    title: 'Implement AVL Tree Rotations in Java',
    course: 'CS 301 · Data Structures',
    dueTime: 'Today, 5:00 PM',
    priority: 'high',
    completed: false,
    tag: 'Trees & Balancing',
  },
  {
    id: 't-2',
    title: 'Complete 3 Medium LeetCode Graph Problems',
    course: 'Interview Prep · DSA Track',
    dueTime: 'Today, 8:30 PM',
    priority: 'high',
    completed: true,
    tag: 'BFS / DFS / Dijkstra',
  },
  {
    id: 't-3',
    title: 'Review Java Memory Model & Garbage Collector',
    course: 'CS 320 · Advanced Java Systems',
    dueTime: 'Tomorrow, 11:00 AM',
    priority: 'medium',
    completed: false,
    tag: 'JVM Internals',
  },
  {
    id: 't-4',
    title: 'Prepare Slide Deck for Database Normalization Lab',
    course: 'CS 340 · Relational Databases',
    dueTime: 'Thursday, 2:00 PM',
    priority: 'low',
    completed: false,
    tag: '3NF / BCNF Proofs',
  },
];

export const recommendedLearningCards: LearningCard[] = [
  {
    id: 'learn-1',
    title: 'Binary Search Tree & AVL Self-Balancing Mastery',
    category: 'DSA',
    level: 'Intermediate',
    progress: 75,
    totalModules: 12,
    completedModules: 9,
    estimatedHours: 6,
    description: 'Master binary search tree invariants, node insertions, deletions, and LL/RR/LR/RL balancing rotations with full Java implementations.',
    topics: ['BST Property & Traversal', 'Height Balancing Factors', 'Left & Right Rotations', 'O(log n) Search Guarantee'],
    codeSnippet: `// AVL Node balance factor calculation in Java
int getBalance(Node N) {
    if (N == null) return 0;
    return height(N.left) - height(N.right);
}`,
  },
  {
    id: 'learn-2',
    title: 'Java Collections Framework: Deep Dive & Internals',
    category: 'Java',
    level: 'Intermediate',
    progress: 40,
    totalModules: 10,
    completedModules: 4,
    estimatedHours: 8,
    description: 'Explore under-the-hood hashing collisions, red-black tree thresholding in HashMap, and PriorityQueue binary min-heaps.',
    topics: ['HashMap Buckets & Treeification', 'ArrayList Dynamic Resizing Math', 'PriorityQueue Min-Heap', 'ConcurrentHashMap Segment Locking'],
    codeSnippet: `// Fast Frequency Counting using Java Collections
Map<String, Integer> freqMap = new HashMap<>();
for (String token : tokens) {
    freqMap.merge(token, 1, Integer::sum);
}`,
  },
  {
    id: 'learn-3',
    title: 'Dynamic Programming: 1D & 2D Optimal Patterns',
    category: 'DSA',
    level: 'Advanced',
    progress: 25,
    totalModules: 16,
    completedModules: 4,
    estimatedHours: 12,
    description: 'Transition from recursive brute force with memoization to bottom-up tabular DP. Covers 0/1 Knapsack, Coin Change, and Longest Common Subsequence.',
    topics: ['Memoization vs Tabulation', '0/1 Knapsack & Subset Sum', 'Longest Common Subsequence', 'Grid Path Combinatorics'],
    codeSnippet: `// 1D Space-Optimized Coin Change in Java
int[] dp = new int[amount + 1];
Arrays.fill(dp, amount + 1);
dp[0] = 0;
for (int coin : coins) {
    for (int i = coin; i <= amount; i++) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
    }
}`,
  },
  {
    id: 'learn-4',
    title: 'Java Concurrency, Threads & Modern Executors',
    category: 'Java',
    level: 'Advanced',
    progress: 15,
    totalModules: 8,
    completedModules: 1,
    estimatedHours: 7,
    description: 'Understand thread safety, atomic primitives, thread pools, and asynchronous programming using CompletableFuture in Java 21.',
    topics: ['Synchronized vs ReentrantLock', 'AtomicInteger & CAS', 'ThreadPoolExecutor Tuning', 'CompletableFuture Pipelines'],
    codeSnippet: `// Asynchronous non-blocking pipeline
CompletableFuture.supplyAsync(() -> fetchUserData(userId))
    .thenApply(this::computeStudyMetrics)
    .thenAccept(metrics -> renderDashboard(metrics));`,
  },
];

export const mockSchedule: ScheduleItem[] = [
  {
    id: 's-1',
    time: '09:00 AM - 10:30 AM',
    title: 'CS 301: Advanced Data Structures & Algorithms',
    location: 'Science Hall 304',
    instructor: 'Prof. Marcus Vance',
    type: 'Lecture',
    day: 'Mon',
  },
  {
    id: 's-2',
    time: '11:15 AM - 01:00 PM',
    title: 'CS 301L: Java Systems Lab (AVL Trees)',
    location: 'Turing Computer Lab B',
    instructor: 'Teaching Fellow Sarah Lin',
    type: 'Lab',
    day: 'Mon',
  },
  {
    id: 's-3',
    time: '02:00 PM - 03:30 PM',
    title: 'CS 340: Database Architecture & Query Planning',
    location: 'Auditorium 2',
    instructor: 'Dr. Evelyn Reed',
    type: 'Lecture',
    day: 'Tue',
  },
  {
    id: 's-4',
    time: '04:30 PM - 06:00 PM',
    title: 'LeetCode & ICPC Problem Solving Sprint',
    location: 'Student Union Lounge Room 12',
    instructor: 'ACM Student Chapter',
    type: 'Study Session',
    day: 'Wed',
  },
  {
    id: 's-5',
    time: '11:59 PM',
    title: 'CS 301 Homework 4: Red-Black Tree Verification',
    location: 'Online Portal',
    instructor: 'Canvas Auto-grader',
    type: 'Deadline',
    day: 'Fri',
  },
];
