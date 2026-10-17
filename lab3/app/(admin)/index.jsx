import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { colors, radius, spacing } from "@/constants/theme";
import { useAdmin } from "@/context/AdminContext";
import { formatTime } from "@/data/admin";

export default function DashboardScreen() {
  const { news, users, logs } = useAdmin();
  const [refreshedAt, setRefreshedAt] = useState(() => new Date().toISOString());

  useFocusEffect(
    useCallback(() => {
      setRefreshedAt(new Date().toISOString());
    }, []),
  );

  const stats = [
    { label: "Новини", value: news.length },
    { label: "Користувачі", value: users.length },
    { label: "Логи", value: logs.length },
  ];

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.updated}>Оновлено о {formatTime(refreshedAt)}</Text>
      <View style={styles.grid}>
        {stats.map((stat) => (
          <View key={stat.label} style={styles.card}>
            <Text style={styles.value}>{stat.value}</Text>
            <Text style={styles.label}>{stat.label}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.lg,
  },
  updated: {
    fontSize: 13,
    color: colors.textMuted,
    marginBottom: spacing.md,
  },
  grid: {
    gap: spacing.md,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.xl,
  },
  value: {
    fontSize: 36,
    fontWeight: "800",
    color: colors.primary,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
    marginTop: spacing.xs,
  },
});
