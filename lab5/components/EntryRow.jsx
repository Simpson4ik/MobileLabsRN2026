import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, radius, spacing } from "@/constants/theme";
import { formatBytes, formatDate, pluralize } from "@/utils/format";

function fileIcon(extension) {
  if (extension === "txt") return "document-text";
  if (["png", "jpg", "jpeg"].includes(extension)) return "image";
  return "document";
}

export function EntryRow({ entry, onPress }) {
  const { name, isDirectory, size, modificationTime, itemsCount, extension } = entry;
  const meta = isDirectory
    ? `${pluralize(itemsCount, "об'єкт", "об'єкти", "об'єктів")} · ${formatDate(modificationTime)}`
    : `${formatBytes(size)} · ${formatDate(modificationTime)}`;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.row, isDirectory && styles.rowFolder, pressed && styles.pressed]}
    >
      <View style={[styles.icon, isDirectory ? styles.iconFolder : styles.iconFile]}>
        <Ionicons
          name={isDirectory ? "folder" : fileIcon(extension)}
          size={22}
          color={isDirectory ? colors.folder : colors.file}
        />
      </View>
      <View style={styles.body}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.meta} numberOfLines={1}>
          {meta}
        </Text>
      </View>
      {isDirectory ? <Ionicons name="chevron-forward" size={20} color={colors.textMuted} /> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.sm,
    paddingVertical: spacing.md,
    paddingLeft: spacing.md,
    paddingRight: spacing.sm,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  rowFolder: {
    borderLeftWidth: 4,
    borderLeftColor: colors.folder,
  },
  pressed: {
    backgroundColor: colors.primarySoft,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: radius.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  iconFolder: {
    backgroundColor: colors.folderSoft,
  },
  iconFile: {
    backgroundColor: colors.fileSoft,
  },
  body: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
  },
  meta: {
    marginTop: 2,
    fontSize: 12,
    color: colors.textMuted,
  },
});
