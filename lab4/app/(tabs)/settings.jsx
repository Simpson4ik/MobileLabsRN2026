import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { Alert, Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ScreenHeader } from "@/components/ScreenHeader";
import { SettingRow, SettingsSection, SwitchRow } from "@/components/SettingsSection";
import { SCORING_RULES } from "@/constants/game";
import { colors, radius, spacing, student } from "@/constants/theme";
import { useGame } from "@/context/GameContext";

export default function SettingsScreen() {
  const { score, stats, settings, toggleSetting, resetProgress } = useGame();

  const statRows = [
    { label: "Очки", value: score },
    { label: "Кліки", value: stats.taps },
    { label: "Подвійні кліки", value: stats.doubleTaps },
    { label: "Утримання", value: stats.longPresses },
    { label: "Найдовше утримання", value: `${(stats.maxHoldMs / 1000).toFixed(1)} с` },
    { label: "Перетягування", value: stats.drags },
    { label: "Свайпи вправо / вліво", value: `${stats.swipesRight} / ${stats.swipesLeft}` },
    { label: "Масштабування", value: stats.pinches },
    { label: "Комбо", value: stats.combos },
  ];

  const confirmReset = () => {
    Alert.alert("Скинути прогрес?", "Очки, статистика та завдання повернуться до початкового стану.", [
      { text: "Скасувати", style: "cancel" },
      { text: "Скинути", style: "destructive", onPress: resetProgress },
    ]);
  };

  return (
    <SafeAreaView style={styles.screen} edges={["top", "left", "right"]}>
      <ScreenHeader title="Налаштування" />
      <ScrollView contentContainerStyle={styles.content}>
        <SettingsSection title="Загальні">
          <SwitchRow
            icon="phone-portrait-outline"
            label="Вібровідгук"
            description="Вібрація при нарахуванні очок"
            value={settings.haptics}
            onToggle={() => toggleSetting("haptics")}
          />
          <SwitchRow
            icon="help-circle-outline"
            label="Підказки жестів"
            description="Перелік жестів під ігровим полем"
            value={settings.hints}
            onToggle={() => toggleSetting("hints")}
            last
          />
        </SettingsSection>

        <SettingsSection title="Нарахування очок">
          {SCORING_RULES.map((rule, index) => (
            <SettingRow
              key={rule.id}
              icon={rule.icon}
              label={rule.label}
              value={rule.value}
              last={index === SCORING_RULES.length - 1}
            />
          ))}
        </SettingsSection>

        <SettingsSection title="Статистика">
          {statRows.map((row, index) => (
            <SettingRow key={row.label} label={row.label} value={row.value} last={index === statRows.length - 1} />
          ))}
        </SettingsSection>

        <SettingsSection title="Про додаток">
          <SettingRow label="Версія" value={Constants.expoConfig?.version ?? "1.0.0"} />
          <SettingRow label="Студент" description={student.fullName} />
          <SettingRow label="Група" value={student.group} last />
        </SettingsSection>

        <Pressable
          onPress={confirmReset}
          style={({ pressed }) => [styles.resetButton, pressed && styles.resetPressed]}
        >
          <Ionicons name="refresh" size={20} color={colors.danger} />
          <Text style={styles.resetText}>Скинути прогрес</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xl,
  },
  resetButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    paddingVertical: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.danger,
    backgroundColor: colors.dangerSoft,
  },
  resetPressed: {
    opacity: 0.7,
  },
  resetText: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.danger,
  },
});
