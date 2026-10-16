import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";

import { colors, radius, student } from "@/constants/theme";

const initial = {
  fullName: student.fullName,
  email: student.email,
  group: student.group,
  favorite: "Домашня піца",
};

export default function ProfileScreen() {
  const [saved, setSaved] = useState(initial);
  const [form, setForm] = useState(initial);
  const [notifications, setNotifications] = useState(true);

  const update = (key: keyof typeof initial) => (value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.banner}>
          <View style={styles.actions}>
            <RoundButton icon="close" onPress={() => setForm(saved)} label="Скасувати" />
            <RoundButton icon="checkmark" onPress={() => setSaved(form)} label="Зберегти" />
          </View>
        </View>

        <View style={styles.avatar}>
          <Ionicons name="person" size={64} color={colors.textMuted} />
        </View>

        <View style={styles.body}>
          <Field label="ПІБ" value={form.fullName} onChangeText={update("fullName")} />

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>КОНТАКТИ</Text>
            <Field
              label="Email"
              value={form.email}
              onChangeText={update("email")}
              keyboardType="email-address"
            />
            <Field label="Група" value={form.group} onChangeText={update("group")} />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>КУЛІНАРНІ ВПОДОБАННЯ</Text>
            <Field
              label="Улюблена страва"
              value={form.favorite}
              onChangeText={update("favorite")}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>НАЛАШТУВАННЯ</Text>
            <View style={styles.switchRow}>
              <Ionicons name="notifications-outline" size={20} color={colors.primary} />
              <Text style={styles.switchLabel}>Сповіщення про нові рецепти</Text>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ true: colors.primarySoft, false: colors.border }}
                thumbColor={notifications ? colors.primary : "#f4f3f4"}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function RoundButton({
  icon,
  onPress,
  label,
}: {
  icon: "close" | "checkmark";
  onPress: () => void;
  label: string;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.roundButton, pressed && { opacity: 0.6 }]}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <Ionicons name={icon} size={20} color="#fff" />
    </Pressable>
  );
}

function Field({
  label,
  ...inputProps
}: { label: string } & React.ComponentProps<typeof TextInput>) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor={colors.textMuted}
        autoCapitalize="none"
        {...inputProps}
      />
    </View>
  );
}

const AVATAR = 120;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  content: {
    paddingBottom: 24,
  },
  banner: {
    height: 120,
    backgroundColor: colors.primary,
    borderBottomLeftRadius: radius.lg,
    borderBottomRightRadius: radius.lg,
    padding: 16,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
  roundButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: AVATAR,
    height: AVATAR,
    borderRadius: AVATAR / 2,
    backgroundColor: colors.primarySoft,
    borderWidth: 4,
    borderColor: colors.card,
    alignSelf: "center",
    marginTop: -AVATAR / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  section: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.5,
    color: colors.textMuted,
    marginBottom: 4,
  },
  field: {
    marginTop: 8,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 6,
  },
  input: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: colors.text,
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  switchLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
    marginLeft: 10,
  },
});
