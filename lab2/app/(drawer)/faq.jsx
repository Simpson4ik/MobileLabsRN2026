import { StyleSheet, Text, View } from "react-native";

export default function FaqScreen() {
  return (
    <View style={styles.container}>
      <Text>Довідковий центр</Text>
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
