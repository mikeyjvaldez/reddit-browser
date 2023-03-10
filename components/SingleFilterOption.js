import { Text, StyleSheet, TouchableOpacity } from "react-native";
import MaterialCommunityIcon from "@expo/vector-icons/MaterialCommunityIcons";
import { ColorTheme } from "../common";

export default function SingleFilterOption({ text, isSelected, onPress }) {
  return (
    <TouchableOpacity
      testID={`single-filter-option${isSelected ? "-selected" : ""}`}
      onPress={onPress}
      style={styles.singleSelectionView}
    >
      <MaterialCommunityIcon
        name={
          isSelected
            ? "checkbox-marked-circle-outline"
            : "checkbox-blank-circle-outline"
        }
        size={18}
        color={isSelected ? ColorTheme.primary : ColorTheme.secondary}
      ></MaterialCommunityIcon>
      <Text
        testID={"single-filter-option-text"}
        style={styles.singleSelectionText}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  singleSelectionView: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  singleSelectionText: {
    fontSize: 16,
    marginLeft: 5,
  },
});
