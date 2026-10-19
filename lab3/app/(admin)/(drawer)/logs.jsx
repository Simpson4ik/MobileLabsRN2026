import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View, VirtualizedList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors, radius, spacing } from "@/constants/theme";
import { useAdmin } from "@/context/AdminContext";
import { LOG_EVENTS, formatDate, formatTime } from "@/data/admin";

const ROW_HEIGHT = 84;
const ROW_GAP = spacing.sm;
const ITEM_LENGTH = ROW_HEIGHT + ROW_GAP;

const EVENT_ICONS = {
  [LOG_EVENTS.login]: "log-in-outline",
  [LOG_EVENTS.logout]: "log-out-outline",
  [LOG_EVENTS.newsCreated]: "add-circle-outline",
  [LOG_EVENTS.newsUpdated]: "create-outline",
  [LOG_EVENTS.newsDeleted]: "trash-outline",
  [LOG_EVENTS.userStatusChanged]: "person-outline",
};

const getItem = (data, index) => data[index];
const getItemCount = (data) => data.length;
const getItemLayout = (_, index) => ({ length: ITEM_LENGTH, offset: ITEM_LENGTH * index, index });
const keyExtractor = (item) => item.id;

function renderItem({ item }) {
  return (
    <View style={styles.row}>
      <View style={styles.icon}>
        <Ionicons name={EVENT_ICONS[item.event] ?? "information-circle-outline"} size={20} color={colors.primary} />
      </View>
      <View style={styles.info}>
        <Text style={styles.event} numberOfLines={1}>
          {item.event}
        </Text>
        {item.target ? (
          <Text style={styles.target} numberOfLines={1}>
            {item.target}
          </Text>
        ) : null}
        <Text style={styles.actor} numberOfLines={1}>
          {item.actor}
        </Text>
      </View>
      <View style={styles.time}>
        <Text style={styles.timeText}>{formatTime(item.createdAt)}</Text>
        <Text style={styles.dateText}>{formatDate(item.createdAt)}</Text>
      </View>
    </View>
  );
}

export default function LogsScreen() {
  const insets = useSafeAreaInsets();
  const { logs } = useAdmin();

  return (
    <VirtualizedList
      data={logs}
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
      ListHeaderComponent={<Text style={styles.count}>Усього записів: {logs.length}</Text>}
    />
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.lg,
  },
  count: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textMuted,
    marginBottom: spacing.lg,
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
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primarySoft,
  },
  info: {
    flex: 1,
  },
  event: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.text,
  },
  target: {
    fontSize: 13,
    color: colors.text,
  },
  actor: {
    fontSize: 12,
    color: colors.textMuted,
  },
  time: {
    alignItems: "flex-end",
  },
  timeText: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.text,
  },
  dateText: {
    fontSize: 12,
    color: colors.textMuted,
  },
});
