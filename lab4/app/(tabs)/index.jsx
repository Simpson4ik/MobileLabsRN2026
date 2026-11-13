import { StyleSheet, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import { ClickerTarget } from "@/components/ClickerTarget";
import { GestureHints } from "@/components/GestureHints";
import { ScreenHeader } from "@/components/ScreenHeader";
import { colors, radius, spacing } from "@/constants/theme";
import { useGame } from "@/context/GameContext";

export default function GameScreen() {
  const { score, lastEvent, settings } = useGame();

  return (
    <SafeAreaView style={styles.screen} edges={["top", "left", "right"]}>
      <ScreenHeader title="Clicker" subtitle="Заробляйте очки жестами" />
      <View style={styles.scoreCard}>
        <Text style={styles.scoreLabel}>Очки</Text>
        <Text style={styles.score}>{score}</Text>
        {lastEvent ? (
          <Animated.Text key={lastEvent.id} entering={FadeInDown.duration(250)} style={styles.event}>
            {lastEvent.points > 0 ? `${lastEvent.label} +${lastEvent.points}` : lastEvent.label}
          </Animated.Text>
        ) : (
          <Text style={styles.eventMuted}>Торкніться об&apos;єкта, щоб почати</Text>
        )}
      </View>
      <ClickerTarget />
      {settings.hints ? <GestureHints /> : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scoreCard: {
    alignItems: "center",
    marginHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.primary,
  },
  scoreLabel: {
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
    color: colors.primarySoft,
  },
  score: {
    fontSize: 56,
    fontWeight: "900",
    color: colors.card,
  },
  event: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.card,
  },
  eventMuted: {
    fontSize: 15,
    color: colors.primarySoft,
  },
});
