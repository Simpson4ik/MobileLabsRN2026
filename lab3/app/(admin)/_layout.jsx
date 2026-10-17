import { Redirect, Stack } from "expo-router";

import { StackHeader } from "@/components/StackHeader";
import { colors } from "@/constants/theme";
import { useAuth } from "@/context/AuthContext";

const sheetOptions = {
  presentation: "formSheet",
  headerShown: false,
  sheetAllowedDetents: [0.5, 0.85],
  sheetGrabberVisible: true,
  sheetCornerRadius: 24,
};

export default function AdminLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack
      screenOptions={{
        header: (props) => <StackHeader {...props} />,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
      <Stack.Screen name="news/[id]" options={{ title: "Деталі новини" }} />
      <Stack.Screen name="news/form" options={{ title: "Новина", presentation: "modal" }} />
      <Stack.Screen name="news/filter" options={sheetOptions} />
    </Stack>
  );
}
