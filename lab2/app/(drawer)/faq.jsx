import { Ionicons } from "@expo/vector-icons";
import { SectionList, StyleSheet, Text, View } from "react-native";

import { colors, radius, spacing } from "@/constants/theme";
import { faqSections } from "@/data/faq";

const keyExtractor = (item) => item.id;

function renderSectionHeader({ section }) {
  return (
    <View style={styles.header}>
      <Ionicons name={section.icon} size={20} color={colors.primary} />
      <Text style={styles.headerText}>{section.title}</Text>
      <Text style={styles.headerCount}>{section.data.length}</Text>
    </View>
  );
}

function renderItem({ item }) {
  return (
    <View style={styles.item}>
      <Text style={styles.question}>{item.question}</Text>
      <Text style={styles.answer}>{item.answer}</Text>
    </View>
  );
}

export default function FaqScreen() {
  return (
    <SectionList
      sections={faqSections}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      stickySectionHeadersEnabled
      contentContainerStyle={styles.content}
      ItemSeparatorComponent={Separator}
      ListHeaderComponent={
        <Text style={styles.intro}>Відповіді на поширені запитання про роботу застосунку</Text>
      }
    />
  );
}

function Separator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  intro: {
    fontSize: 15,
    color: colors.textMuted,
    paddingTop: spacing.lg,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: colors.background,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
  },
  headerText: {
    flex: 1,
    fontSize: 17,
    fontWeight: "700",
    color: colors.text,
  },
  headerCount: {
    minWidth: 24,
    textAlign: "center",
    fontSize: 12,
    fontWeight: "700",
    color: colors.primary,
    backgroundColor: colors.primarySoft,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
  },
  item: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
  },
  question: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.text,
  },
  answer: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  separator: {
    height: spacing.sm,
  },
});
