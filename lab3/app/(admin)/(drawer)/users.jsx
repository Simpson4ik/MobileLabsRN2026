import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useCallback, useMemo } from "react";
import { Pressable, StyleSheet, Text, View, VirtualizedList } from "react-native";

import { colors, radius, spacing } from "@/constants/theme";
import { useAdmin } from "@/context/AdminContext";

const ROW_HEIGHT = 88;
const ROW_GAP = spacing.sm;
const ITEM_LENGTH = ROW_HEIGHT + ROW_GAP;

const getItem = (data, index) => data[index];
const getItemCount = (data) => data.length;
const getItemLayout = (_, index) => ({ length: ITEM_LENGTH, offset: ITEM_LENGTH * index, index });
const keyExtractor = (item) => item.id;

const initials = (name) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

export default function UsersScreen() {
  const router = useRouter();
  const { users, userFilter, toggleUserStatus } = useAdmin();

  const filtered = useMemo(
    () =>
      users.filter(
        (item) =>
          (userFilter.status === "Усі" || item.status === userFilter.status) &&
          (userFilter.role === "Усі" || item.role === userFilter.role),
      ),
    [users, userFilter],
  );

  const renderItem = useCallback(
    ({ item }) => {
      const isActive = item.status === "Активний";
      return (
        <View style={styles.row}>
          <View style={[styles.avatar, !isActive && styles.avatarBlocked]}>
            <Text style={styles.avatarText}>{initials(item.name)}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.name} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={styles.email} numberOfLines={1}>
              {item.email}
            </Text>
            <Text style={styles.role}>{item.role}</Text>
          </View>
          <Pressable
            onPress={() => toggleUserStatus(item.id)}
            style={[styles.status, isActive ? styles.statusActive : styles.statusBlocked]}
            accessibilityRole="button"
            accessibilityLabel={isActive ? "Заблокувати" : "Розблокувати"}
          >
            <Ionicons
              name={isActive ? "checkmark-circle" : "ban"}
              size={16}
              color={isActive ? colors.success : colors.danger}
            />
            <Text style={[styles.statusText, { color: isActive ? colors.success : colors.danger }]}>
              {item.status}
            </Text>
          </Pressable>
        </View>
      );
    },
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
      contentContainerStyle={styles.content}
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
  row: {
    height: ROW_HEIGHT,
    marginBottom: ROW_GAP,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.card,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primarySoft,
  },
  avatarBlocked: {
    backgroundColor: colors.border,
  },
  avatarText: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.primary,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.text,
  },
  email: {
    fontSize: 13,
    color: colors.textMuted,
  },
  role: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.primary,
    marginTop: 2,
  },
  status: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    borderRadius: radius.sm,
  },
  statusActive: {
    backgroundColor: "#E6F4EA",
  },
  statusBlocked: {
    backgroundColor: "#FDECEC",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "700",
  },
  hint: {
    textAlign: "center",
    fontSize: 12,
    color: colors.textMuted,
    paddingVertical: spacing.lg,
  },
});
