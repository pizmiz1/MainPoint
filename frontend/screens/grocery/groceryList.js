import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
  ActionSheetIOS,
  Alert,
  LayoutAnimation,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import uuid from "react-native-uuid";
import { Entypo, AntDesign, Ionicons } from "@expo/vector-icons";
import { removeGroceryAction } from "../../store/actions/removeGrocery";
import { addGroceryAction } from "../../store/actions/addGrocery";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BlurView } from "expo-blur";

//components
import ScrollViewContainer from "../../components/scrollViewContainer";

const GroceryList = (props) => {
  const colors = useSelector((state) => state.colors);
  const allGroceries = useSelector((state) => state.allGroceries);
  const groceryList = useSelector((state) => state.groceryList);

  const [produceList, setProduceList] = useState([]);
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
  const [groceryNotFound, setGroceryNotFound] = useState(false);
  const [blur, setBlur] = useState(0);
  const [backgroundTrig, setBackgroundTrig] = useState(0);

  const setArrays = () => {
    setProduceList(
      groceryList.filter((currGrocery) => currGrocery.Category === "Produce")
    );
    setFishList(
      groceryList.filter((currGrocery) => currGrocery.Category === "Fish")
    );
    setMeatList(
      groceryList.filter((currGrocery) => currGrocery.Category === "Meat")
    );
    setGrainsList(
      groceryList.filter((currGrocery) => currGrocery.Category === "Grain")
    );
    setDairyList(
      groceryList.filter((currGrocery) => currGrocery.Category === "Dairy")
    );
    setCondimentsList(
      groceryList.filter((currGrocery) => currGrocery.Category === "Condiment")
    );
    setSnacksList(
      groceryList.filter((currGrocery) => currGrocery.Category === "Snack")
    );
    setNonFoodList(
      groceryList.filter((currGrocery) => currGrocery.Category === "Non Food")
    );
    setFrozenList(
      groceryList.filter((currGrocery) => currGrocery.Category === "Frozen")
    );
  };

  useEffect(() => {
    const load = async () => {
      const CrossedGroceries = await AsyncStorage.getItem("Crossed Groceries");
      if (CrossedGroceries) {
        const transformedCrossed = await JSON.parse(CrossedGroceries).data;
        setCrossedGroceries(transformedCrossed);
      }
    };
    load();
  }, []);

  useEffect(() => {
    setArrays();
    if (groceryList.length === 0) {
      setClearVisible(false);
    } else {
      setClearVisible(true);
    }
  }, [groceryList]);

  const dispatch = useDispatch();

  const removeGrocery = async (passedGrocery) => {
    await dispatch(removeGroceryAction(passedGrocery, false));
    saveGroceries(2, passedGrocery);
  };

  const CategoryComponent = (props) => {
    const backgroundColor = () => {
      switch (props.catName) {
        case "Produce": {
          return "green";
        }
        case "Fish": {
          return colors.primary;
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
          return colors.primary;
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
          <Text style={{ fontSize: 20, marginBottom: 10, color: "white" }}>
            {props.catName}
          </Text>
        </View>
        <View
          style={{
            alignItems: "flex-start",
            width: "90%",
            alignSelf: "center",
            backgroundColor: colors.secondary,
            borderRadius: 20,
          }}
        >
          <View style={{ width: "94%", marginLeft: 20 }}>
            {props.groceries.map((item, index) => {
              const crossGroceryOff = async () => {
                if (!crossedGroceries.includes(item.id)) {
                  setCrossedGroceries(crossedGroceries.concat([item.id]));
                  await AsyncStorage.setItem(
                    "Crossed Groceries",
                    JSON.stringify({
                      data: crossedGroceries.concat([item.id]),
                    })
                  );
                } else {
                  setCrossedGroceries(
                    crossedGroceries.filter((currId) => item.id !== currId)
                  );
                  await AsyncStorage.setItem(
                    "Crossed Groceries",
                    JSON.stringify({
                      data: crossedGroceries.filter(
                        (currId) => item.id !== currId
                      ),
                    })
                  );
                }
              };

              return (
                <View key={index}>
                  <View style={{ flexDirection: "row", width: "100%" }}>
                    <TouchableOpacity
                      onPress={crossGroceryOff}
                      style={{ flex: 0 }}
                    >
                      <Text
                        style={{
                          fontSize: 25,
                          marginTop: 10,
                          marginBottom: 10,
                          textDecorationLine: crossedGroceries.includes(item.id)
                            ? "line-through"
                            : "none",
                          opacity: crossedGroceries.includes(item.id) ? 0.2 : 1,
                        }}
                      >
                        {item.Name}
                      </Text>
                    </TouchableOpacity>
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "flex-end",
                        flex: 1,
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
                        <AntDesign name="minuscircleo" size={20} color="red" />
                      </TouchableOpacity>
                    </View>
                  </View>
                  {props.groceries.length === index + 1 ? undefined : (
                    <View
                      style={{
                        borderColor: colors.darkGrey,
                        borderWidth: 0.5,
                        width: "100%",
                        alignSelf: "flex-end",
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

  const saveGroceries = async (type, grocery) => {
    switch (type) {
      case 0: {
        const GroceryData = await AsyncStorage.getItem("Grocery Data");
        if (GroceryData) {
          const transformedGroceryData = await JSON.parse(GroceryData).data;
          transformedGroceryData.at(1).Groceries = [];
          transformedGroceryData.at(0).AllGroceries = allGroceries;
          await AsyncStorage.setItem(
            "Grocery Data",
            JSON.stringify({
              data: transformedGroceryData,
            })
          );
        }
        break;
      }
      case 1: {
        const GroceryData = await AsyncStorage.getItem("Grocery Data");
        if (GroceryData) {
          const transformedGroceryData = await JSON.parse(GroceryData).data;
          transformedGroceryData.at(1).Groceries = groceryList.concat([
            grocery,
          ]);
          transformedGroceryData.at(0).AllGroceries = allGroceries;
          await AsyncStorage.setItem(
            "Grocery Data",
            JSON.stringify({
              data: transformedGroceryData,
            })
          );
        }
        break;
      }
      case 2: {
        const GroceryData = await AsyncStorage.getItem("Grocery Data");
        if (GroceryData) {
          const transformedGroceryData = await JSON.parse(GroceryData).data;
          transformedGroceryData.at(1).Groceries = groceryList.filter(
            (currGrocery) => currGrocery.Name !== grocery.Name
          );
          transformedGroceryData.at(0).AllGroceries = allGroceries;
          await AsyncStorage.setItem(
            "Grocery Data",
            JSON.stringify({
              data: transformedGroceryData,
            })
          );
        }
        break;
      }
    }
  };

  const addGrocery = () => {
    let newGrocery = {
      id: uuid.v4(),
      Name: newGroceryName,
      Category: "",
    };

    const existingGrocery = allGroceries.find(
      (currGrocery) => currGrocery.Name === newGroceryName
    );

    if (existingGrocery) {
      const existingGroceryInList = groceryList.find(
        (currGrocery) => currGrocery.Name === newGroceryName
      );
      if (existingGroceryInList) {
        setModalVisible(false);
        return;
      }

      newGrocery.Category = existingGrocery.Category;
      newGrocery.id = existingGrocery.id;
      updateNewGroceryName("");
      setModalVisible(false);
      dispatch(addGroceryAction(newGrocery));
      saveGroceries(1, newGrocery);
    } else {
      setGroceryNotFound(true);
      return;
    }
  };

  return (
    <View style={{ flex: 1 }}>
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
                marginBottom: 40,
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
                height: "20%",
              }}
            >
              <TextInput
                value={newGroceryName}
                placeholder="Name"
                onChangeText={(text) => {
                  setGroceryNotFound(false);
                  updateNewGroceryName(text);
                }}
                style={{
                  borderBottomWidth: 1,
                  padding: 5,
                  borderBottomColor: colors.darkGrey,
                  color: "black",
                  fontSize: 15,
                  width: "90%",
                }}
                textAlign="center"
                placeholderTextColor={colors.darkerGrey}
                keyboardType="ascii-capable"
                autoFocus={true}
                returnKeyType="done"
                onSubmitEditing={addGrocery}
                blurOnSubmit={false}
                autoCapitalize="words"
              />
              <Text style={{ color: "red", opacity: groceryNotFound ? 1 : 0 }}>
                Grocery Not Found
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                  marginTop: 10,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setGroceryNotFound(false);
                    setModalVisible(false);
                    updateNewGroceryName("");
                  }}
                >
                  <Text style={{ color: "red", fontSize: 17 }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={addGrocery}>
                  <Text style={{ color: colors.primary, fontSize: 17 }}>
                    Add
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <View style={{ flex: 1 }}>
        <ScrollViewContainer
          content={
            <View
              style={{
                backgroundColor: colors.lightGrey,
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
                onPress={async () => {
                  const tempArr = groceryList;
                  tempArr.forEach((currGrocery) => {
                    dispatch(removeGroceryAction(currGrocery, false));
                  });
                  saveGroceries(0);
                  setCrossedGroceries([]);
                  await AsyncStorage.setItem(
                    "Crossed Groceries",
                    JSON.stringify({
                      data: [],
                    })
                  );
                }}
                disabled={!clearVisible}
              >
                <Text style={{ fontSize: 20, color: "red" }}>Clear All</Text>
              </TouchableOpacity>
              {produceList.length !== 0 ? (
                <CategoryComponent
                  catName={"Produce"}
                  groceries={produceList}
                  remove={removeGrocery}
                />
              ) : undefined}
              {fishList.length !== 0 ? (
                <CategoryComponent
                  catName={"Fish"}
                  groceries={fishList}
                  remove={removeGrocery}
                />
              ) : undefined}
              {meatList.length !== 0 ? (
                <CategoryComponent
                  catName={"Meat"}
                  groceries={meatList}
                  remove={removeGrocery}
                />
              ) : undefined}
              {grainsList.length !== 0 ? (
                <CategoryComponent
                  catName={"Grains"}
                  groceries={grainsList}
                  remove={removeGrocery}
                />
              ) : undefined}
              {dairyList.length !== 0 ? (
                <CategoryComponent
                  catName={"Dairy"}
                  groceries={dairyList}
                  remove={removeGrocery}
                />
              ) : undefined}
              {condimentsList.length !== 0 ? (
                <CategoryComponent
                  catName={"Condiments"}
                  groceries={condimentsList}
                  remove={removeGrocery}
                />
              ) : undefined}
              {snacksList.length !== 0 ? (
                <CategoryComponent
                  catName={"Snacks"}
                  groceries={snacksList}
                  remove={removeGrocery}
                />
              ) : undefined}
              {frozenList.length !== 0 ? (
                <CategoryComponent
                  catName={"Frozen"}
                  groceries={frozenList}
                  remove={removeGrocery}
                />
              ) : undefined}
              {nonFoodList.length !== 0 ? (
                <CategoryComponent
                  catName={"Non Food"}
                  groceries={nonFoodList}
                  remove={removeGrocery}
                />
              ) : undefined}
            </View>
          }
          style={{ backgroundColor: colors.lightGrey }}
          onScroll={(pos) => {
            setBackgroundTrig(pos.nativeEvent.contentOffset.y);
            if (
              pos.nativeEvent.contentOffset.y < 40 &&
              pos.nativeEvent.contentOffset.y > 0
            ) {
              setBlur(pos.nativeEvent.contentOffset.y);
            } else if (pos.nativeEvent.contentOffset.y > 40) {
              setBlur(40);
            } else if (pos.nativeEvent.contentOffset.y <= 0) {
              setBlur(0);
            }
          }}
          nav={props.navigation}
        />
      </View>

      <BlurView
        style={{
          width: "100%",
          height: "12%",
          ...StyleSheet.absoluteFillObject,
          backgroundColor:
            backgroundTrig > 100 ? "rgba(255, 255, 255, .7)" : null,
        }}
        intensity={blur}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "90%",
            marginTop: 30,
          }}
        >
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                marginLeft: 35,
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              List
            </Text>
            <Text
              style={{
                marginLeft: 35,
                fontSize: 15,
                color: "#aaaaaa",
              }}
            >
              {groceryList.length} {groceryList.length !== 1 ? "Items" : "Item"}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
            }}
            style={{ alignSelf: "center" }}
          >
            <Ionicons name="add" size={30} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </BlurView>
    </View>
  );
};

export default GroceryList;
