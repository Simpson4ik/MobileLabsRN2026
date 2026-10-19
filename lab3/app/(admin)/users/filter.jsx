import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { Chip } from "@/components/Chip";
import { colors, radius, spacing } from "@/constants/theme";
import { useAdmin } from "@/context/AdminContext";
import { FILTER_ALL, USER_ROLES, USER_STATUSES } from "@/data/admin";

export default function UsersFilterScreen() {
  const router = useRouter();
  const { userFilter, setUserFilter } = useAdmin();
  const [draft, setDraft] = useState(userFilter);

  const handleApply = () => {
    setUserFilter(draft);
    router.back();
  };

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.title}>Фільтр користувачів</Text>
      <Text style={styles.label}>Статус</Text>
      <View style={styles.chips}>
        {[FILTER_ALL, ...USER_STATUSES].map((item) => (
          <Chip key={item} label={item} selected={draft.status === item} onPress={() => setDraft({ ...draft, status: item })} />
        ))}
      </View>

      <Text style={styles.label}>Роль</Text>
      <View style={styles.chips}>
        {[FILTER_ALL, ...USER_ROLES].map((item) => (
          <Chip key={item} label={item} selected={draft.role === item} onPress={() => setDraft({ ...draft, role: item })} />
        ))}
      </View>

      <View style={styles.actions}>
        <Pressable
          onPress={() => setDraft({ status: FILTER_ALL, role: FILTER_ALL })}
          style={[styles.button, styles.resetButton]}
          accessibilityRole="button"
        >
          <Text style={styles.resetText}>Скинути</Text>
        </Pressable>
        <Pressable onPress={handleApply} style={[styles.button, styles.applyButton]} accessibilityRole="button">
          <Text style={styles.applyText}>Застосувати</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.lg,
    paddingTop: spacing.xl,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.text,
  },
  label: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.text,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  actions: {
    flexDirection: "row",
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: radius.sm,
    alignItems: "center",
  },
  resetButton: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  applyButton: {
    backgroundColor: colors.primary,
  },
  resetText: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.text,
  },
  applyText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#fff",
  },
});
