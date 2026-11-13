import { COMBO_WINDOW_MS, HOLD_GOAL_MS, SCORE_GOAL } from "@/constants/game";

export const TASKS = [
  {
    id: "taps",
    title: "Зробити 10 кліків",
    gesture: "Tap",
    icon: "hand-left-outline",
    target: 10,
    getValue: ({ stats }) => stats.taps,
  },
  {
    id: "double-taps",
    title: "Зробити подвійний клік 5 разів",
    gesture: "Tap (numberOfTaps: 2)",
    icon: "flash-outline",
    target: 5,
    getValue: ({ stats }) => stats.doubleTaps,
  },
  {
    id: "hold",
    title: `Утримувати об'єкт ${HOLD_GOAL_MS / 1000} секунди`,
    gesture: "LongPress",
    icon: "timer-outline",
    target: HOLD_GOAL_MS / 1000,
    unit: " с",
    getValue: ({ stats }) => Math.floor(stats.maxHoldMs / 100) / 10,
    format: (value) => value.toFixed(1),
  },
  {
    id: "drag",
    title: "Перетягнути об'єкт",
    gesture: "Pan",
    icon: "move-outline",
    target: 1,
    getValue: ({ stats }) => stats.drags,
  },
  {
    id: "swipes",
    title: "Зробити свайп вправо та свайп вліво",
    gesture: "Fling",
    icon: "swap-horizontal-outline",
    target: 2,
    getValue: ({ stats }) => Number(stats.swipesRight > 0) + Number(stats.swipesLeft > 0),
  },
  {
    id: "pinch",
    title: "Змінити розмір об'єкта",
    gesture: "Pinch",
    icon: "resize-outline",
    target: 1,
    getValue: ({ stats }) => stats.pinches,
  },
  {
    id: "score",
    title: `Отримати ${SCORE_GOAL} очок`,
    gesture: "Будь-які жести",
    icon: "trophy-outline",
    target: SCORE_GOAL,
    getValue: ({ score }) => score,
  },
  {
    id: "combo",
    title: `Комбо: подвійний клік, а потім свайп протягом ${COMBO_WINDOW_MS / 1000} секунди`,
    gesture: "Tap ×2 → Fling",
    icon: "sparkles-outline",
    target: 1,
    custom: true,
    getValue: ({ stats }) => stats.combos,
  },
];

export function getTaskProgress(task, state) {
  const value = Math.min(task.getValue(state), task.target);
  return { value, done: value >= task.target };
}

export function countCompletedTasks(state) {
  return TASKS.filter((task) => getTaskProgress(task, state).done).length;
}
