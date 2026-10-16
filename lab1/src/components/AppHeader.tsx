import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors, student } from "@/constants/theme";

export function AppHeader() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <View style={styles.logo}>
        <Ionicons name="restaurant" size={22} color="#fff" />
      </View>

      <View style={styles.titleBlock}>
        <Text style={styles.title}>Лабораторна робота 1</Text>
        <Text style={styles.subtitle}>
          {student.shortName}, {student.group}
        </Text>
      </View>

      <Pressable
        style={({ pressed }) => [styles.settings, pressed && styles.pressed]}
        accessibilityRole="button"
        accessibilityLabel="Налаштування"
      >
        <Ionicons name="settings-sharp" size={22} color="#fff" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 10,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  titleBlock: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.text,
  },
  subtitle: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  settings: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.headerBadge,
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: {
    opacity: 0.7,
  },
});
