import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useCallback, useMemo } from "react";
import { Pressable, StyleSheet, Text, View, VirtualizedList } from "react-native";

import { colors, radius, spacing } from "@/constants/theme";
import { useAdmin } from "@/context/AdminContext";
import { formatDate } from "@/data/admin";

const CARD_HEIGHT = 112;
const CARD_GAP = spacing.md;
const ITEM_LENGTH = CARD_HEIGHT + CARD_GAP;

const STATUS_COLORS = {
  "Опубліковано": "#2B8A3E",
  "Чернетка": "#7A6A5D",
  "На перевірці": "#E8590C",
};

const getItem = (data, index) => data[index];
const getItemCount = (data) => data.length;
const getItemLayout = (_, index) => ({ length: ITEM_LENGTH, offset: ITEM_LENGTH * index, index });
const keyExtractor = (item) => item.id;

export default function NewsListScreen() {
  const router = useRouter();
  const { news, newsFilter } = useAdmin();

  const filtered = useMemo(
    () =>
      news.filter(
        (item) =>
          (newsFilter.status === "Усі" || item.status === newsFilter.status) &&
          (newsFilter.category === "Усі" || item.category === newsFilter.category),
      ),
    [news, newsFilter],
  );

  const renderItem = useCallback(
    ({ item }) => (
      <Pressable
        onPress={() => router.push({ pathname: "/news/[id]", params: { id: item.id } })}
        style={({ pressed }) => [styles.card, pressed && styles.pressed]}
        accessibilityRole="button"
      >
        <Image source={{ uri: item.image }} style={styles.image} contentFit="cover" />
        <View style={styles.body}>
          <Text style={styles.category} numberOfLines={1}>
            {item.category}
          </Text>
          <Text style={styles.title} numberOfLines={2}>
            {item.title}
          </Text>
          <View style={styles.meta}>
            <View style={[styles.dot, { backgroundColor: STATUS_COLORS[item.status] }]} />
            <Text style={styles.metaText}>{item.status}</Text>
            <Text style={styles.metaDate}>{formatDate(item.createdAt)}</Text>
          </View>
        </View>
      </Pressable>
    ),
    [router],
  );

  return (
    <VirtualizedList
      data={filtered}
      getItem={getItem}
      getItemCount={getItemCount}
      getItemLayout={getItemLayout}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      initialNumToRender={8}
      maxToRenderPerBatch={10}
      windowSize={7}
      removeClippedSubviews
      contentContainerStyle={styles.content}
      ListHeaderComponent={
        <View style={styles.toolbar}>
          <Text style={styles.count}>Знайдено: {filtered.length}</Text>
          <View style={styles.actions}>
            <Pressable
              onPress={() => router.push("/news/filter")}
              style={styles.iconButton}
              accessibilityRole="button"
              accessibilityLabel="Фільтр"
            >
              <Ionicons name="options-outline" size={20} color={colors.primary} />
            </Pressable>
            <Pressable
              onPress={() => router.push("/news/form")}
              style={[styles.iconButton, styles.primaryButton]}
              accessibilityRole="button"
              accessibilityLabel="Додати новину"
            >
              <Ionicons name="add" size={22} color="#fff" />
            </Pressable>
          </View>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.lg,
  },
  toolbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.lg,
  },
  count: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textMuted,
  },
  actions: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: radius.sm,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primarySoft,
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  card: {
    height: CARD_HEIGHT,
    marginBottom: CARD_GAP,
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
    width: CARD_HEIGHT,
    height: "100%",
    backgroundColor: colors.primarySoft,
  },
  body: {
    flex: 1,
    padding: spacing.md,
    justifyContent: "space-between",
  },
  category: {
    fontSize: 11,
    fontWeight: "700",
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
    gap: spacing.xs,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  metaText: {
    flex: 1,
    fontSize: 12,
    color: colors.textMuted,
  },
  metaDate: {
    fontSize: 12,
    color: colors.textMuted,
  },
});
