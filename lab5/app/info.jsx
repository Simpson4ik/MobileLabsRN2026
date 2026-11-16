import { Ionicons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams } from "expo-router";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors, radius, spacing } from "@/constants/theme";
import { getEntryInfo, getRoot, parentPath, splitPath } from "@/utils/fileSystem";
import { formatBytes, formatDate, getFileType, pluralize } from "@/utils/format";

function InfoRow({ icon, label, value, last }) {
  return (
    <View style={[styles.row, !last && styles.divider]}>
      <Ionicons name={icon} size={18} color={colors.primary} />
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value} selectable>
        {value}
      </Text>
    </View>
  );
}

export default function InfoScreen() {
  const { root = "document", path = "", kind = "file" } = useLocalSearchParams();
  const isDirectory = kind === "directory";

  let info = null;
  let error = null;
  try {
    info = getEntryInfo(root, path, isDirectory);
  } catch (e) {
    error = e.message;
  }

  const location = [getRoot(root).title, ...splitPath(parentPath(path))].join(" / ");

  return (
    <SafeAreaView style={styles.screen} edges={["bottom", "left", "right"]}>
      <Stack.Screen options={{ title: isDirectory ? "Інформація про папку" : "Інформація про файл" }} />
      <ScrollView contentContainerStyle={styles.content}>
        {error || !info?.exists ? (
          <Text style={styles.error}>{error ?? "Об'єкт не знайдено"}</Text>
        ) : (
          <>
            <View style={styles.hero}>
              <View style={[styles.icon, isDirectory ? styles.iconFolder : styles.iconFile]}>
                <Ionicons
                  name={isDirectory ? "folder" : "document-text"}
                  size={36}
                  color={isDirectory ? colors.folder : colors.file}
                />
              </View>
              <Text style={styles.name} selectable>
                {info.name}
              </Text>
              <Text style={styles.type}>{isDirectory ? "Папка" : getFileType(info.name)}</Text>
            </View>

            <View style={styles.card}>
              <InfoRow icon="text-outline" label="Назва" value={info.name} />
              <InfoRow
                icon="pricetag-outline"
                label="Тип"
                value={isDirectory ? "Папка" : `${getFileType(info.name)}${info.extension ? ` (.${info.extension})` : ""}`}
              />
              <InfoRow
                icon="server-outline"
                label="Розмір"
                value={info.size == null ? "—" : info.size < 1024 ? formatBytes(info.size) : `${formatBytes(info.size)} (${info.size} Б)`}
              />
              {isDirectory ? (
                <InfoRow
                  icon="albums-outline"
                  label="Вміст"
                  value={pluralize(info.itemsCount, "об'єкт", "об'єкти", "об'єктів")}
                />
              ) : null}
              <InfoRow icon="time-outline" label="Змінено" value={formatDate(info.modificationTime)} />
              <InfoRow icon="folder-open-outline" label="Розташування" value={location} last />
            </View>

            <Text style={styles.sectionTitle}>URI</Text>
            <View style={styles.uriCard}>
              <Text style={styles.uri} selectable>
                {info.uri}
              </Text>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
  },
  hero: {
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  icon: {
    width: 72,
    height: 72,
    borderRadius: radius.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  iconFolder: {
    backgroundColor: colors.folderSoft,
  },
  iconFile: {
    backgroundColor: colors.fileSoft,
  },
  name: {
    marginTop: spacing.md,
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center",
    color: colors.text,
  },
  type: {
    marginTop: spacing.xs,
    fontSize: 14,
    color: colors.textMuted,
  },
  card: {
    paddingHorizontal: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingVertical: spacing.md,
  },
  divider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  label: {
    width: 110,
    fontSize: 14,
    color: colors.textMuted,
  },
  value: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    textAlign: "right",
    color: colors.text,
  },
  sectionTitle: {
    marginTop: spacing.xl,
    marginBottom: spacing.sm,
    marginLeft: spacing.xs,
    fontSize: 13,
    fontWeight: "700",
    color: colors.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  uriCard: {
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  uri: {
    fontSize: 12,
    fontFamily: Platform.select({ ios: "Menlo", default: "monospace" }),
    color: colors.textMuted,
  },
  error: {
    marginTop: spacing.xl,
    textAlign: "center",
    fontSize: 15,
    color: colors.danger,
  },
});
