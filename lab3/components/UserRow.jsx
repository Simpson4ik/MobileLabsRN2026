import { Ionicons } from "@expo/vector-icons";
import { memo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, radius, spacing } from "@/constants/theme";

export const USER_ROW_HEIGHT = 88;

const initials = (name) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

function UserRowComponent({ item, onToggleStatus }) {
  const isActive = item.status === "Активний";
  const statusColor = isActive ? colors.success : colors.danger;

  return (
    <View style={styles.row}>
      <View style={[styles.avatar, !isActive && styles.avatarBlocked]}>
        <Text style={styles.avatarText}>{initials(item.name)}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.email} numberOfLines={1}>
          {item.email}
        </Text>
        <Text style={styles.role}>{item.role}</Text>
      </View>
      <Pressable
        onPress={() => onToggleStatus(item.id)}
        style={[styles.status, isActive ? styles.statusActive : styles.statusBlocked]}
        accessibilityRole="button"
        accessibilityLabel={isActive ? "Заблокувати" : "Розблокувати"}
      >
        <Ionicons name={isActive ? "checkmark-circle" : "ban"} size={16} color={statusColor} />
        <Text style={[styles.statusText, { color: statusColor }]}>{item.status}</Text>
      </Pressable>
    </View>
  );
}

export const UserRow = memo(UserRowComponent);

const styles = StyleSheet.create({
  row: {
    height: USER_ROW_HEIGHT,
    marginBottom: spacing.sm,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.card,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primarySoft,
  },
  avatarBlocked: {
    backgroundColor: colors.border,
  },
  avatarText: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.primary,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.text,
  },
  email: {
    fontSize: 13,
    color: colors.textMuted,
  },
  role: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.primary,
    marginTop: 2,
  },
  status: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    borderRadius: radius.sm,
  },
  statusActive: {
    backgroundColor: colors.successSoft,
  },
  statusBlocked: {
    backgroundColor: colors.dangerSoft,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "700",
  },
});
