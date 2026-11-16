import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { colors, radius, spacing } from "@/constants/theme";
import { formatBytes } from "@/utils/format";

function Stat({ color, label, value }) {
  return (
    <View style={styles.stat}>
      <View style={styles.statLabelRow}>
        {color ? <View style={[styles.dot, { backgroundColor: color }]} /> : null}
        <Text style={styles.statLabel}>{label}</Text>
      </View>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

export function StorageCard({ stats }) {
  const { total, free, used } = stats;
  const percent = total > 0 ? Math.round((used / total) * 100) : 0;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.icon}>
          <Ionicons name="phone-portrait-outline" size={22} color={colors.card} />
        </View>
        <View style={styles.headerBody}>
          <Text style={styles.caption}>Пам&apos;ять пристрою</Text>
          <Text style={styles.total}>{formatBytes(total)}</Text>
        </View>
        <Text style={styles.percent}>{percent}%</Text>
      </View>

      <View style={styles.track}>
        <View style={[styles.fill, { width: `${percent}%` }]} />
      </View>
      <Text style={styles.hint}>Зайнято {percent}% загального обсягу</Text>

      <View style={styles.stats}>
        <Stat color={colors.card} label="Зайнято" value={formatBytes(used)} />
        <View style={styles.separator} />
        <Stat color={colors.primaryDark} label="Вільно" value={formatBytes(free)} />
        <View style={styles.separator} />
        <Stat label="Загалом" value={formatBytes(total)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: spacing.lg,
    padding: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.primary,
  },
  header: {
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
    backgroundColor: colors.primaryDark,
  },
  headerBody: {
    flex: 1,
  },
  caption: {
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.5,
    textTransform: "uppercase",
    color: colors.primarySoft,
  },
  total: {
    fontSize: 26,
    fontWeight: "900",
    color: colors.card,
  },
  percent: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.card,
  },
  track: {
    height: 10,
    marginTop: spacing.lg,
    borderRadius: radius.pill,
    overflow: "hidden",
    backgroundColor: colors.primaryDark,
  },
  fill: {
    height: "100%",
    borderRadius: radius.pill,
    backgroundColor: colors.card,
  },
  hint: {
    marginTop: spacing.sm,
    fontSize: 12,
    color: colors.primarySoft,
  },
  stats: {
    flexDirection: "row",
    marginTop: spacing.lg,
    paddingTop: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.primarySoft,
  },
  stat: {
    flex: 1,
    alignItems: "center",
  },
  statLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.primarySoft,
  },
  statValue: {
    marginTop: 2,
    fontSize: 16,
    fontWeight: "800",
    color: colors.card,
  },
  separator: {
    width: StyleSheet.hairlineWidth,
    backgroundColor: colors.primarySoft,
  },
});
