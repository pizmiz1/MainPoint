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
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import uuid from "react-native-uuid";
import { Entypo, AntDesign, Ionicons } from "@expo/vector-icons";
import { removeGroceryAction } from "../../store/actions/removeGrocery";
import { addGroceryAction } from "../../store/actions/addGrocery";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  const [editing, setEditing] = useState(false);

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
    setArrays();
    if (groceryList.length === 0) {
      setClearVisible(false);
    } else {
      setClearVisible(true);
    }
  }, [groceryList]);

  const dispatch = useDispatch();

  const removeGrocery = async (passedGrocery) => {
    await dispatch(removeGroceryAction(passedGrocery));
  };

  const CategoryComponent = (props) => {
    const [groceries, setGroceries] = useState([
      {
        id: uuid.v4(),
        Name: "Broccoli",
        Category: "Produce",
      },
      {
        id: uuid.v4(),
        Name: "Cabbage",
        Category: "Produce",
      },
    ]);

    useEffect(() => {
      if (props.groceries !== undefined) {
        setGroceries(props.groceries);
      }
    }, []);

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
            {groceries.map((item, index) => {
              const crossGroceryOff = () => {
                if (!crossedGroceries.includes(item.id)) {
                  setCrossedGroceries(crossedGroceries.concat([item.id]));
                } else {
                  setCrossedGroceries(
                    crossedGroceries.filter((currId) => item.id !== currId)
                  );
                }
              };

              return (
                <View key={index}>
                  <View style={{ flexDirection: "row", width: "100%" }}>
                    <TouchableOpacity
                      onPress={editing ? undefined : crossGroceryOff}
                      style={{ flex: editing ? 0 : 1 }}
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
                    {editing ? (
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
                          <AntDesign
                            name="minuscircleo"
                            size={20}
                            color="red"
                          />
                        </TouchableOpacity>
                      </View>
                    ) : undefined}
                  </View>
                  {groceries.length === index + 1 ? undefined : (
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
    } else {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: [
            "Cancel",
            "Produce",
            "Fish",
            "Meat",
            "Grain",
            "Dairy",
            "Condiment",
            "Snack",
            "Frozen",
            "Non Food",
          ],
          cancelButtonIndex: 0,
          userInterfaceStyle: "light",
        },
        async (buttonIndex) => {
          switch (buttonIndex) {
            case 0: {
              return;
            }
            case 1: {
              newGrocery.Category = "Produce";
              break;
            }
            case 2: {
              newGrocery.Category = "Fish";
              break;
            }
            case 3: {
              newGrocery.Category = "Meat";
              break;
            }
            case 4: {
              newGrocery.Category = "Grain";
              break;
            }
            case 5: {
              newGrocery.Category = "Dairy";
              break;
            }
            case 6: {
              newGrocery.Category = "Condiment";
              break;
            }
            case 7: {
              newGrocery.Category = "Snack";
              break;
            }
            case 8: {
              newGrocery.Category = "Frozen";
              break;
            }
            case 9: {
              newGrocery.Category = "Non Food";
              break;
            }
          }
          allGroceries.push(newGrocery);
          updateNewGroceryName("");
          setModalVisible(false);
          dispatch(addGroceryAction(newGrocery));
        }
      );
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
                onChangeText={updateNewGroceryName}
                style={{
                  borderBottomWidth: 1,
                  padding: 5,
                  borderBottomColor: colors.darkGrey,
                  color: "black",
                  fontSize: 15,
                  width: "60%",
                }}
                textAlign="center"
                placeholderTextColor={colors.darkerGrey}
                keyboardType="ascii-capable"
                autoFocus={true}
                returnKeyType="done"
                onSubmitEditing={addGrocery}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                  marginTop: 20,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false);
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

      <View style={{ flex: 0.9 }}>
        <ScrollViewContainer
          content={
            <View
              style={{ backgroundColor: colors.lightGrey, marginBottom: 20 }}
            >
              {editing ? (
                <TouchableOpacity
                  style={{
                    flex: 1,
                    alignItems: "center",
                    marginTop: 10,
                    opacity: clearVisible ? 1 : 0,
                  }}
                  onPress={() => {
                    const tempArr = groceryList;
                    tempArr.forEach((currGrocery) => {
                      removeGrocery(currGrocery);
                    });
                  }}
                  disabled={!clearVisible}
                >
                  <Text style={{ fontSize: 20, color: "red" }}>Clear All</Text>
                </TouchableOpacity>
              ) : undefined}
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
          nav={props.navigation}
        />
      </View>
      {editing ? (
        <View
          style={{
            flex: 0.1,
            flexDirection: "row",
            alignItems: "center",
            width: "90%",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
            }}
            style={{
              alignSelf: "center",
              marginLeft: 15,
            }}
          >
            <Ionicons name="add" size={30} color={colors.primary} />
          </TouchableOpacity>
          <View
            style={{
              width: "85%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ marginRight: 5 }}>{groceryList.length} Items</Text>
          </View>
          <TouchableOpacity
            onPress={async () => {
              LayoutAnimation.configureNext(
                LayoutAnimation.create(
                  200,
                  LayoutAnimation.Types.linear,
                  LayoutAnimation.Properties.opacity
                )
              );
              setEditing(false);
              // ############ OLD FIRESTORE CODE ##############
              // const GroceryListDoc = await doc(db, "Grocery", "GroceryList");
              // await updateDoc(GroceryListDoc, { Groceries: groceryList });
              // const AllGroceryListDoc = await doc(
              //   db,
              //   "Grocery",
              //   "AllGroceries"
              // );
              // await updateDoc(AllGroceryListDoc, {
              //   AllGroceries: allGroceries,
              // });
              const GroceryData = await AsyncStorage.getItem("Grocery Data");
              if (GroceryData) {
                const transformedGroceryData = await JSON.parse(GroceryData)
                  .data;
                transformedGroceryData.at(1).Groceries = groceryList;
                transformedGroceryData.at(0).AllGroceries = allGroceries;
                await AsyncStorage.setItem(
                  "Grocery Data",
                  JSON.stringify({
                    data: transformedGroceryData,
                  })
                );
              }
            }}
            style={{ alignSelf: "center" }}
          >
            <AntDesign name="check" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={{
            flex: 0.1,
            flexDirection: "row",
            alignItems: "center",
            width: "90%",
          }}
        >
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ marginLeft: 35 }}>{groceryList.length} Items</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              setEditing(true);
            }}
            style={{ alignSelf: "center" }}
          >
            <Entypo name="new-message" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default GroceryList;
