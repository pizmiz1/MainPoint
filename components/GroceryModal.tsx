import { TextInput, TouchableOpacity, View, Text, LayoutAnimation, StyleSheet } from "react-native";
import colors from "../constants/colors";
import groceryCategories from "../constants/groceryCategories";
import { RefObject, useState } from "react";
import uuid from "react-native-uuid";
import { Grocery } from "../types/grocery";

// Custom Components
import CategorySelector from "./CategorySelector";
import FadeModal from "./FadeModal";

interface GroceryModalProps {
  modalVisible: boolean;
  setModalVisible: (newVisible: boolean) => void;
  selectedGrocery: Grocery | undefined;
  setSelectedGrocery: (newGrocery: Grocery | undefined) => void;
  groceryList: Grocery[];
  updateGroceryList: (newGroceryList: Grocery[]) => void;
  allGroceries: RefObject<Grocery[]>;
  updateAllGroceries: (newAllGroceries: Grocery[]) => void;
  backgroundColor: (item: any) => string;
}

const GroceryModal = ({
  modalVisible,
  setModalVisible,
  selectedGrocery,
  setSelectedGrocery,
  groceryList,
  updateGroceryList,
  allGroceries,
  updateAllGroceries,
  backgroundColor,
}: GroceryModalProps) => {
  const [newGroceryName, setNewGroceryName] = useState(selectedGrocery ? selectedGrocery.name : "");
  const [addingNewGrocery, setAddingNewGrocery] = useState(selectedGrocery ? true : false);
  const [newCat, setNewCat] = useState(selectedGrocery ? selectedGrocery.category : null);
  const [catInvalid, setCatInvalid] = useState(false);

  const cats = Object.values(groceryCategories);

  const resetState = () => {
    setNewGroceryName("");
    setModalVisible(false);
    setAddingNewGrocery(false);
    setNewCat(null);
    setCatInvalid(false);
    setSelectedGrocery(undefined);
  };

  const addUpdateGrocery = () => {
    let newGrocery: Grocery = {
      id: uuid.v4(),
      name: newGroceryName,
      category: groceryCategories.condiment,
    };

    // Updating
    if (selectedGrocery !== undefined) {
      const existingGrocery = allGroceries.current.find((currGrocery) => currGrocery.name === newGroceryName && currGrocery.category === newCat);

      // No Change
      if (newCat === selectedGrocery.category && newGroceryName === selectedGrocery.name) {
        resetState();
        return;
      }

      // Existing Grocery
      if (existingGrocery) {
        if (groceryList.some((curr) => curr.id === selectedGrocery.id)) {
          updateGroceryList(groceryList.filter((curr) => curr.id !== selectedGrocery.id));
        } else {
          updateGroceryList(groceryList.map((curr) => (curr.id === selectedGrocery.id ? existingGrocery : curr)));
        }
        resetState();
        return;
      }

      // New Grocery
      const id = selectedGrocery.id;

      updateGroceryList(groceryList.map((curr) => (curr.id === id ? { ...curr, name: newGroceryName, category: newCat! } : curr)));
      updateAllGroceries(allGroceries.current.map((curr) => (curr.id === id ? { ...curr, name: newGroceryName, category: newCat! } : curr)));
    } // Adding
    else {
      const existingGrocery = allGroceries.current.find((currGrocery) => currGrocery.name === newGroceryName);

      if (existingGrocery) {
        const existingGroceryInList = groceryList.find((currGrocery) => currGrocery.name === newGroceryName);
        if (existingGroceryInList) {
          resetState();
          return;
        }

        newGrocery.category = existingGrocery.category;
        newGrocery.id = existingGrocery.id;
      } else {
        if (!addingNewGrocery) {
          LayoutAnimation.configureNext(LayoutAnimation.create(200, LayoutAnimation.Types.linear, LayoutAnimation.Properties.opacity));
          setAddingNewGrocery(true);
          return;
        }
        if (newCat === null) {
          LayoutAnimation.configureNext(LayoutAnimation.create(200, LayoutAnimation.Types.linear, LayoutAnimation.Properties.opacity));
          setCatInvalid(true);
          return;
        }

        if (newGroceryName === "") {
          return;
        }

        newGrocery.category = newCat;

        updateAllGroceries(allGroceries.current.concat([newGrocery]));
      }

      updateGroceryList([...groceryList, newGrocery]);
    }

    resetState();
  };

  return (
    <FadeModal modalVisible={modalVisible} innerViewStyle={{ marginBottom: addingNewGrocery ? 80 : 40 }}>
      <TextInput
        value={newGroceryName}
        placeholder="Name"
        onChangeText={(text) => {
          if (catInvalid) {
            LayoutAnimation.configureNext(LayoutAnimation.create(200, LayoutAnimation.Types.linear, LayoutAnimation.Properties.opacity));
            setCatInvalid(false);
          }
          setNewGroceryName(text);
        }}
        style={[styles.nameInput, { marginTop: addingNewGrocery ? -15 : 0 }]}
        textAlign="center"
        placeholderTextColor="#7d7a7a"
        keyboardType="ascii-capable"
        autoFocus={true}
        returnKeyType="done"
        onSubmitEditing={addUpdateGrocery}
        autoCapitalize="words"
      />
      {addingNewGrocery ? (
        <View style={styles.catContainer}>
          <CategorySelector
            cats={cats}
            selectedCat={newCat}
            onSelect={(selectedItem) => {
              setNewCat(selectedItem as (typeof groceryCategories)[keyof typeof groceryCategories]);
              setCatInvalid(false);
            }}
            backgroundColor={backgroundColor}
            disabled={!addingNewGrocery}
          />
          {catInvalid ? <Text style={styles.catInvalidText}>Select a Category!</Text> : null}
        </View>
      ) : null}
      <View style={[styles.btnContainer, { marginTop: catInvalid ? "5%" : "10%" }]}>
        <TouchableOpacity
          onPress={() => {
            resetState();
          }}
        >
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={addUpdateGrocery}>
          <Text style={styles.addText}>{selectedGrocery === undefined ? "Add" : "Update"}</Text>
        </TouchableOpacity>
      </View>
    </FadeModal>
  );
};

export default GroceryModal;

const styles = StyleSheet.create({
  nameInput: {
    padding: 5,
    color: "black",
    fontSize: 15,
    width: "90%",
  },
  catContainer: {
    marginTop: 5,
  },
  catInvalidText: {
    color: "red",
    alignSelf: "center",
    marginTop: 5,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  cancelText: {
    color: "red",
    fontSize: 17,
  },
  addText: {
    color: colors.primaryBlue,
    fontSize: 17,
    fontWeight: "bold",
  },
});
