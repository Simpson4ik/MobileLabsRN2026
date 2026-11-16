import { Ionicons } from "@expo/vector-icons";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors, radius, spacing } from "@/constants/theme";
import { createFolder, createTextFile, getRoot, splitPath, toTxtName, validateName } from "@/utils/fileSystem";

export default function CreateScreen() {
  const { root = "document", path = "", type = "folder" } = useLocalSearchParams();
  const isFile = type === "file";
  const location = [getRoot(root).title, ...splitPath(path)].join(" / ");

  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const submit = async () => {
    const validationError = validateName(name);
    if (validationError) {
      setError(validationError);
      return;
    }
    setSaving(true);
    try {
      if (isFile) {
        await createTextFile(root, path, name, content);
      } else {
        createFolder(root, path, name);
      }
      router.back();
    } catch (e) {
      setError(e.message);
      setSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.screen} edges={["bottom", "left", "right"]}>
      <Stack.Screen options={{ title: isFile ? "Новий текстовий файл" : "Нова папка" }} />
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <View style={styles.location}>
            <Ionicons name="location-outline" size={16} color={colors.textMuted} />
            <Text style={styles.locationText} numberOfLines={2}>
              {location}
            </Text>
          </View>

          <Text style={styles.label}>{isFile ? "Ім'я файлу" : "Назва папки"}</Text>
          <View style={[styles.inputRow, error && styles.inputError]}>
            <Ionicons
              name={isFile ? "document-text-outline" : "folder-outline"}
              size={20}
              color={isFile ? colors.file : colors.folder}
            />
            <TextInput
              value={name}
              onChangeText={(value) => {
                setName(value);
                setError(null);
              }}
              placeholder={isFile ? "Нотатки" : "Нова папка"}
              placeholderTextColor={colors.textMuted}
              autoFocus
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType={isFile ? "next" : "done"}
              onSubmitEditing={isFile ? undefined : submit}
              style={styles.input}
            />
            {isFile && !name.trim().toLowerCase().endsWith(".txt") ? <Text style={styles.suffix}>.txt</Text> : null}
          </View>
          {error ? <Text style={styles.error}>{error}</Text> : null}
          {isFile && name.trim() && !error ? (
            <Text style={styles.hint}>Буде створено файл «{toTxtName(name)}»</Text>
          ) : null}

          {isFile ? (
            <>
              <Text style={styles.label}>Початковий вміст</Text>
              <TextInput
                value={content}
                onChangeText={setContent}
                placeholder="Введіть текст файлу..."
                placeholderTextColor={colors.textMuted}
                multiline
                textAlignVertical="top"
                style={styles.textArea}
              />
              <Text style={styles.hint}>{content.length} символів</Text>
            </>
          ) : null}
        </ScrollView>

        <View style={styles.actions}>
          <Pressable onPress={() => router.back()} style={({ pressed }) => [styles.button, styles.cancel, pressed && styles.pressed]}>
            <Text style={styles.cancelLabel}>Скасувати</Text>
          </Pressable>
          <Pressable
            onPress={submit}
            disabled={saving}
            style={({ pressed }) => [styles.button, styles.submit, (pressed || saving) && styles.pressed]}
          >
            <Ionicons name="checkmark" size={18} color={colors.card} />
            <Text style={styles.submitLabel}>Створити</Text>
          </Pressable>
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
  content: {
    padding: spacing.lg,
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    marginBottom: spacing.lg,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.primarySoft,
  },
  locationText: {
    flex: 1,
    fontSize: 13,
    fontWeight: "600",
    color: colors.primaryDark,
  },
  label: {
    marginTop: spacing.md,
    marginBottom: spacing.sm,
    fontSize: 13,
    fontWeight: "700",
    color: colors.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  inputError: {
    borderColor: colors.danger,
  },
  input: {
    flex: 1,
    paddingVertical: spacing.md,
    fontSize: 16,
    color: colors.text,
  },
  suffix: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textMuted,
  },
  error: {
    marginTop: spacing.xs,
    fontSize: 13,
    color: colors.danger,
  },
  hint: {
    marginTop: spacing.xs,
    fontSize: 12,
    color: colors.textMuted,
  },
  textArea: {
    minHeight: 180,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    fontSize: 15,
    lineHeight: 22,
    color: colors.text,
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
  cancel: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  submit: {
    backgroundColor: colors.primary,
  },
  pressed: {
    opacity: 0.6,
  },
  cancelLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.text,
  },
  submitLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.card,
  },
});
