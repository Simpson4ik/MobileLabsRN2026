import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors, spacing } from "@/constants/theme";

export function StackHeader({ navigation, options, back }) {
  const insets = useSafeAreaInsets();
  const isModal = options.presentation === "modal";

  return (
    <View style={[styles.container, { paddingTop: insets.top + spacing.sm }]}>
      {back ? (
        <Pressable
          onPress={navigation.goBack}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel={isModal ? "Закрити" : "Назад"}
        >
          <Ionicons name={isModal ? "close" : "arrow-back"} size={24} color={colors.primary} />
        </Pressable>
      ) : null}
      <Text style={styles.title} numberOfLines={1}>
        {options.title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
  },
});
