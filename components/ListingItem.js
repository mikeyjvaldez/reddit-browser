import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { formatDistanceToNow } from "date-fns";
import FastImage from "react-native-fast-image";
import MaterialCommunityIcon from "@expo/vector-icons/MaterialCommunityIcons";
import { ColorTheme } from "../common";
/**
 * Formats a number to be shortened
 * ex. 1248 will be shown as 1.2k
 */
function formatNumber(num) {
  if (num >= 1000) {
    num = (num / 1000).toFixed(1) + "k";
  }
  return num;
}

export default function ListingItem({ item, onPress }) {
  const awardIcons = () => {
    let awardUrls = [];
    if (item.data.all_awardings) {
      awardUrls = item.data.all_awardings.map((award) => {
        // get the smallest icon
        const icons = award.resized_icons
          .filter((iconData) => iconData.height === 16)
          .map((iconData) => iconData.url);
        return icons[0];
      });
    }
    return awardUrls;
  };
  return (
    <TouchableOpacity
      onPress={onPress}
      key={item.data.name}
      style={styles.container}
    >
      <FastImage
        style={[styles.thumbnail, { height: item.data.thumbnail_height }]}
        source={{ uri: item.data.thumbnail }}
      ></FastImage>

      <View style={styles.bodyView}>
        <View>
          <Text style={styles.titleText}>{item.data.title}</Text>
        </View>
        <View style={styles.awardView}>
          {awardIcons().map((url) => (
            <FastImage
              key={item.data.name + "award" + url}
              style={styles.awardImage}
              source={{ uri: url }}
            ></FastImage>
          ))}
        </View>
        <View style={styles.userView}>
          <Text style={styles.userText}>
            Posted by u/{item.data.author}{" "}
            {formatDistanceToNow(item.data.created_utc * 1000, {
              addSuffix: true,
            })}
          </Text>
        </View>
        <View style={styles.metadataView}>
          <MaterialCommunityIcon
            name="arrow-up-down-bold-outline"
            size={14}
            color={ColorTheme.secondary}
          ></MaterialCommunityIcon>
          <Text style={styles.metadataText}>
            {formatNumber(item.data.score)}
          </Text>

          <View style={styles.commentsView}>
            <MaterialCommunityIcon
              name="message-outline"
              size={14}
              color={ColorTheme.secondary}
            ></MaterialCommunityIcon>
            <Text style={[styles.metadataText, styles.commentText]}>
              {formatNumber(item.data.num_comments)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
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
  },
  thumbnail: {
    width: "100%",
    borderRadius: 5,
    backgroundColor: "gray",
  },
  bodyView: { padding: 5 },
  titleText: {
    fontWeight: "700",
    padding: 5,
    fontSize: 16,
  },
  userView: { marginTop: 5 },
  userText: { fontWeight: "400", color: "#8A9AA1" },
  metadataView: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  metadataText: { color: ColorTheme.secondary },
  commentsView: {
    marginLeft: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  commentText: { marginLeft: 2 },
  awardView: { flexDirection: "row" },
  awardImage: { height: 16, width: 16 },
});
