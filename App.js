import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { formatDistanceToNow, formatRelative } from "date-fns";
import FastImage from "react-native-fast-image";
import { NavigationContainer } from "@react-navigation/native";
import MasonryList from "@react-native-seoul/masonry-list";
import MaterialCommunityIcon from "@expo/vector-icons/MaterialCommunityIcons";

function formatNumber(num) {
  if (num >= 1000) {
    num = (num / 1000).toFixed(1) + "k";
  }
  return num;
}

export default function App() {
  const [data, setData] = useState();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://api.reddit.com/r/pics/hot.json");
      const responseData = await response.json();
      setData(responseData);
    }
    void fetchData();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MasonryList
        renderItem={({ item }) => {
          return (
            <View
              key={item.data.name}
              style={{
                margin: 2,

                shadowColor: "#000",
                shadowOffset: {
                  height: 0,
                },
                borderRadius: 5,
                shadowOpacity: 0.2,
                backgroundColor: "#fff",
                alignItems: "flex-start",
                alignContent: "flex-start",
              }}
            >
              <FastImage
                style={{
                  height: item.data.thumbnail_height,
                  width: "100%",
                  borderRadius: 5,
                  backgroundColor: "gray",
                }}
                source={{ uri: item.data.thumbnail }}
              ></FastImage>

              <View style={{ padding: 5 }}>
                <View>
                  <Text
                    style={{
                      fontWeight: "700",
                      padding: 5,
                      fontSize: 16,
                    }}
                  >
                    {item.data.title}
                  </Text>
                </View>
                <View style={{ marginTop: 5 }}>
                  <Text style={{ fontWeight: "400", color: "#8A9AA1" }}>
                    Posted by u/{item.data.author}{" "}
                    {formatDistanceToNow(item.data.created_utc * 1000, {
                      addSuffix: true,
                    })}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginVertical: 5,
                  }}
                >
                  <MaterialCommunityIcon
                    name="arrow-up-down-bold-outline"
                    size={14}
                    color={"#8A9AA1"}
                  ></MaterialCommunityIcon>
                  <Text style={{ color: "#8A9AA1" }}>
                    {formatNumber(item.data.score)}
                  </Text>

                  <View
                    style={{
                      marginLeft: 5,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <MaterialCommunityIcon
                      name="message-outline"
                      size={14}
                      color={"#8A9AA1"}
                    ></MaterialCommunityIcon>
                    <Text style={{ color: "#8A9AA1", marginLeft: 2 }}>
                      {formatNumber(item.data.num_comments)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          );
        }}
        numColumns={2}
        contentContainerStyle={{ padding: 1 }}
        data={data ? data.data.children : []}
      ></MasonryList>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
