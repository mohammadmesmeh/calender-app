export const events = [
  {
    id: 1,
    title: "Team Meeting",
    time: "Tomorrow at 10:00 AM",
    note: null,
    type: "Meeting",
    color: "bg-primary",
  },
  {
    id: 2,
    title: "Project Deadline",
    time: "Next Monday at 5:00 PM",
    note: "Submit your progress report before deadline",
    type: "Deadline",
    color: "bg-red-500",
  },
  {
    id: 3,
    title: "Client Presentation",
    time: "Next Wednesday at 2:00 PM",
    note: null,
    type: "Presentation",
    color: "bg-green-500",
  },
  {
    id: 4,
    title: "Design Review",
    time: "Friday at 1:00 PM",
    note: "Review new UI changes with team",
    type: "Review",
    color: "bg-yellow-500",
  },
  {
    id: 5,
    title: "Sprint Planning",
    time: "Monday at 9:00 AM",
    note: "Plan tasks for next sprint",
    type: "Planning",
    color: "bg-blue-500",
  },
];

export const categories = [
  { id: 'planning', name: 'Planning' },
  { id: 'meeting', name: 'Meeting' },
  { id: 'design', name: 'Design' },
  { id: 'development', name: 'Development' },
  { id: 'personal', name: 'Personal' },
  { id: 'research', name: 'Research' },
];

export const tasks = [
  // MON
  { id: 1, title: "Project Deadline", time: "5:00 PM", day: "Mon", completed: false, priority: "high" },
  { id: 2, title: "Fix UI Bugs", time: "10:00 AM", day: "Mon", completed: true, priority: "high" },
  { id: 3, title: "Team Sync", time: "1:00 PM", day: "Mon", completed: true, priority: "medium" },

  // TUE
  { id: 4, title: "Study React", time: "8:00 PM", day: "Tue", completed: true, priority: "high" },
  { id: 5, title: "API Practice", time: "6:00 PM", day: "Tue", completed: true, priority: "high" },
  { id: 6, title: "Read Docs", time: "3:00 PM", day: "Tue", completed: false, priority: "low" },

  // WED
  { id: 7, title: "Gym Workout", time: "6:30 AM", day: "Wed", completed: false, priority: "medium" },
  { id: 8, title: "Write Code", time: "2:00 PM", day: "Wed", completed: true, priority: "high" },

  // THU
  { id: 9, title: "Grocery Shopping", time: "4:00 PM", day: "Thu", completed: true, priority: "low" },
  { id: 10, title: "Learn Recharts", time: "9:00 PM", day: "Thu", completed: false, priority: "medium" },
  { id: 11, title: "Fix Bugs", time: "11:00 AM", day: "Thu", completed: false, priority: "high" },

  // FRI
  { id: 12, title: "Code Review", time: "11:00 AM", day: "Fri", completed: true, priority: "high" },
  { id: 13, title: "Deploy App", time: "5:00 PM", day: "Fri", completed: true, priority: "high" },
  { id: 14, title: "Clean Code", time: "8:00 PM", day: "Fri", completed: true, priority: "medium" },

  // SAT
  { id: 15, title: "Weekend Planning", time: "6:00 PM", day: "Sat", completed: false, priority: "low" },
  { id: 16, title: "Side Project", time: "2:00 PM", day: "Sat", completed: false, priority: "medium" },

  // SUN
  { id: 17, title: "Watch Tutorials", time: "8:30 PM", day: "Sun", completed: true, priority: "medium" },
  { id: 18, title: "Database Practice", time: "7:00 PM", day: "Sun", completed: false, priority: "high" },
  { id: 19, title: "Plan Week", time: "9:00 PM", day: "Sun", completed: true, priority: "low" }
];
// export const chartData = [
//   {
//     name: "Completed",
//     tasks: tasks.filter(task => task.completed).length,
//   },
//   {
//     name: "Pending",
//     tasks: tasks.filter(task => !task.completed).length,
//   },
// ];
const getDayProgressRate= (day) => {
  const dayTasks = tasks.filter(t => t.day === day);

  if (dayTasks.length === 0) return 0;

  const completed = dayTasks.filter(t => t.completed).length;

  return Math.round((completed / dayTasks.length) * 100);
};
console.log(getDayProgressRate('Tue'));

export const chartData = [
  {
    day: "Mon",
   Rate: getDayProgressRate('Mon')
  },
  {
    day: "Tue",
    Rate: getDayProgressRate('Tue')
  },
  {
    day: "Wed",
    Rate: getDayProgressRate('Wed')
  },
  {
    day: "Thu",
    Rate: getDayProgressRate('Thu')
  },
  {
    day: "Fri",
    Rate: getDayProgressRate('Fri')
  },
  {
    day: "Sat",
    Rate: getDayProgressRate('Sat')
  },
  {
    day: "Sun",
    Rate: getDayProgressRate('Sun')
  },
] 