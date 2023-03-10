import { useEffect, useContext } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import MasonryList from "@react-native-seoul/masonry-list";
import MaterialCommunityIcon from "@expo/vector-icons/MaterialCommunityIcons";
import { FilterContext } from "../providers/FilterContext";
import useListing from "../hooks/use-listing";
import { ListType } from "../common";
import HeaderTitle from "../components/HeaderTitle";
import ListingItem from "../components/ListingItem";

export default function Home({ navigation }) {
  const { listings, refresh, pageNextResults, isRefresh, errorMessage } =
    useListing();
  const filterContext = useContext(FilterContext);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: (_) => {
        return (
          <HeaderTitle
            title={"r/pics"}
            subtitle={ListType[filterContext.filterData.listType]}
          />
        );
      },
      headerRight: () => (
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => {
            navigation.navigate("Filter");
          }}
        >
          <MaterialCommunityIcon
            name="filter-variant"
            size={24}
          ></MaterialCommunityIcon>
        </TouchableOpacity>
      ),
    });
  }, [filterContext.filterData.listType]);
  return (
    <SafeAreaView style={styles.container}>
      {!!errorMessage && (
        <View style={styles.errorView}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      )}
      <MasonryList
        refreshing={isRefresh}
        onRefresh={() => {
          refresh();
        }}
        onEndReached={() => {
          (async () => {
            await pageNextResults();
          })();
        }}
        onEndReachedThreshold={0.3}
        renderItem={({ item }) => {
          return (
            <ListingItem
              key={item.data.permalink}
              item={item}
              onPress={() => {
                navigation.navigate("Post", { postRoute: item.data.permalink });
              }}
            />
          );
        }}
        numColumns={filterContext.filterData.columns}
        contentContainerStyle={styles.contentView}
        data={listings ?? []}
      ></MasonryList>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  filterButton: { marginRight: 10, padding: 5 },
  contentView: { padding: 1 },
  errorView: { alignItems: "center", padding: 10 },
  errorText: { fontSize: 16 },
});
