import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, radius, spacing } from "@/constants/theme";
import { formatBytes, pluralize } from "@/utils/format";

export function RootCard({ root, summary, onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={styles.icon}>
        <Ionicons name={root.icon} size={22} color={colors.folder} />
      </View>
      <View style={styles.body}>
        <Text style={styles.title}>{root.title}</Text>
        <Text style={styles.description}>{root.description}</Text>
        <Text style={styles.meta}>
          {pluralize(summary.count, "об'єкт", "об'єкти", "об'єктів")} · {formatBytes(summary.size)}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  pressed: {
    backgroundColor: colors.primarySoft,
  },
  icon: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.folderSoft,
  },
  body: {
    flex: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.text,
  },
  description: {
    marginTop: 2,
    fontSize: 13,
    color: colors.textMuted,
  },
  meta: {
    marginTop: spacing.xs,
    fontSize: 13,
    fontWeight: "600",
    color: colors.primary,
  },
});
