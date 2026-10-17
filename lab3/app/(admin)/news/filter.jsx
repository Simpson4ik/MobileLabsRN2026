import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { Chip } from "@/components/Chip";
import { colors, radius, spacing } from "@/constants/theme";
import { useAdmin } from "@/context/AdminContext";
import { NEWS_CATEGORY_LIST, NEWS_STATUSES } from "@/data/admin";

const ALL = "Усі";

export default function NewsFilterScreen() {
  const router = useRouter();
  const { newsFilter, setNewsFilter } = useAdmin();
  const [draft, setDraft] = useState(newsFilter);

  const handleApply = () => {
    setNewsFilter(draft);
    router.back();
  };

  const handleReset = () => {
    setDraft({ status: ALL, category: ALL });
  };

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.title}>Фільтр новин</Text>
      <Text style={styles.label}>Статус</Text>
      <View style={styles.chips}>
        {[ALL, ...NEWS_STATUSES].map((item) => (
          <Chip key={item} label={item} selected={draft.status === item} onPress={() => setDraft({ ...draft, status: item })} />
        ))}
      </View>

      <Text style={styles.label}>Категорія</Text>
      <View style={styles.chips}>
        {[ALL, ...NEWS_CATEGORY_LIST].map((item) => (
          <Chip key={item} label={item} selected={draft.category === item} onPress={() => setDraft({ ...draft, category: item })} />
        ))}
      </View>

      <View style={styles.actions}>
        <Pressable onPress={handleReset} style={[styles.button, styles.resetButton]} accessibilityRole="button">
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
