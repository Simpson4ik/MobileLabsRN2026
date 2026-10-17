import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import { Chip } from "@/components/Chip";
import { colors, radius, spacing } from "@/constants/theme";
import { useAdmin } from "@/context/AdminContext";
import { NEWS_CATEGORY_LIST, NEWS_STATUSES } from "@/data/admin";

export default function NewsFormScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { news, addNews, updateNews } = useAdmin();
  const existing = id ? news.find((entry) => entry.id === id) : undefined;

  const [title, setTitle] = useState(existing?.title ?? "");
  const [category, setCategory] = useState(existing?.category ?? NEWS_CATEGORY_LIST[0]);
  const [status, setStatus] = useState(existing?.status ?? NEWS_STATUSES[1]);
  const [image, setImage] = useState(existing?.image ?? "");
  const [text, setText] = useState(existing?.text ?? "");
  const [error, setError] = useState("");

  const handleSave = () => {
    if (!title.trim() || !text.trim()) {
      setError("Заповніть заголовок і текст новини");
      return;
    }
    const data = {
      title: title.trim(),
      category,
      status,
      image: image.trim(),
      text: text.trim(),
    };
    if (existing) {
      updateNews(existing.id, data);
    } else {
      addNews(data);
    }
    router.back();
  };

  return (
    <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <Text style={styles.label}>Заголовок</Text>
      <TextInput value={title} onChangeText={setTitle} placeholder="Заголовок новини" placeholderTextColor={colors.textMuted} style={styles.input} />

      <Text style={styles.label}>Категорія</Text>
      <View style={styles.chips}>
        {NEWS_CATEGORY_LIST.map((item) => (
          <Chip key={item} label={item} selected={category === item} onPress={() => setCategory(item)} />
        ))}
      </View>

      <Text style={styles.label}>Статус</Text>
      <View style={styles.chips}>
        {NEWS_STATUSES.map((item) => (
          <Chip key={item} label={item} selected={status === item} onPress={() => setStatus(item)} />
        ))}
      </View>

      <Text style={styles.label}>Посилання на зображення (URL)</Text>
      <TextInput
        value={image}
        onChangeText={setImage}
        placeholder="https://..."
        placeholderTextColor={colors.textMuted}
        autoCapitalize="none"
        keyboardType="url"
        style={styles.input}
      />

      <Text style={styles.label}>Текст новини</Text>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Текст новини"
        placeholderTextColor={colors.textMuted}
        multiline
        textAlignVertical="top"
        style={[styles.input, styles.textArea]}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Pressable onPress={handleSave} style={({ pressed }) => [styles.save, pressed && styles.pressed]} accessibilityRole="button">
        <Text style={styles.saveText}>{existing ? "Зберегти зміни" : "Створити новину"}</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xl * 2,
  },
  label: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.text,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  input: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    fontSize: 15,
    color: colors.text,
  },
  textArea: {
    minHeight: 140,
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  error: {
    color: colors.danger,
    fontSize: 13,
    marginTop: spacing.md,
  },
  save: {
    backgroundColor: colors.primary,
    borderRadius: radius.sm,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: spacing.xl,
  },
  pressed: {
    opacity: 0.8,
  },
  saveText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
