import { useContext } from "react";
import { SafeAreaView, Text, View, StyleSheet } from "react-native";
import { FilterContext } from "../providers/FilterContext";
import { ListType } from "../common";
import SingleFilterOption from "../components/SingleFilterOption";

export default function ListFilter() {
  const filterContext = useContext(FilterContext);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.filterView}>
        <Text style={styles.sectionHeaderText}>List type</Text>
        {Object.keys(ListType).map((key) => {
          return (
            <SingleFilterOption
              key={key}
              onPress={() => {
                filterContext.updateFilterData((draft) => {
                  draft.listType = key;
                });
              }}
              text={ListType[key]}
              isSelected={filterContext.filterData.listType === key}
            />
          );
        })}
        <Text style={styles.sectionHeaderText}>Display type</Text>
        {[2, 3].map((value) => {
          return (
            <SingleFilterOption
              key={value}
              onPress={() => {
                filterContext.updateFilterData((draft) => {
                  draft.columns = value;
                });
              }}
              text={`${value} columns`}
              isSelected={filterContext.filterData.columns === value}
            />
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterView: {
    padding: 20,
  },
  sectionHeaderText: {
    fontWeight: "700",
    fontSize: 18,
    marginTop: 10,
  },
});
