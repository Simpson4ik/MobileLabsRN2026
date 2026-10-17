import { StyleSheet, Text, View } from "react-native";

export default function RecipesScreen() {
  return (
    <View style={styles.container}>
      <Text>Рецепти</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
