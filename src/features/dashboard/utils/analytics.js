export const WEEK_DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const toDate = (value) => {
  if (!value) return null;
  if (typeof value.toDate === "function") return value.toDate();
  if (value instanceof Date) return value;
  return null;
};

export const getCompletionStats = (tasks = []) => {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;
  const pending = total - completed;
  const completion = total ? Math.round((completed / total) * 100) : 0;
  return { total, completed, pending, completion };
};

export const getCountsByDay = (items = []) => {
  const counts = {};
  items.forEach((item) => {
    if (item.day) counts[item.day] = (counts[item.day] || 0) + 1;
  });
  return counts;
};

const getWeekTotals = (tasks, events) => {
  const now = new Date();
  const startOfCurrentWeek = new Date(now);
  startOfCurrentWeek.setDate(now.getDate() - now.getDay());
  startOfCurrentWeek.setHours(0, 0, 0, 0);

  const startOfPreviousWeek = new Date(startOfCurrentWeek);
  startOfPreviousWeek.setDate(startOfCurrentWeek.getDate() - 7);

  let currentWeek = 0;
  let previousWeek = 0;

  const bucket = (item) => {
    const date = toDate(item?.createdAt);
    if (!date) {
      currentWeek += 1;
      return;
    }
    if (date >= startOfCurrentWeek) currentWeek += 1;
    else if (date >= startOfPreviousWeek) previousWeek += 1;
  };

  tasks.forEach(bucket);
  events.forEach(bucket);

  return { currentWeek, previousWeek };
};

export const getWeeklyActivity = (tasks = [], events = []) => {
  const taskCounts = getCountsByDay(tasks);
  const eventCounts = getCountsByDay(events);

  const data = WEEK_DAY_LABELS.map((label) => ({
    label,
    tasks: taskCounts[label] || 0,
    events: eventCounts[label] || 0,
  }));

  const totalTasks = tasks.length;
  const totalEvents = events.length;
  const total = totalTasks + totalEvents;
  const avgPerDay = data.length ? Math.round((total / data.length) * 10) / 10 : 0;

  const { currentWeek, previousWeek } = getWeekTotals(tasks, events);
  const trend = currentWeek >= previousWeek ? "up" : "down";
  const change = previousWeek > 0 ? Math.round(((currentWeek - previousWeek) / previousWeek) * 100) : 0;

  return { data, totalTasks, totalEvents, total, avgPerDay, trend, change };
};

export const getDailyProgressData = (tasks = []) =>
  WEEK_DAY_LABELS.map((day) => {
    const dayTasks = tasks.filter((task) => task.day === day);
    const completed = dayTasks.filter((task) => task.completed).length;
    const rate = dayTasks.length ? Math.round((completed / dayTasks.length) * 100) : 0;
    return { day, Rate: rate };
  });