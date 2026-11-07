import { TextInput, TouchableOpacity, View, Text, LayoutAnimation, StyleSheet } from "react-native";
import colors from "../constants/colors";
import groceryCategories from "../constants/groceryCategories";
import { useState } from "react";
import uuid from "react-native-uuid";
import { Grocery } from "../types/grocery";
import { useGlobalContext } from "../store/GlobalContext";

// Custom Components
import CategorySelector from "./CategorySelector";
import FadeModal from "./FadeModal";

interface GroceryModalProps {
  modalVisible: boolean;
  setModalVisible: (newVisible: boolean) => void;
  selectedGrocery: Grocery | undefined;
  backgroundColor: (item: any) => string;
}

const GroceryModal = ({ modalVisible, setModalVisible, selectedGrocery, backgroundColor }: GroceryModalProps) => {
  const { updateGroceryList, updateAllGroceries } = useGlobalContext();

  const [newGroceryName, setNewGroceryName] = useState(selectedGrocery ? selectedGrocery.name : "");
  const [addingNewGrocery, setAddingNewGrocery] = useState(selectedGrocery ? true : false);
  const [newCat, setNewCat] = useState(selectedGrocery ? selectedGrocery.category : null);
  const [catInvalid, setCatInvalid] = useState(false);

  const cats = Object.values(groceryCategories);

  const resetState = () => {
    setModalVisible(false);
  };

  const addUpdateGrocery = () => {
    let newGrocery: Grocery = {
      id: uuid.v4(),
      name: newGroceryName,
      category: groceryCategories.condiment,
    };

    // Updating
    if (selectedGrocery !== undefined) {
      if (newCat === selectedGrocery.category && newGroceryName === selectedGrocery.name) {
        resetState();
        return;
      }

      const currentId = selectedGrocery.id;

      updateAllGroceries((prevAll) => {
        const existingGrocery = prevAll.find((currGrocery) => currGrocery.name === newGroceryName && currGrocery.category === newCat);

        if (existingGrocery) {
          updateGroceryList((prevList) => {
            if (prevList.some((curr) => curr.id === currentId)) {
              return prevList.filter((curr) => curr.id !== currentId);
            } else {
              return prevList.map((curr) => (curr.id === currentId ? existingGrocery : curr));
            }
          });
        } else {
          const updatedItem = { ...selectedGrocery, name: newGroceryName, category: newCat! };
          updateGroceryList((prevList) => prevList.map((curr) => (curr.id === currentId ? updatedItem : curr)));
          return prevAll.map((curr) => (curr.id === currentId ? updatedItem : curr));
        }

        return prevAll;
      });

      resetState();
    }
    // Adding
    else {
      updateAllGroceries((prevAll) => {
        const existingGrocery = prevAll.find((currGrocery) => currGrocery.name === newGroceryName);
        let groceryToProcess = { ...newGrocery };

        if (existingGrocery) {
          updateGroceryList((prevList) => {
            const existingGroceryInList = prevList.find((currGrocery) => currGrocery.name === newGroceryName);
            if (existingGroceryInList) {
              return prevList;
            }
            groceryToProcess.category = existingGrocery.category;
            groceryToProcess.id = existingGrocery.id;
            return [...prevList, groceryToProcess];
          });

          requestAnimationFrame(() => resetState());
          return prevAll;
        } else {
          if (!addingNewGrocery) {
            LayoutAnimation.configureNext(LayoutAnimation.create(200, LayoutAnimation.Types.linear, LayoutAnimation.Properties.opacity));
            setAddingNewGrocery(true);
            return prevAll;
          }
          if (newCat === null) {
            LayoutAnimation.configureNext(LayoutAnimation.create(200, LayoutAnimation.Types.linear, LayoutAnimation.Properties.opacity));
            setCatInvalid(true);
            return prevAll;
          }
          if (newGroceryName === "") {
            return prevAll;
          }

          groceryToProcess.category = newCat;

          updateGroceryList((prevList) => [...prevList, groceryToProcess]);

          requestAnimationFrame(() => resetState());
          return [...prevAll, groceryToProcess];
        }
      });
    }
  };

  return (
    <FadeModal modalVisible={modalVisible} innerViewStyle={{ marginBottom: addingNewGrocery ? 110 : 70 }}>
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
