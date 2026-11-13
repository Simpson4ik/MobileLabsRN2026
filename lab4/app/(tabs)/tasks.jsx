import { FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ScreenHeader } from "@/components/ScreenHeader";
import { TaskCard } from "@/components/TaskCard";
import { colors, spacing } from "@/constants/theme";
import { useGame } from "@/context/GameContext";
import { getTaskProgress, TASKS } from "@/data/tasks";

export default function TasksScreen() {
  const { score, stats } = useGame();
  const items = TASKS.map((task) => ({ ...task, ...getTaskProgress(task, { score, stats }) }));
  const doneCount = items.filter((item) => item.done).length;

  return (
    <SafeAreaView style={styles.screen} edges={["top", "left", "right"]}>
      <ScreenHeader title="Завдання" subtitle={`Виконано ${doneCount} з ${items.length}`} />
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TaskCard task={item} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    padding: spacing.lg,
  },
  separator: {
    height: spacing.md,
  },
});
