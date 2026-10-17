import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";

import RecipeCard, { RECIPE_CARD_GAP, RECIPE_CARD_HEIGHT } from "@/components/RecipeCard";
import { colors, spacing } from "@/constants/theme";
import { TOTAL_RECIPES, fetchRecipes } from "@/data/recipes";

const PAGE_SIZE = 20;
const ITEM_LENGTH = RECIPE_CARD_HEIGHT + RECIPE_CARD_GAP;

const getItemLayout = (_, index) => ({
  length: ITEM_LENGTH,
  offset: ITEM_LENGTH * index,
  index,
});

const keyExtractor = (item) => item.id;

export default function RecipesScreen() {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const hasMore = items.length < TOTAL_RECIPES;

  useEffect(() => {
    fetchRecipes(0, PAGE_SIZE).then((firstPage) => {
      setItems(firstPage);
      setPage(1);
    });
  }, []);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    const firstPage = await fetchRecipes(0, PAGE_SIZE);
    setItems(firstPage);
    setPage(1);
    setRefreshing(false);
  }, []);

  const handleEndReached = useCallback(async () => {
    if (loadingMore || refreshing || !hasMore || items.length === 0) {
      return;
    }
    setLoadingMore(true);
    const nextPage = await fetchRecipes(page, PAGE_SIZE);
    setItems((current) => [...current, ...nextPage]);
    setPage((current) => current + 1);
    setLoadingMore(false);
  }, [loadingMore, refreshing, hasMore, items.length, page]);

  const handlePress = useCallback(
    (id) => router.push({ pathname: "/[id]", params: { id } }),
    [router],
  );

  const renderItem = useCallback(
    ({ item }) => <RecipeCard recipe={item} onPress={handlePress} />,
    [handlePress],
  );

  return (
    <FlatList
      data={items}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      getItemLayout={getItemLayout}
      contentContainerStyle={styles.content}
      ItemSeparatorComponent={Separator}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      initialNumToRender={8}
      maxToRenderPerBatch={10}
      windowSize={7}
      removeClippedSubviews
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          colors={[colors.primary]}
          tintColor={colors.primary}
        />
      }
      ListFooterComponent={
        <View style={styles.footer}>
          {loadingMore || items.length === 0 ? (
            <ActivityIndicator color={colors.primary} />
          ) : !hasMore ? (
            <Text style={styles.footerText}>Усі {TOTAL_RECIPES} рецептів завантажено</Text>
          ) : null}
        </View>
      }
    />
  );
}

function Separator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.lg,
  },
  separator: {
    height: RECIPE_CARD_GAP,
  },
  footer: {
    paddingVertical: spacing.xl,
    alignItems: "center",
  },
  footerText: {
    fontSize: 13,
    color: colors.textMuted,
  },
});
