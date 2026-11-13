import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  Directions,
  GestureDetector,
  useCompetingGestures,
  useExclusiveGestures,
  useFlingGesture,
  useLongPressGesture,
  usePanGesture,
  usePinchGesture,
  useSimultaneousGestures,
  useTapGesture,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

import { LONG_PRESS_MS, SCALE_LIMITS, SWIPE, TARGET_SIZE } from "@/constants/game";
import { colors, radius, spacing } from "@/constants/theme";
import { useGame } from "@/context/GameContext";

function clamp(value, min, max) {
  "worklet";
  return Math.min(Math.max(value, min), max);
}

export function ClickerTarget() {
  const {
    resetKey,
    registerTap,
    registerDoubleTap,
    registerLongPress,
    registerHoldEnd,
    registerDrag,
    registerFling,
    registerPinch,
  } = useGame();

  const area = useSharedValue({ width: 0, height: 0 });
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);
  const dragStart = useSharedValue({ x: 0, y: 0 });
  const scale = useSharedValue(1);
  const pinchStart = useSharedValue(1);
  const pressScale = useSharedValue(1);

  useEffect(() => {
    offsetX.set(withSpring(0));
    offsetY.set(withSpring(0));
    scale.set(withSpring(1));
  }, [resetKey, offsetX, offsetY, scale]);

  const bump = (to) => {
    pressScale.set(withSequence(withTiming(to, { duration: 90 }), withSpring(1)));
  };

  const getLimits = (currentScale) => {
    "worklet";
    const half = (TARGET_SIZE * currentScale) / 2;
    const { width, height } = area.get();
    return {
      x: Math.max(0, width / 2 - half),
      y: Math.max(0, height / 2 - half),
    };
  };

  const singleTap = useTapGesture({
    runOnJS: true,
    onActivate: () => {
      bump(0.9);
      registerTap();
    },
  });

  const doubleTap = useTapGesture({
    numberOfTaps: 2,
    runOnJS: true,
    onActivate: () => {
      bump(1.15);
      registerDoubleTap();
    },
  });

  const longPress = useLongPressGesture({
    minDuration: LONG_PRESS_MS,
    runOnJS: true,
    onActivate: () => {
      bump(1.2);
      registerLongPress();
    },
    onDeactivate: (event) => {
      registerHoldEnd(event.duration);
    },
  });

  const pan = usePanGesture({
    maxPointers: 1,
    onActivate: () => {
      dragStart.set({ x: offsetX.get(), y: offsetY.get() });
    },
    onUpdate: (event) => {
      const limits = getLimits(scale.get());
      const start = dragStart.get();
      offsetX.set(clamp(start.x + event.translationX, -limits.x, limits.x));
      offsetY.set(clamp(start.y + event.translationY, -limits.y, limits.y));
    },
    onDeactivate: (event) => {
      if (!event.canceled) {
        scheduleOnRN(registerDrag);
      }
    },
  });

  const pinch = usePinchGesture({
    onActivate: () => {
      pinchStart.set(scale.get());
    },
    onUpdate: (event) => {
      scale.set(clamp(pinchStart.get() * event.scale, SCALE_LIMITS.min, SCALE_LIMITS.max));
    },
    onDeactivate: (event) => {
      const limits = getLimits(scale.get());
      offsetX.set(withSpring(clamp(offsetX.get(), -limits.x, limits.x)));
      offsetY.set(withSpring(clamp(offsetY.get(), -limits.y, limits.y)));
      if (!event.canceled) {
        scheduleOnRN(registerPinch, scale.get() / pinchStart.get());
      }
    },
  });

  const flingRight = useFlingGesture({
    direction: Directions.RIGHT,
    runOnJS: true,
    onActivate: () => registerFling(SWIPE.right),
  });

  const flingLeft = useFlingGesture({
    direction: Directions.LEFT,
    runOnJS: true,
    onActivate: () => registerFling(SWIPE.left),
  });

  const taps = useExclusiveGestures(doubleTap, singleTap);
  const movement = useSimultaneousGestures(pan, pinch, flingRight, flingLeft);
  const gesture = useCompetingGestures(movement, longPress, taps);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: offsetX.get() },
      { translateY: offsetY.get() },
      { scale: scale.get() * pressScale.get() },
    ],
  }));

  return (
    <View
      style={styles.area}
      onLayout={(event) => {
        const { width, height } = event.nativeEvent.layout;
        area.set({ width, height });
      }}
    >
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.target, animatedStyle]}>
          <Ionicons name="finger-print" size={64} color={colors.card} />
          <Text style={styles.caption}>Натисни</Text>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  area: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: spacing.lg,
    marginVertical: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: "dashed",
    backgroundColor: colors.card,
    overflow: "hidden",
  },
  target: {
    width: TARGET_SIZE,
    height: TARGET_SIZE,
    borderRadius: TARGET_SIZE / 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    borderWidth: 6,
    borderColor: colors.primarySoft,
    shadowColor: colors.primaryDark,
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  caption: {
    marginTop: spacing.xs,
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 1,
    color: colors.primarySoft,
    textTransform: "uppercase",
  },
});
