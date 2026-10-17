import { Ionicons } from "@expo/vector-icons";
import { Redirect } from "expo-router";
import { Drawer } from "expo-router/drawer";

import { DrawerContent } from "@/components/DrawerContent";
import { colors } from "@/constants/theme";
import { useAuth } from "@/context/AuthContext";

export default function DrawerLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return (
    <Drawer
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: colors.card },
        headerTintColor: colors.text,
        headerTitleStyle: { fontWeight: "700" },
        drawerActiveTintColor: colors.primary,
        drawerActiveBackgroundColor: colors.primarySoft,
        drawerInactiveTintColor: colors.text,
        sceneStyle: { backgroundColor: colors.background },
      }}
    >
      <Drawer.Screen
        name="(news)"
        options={{
          title: "Рецепти",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="book-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="faq"
        options={{
          title: "Довідковий центр",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="help-circle-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}
