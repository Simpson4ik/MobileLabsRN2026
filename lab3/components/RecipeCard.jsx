import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { memo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, radius, spacing } from "@/constants/theme";

export const RECIPE_CARD_HEIGHT = 112;
export const RECIPE_CARD_GAP = spacing.md;

function RecipeCard({ recipe, onPress }) {
  return (
    <Pressable
      onPress={() => onPress(recipe.id)}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      accessibilityRole="button"
    >
      <Image source={{ uri: recipe.image }} style={styles.image} contentFit="cover" transition={150} />
      <View style={styles.body}>
        <Text style={styles.category} numberOfLines={1}>
          {recipe.category}
        </Text>
        <Text style={styles.title} numberOfLines={2}>
          {recipe.title}
        </Text>
        <View style={styles.meta}>
          <Ionicons name="time-outline" size={14} color={colors.primary} />
          <Text style={styles.metaText}>{recipe.time} хв</Text>
          <Ionicons name="flame-outline" size={14} color={colors.primary} style={styles.metaIcon} />
          <Text style={styles.metaText}>{recipe.difficulty}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default memo(RecipeCard);

const styles = StyleSheet.create({
  card: {
    height: RECIPE_CARD_HEIGHT,
    flexDirection: "row",
    backgroundColor: colors.card,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
  },
  pressed: {
    opacity: 0.8,
  },
  image: {
    width: RECIPE_CARD_HEIGHT,
    height: "100%",
    backgroundColor: colors.primarySoft,
  },
  body: {
    flex: 1,
    padding: spacing.md,
    justifyContent: "space-between",
  },
  category: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.primary,
    textTransform: "uppercase",
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.text,
  },
  meta: {
    flexDirection: "row",
    alignItems: "center",
  },
  metaIcon: {
    marginLeft: spacing.md,
  },
  metaText: {
    fontSize: 13,
    color: colors.textMuted,
    marginLeft: spacing.xs,
  },
});
