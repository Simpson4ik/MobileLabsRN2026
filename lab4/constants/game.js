export const POINTS = {
  tap: 1,
  doubleTap: 2,
  longPress: 5,
  pinch: 3,
  combo: 10,
};

export const FLING_POINTS = { min: 1, max: 10 };

export const LONG_PRESS_MS = 1000;
export const HOLD_GOAL_MS = 3000;
export const COMBO_WINDOW_MS = 2000;
export const SCORE_GOAL = 100;
export const PINCH_MIN_CHANGE = 0.15;

export const TARGET_SIZE = 150;
export const SCALE_LIMITS = { min: 0.6, max: 2 };

export const SWIPE = {
  right: "right",
  left: "left",
};

export const INITIAL_STATS = {
  taps: 0,
  doubleTaps: 0,
  longPresses: 0,
  maxHoldMs: 0,
  drags: 0,
  swipesRight: 0,
  swipesLeft: 0,
  pinches: 0,
  combos: 0,
};

export const SCORING_RULES = [
  { id: "tap", icon: "hand-left-outline", label: "Клік", value: `+${POINTS.tap}` },
  { id: "double-tap", icon: "flash-outline", label: "Подвійний клік", value: `+${POINTS.doubleTap}` },
  {
    id: "long-press",
    icon: "timer-outline",
    label: `Утримання від ${LONG_PRESS_MS / 1000} с`,
    value: `+${POINTS.longPress}`,
  },
  {
    id: "fling",
    icon: "swap-horizontal-outline",
    label: "Свайп вправо або вліво",
    value: `+${FLING_POINTS.min}…${FLING_POINTS.max}`,
  },
  { id: "pinch", icon: "resize-outline", label: "Масштабування двома пальцями", value: `+${POINTS.pinch}` },
  { id: "pan", icon: "move-outline", label: "Перетягування", value: "0" },
  {
    id: "combo",
    icon: "sparkles-outline",
    label: `Комбо: подвійний клік і свайп за ${COMBO_WINDOW_MS / 1000} с`,
    value: `+${POINTS.combo}`,
  },
];
