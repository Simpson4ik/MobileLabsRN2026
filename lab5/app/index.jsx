import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { RootCard } from "@/components/RootCard";
import { ScreenHeader } from "@/components/ScreenHeader";
import { StorageCard } from "@/components/StorageCard";
import { colors, spacing, student } from "@/constants/theme";
import { getRootSummary, getStorageStats, ROOTS } from "@/utils/fileSystem";

function readState() {
  return {
    stats: getStorageStats(),
    summaries: Object.fromEntries(Object.keys(ROOTS).map((key) => [key, getRootSummary(key)])),
  };
}

export default function HomeScreen() {
  const [state, setState] = useState(readState);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setState(readState());
    }, []),
  );

  const onRefresh = () => {
    setRefreshing(true);
    setState(readState());
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.screen} edges={["top", "left", "right"]}>
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.primary]} />}
      >
        <ScreenHeader title="Файловий менеджер" subtitle="Пам'ять пристрою та файли застосунку" />
        <StorageCard stats={state.stats} />

        <Text style={styles.sectionTitle}>Сховища застосунку</Text>
        {Object.values(ROOTS).map((root) => (
          <RootCard
            key={root.key}
            root={root}
            summary={state.summaries[root.key]}
            onPress={() => router.push({ pathname: "/browser", params: { root: root.key, path: "" } })}
          />
        ))}

        <Text style={styles.footer}>
          {student.fullName}, {student.group}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingBottom: spacing.xl,
  },
  sectionTitle: {
    marginTop: spacing.xl,
    marginBottom: spacing.sm,
    marginHorizontal: spacing.lg + spacing.xs,
    fontSize: 13,
    fontWeight: "700",
    color: colors.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  footer: {
    marginTop: spacing.lg,
    textAlign: "center",
    fontSize: 12,
    color: colors.textMuted,
  },
});
