import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { memo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { STATUS_COLORS, colors, radius, spacing } from "@/constants/theme";
import { formatDate } from "@/data/admin";

export const NEWS_CARD_HEIGHT = 112;

function NewsCardComponent({ item, onOpen }) {
  return (
    <Pressable
      onPress={() => onOpen(item.id)}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      accessibilityRole="button"
    >
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.image} contentFit="cover" />
      ) : (
        <View style={[styles.image, styles.placeholder]}>
          <Ionicons name="image-outline" size={32} color={colors.primary} />
        </View>
      )}
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
  );
}

export const NewsCard = memo(NewsCardComponent);

const styles = StyleSheet.create({
  card: {
    height: NEWS_CARD_HEIGHT,
    marginBottom: spacing.md,
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
    width: NEWS_CARD_HEIGHT,
    height: "100%",
    backgroundColor: colors.primarySoft,
  },
  placeholder: {
    alignItems: "center",
    justifyContent: "center",
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
