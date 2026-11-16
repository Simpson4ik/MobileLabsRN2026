import { Ionicons } from "@expo/vector-icons";
import { router, Stack, useFocusEffect, useLocalSearchParams, usePreventRemove } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors, radius, spacing } from "@/constants/theme";
import { confirmDelete } from "@/utils/actions";
import { getEntryInfo, readTextFile, splitPath, writeTextFile } from "@/utils/fileSystem";
import { formatBytes, formatDate } from "@/utils/format";

export default function FileScreen() {
  const { root = "document", path = "" } = useLocalSearchParams();
  const name = splitPath(path).at(-1) ?? "";

  const [content, setContent] = useState("");
  const [draft, setDraft] = useState("");
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState(null);

  const dirty = editing && draft !== content;

  const load = useCallback(() => {
    let active = true;
    readTextFile(root, path)
      .then((text) => {
        if (!active) return;
        setContent(text);
        setInfo(getEntryInfo(root, path, false));
      })
      .catch((error) => Alert.alert("Не вдалося прочитати файл", error.message))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [root, path]);

  useFocusEffect(load);

  // Попередження, якщо користувач виходить з екрана з незбереженими змінами.
  usePreventRemove(dirty, ({ repeat }) => {
    Alert.alert("Незбережені зміни", "Вийти без збереження змін у файлі?", [
      { text: "Залишитися", style: "cancel" },
      {
        text: "Вийти",
        style: "destructive",
        onPress: () => {
          setEditing(false);
          repeat();
        },
      },
    ]);
  });

  const startEditing = () => {
    setDraft(content);
    setSavedAt(null);
    setEditing(true);
  };

  const cancelEditing = () => {
    setDraft(content);
    setEditing(false);
  };

  const save = async () => {
    setSaving(true);
    try {
      await writeTextFile(root, path, draft);
      setContent(draft);
      setInfo(getEntryInfo(root, path, false));
      setEditing(false);
      setSavedAt(Date.now());
    } catch (error) {
      Alert.alert("Не вдалося зберегти файл", error.message);
    } finally {
      setSaving(false);
    }
  };

  const openInfo = () => router.push({ pathname: "/info", params: { root, path, kind: "file" } });

  const remove = () => confirmDelete({ root, path, name, isDirectory: false }, () => router.back());

  return (
    <SafeAreaView style={styles.screen} edges={["bottom", "left", "right"]}>
      <Stack.Screen
        options={{
          title: name,
          headerRight: () => (
            <View style={styles.headerActions}>
              <Pressable onPress={openInfo} hitSlop={8} style={styles.headerButton}>
                <Ionicons name="information-circle-outline" size={24} color={colors.primary} />
              </Pressable>
              <Pressable onPress={remove} hitSlop={8} style={styles.headerButton}>
                <Ionicons name="trash-outline" size={22} color={colors.danger} />
              </Pressable>
            </View>
          ),
        }}
      />

      <View style={styles.meta}>
        <View style={[styles.badge, editing ? styles.badgeEdit : styles.badgeView]}>
          <Ionicons
            name={editing ? "create-outline" : "eye-outline"}
            size={14}
            color={editing ? colors.folder : colors.primary}
          />
          <Text style={[styles.badgeText, { color: editing ? colors.folder : colors.primary }]}>
            {editing ? "Редагування" : "Перегляд"}
          </Text>
        </View>
        <Text style={styles.metaText}>
          {info ? `${formatBytes(info.size)} · ${formatDate(info.modificationTime)}` : ""}
        </Text>
      </View>

      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        {loading ? (
          <ActivityIndicator style={styles.flex} color={colors.primary} />
        ) : editing ? (
          <TextInput
            value={draft}
            onChangeText={setDraft}
            multiline
            autoFocus
            textAlignVertical="top"
            style={[styles.paper, styles.editor]}
            placeholder="Файл порожній — введіть текст"
            placeholderTextColor={colors.textMuted}
          />
        ) : (
          <ScrollView style={styles.flex} contentContainerStyle={styles.paper}>
            {content ? (
              <Text selectable style={styles.text}>
                {content}
              </Text>
            ) : (
              <Text style={styles.placeholder}>Файл порожній</Text>
            )}
          </ScrollView>
        )}

        {savedAt && !editing ? (
          <View style={styles.saved}>
            <Ionicons name="checkmark-circle" size={16} color={colors.success} />
            <Text style={styles.savedText}>Зміни збережено у файл</Text>
          </View>
        ) : null}

        <View style={styles.actions}>
          {editing ? (
            <>
              <Pressable onPress={cancelEditing} style={({ pressed }) => [styles.button, styles.secondary, pressed && styles.pressed]}>
                <Text style={styles.secondaryLabel}>Скасувати</Text>
              </Pressable>
              <Pressable
                onPress={save}
                disabled={!dirty || saving}
                style={({ pressed }) => [styles.button, styles.primary, (!dirty || saving || pressed) && styles.pressed]}
              >
                <Ionicons name="save-outline" size={18} color={colors.card} />
                <Text style={styles.primaryLabel}>{saving ? "Збереження..." : "Зберегти"}</Text>
              </Pressable>
            </>
          ) : (
            <Pressable
              onPress={startEditing}
              disabled={loading}
              style={({ pressed }) => [styles.button, styles.primary, pressed && styles.pressed]}
            >
              <Ionicons name="create-outline" size={18} color={colors.card} />
              <Text style={styles.primaryLabel}>Редагувати</Text>
            </Pressable>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  headerButton: {
    padding: spacing.xs,
  },
  meta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
    backgroundColor: colors.card,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
    borderRadius: radius.pill,
  },
  badgeView: {
    backgroundColor: colors.primarySoft,
  },
  badgeEdit: {
    backgroundColor: colors.folderSoft,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "700",
  },
  metaText: {
    fontSize: 12,
    color: colors.textMuted,
  },
  paper: {
    flexGrow: 1,
    margin: spacing.lg,
    padding: spacing.lg,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  editor: {
    flex: 1,
    borderColor: colors.folder,
    fontSize: 15,
    lineHeight: 22,
    color: colors.text,
  },
  text: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.text,
  },
  placeholder: {
    fontSize: 15,
    fontStyle: "italic",
    color: colors.textMuted,
  },
  saved: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.sm,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    backgroundColor: colors.successSoft,
  },
  savedText: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.success,
  },
  actions: {
    flexDirection: "row",
    gap: spacing.md,
    padding: spacing.lg,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    backgroundColor: colors.card,
  },
  button: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  pressed: {
    opacity: 0.6,
  },
  primaryLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.card,
  },
  secondaryLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.text,
  },
});
