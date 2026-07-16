import React, { useState, useEffect, useRef } from "react";
import { Text, View, TouchableOpacity, Modal, TouchableWithoutFeedback, TextInput, Keyboard, LayoutAnimation, StyleSheet } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BlurView } from "expo-blur";
import SelectDropdown from "react-native-select-dropdown";
import uuid from "react-native-uuid";
import colors from "../constants/colors";
import asyncKeys from "../constants/asyncKeys";

// Custom Components
import ScrollViewContainer from "../components/scrollViewContainer";
import groceryCategories from "../constants/groceryCategories";
import Header from "../components/header";

const GroceryListScreen = (props) => {
  const [groceryList, setGroceryList] = useState([]);
  const [produceList, setProduceList] = useState([]);
  const [fruitList, setFruitList] = useState([]);
  const [fishList, setFishList] = useState([]);
  const [meatList, setMeatList] = useState([]);
  const [grainsList, setGrainsList] = useState([]);
  const [dairyList, setDairyList] = useState([]);
  const [condimentsList, setCondimentsList] = useState([]);
  const [snacksList, setSnacksList] = useState([]);
  const [nonFoodList, setNonFoodList] = useState([]);
  const [frozenList, setFrozenList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newGroceryName, updateNewGroceryName] = useState("");
  const [crossedGroceries, setCrossedGroceries] = useState([]);
  const [clearVisible, setClearVisible] = useState(false);
  const [blur, setBlur] = useState(0);
  const [backgroundTrig, setBackgroundTrig] = useState(0);
  const [addingNewGrocery, setAddingNewGrocery] = useState(false);
  const [newCat, setNewCat] = useState(null);
  const [catInvalid, setCatInvalid] = useState(false);
  const [loading, setLoading] = useState(true);

  const allGroceries = useRef([]);
  const oldGrocery = useRef(null);

  const setArrays = (passedGroceryList) => {
    setProduceList(passedGroceryList.filter((currGrocery) => currGrocery.category === "Produce"));
    setFruitList(passedGroceryList.filter((currGrocery) => currGrocery.category === "Fruit"));
    setFishList(passedGroceryList.filter((currGrocery) => currGrocery.category === "Fish"));
    setMeatList(passedGroceryList.filter((currGrocery) => currGrocery.category === "Meat"));
    setGrainsList(passedGroceryList.filter((currGrocery) => currGrocery.category === "Grain"));
    setDairyList(passedGroceryList.filter((currGrocery) => currGrocery.category === "Dairy"));
    setCondimentsList(passedGroceryList.filter((currGrocery) => currGrocery.category === "Condiment"));
    setSnacksList(passedGroceryList.filter((currGrocery) => currGrocery.category === "Snack"));
    setNonFoodList(passedGroceryList.filter((currGrocery) => currGrocery.category === "Non Food"));
    setFrozenList(passedGroceryList.filter((currGrocery) => currGrocery.category === "Frozen"));
  };

  const cats = Object.values(groceryCategories);

  const backgroundColor = (cat) => {
    switch (cat) {
      case "Produce": {
        return "green";
      }
      case "Fruit": {
        return "#FF00FF";
      }
      case "Fish": {
        return colors.primaryBlue;
      }
      case "Meat": {
        return "red";
      }
      case "Grain": {
        return "tan";
      }
      case "Dairy": {
        return "teal";
      }
      case "Condiment": {
        return "#f5ce42";
      }
      case "Snack": {
        return "#f27e1f";
      }
      case "Non Food": {
        return "grey";
      }
      case "Frozen": {
        return "#3b5b73";
      }
      default: {
        return "#EFEFEF";
      }
    }
  };

  useEffect(() => {
    const load = async () => {
      // Crossed Groceries
      const crossedGroceryUuidsJSON = await AsyncStorage.getItem(asyncKeys.crossedGroceryUuids);
      const crossedGroceryUuidsParsed = crossedGroceryUuidsJSON != null ? JSON.parse(crossedGroceryUuidsJSON) : null;

      if (crossedGroceryUuidsParsed !== null) {
        setCrossedGroceries(crossedGroceryUuidsParsed);
      }

      // Grocery List
      const groceryListJSON = await AsyncStorage.getItem(asyncKeys.groceryList);
      const groceryListParsed = groceryListJSON != null ? JSON.parse(groceryListJSON) : null;

      if (groceryListParsed !== null) {
        setGroceryList(groceryListParsed);
        setArrays(groceryListParsed);
      }

      // All Groceries
      const allGroceriesJSON = await AsyncStorage.getItem(asyncKeys.allGroceries);
      const allGroceriesParsed = allGroceriesJSON != null ? JSON.parse(allGroceriesJSON) : null;

      if (allGroceriesParsed !== null) {
        allGroceries.current = allGroceriesParsed;
      }

      setLoading(false);
    };

    load();
  }, []);

  useEffect(() => {
    if (loading !== true) {
      saveGroceryList();
      setArrays(groceryList);
    }

    if (groceryList.length === 0) {
      setClearVisible(false);
    } else {
      setClearVisible(true);
    }
  }, [groceryList]);

  useEffect(() => {
    if (loading !== true) {
      saveCrossedGroceries();
    }
  }, [crossedGroceries]);

  const saveGroceryList = async () => {
    const groceryListJSON = JSON.stringify(groceryList);
    await AsyncStorage.setItem(asyncKeys.groceryList, groceryListJSON);
  };

  const setAndSaveAllGroceries = async (passedAllGroceries) => {
    allGroceries.current = passedAllGroceries;

    const allGroceriesJSON = JSON.stringify(passedAllGroceries);
    await AsyncStorage.setItem(asyncKeys.allGroceries, allGroceriesJSON);
  };

  const saveCrossedGroceries = async () => {
    await AsyncStorage.setItem(asyncKeys.crossedGroceryUuids, JSON.stringify(crossedGroceries));
  };

  const CategoryComponent = (props) => {
    const backgroundColor = () => {
      switch (props.catName) {
        case "Produce": {
          return "green";
        }
        case "Fruit": {
          return "#FF00FF";
        }
        case "Fish": {
          return colors.primaryBlue;
        }
        case "Meat": {
          return "red";
        }
        case "Grains": {
          return "tan";
        }
        case "Dairy": {
          return "teal";
        }
        case "Condiments": {
          return "#f5ce42";
        }
        case "Snacks": {
          return "#f27e1f";
        }
        case "Non Food": {
          return "grey";
        }
        case "Frozen": {
          return "#3b5b73";
        }
        default: {
          return colors.primaryBlue;
        }
      }
    };

    return (
      <View style={{ marginTop: 20, alignItems: "center" }}>
        <View
          style={{
            width: "60%",
            alignItems: "center",
            backgroundColor: backgroundColor(),
            borderRadius: 10,
            marginBottom: -10,
          }}
        >
          <Text style={{ fontSize: 20, marginBottom: 10, color: "white" }}>{props.catName}</Text>
        </View>
        <View
          style={{
            alignItems: "flex-start",
            width: "90%",
            alignSelf: "center",
            backgroundColor: "white",
            borderRadius: 20,
          }}
        >
          <View style={{ width: "94%", marginLeft: 20 }}>
            {props.groceries.map((item, index) => {
              const crossGroceryOff = async () => {
                if (!crossedGroceries.includes(item.id)) {
                  setCrossedGroceries(crossedGroceries.concat([item.id]));
                } else {
                  setCrossedGroceries(crossedGroceries.filter((currId) => item.id !== currId));
                }
              };

              return (
                <View key={index}>
                  <View style={{ flexDirection: "row", width: "100%" }}>
                    <TouchableOpacity
                      onLongPress={async () => {
                        oldGrocery.current = item;
                        updateNewGroceryName(item.name);
                        setCatInvalid(false);
                        setNewCat(item.category);
                        setAddingNewGrocery(true);
                        setModalVisible(true);
                      }}
                      onPress={() => {
                        crossGroceryOff();
                      }}
                      style={{ flex: 1, width: "100%" }}
                    >
                      <Text
                        style={{
                          fontSize: 25,
                          marginTop: 10,
                          marginBottom: 10,
                          textDecorationLine: crossedGroceries.includes(item.id) ? "line-through" : "none",
                          opacity: crossedGroceries.includes(item.id) ? 0.2 : 1,
                        }}
                      >
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "flex-end",
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          props.remove(item);
                        }}
                        style={{
                          marginRight: 10,
                        }}
                      >
                        <AntDesign name="minus-circle" size={20} color="red" />
                      </TouchableOpacity>
                    </View>
                  </View>
                  {props.groceries.length === index + 1 ? undefined : (
                    <View
                      style={{
                        backgroundColor: "#808080",
                        height: StyleSheet.hairlineWidth,
                        width: "100%",
                        alignSelf: "flex-start",
                      }}
                    />
                  )}
                </View>
              );
            })}
          </View>
        </View>
      </View>
    );
  };

  const removeGrocery = async (passedGrocery) => {
    setGroceryList(groceryList.filter((curr) => curr.id !== passedGrocery.id));
  };

  const addGrocery = async () => {
    let newGrocery = {
      id: uuid.v4(),
      name: newGroceryName,
      category: "",
    };

    // Updating
    if (oldGrocery.current !== null) {
      const existingGrocery = allGroceries.current.find((currGrocery) => currGrocery.name === newGroceryName && currGrocery.category === newCat);
      if ((newCat === oldGrocery.current.category && newGroceryName === oldGrocery.current.name) || existingGrocery) {
        setModalVisible(false);
        updateNewGroceryName("");
        setAddingNewGrocery(false);
        setNewCat(null);
        setCatInvalid(false);
        oldGrocery.current = null;
        return;
      }

      const id = oldGrocery.current.id;

      setGroceryList((prev) => prev.map((curr) => (curr.id === id ? { ...curr, name: newGroceryName, category: newCat } : curr)));

      let newAllGroceries = allGroceries.current;
      const index = newAllGroceries.findIndex((curr) => curr.id === id);
      if (index !== -1) {
        newAllGroceries[index].name = newGroceryName;
        newAllGroceries[index].category = newCat;
      }
      setAndSaveAllGroceries(newAllGroceries);

      oldGrocery.current = null;
    } // Adding
    else {
      const existingGrocery = allGroceries.current.find((currGrocery) => currGrocery.name === newGroceryName);

      if (existingGrocery) {
        const existingGroceryInList = groceryList.find((currGrocery) => currGrocery.name === newGroceryName);
        if (existingGroceryInList) {
          resetAddState();
          return;
        }

        newGrocery.category = existingGrocery.category;
        newGrocery.id = existingGrocery.id;
        setGroceryList(groceryList.concat([newGrocery]));
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

        setGroceryList(groceryList.concat([newGrocery]));
        setAndSaveAllGroceries(allGroceries.current.concat([newGrocery]));
      }
    }

    resetAddState();
  };

  const resetAddState = () => {
    updateNewGroceryName("");
    setModalVisible(false);
    setAddingNewGrocery(false);
    setNewCat(null);
    setCatInvalid(false);
  };

  const clearAllGroceries = () => {
    setGroceryList([]);
    setCrossedGroceries([]);
  };

  return (
    <View style={{ flex: 1, marginTop: 25 }}>
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
                  updateNewGroceryName(text);
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
                onSubmitEditing={addGrocery}
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
                            //height: 40,
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
                    setModalVisible(false);
                    updateNewGroceryName("");
                    setAddingNewGrocery(false);
                    setNewCat(null);
                    setCatInvalid(false);
                    oldGrocery.current = null;
                  }}
                >
                  <Text style={{ color: "red", fontSize: 17 }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={addGrocery}>
                  <Text
                    style={{
                      color: colors.primaryBlue,
                      fontSize: 17,
                      fontWeight: "bold",
                    }}
                  >
                    {oldGrocery.current === null ? "Add" : "Update"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Header
        headerText="List"
        descriptionText={`${groceryList.length} ${groceryList.length !== 1 ? "Items" : "Item"}`}
        backgroundTrig={backgroundTrig}
        blur={blur}
        actionPress={() => {
          setModalVisible(true);
        }}
      />

      <View style={{ flex: 1 }}>
        <ScrollViewContainer
          onScroll={(pos) => {
            if (groceryList.length === 0) {
              return;
            }

            setBackgroundTrig(pos.nativeEvent.contentOffset.y);
            if (pos.nativeEvent.contentOffset.y < 40 && pos.nativeEvent.contentOffset.y > 0) {
              setBlur(pos.nativeEvent.contentOffset.y);
            } else if (pos.nativeEvent.contentOffset.y > 40) {
              setBlur(40);
            } else if (pos.nativeEvent.contentOffset.y <= 0) {
              setBlur(0);
            }
          }}
        >
          <View
            style={{
              marginBottom: 20,
              marginTop: 80,
            }}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                alignItems: "center",
                marginTop: 10,
                opacity: clearVisible ? 1 : 0,
              }}
              onPress={clearAllGroceries}
              disabled={!clearVisible}
            >
              <Text style={{ fontSize: 20, color: "red" }}>Clear All</Text>
            </TouchableOpacity>
            {produceList.length !== 0 ? <CategoryComponent catName={"Produce"} groceries={produceList} remove={removeGrocery} /> : undefined}
            {fruitList.length !== 0 ? <CategoryComponent catName={"Fruit"} groceries={fruitList} remove={removeGrocery} /> : undefined}
            {fishList.length !== 0 ? <CategoryComponent catName={"Fish"} groceries={fishList} remove={removeGrocery} /> : undefined}
            {meatList.length !== 0 ? <CategoryComponent catName={"Meat"} groceries={meatList} remove={removeGrocery} /> : undefined}
            {grainsList.length !== 0 ? <CategoryComponent catName={"Grains"} groceries={grainsList} remove={removeGrocery} /> : undefined}
            {dairyList.length !== 0 ? <CategoryComponent catName={"Dairy"} groceries={dairyList} remove={removeGrocery} /> : undefined}
            {condimentsList.length !== 0 ? <CategoryComponent catName={"Condiments"} groceries={condimentsList} remove={removeGrocery} /> : undefined}
            {snacksList.length !== 0 ? <CategoryComponent catName={"Snacks"} groceries={snacksList} remove={removeGrocery} /> : undefined}
            {frozenList.length !== 0 ? <CategoryComponent catName={"Frozen"} groceries={frozenList} remove={removeGrocery} /> : undefined}
            {nonFoodList.length !== 0 ? <CategoryComponent catName={"Non Food"} groceries={nonFoodList} remove={removeGrocery} /> : undefined}
          </View>
        </ScrollViewContainer>
      </View>
    </View>
  );
};

export default GroceryListScreen;
