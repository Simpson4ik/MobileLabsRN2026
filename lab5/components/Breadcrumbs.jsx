import { Ionicons } from "@expo/vector-icons";
import { useRef } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { colors, radius, spacing } from "@/constants/theme";
import { splitPath } from "@/utils/fileSystem";

export function Breadcrumbs({ rootTitle, path, onNavigate }) {
  const scrollRef = useRef(null);
  const segments = splitPath(path);
  const crumbs = [
    { label: rootTitle, path: "" },
    ...segments.map((name, index) => ({ label: name, path: segments.slice(0, index + 1).join("/") })),
  ];

  return (
    <ScrollView
      ref={scrollRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: false })}
    >
      {crumbs.map((crumb, index) => {
        const isLast = index === crumbs.length - 1;
        return (
          <View key={crumb.path || "root"} style={styles.item}>
            {index > 0 ? <Ionicons name="chevron-forward" size={14} color={colors.textMuted} /> : null}
            <Pressable
              disabled={isLast}
              onPress={() => onNavigate(crumb.path)}
              style={({ pressed }) => [styles.crumb, isLast && styles.crumbActive, pressed && styles.crumbPressed]}
            >
              {index === 0 ? (
                <Ionicons name="home" size={13} color={isLast ? colors.card : colors.primary} />
              ) : null}
              <Text style={[styles.label, isLast && styles.labelActive]} numberOfLines={1}>
                {crumb.label}
              </Text>
            </Pressable>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    marginRight: spacing.xs,
  },
  crumb: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    maxWidth: 180,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: radius.pill,
    backgroundColor: colors.primarySoft,
  },
  crumbActive: {
    backgroundColor: colors.primary,
  },
  crumbPressed: {
    opacity: 0.6,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.primary,
  },
  labelActive: {
    color: colors.card,
  },
});
