import { StyleSheet, Text, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";

interface CategorySelectorProps {
  cats: string[];
  selectedCat: string | null;
  onSelect: (cat: string) => void;
  backgroundColor: (cat: string) => string;
  disabled?: boolean;
}

const CategorySelector = ({ cats, selectedCat, onSelect, backgroundColor, disabled }: CategorySelectorProps) => {
  return (
    <SelectDropdown
      data={cats}
      disabled={disabled}
      onSelect={onSelect}
      defaultValue={selectedCat !== null ? selectedCat : null}
      buttonStyle={styles.btn}
      renderCustomizedButtonChild={(selectedItem) => {
        return (
          <View style={[styles.category, { backgroundColor: backgroundColor(selectedItem) }]}>
            <Text style={[styles.categoryText, { color: selectedCat === null ? "black" : "white" }]}>
              {selectedItem ? selectedItem : "Select Category"}
            </Text>
          </View>
        );
      }}
      dropdownStyle={styles.dropdown}
      renderCustomizedRowChild={(item) => {
        return (
          <View style={[styles.categoryRow, { backgroundColor: backgroundColor(item) }]}>
            <Text style={[styles.categoryRowText, { fontWeight: selectedCat === item ? "bold" : "normal" }]}>{item}</Text>
          </View>
        );
      }}
    />
  );
};

export default CategorySelector;

const styles = StyleSheet.create({
  btn: {
    borderRadius: 8,
    backgroundColor: "white",
  },
  category: {
    width: "100%",
    flex: 1,
    borderRadius: 8,
    justifyContent: "center",
  },
  categoryText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
  dropdown: {
    borderRadius: 8,
  },
  categoryRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 18,
  },
  categoryRowText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    marginHorizontal: 12,
  },
});
