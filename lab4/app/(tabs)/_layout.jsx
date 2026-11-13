import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

import { colors } from "@/constants/theme";
import { useGame } from "@/context/GameContext";
import { countCompletedTasks, TASKS } from "@/data/tasks";

const tabIcon =
  (active, inactive) =>
  ({ color, focused, size }) => <Ionicons name={focused ? active : inactive} size={size} color={color} />;

export default function TabsLayout() {
  const { score, stats } = useGame();
  const remaining = TASKS.length - countCompletedTasks({ score, stats });

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.tabInactive,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
        },
        tabBarLabelStyle: { fontSize: 12, fontWeight: "600" },
        sceneStyle: { backgroundColor: colors.background },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: "Гра", tabBarIcon: tabIcon("game-controller", "game-controller-outline") }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          title: "Завдання",
          tabBarIcon: tabIcon("checkbox", "checkbox-outline"),
          tabBarBadge: remaining > 0 ? remaining : undefined,
          tabBarBadgeStyle: { backgroundColor: colors.primary },
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{ title: "Налаштування", tabBarIcon: tabIcon("settings", "settings-outline") }}
      />
    </Tabs>
  );
}
