import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors, spacing } from "@/constants/theme";

export function AdminHeader({ title, onMenuPress }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + spacing.sm }]}>
      <Pressable onPress={onMenuPress} hitSlop={12} accessibilityRole="button" accessibilityLabel="Меню">
        <Ionicons name="menu" size={26} color={colors.text} />
      </Pressable>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.badge}>
        <Ionicons name="shield-checkmark" size={16} color={colors.primary} />
        <Text style={styles.badgeText}>Адмін</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    backgroundColor: colors.primarySoft,
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.primary,
  },
});
