import { Ionicons } from "@expo/vector-icons";
import { router, Stack, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { EntryRow } from "@/components/EntryRow";
import { colors, radius, spacing } from "@/constants/theme";
import { getRoot, joinPath, listEntries, parentPath, splitPath } from "@/utils/fileSystem";
import { pluralize } from "@/utils/format";

export default function BrowserScreen() {
  const { root = "document", path = "" } = useLocalSearchParams();
  const rootInfo = getRoot(root);
  const segments = splitPath(path);
  const isRoot = segments.length === 0;
  const title = isRoot ? rootInfo.title : segments[segments.length - 1];

  const [entries, setEntries] = useState([]);

  const load = useCallback(() => {
    try {
      setEntries(listEntries(root, path));
    } catch (error) {
      Alert.alert("Не вдалося відкрити папку", error.message);
    }
  }, [root, path]);

  useFocusEffect(load);

  // Кожна вкладена папка відкривається окремим екраном у стеку,
  // тому перехід до батьківської папки — це закриття потрібної кількості екранів.
  const goTo = (targetPath) => {
    const levels = segments.length - splitPath(targetPath).length;
    if (levels > 0) router.dismiss(levels);
  };

  const openEntry = (entry) => {
    if (entry.isDirectory) {
      router.push({ pathname: "/browser", params: { root, path: joinPath(path, entry.name) } });
    }
  };

  const openCreate = (type) => {
    router.push({ pathname: "/create", params: { root, path, type } });
  };

  const folders = entries.filter((entry) => entry.isDirectory).length;
  const files = entries.length - folders;

  return (
    <SafeAreaView style={styles.screen} edges={["bottom", "left", "right"]}>
      <Stack.Screen options={{ title }} />

      <View style={styles.top}>
        <Breadcrumbs rootTitle={rootInfo.title} path={path} onNavigate={goTo} />
        <View style={styles.toolbar}>
          <Pressable
            disabled={isRoot}
            onPress={() => goTo(parentPath(path))}
            style={({ pressed }) => [styles.upButton, isRoot && styles.disabled, pressed && styles.pressed]}
          >
            <Ionicons name="arrow-up" size={16} color={colors.primary} />
            <Text style={styles.upLabel}>Вгору</Text>
          </Pressable>
          <Text style={styles.counter}>
            {pluralize(folders, "папка", "папки", "папок")} · {pluralize(files, "файл", "файли", "файлів")}
          </Text>
        </View>
      </View>

      <FlatList
        data={entries}
        keyExtractor={(item) => (item.isDirectory ? "d:" : "f:") + item.name}
        renderItem={({ item }) => <EntryRow entry={item} onPress={() => openEntry(item)} />}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="folder-open-outline" size={56} color={colors.border} />
            <Text style={styles.emptyTitle}>Папка порожня</Text>
            <Text style={styles.emptyText}>Створіть папку або текстовий файл кнопками нижче</Text>
          </View>
        }
      />

      <View style={styles.actions}>
        <Pressable
          onPress={() => openCreate("folder")}
          style={({ pressed }) => [styles.action, styles.actionFolder, pressed && styles.pressed]}
        >
          <Ionicons name="folder-outline" size={18} color={colors.folder} />
          <Text style={[styles.actionLabel, { color: colors.text }]}>Нова папка</Text>
        </Pressable>
        <Pressable
          onPress={() => openCreate("file")}
          style={({ pressed }) => [styles.action, styles.actionFile, pressed && styles.pressed]}
        >
          <Ionicons name="document-text-outline" size={18} color={colors.card} />
          <Text style={[styles.actionLabel, { color: colors.card }]}>Новий файл</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  top: {
    paddingBottom: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
    backgroundColor: colors.card,
  },
  toolbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
  },
  upButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  upLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.primary,
  },
  disabled: {
    opacity: 0.35,
  },
  pressed: {
    opacity: 0.6,
  },
  counter: {
    fontSize: 13,
    color: colors.textMuted,
  },
  list: {
    flexGrow: 1,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
  },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xl * 2,
  },
  emptyTitle: {
    marginTop: spacing.md,
    fontSize: 17,
    fontWeight: "700",
    color: colors.text,
  },
  emptyText: {
    marginTop: spacing.xs,
    fontSize: 14,
    textAlign: "center",
    color: colors.textMuted,
  },
  actions: {
    flexDirection: "row",
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    backgroundColor: colors.card,
  },
  action: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
  },
  actionFolder: {
    backgroundColor: colors.folderSoft,
  },
  actionFile: {
    backgroundColor: colors.primary,
  },
  actionLabel: {
    fontSize: 15,
    fontWeight: "700",
  },
});
