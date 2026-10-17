import { Ionicons } from "@expo/vector-icons";
import { DrawerContentScrollView, DrawerItemList } from "expo-router/drawer";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors, radius, spacing, student } from "@/constants/theme";
import { useAuth } from "@/context/AuthContext";

export function DrawerContent(props) {
  const { user, logout } = useAuth();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props} contentContainerStyle={styles.scroll}>
        <View style={styles.profile}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={32} color={colors.primary} />
          </View>
          <Text style={styles.name}>{student.fullName}</Text>
          <Text style={styles.meta}>{student.group}</Text>
          {user ? <Text style={styles.meta}>{user.email}</Text> : null}
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <Pressable
        onPress={logout}
        style={({ pressed }) => [
          styles.logout,
          { marginBottom: insets.bottom + spacing.lg },
          pressed && styles.pressed,
        ]}
        accessibilityRole="button"
      >
        <Ionicons name="log-out-outline" size={22} color={colors.danger} />
        <Text style={styles.logoutText}>Вийти</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.card,
  },
  scroll: {
    paddingTop: 0,
  },
  profile: {
    backgroundColor: colors.primarySoft,
    padding: spacing.lg,
    paddingTop: spacing.xl * 2,
    marginBottom: spacing.sm,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.card,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
  },
  meta: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 2,
  },
  logout: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    marginHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pressed: {
    opacity: 0.7,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.danger,
  },
});
