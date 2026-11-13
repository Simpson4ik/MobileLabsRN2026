import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Switch, Text, View } from "react-native";

import { colors, radius, spacing } from "@/constants/theme";

export function SettingsSection({ title, children }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.card}>{children}</View>
    </View>
  );
}

export function SettingRow({ icon, label, description, value, last }) {
  return (
    <View style={[styles.row, !last && styles.divider]}>
      {icon ? <Ionicons name={icon} size={20} color={colors.primary} /> : null}
      <View style={styles.body}>
        <Text style={styles.label}>{label}</Text>
        {description ? <Text style={styles.description}>{description}</Text> : null}
      </View>
      {value !== undefined ? <Text style={styles.value}>{value}</Text> : null}
    </View>
  );
}

export function SwitchRow({ icon, label, description, value, onToggle, last }) {
  return (
    <View style={[styles.row, !last && styles.divider]}>
      <Ionicons name={icon} size={20} color={colors.primary} />
      <View style={styles.body}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: colors.border, true: colors.primarySoft }}
        thumbColor={value ? colors.primary : colors.card}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    marginBottom: spacing.sm,
    marginLeft: spacing.xs,
    fontSize: 13,
    fontWeight: "700",
    color: colors.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  card: {
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    paddingHorizontal: spacing.lg,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingVertical: spacing.md,
  },
  divider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  body: {
    flex: 1,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
  },
  description: {
    marginTop: 2,
    fontSize: 12,
    color: colors.textMuted,
  },
  value: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.primary,
  },
});
