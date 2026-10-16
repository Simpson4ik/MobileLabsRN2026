import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import type { ColorValue } from "react-native";

import { AppHeader } from "@/components/AppHeader";
import { colors } from "@/constants/theme";

type IconName = keyof typeof Ionicons.glyphMap;

const tabIcon =
  (active: IconName, inactive: IconName) =>
  ({ color, focused, size }: { color: ColorValue; focused: boolean; size: number }) => (
    <Ionicons name={focused ? active : inactive} size={size} color={color as string} />
  );

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        header: () => <AppHeader />,
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
        options={{ title: "Рецепти", tabBarIcon: tabIcon("book", "book-outline") }}
      />
      <Tabs.Screen
        name="gallery"
        options={{ title: "Галерея", tabBarIcon: tabIcon("images", "images-outline") }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: "Профіль", tabBarIcon: tabIcon("person", "person-outline") }}
      />
    </Tabs>
  );
}
