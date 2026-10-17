import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { colors, radius, spacing } from "@/constants/theme";
import { getRecipeById } from "@/data/recipes";

export default function RecipeDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const recipe = getRecipeById(id);

  if (!recipe) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>Рецепт не знайдено</Text>
        <BackButton onPress={router.back} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <BackButton onPress={router.back} />

      <Image source={{ uri: recipe.image }} style={styles.image} contentFit="cover" />

      <Text style={styles.category}>{recipe.category}</Text>
      <Text style={styles.title}>{recipe.title}</Text>
      <Text style={styles.description}>{recipe.description}</Text>

      <View style={styles.stats}>
        <Stat icon="time-outline" label="Час" value={`${recipe.time} хв`} />
        <Stat icon="flame-outline" label="Складність" value={recipe.difficulty} />
        <Stat icon="people-outline" label="Порцій" value={String(recipe.servings)} />
      </View>

      <Section title="Інгредієнти">
        {recipe.ingredients.map((ingredient) => (
          <View key={ingredient} style={styles.row}>
            <View style={styles.bullet} />
            <Text style={styles.rowText}>{ingredient}</Text>
          </View>
        ))}
      </Section>

      <Section title="Приготування">
        {recipe.steps.map((step, index) => (
          <View key={step} style={styles.row}>
            <Text style={styles.stepNumber}>{index + 1}</Text>
            <Text style={styles.rowText}>{step}</Text>
          </View>
        ))}
      </Section>
    </ScrollView>
  );
}

function BackButton({ onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.back, pressed && styles.pressed]}
      accessibilityRole="button"
    >
      <Ionicons name="arrow-back" size={18} color={colors.primary} />
      <Text style={styles.backText}>До списку</Text>
    </Pressable>
  );
}

function Stat({ icon, label, value }) {
  return (
    <View style={styles.stat}>
      <Ionicons name={icon} size={20} color={colors.primary} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function Section({ title, children }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xl * 2,
  },
  notFound: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.lg,
  },
  notFoundText: {
    fontSize: 16,
    color: colors.textMuted,
  },
  back: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: spacing.xs,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.sm,
    backgroundColor: colors.primarySoft,
    marginBottom: spacing.md,
  },
  pressed: {
    opacity: 0.7,
  },
  backText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.primary,
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: radius.lg,
    backgroundColor: colors.primarySoft,
  },
  category: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.primary,
    textTransform: "uppercase",
    marginTop: spacing.lg,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.text,
    marginTop: spacing.xs,
  },
  description: {
    fontSize: 15,
    lineHeight: 21,
    color: colors.textMuted,
    marginTop: spacing.sm,
  },
  stats: {
    flexDirection: "row",
    backgroundColor: colors.card,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.md,
    marginTop: spacing.lg,
  },
  stat: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.text,
    marginTop: spacing.xs,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textMuted,
  },
  section: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    marginTop: spacing.lg,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.sm,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: spacing.xs,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
    marginTop: 8,
    marginRight: spacing.md,
  },
  stepNumber: {
    width: 22,
    fontSize: 15,
    fontWeight: "700",
    color: colors.primary,
  },
  rowText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 21,
    color: colors.text,
  },
});
