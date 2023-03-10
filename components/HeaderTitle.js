import { StyleSheet, Text, View } from "react-native";
import { ColorTheme } from "../common";

export default function HeaderTitle({ title, subtitle }) {
  return (
    <View style={styles.container}>
      <Text testID={"header-title"} style={styles.titleText}>
        {title}
      </Text>
      {!!subtitle && (
        <Text testID={"header-subtitle"} style={styles.subtitleText}>
          {subtitle}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center" },
  titleText: { fontSize: 18, fontWeight: "700" },
  subtitleText: {
    fontSize: 14,
    fontWeight: "400",
    color: ColorTheme.secondary,
  },
});
