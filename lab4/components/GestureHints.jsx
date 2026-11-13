import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { SCORING_RULES } from "@/constants/game";
import { colors, radius, spacing } from "@/constants/theme";

export function GestureHints() {
  return (
    <View style={styles.list}>
      {SCORING_RULES.map((rule) => (
        <View key={rule.id} style={styles.chip}>
          <Ionicons name={rule.icon} size={14} color={colors.primary} />
          <Text style={styles.label}>{rule.label}</Text>
          {rule.value !== "0" ? <Text style={styles.value}>{rule.value}</Text> : null}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    paddingVertical: 6,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.primarySoft,
  },
  label: {
    fontSize: 12,
    color: colors.text,
  },
  value: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.primary,
  },
});
