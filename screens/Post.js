import { StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

export default function Post({ route }) {
  const { postRoute } = route.params;

  return (
    <WebView
      style={styles.container}
      source={{ uri: "https://reddit.com" + postRoute }}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
