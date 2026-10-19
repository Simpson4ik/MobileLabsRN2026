import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useCallback, useMemo } from "react";
import { Pressable, StyleSheet, Text, View, VirtualizedList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { NEWS_CARD_HEIGHT, NewsCard } from "@/components/NewsCard";
import { colors, radius, spacing } from "@/constants/theme";
import { useAdmin } from "@/context/AdminContext";
import { FILTER_ALL } from "@/data/admin";

const ITEM_LENGTH = NEWS_CARD_HEIGHT + spacing.md;

const getItem = (data, index) => data[index];
const getItemCount = (data) => data.length;
const getItemLayout = (_, index) => ({ length: ITEM_LENGTH, offset: ITEM_LENGTH * index, index });
const keyExtractor = (item) => item.id;

export default function NewsListScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { news, newsFilter } = useAdmin();

  const filtered = useMemo(
    () =>
      news.filter(
        (item) =>
          (newsFilter.status === FILTER_ALL || item.status === newsFilter.status) &&
          (newsFilter.category === FILTER_ALL || item.category === newsFilter.category),
      ),
    [news, newsFilter],
  );

  const handleOpen = useCallback(
    (id) => router.push({ pathname: "/news/[id]", params: { id } }),
    [router],
  );

  const renderItem = useCallback(({ item }) => <NewsCard item={item} onOpen={handleOpen} />, [handleOpen]);

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
      contentContainerStyle={[styles.content, { paddingBottom: spacing.lg + insets.bottom }]}
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
});
