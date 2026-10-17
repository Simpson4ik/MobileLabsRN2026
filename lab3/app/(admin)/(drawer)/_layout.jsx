import { Ionicons } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";

import { AdminDrawerContent } from "@/components/AdminDrawerContent";
import { AdminHeader } from "@/components/AdminHeader";
import { colors } from "@/constants/theme";

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={(props) => <AdminDrawerContent {...props} />}
      screenOptions={{
        header: ({ options, navigation }) => (
          <AdminHeader title={options.title} onMenuPress={() => navigation.toggleDrawer()} />
        ),
        drawerActiveTintColor: colors.primary,
        drawerActiveBackgroundColor: colors.primarySoft,
        drawerInactiveTintColor: colors.text,
        sceneStyle: { backgroundColor: colors.background },
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          title: "Дашборд",
          drawerIcon: ({ color, size }) => <Ionicons name="grid-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="news"
        options={{
          title: "Новини",
          drawerIcon: ({ color, size }) => <Ionicons name="newspaper-outline" size={size} color={color} />,
        }}
      />
    </Drawer>
  );
}
