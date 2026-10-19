import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useCallback, useMemo } from "react";
import { Pressable, StyleSheet, Text, View, VirtualizedList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { USER_ROW_HEIGHT, UserRow } from "@/components/UserRow";
import { colors, radius, spacing } from "@/constants/theme";
import { useAdmin } from "@/context/AdminContext";
import { FILTER_ALL } from "@/data/admin";

const ITEM_LENGTH = USER_ROW_HEIGHT + spacing.sm;

const getItem = (data, index) => data[index];
const getItemCount = (data) => data.length;
const getItemLayout = (_, index) => ({ length: ITEM_LENGTH, offset: ITEM_LENGTH * index, index });
const keyExtractor = (item) => item.id;

export default function UsersScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { users, userFilter, toggleUserStatus } = useAdmin();

  const filtered = useMemo(
    () =>
      users.filter(
        (item) =>
          (userFilter.status === FILTER_ALL || item.status === userFilter.status) &&
          (userFilter.role === FILTER_ALL || item.role === userFilter.role),
      ),
    [users, userFilter],
  );

  const renderItem = useCallback(
    ({ item }) => <UserRow item={item} onToggleStatus={toggleUserStatus} />,
    [toggleUserStatus],
  );

  return (
    <VirtualizedList
      data={filtered}
      getItem={getItem}
      getItemCount={getItemCount}
      getItemLayout={getItemLayout}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={7}
      removeClippedSubviews
      contentContainerStyle={[styles.content, { paddingBottom: spacing.lg + insets.bottom }]}
      ListHeaderComponent={
        <View style={styles.toolbar}>
          <Text style={styles.count}>Знайдено: {filtered.length}</Text>
          <Pressable
            onPress={() => router.push("/users/filter")}
            style={styles.filterButton}
            accessibilityRole="button"
            accessibilityLabel="Фільтр"
          >
            <Ionicons name="options-outline" size={20} color={colors.primary} />
          </Pressable>
        </View>
      }
      ListFooterComponent={<Text style={styles.hint}>Натисніть на статус, щоб змінити його</Text>}
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
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: radius.sm,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primarySoft,
  },
  hint: {
    textAlign: "center",
    fontSize: 12,
    color: colors.textMuted,
    paddingVertical: spacing.lg,
  },
});
