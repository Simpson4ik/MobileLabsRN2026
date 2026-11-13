import * as Haptics from "expo-haptics";
import { createContext, useContext, useRef, useState } from "react";

import {
  COMBO_WINDOW_MS,
  FLING_POINTS,
  INITIAL_STATS,
  PINCH_MIN_CHANGE,
  POINTS,
  SWIPE,
} from "@/constants/game";

const GameContext = createContext(null);

const INITIAL_SETTINGS = {
  haptics: true,
  hints: true,
};

function randomFlingPoints() {
  return FLING_POINTS.min + Math.floor(Math.random() * (FLING_POINTS.max - FLING_POINTS.min + 1));
}

export function GameProvider({ children }) {
  const [score, setScore] = useState(0);
  const [stats, setStats] = useState(INITIAL_STATS);
  const [lastEvent, setLastEvent] = useState(null);
  const [settings, setSettings] = useState(INITIAL_SETTINGS);
  const [resetKey, setResetKey] = useState(0);
  const eventId = useRef(0);
  const lastDoubleTapAt = useRef(0);

  const award = (label, points, statKeys, feedback = Haptics.ImpactFeedbackStyle.Light) => {
    if (points > 0) {
      setScore((prev) => prev + points);
    }
    setStats((prev) => {
      const next = { ...prev };
      statKeys.forEach((key) => {
        next[key] += 1;
      });
      return next;
    });
    eventId.current += 1;
    setLastEvent({ id: eventId.current, label, points });
    if (settings.haptics) {
      Haptics.impactAsync(feedback).catch(() => undefined);
    }
  };

  const registerTap = () => award("Клік", POINTS.tap, ["taps"]);

  const registerDoubleTap = () => {
    lastDoubleTapAt.current = Date.now();
    award("Подвійний клік", POINTS.doubleTap, ["doubleTaps"]);
  };

  const registerLongPress = () =>
    award("Утримання", POINTS.longPress, ["longPresses"], Haptics.ImpactFeedbackStyle.Medium);

  const registerHoldEnd = (durationMs) => {
    setStats((prev) => ({ ...prev, maxHoldMs: Math.max(prev.maxHoldMs, Math.round(durationMs)) }));
  };

  const registerDrag = () => {
    setStats((prev) => ({ ...prev, drags: prev.drags + 1 }));
  };

  const registerFling = (direction) => {
    const isRight = direction === SWIPE.right;
    const label = isRight ? "Свайп вправо" : "Свайп вліво";
    const statKey = isRight ? "swipesRight" : "swipesLeft";
    const points = randomFlingPoints();
    const isCombo = Date.now() - lastDoubleTapAt.current <= COMBO_WINDOW_MS;

    if (isCombo) {
      lastDoubleTapAt.current = 0;
      award(`${label} + комбо`, points + POINTS.combo, [statKey, "combos"], Haptics.ImpactFeedbackStyle.Heavy);
      return;
    }
    award(label, points, [statKey]);
  };

  const registerPinch = (scaleRatio) => {
    if (Math.abs(scaleRatio - 1) < PINCH_MIN_CHANGE) {
      return;
    }
    award(scaleRatio > 1 ? "Збільшення" : "Зменшення", POINTS.pinch, ["pinches"]);
  };

  const toggleSetting = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const resetProgress = () => {
    setScore(0);
    setStats(INITIAL_STATS);
    setLastEvent(null);
    lastDoubleTapAt.current = 0;
    setResetKey((prev) => prev + 1);
  };

  const value = {
    score,
    stats,
    lastEvent,
    settings,
    resetKey,
    registerTap,
    registerDoubleTap,
    registerLongPress,
    registerHoldEnd,
    registerDrag,
    registerFling,
    registerPinch,
    toggleSetting,
    resetProgress,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used inside GameProvider");
  }
  return context;
}
