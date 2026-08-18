import { Modal, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, Text, Keyboard, LayoutAnimation } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import colors from "../constants/colors";
import groceryCategories from "../constants/groceryCategories";
import { useState } from "react";
import uuid from "react-native-uuid";

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
}) => {
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
    let newGrocery = {
      id: uuid.v4(),
      name: newGroceryName,
      category: "",
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

      updateGroceryList(groceryList.map((curr) => (curr.id === id ? { ...curr, name: newGroceryName, category: newCat } : curr)));
      updateAllGroceries(allGroceries.current.map((curr) => (curr.id === id ? { ...curr, name: newGroceryName, category: newCat } : curr)));
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
    <Modal animationType="fade" visible={modalVisible} transparent={true}>
      <TouchableWithoutFeedback onPressOut={() => Keyboard.dismiss()}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              marginBottom: addingNewGrocery ? 80 : 40,
              backgroundColor: "white",
              borderRadius: 20,
              padding: 35,
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
              width: "60%",
            }}
          >
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
              style={{
                padding: 5,
                color: "black",
                fontSize: 15,
                width: "90%",
                marginTop: addingNewGrocery ? -15 : 0,
              }}
              textAlign="center"
              placeholderTextColor="#7d7a7a"
              keyboardType="ascii-capable"
              autoFocus={true}
              returnKeyType="done"
              onSubmitEditing={addUpdateGrocery}
              autoCapitalize="words"
            />
            {addingNewGrocery ? (
              <View style={{ marginTop: 5 }}>
                <SelectDropdown
                  data={cats}
                  disabled={!addingNewGrocery}
                  onSelect={(selectedItem) => {
                    setNewCat(selectedItem);
                    setCatInvalid(false);
                  }}
                  defaultValue={newCat !== null ? newCat : null}
                  buttonStyle={{ borderRadius: 8, backgroundColor: "white" }}
                  renderCustomizedButtonChild={(selectedItem, index) => {
                    return (
                      <View
                        style={{
                          width: "100%",
                          flex: 1,
                          backgroundColor: backgroundColor(selectedItem),
                          borderRadius: 8,
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: newCat === null ? "black" : "white",
                            textAlign: "center",
                            fontWeight: "bold",
                            fontSize: 18,
                          }}
                        >
                          {selectedItem ? selectedItem : "Select Category"}
                        </Text>
                      </View>
                    );
                  }}
                  dropdownStyle={{ borderRadius: 8 }}
                  renderCustomizedRowChild={(item, index) => {
                    return (
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "row",
                          justifyContent: "flex-start",
                          alignItems: "center",
                          paddingHorizontal: 18,
                          backgroundColor: backgroundColor(item),
                        }}
                      >
                        <Text
                          style={{
                            color: "white",
                            textAlign: "center",
                            fontWeight: newCat === item ? "bold" : "normal",
                            fontSize: 18,
                            marginHorizontal: 12,
                          }}
                        >
                          {item}
                        </Text>
                      </View>
                    );
                  }}
                />
                {catInvalid ? (
                  <Text
                    style={{
                      color: "red",
                      alignSelf: "center",
                      marginTop: 5,
                    }}
                  >
                    Select a Category!
                  </Text>
                ) : null}
              </View>
            ) : null}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                marginTop: catInvalid ? "5%" : "10%",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  resetState();
                }}
              >
                <Text style={{ color: "red", fontSize: 17 }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={addUpdateGrocery}>
                <Text
                  style={{
                    color: colors.primaryBlue,
                    fontSize: 17,
                    fontWeight: "bold",
                  }}
                >
                  {selectedGrocery === undefined ? "Add" : "Update"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default GroceryModal;
