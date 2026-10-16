import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import { colors, radius } from "@/constants/theme";
import { recipes } from "@/data/recipes";

type Mode = "grid" | "list";

export default function GalleryScreen() {
  const [mode, setMode] = useState<Mode>("grid");
  const isGrid = mode === "grid";

  return (
    <FlatList
      key={mode}
      data={recipes}
      numColumns={isGrid ? 2 : 1}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.content}
      columnWrapperStyle={isGrid ? styles.row : undefined}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={styles.title}>Галерея страв</Text>
          <View style={styles.toggle}>
            <ModeButton icon="grid" active={isGrid} onPress={() => setMode("grid")} />
            <ModeButton icon="list" active={!isGrid} onPress={() => setMode("list")} />
          </View>
        </View>
      }
      renderItem={({ item }) =>
        isGrid ? (
          <Image source={{ uri: item.image }} style={styles.tile} contentFit="cover" />
        ) : (
          <View style={styles.listItem}>
            <Image source={{ uri: item.image }} style={styles.thumb} contentFit="cover" />
            <View style={styles.listText}>
              <Text style={styles.listTitle} numberOfLines={2}>
                {item.title}
              </Text>
              <Text style={styles.listMeta}>
                {item.time} · {item.difficulty}
              </Text>
            </View>
          </View>
        )
      }
    />
  );
}

function ModeButton({
  icon,
  active,
  onPress,
}: {
  icon: "grid" | "list";
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.modeButton, active && styles.modeButtonActive]}
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
    >
      <Ionicons name={icon} size={18} color={active ? "#fff" : colors.primary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.text,
  },
  toggle: {
    flexDirection: "row",
    gap: 8,
  },
  modeButton: {
    width: 36,
    height: 36,
    borderRadius: radius.sm,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primarySoft,
  },
  modeButtonActive: {
    backgroundColor: colors.primary,
  },
  row: {
    gap: 12,
  },
  tile: {
    flex: 1,
    aspectRatio: 1.3,
    borderRadius: radius.md,
    marginBottom: 12,
    backgroundColor: colors.primarySoft,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 10,
    marginBottom: 12,
  },
  thumb: {
    width: 72,
    height: 72,
    borderRadius: radius.sm,
    backgroundColor: colors.primarySoft,
  },
  listText: {
    flex: 1,
    marginLeft: 12,
  },
  listTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.text,
  },
  listMeta: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 4,
  },
});
