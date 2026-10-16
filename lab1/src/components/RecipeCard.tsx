import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

import { colors, radius } from "@/constants/theme";
import type { Recipe } from "@/data/recipes";

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: recipe.image }}
        style={styles.image}
        contentFit="cover"
        transition={200}
      />
      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={1}>
          {recipe.title}
        </Text>

        <View style={styles.meta}>
          <Ionicons name="time-outline" size={14} color={colors.primary} />
          <Text style={styles.metaText}>{recipe.time}</Text>
          <Ionicons
            name="flame-outline"
            size={14}
            color={colors.primary}
            style={styles.metaIcon}
          />
          <Text style={styles.metaText}>{recipe.difficulty}</Text>
        </View>

        <Text style={styles.description} numberOfLines={3}>
          {recipe.description}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  image: {
    width: "100%",
    height: 170,
    backgroundColor: colors.primarySoft,
  },
  body: {
    padding: 14,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.text,
  },
  meta: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  metaIcon: {
    marginLeft: 12,
  },
  metaText: {
    fontSize: 13,
    color: colors.textMuted,
    marginLeft: 4,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.textMuted,
    marginTop: 8,
  },
});
