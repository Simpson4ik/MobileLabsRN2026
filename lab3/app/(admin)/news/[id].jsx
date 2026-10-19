import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { colors, radius, spacing } from "@/constants/theme";
import { useAdmin } from "@/context/AdminContext";
import { formatDate } from "@/data/admin";

export default function NewsDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { news, deleteNews } = useAdmin();
  const item = news.find((entry) => entry.id === id);

  if (!item) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>Новину не знайдено</Text>
      </View>
    );
  }

  const handleDelete = () => {
    Alert.alert("Видалити новину?", item.title, [
      { text: "Скасувати", style: "cancel" },
      {
        text: "Видалити",
        style: "destructive",
        onPress: () => {
          deleteNews(item.id);
          router.back();
        },
      },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.content}>
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.image} contentFit="cover" />
      ) : (
        <View style={[styles.image, styles.placeholder]}>
          <Ionicons name="image-outline" size={48} color={colors.primary} />
        </View>
      )}
      <Text style={styles.category}>{item.category}</Text>
      <Text style={styles.title}>{item.title}</Text>
      <View style={styles.meta}>
        <Ionicons name="flag-outline" size={14} color={colors.textMuted} />
        <Text style={styles.metaText}>{item.status}</Text>
        <Ionicons name="calendar-outline" size={14} color={colors.textMuted} style={styles.metaIcon} />
        <Text style={styles.metaText}>{formatDate(item.createdAt)}</Text>
      </View>
      <Text style={styles.text}>{item.text}</Text>

      <View style={styles.actions}>
        <Pressable
          onPress={() => router.push({ pathname: "/news/form", params: { id: item.id } })}
          style={({ pressed }) => [styles.button, styles.editButton, pressed && styles.pressed]}
          accessibilityRole="button"
        >
          <Ionicons name="create-outline" size={18} color="#fff" />
          <Text style={styles.buttonText}>Редагувати</Text>
        </Pressable>
        <Pressable
          onPress={handleDelete}
          style={({ pressed }) => [styles.button, styles.deleteButton, pressed && styles.pressed]}
          accessibilityRole="button"
        >
          <Ionicons name="trash-outline" size={18} color={colors.danger} />
          <Text style={[styles.buttonText, styles.deleteText]}>Видалити</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xl * 2,
  },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 16,
    color: colors.textMuted,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: radius.lg,
    backgroundColor: colors.primarySoft,
  },
  placeholder: {
    alignItems: "center",
    justifyContent: "center",
  },
  category: {
    fontSize: 12,
    fontWeight: "700",
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
  meta: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    marginTop: spacing.sm,
  },
  metaIcon: {
    marginLeft: spacing.md,
  },
  metaText: {
    fontSize: 13,
    color: colors.textMuted,
  },
  text: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.text,
    marginTop: spacing.lg,
  },
  actions: {
    flexDirection: "row",
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  button: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    paddingVertical: 12,
    borderRadius: radius.sm,
  },
  editButton: {
    backgroundColor: colors.primary,
  },
  deleteButton: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  pressed: {
    opacity: 0.8,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#fff",
  },
  deleteText: {
    color: colors.danger,
  },
});
