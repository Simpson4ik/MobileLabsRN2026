import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { colors, radius, spacing } from "@/constants/theme";

export function TaskCard({ task }) {
  const { title, gesture, icon, value, target, unit = "", format, done, custom } = task;
  const shown = format ? format(value) : value;
  const percent = Math.round((value / target) * 100);

  return (
    <View style={[styles.card, done && styles.cardDone]}>
      <View style={styles.row}>
        <View style={[styles.icon, done && styles.iconDone]}>
          <Ionicons name={icon} size={22} color={done ? colors.success : colors.primary} />
        </View>
        <View style={styles.body}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.gesture}>
            {gesture}
            {custom ? " · власне завдання" : ""}
          </Text>
        </View>
        <View style={[styles.status, done ? styles.statusDone : styles.statusProgress]}>
          <Ionicons
            name={done ? "checkmark-circle" : "time-outline"}
            size={14}
            color={done ? colors.success : colors.warning}
          />
          <Text style={[styles.statusText, { color: done ? colors.success : colors.warning }]}>
            {done ? "Виконано" : "В процесі"}
          </Text>
        </View>
      </View>
      <View style={styles.progressRow}>
        <View style={styles.track}>
          <View
            style={[
              styles.fill,
              { width: `${percent}%`, backgroundColor: done ? colors.success : colors.primary },
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          {shown} / {target}
          {unit}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    gap: spacing.md,
  },
  cardDone: {
    borderColor: colors.successSoft,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  icon: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primarySoft,
  },
  iconDone: {
    backgroundColor: colors.successSoft,
  },
  body: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.text,
  },
  gesture: {
    marginTop: 2,
    fontSize: 12,
    color: colors.textMuted,
  },
  status: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingVertical: 4,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.pill,
  },
  statusDone: {
    backgroundColor: colors.successSoft,
  },
  statusProgress: {
    backgroundColor: colors.warningSoft,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "700",
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  track: {
    flex: 1,
    height: 8,
    borderRadius: radius.pill,
    backgroundColor: colors.border,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    borderRadius: radius.pill,
  },
  progressText: {
    minWidth: 64,
    textAlign: "right",
    fontSize: 13,
    fontWeight: "600",
    color: colors.textMuted,
  },
});
