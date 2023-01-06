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
} from "react-native";
import { useSelector } from "react-redux";
import uuid from "react-native-uuid";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";

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
  const [condimentsList, setCondimentsList] = useState([]);
  const [snacksList, setSnacksList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newGroceryName, updateNewGroceryName] = useState("");
  const [crossedGroceries, setCrossedGroceries] = useState([]);

  useEffect(() => {
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
    setCondimentsList(
      groceryList.filter((currGrocery) => currGrocery.Category === "Condiment")
    );
    setSnacksList(
      groceryList.filter((currGrocery) => currGrocery.Category === "Snack")
    );
  }, []);

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
        case "Condiments": {
          return "#f5ce42";
        }
        case "Snacks": {
          return "#f27e1f";
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
                  <TouchableOpacity onPress={crossGroceryOff}>
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
      name: newGroceryName,
      category: "",
    };
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [
          "Cancel",
          "Produce",
          "Fish",
          "Meat",
          "Grain",
          "Condiment",
          "Snack",
        ],
        cancelButtonIndex: 0,
        userInterfaceStyle: "light",
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0: {
            return;
          }
          case 1: {
            newGrocery.category = "Produce";
            break;
          }
          case 2: {
            newGrocery.category = "Fish";
            break;
          }
          case 3: {
            newGrocery.category = "Meat";
            break;
          }
          case 4: {
            newGrocery.category = "Grain";
            break;
          }
          case 5: {
            newGrocery.category = "Condiment";
            break;
          }
          case 6: {
            newGrocery.category = "Snack";
            break;
          }
        }

        updateNewGroceryName("");
        setModalVisible(false);
      }
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Modal animationType="fade" visible={modalVisible} transparent={true}>
        <TouchableWithoutFeedback
          //onPress={() => setModalVisible(false)}
          onPressOut={() => Keyboard.dismiss()}
        >
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
                  //margin: 5,
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
                    Done
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
            <View style={{ backgroundColor: colors.lightGrey }}>
              {produceList.length !== 0 ? (
                <CategoryComponent
                  catName={"Produce"}
                  groceries={produceList}
                />
              ) : undefined}
              {fishList.length !== 0 ? (
                <CategoryComponent catName={"Fish"} groceries={fishList} />
              ) : undefined}
              {meatList.length !== 0 ? (
                <CategoryComponent catName={"Meat"} groceries={meatList} />
              ) : undefined}
              {grainsList.length !== 0 ? (
                <CategoryComponent catName={"Grains"} groceries={grainsList} />
              ) : undefined}
              {condimentsList.length !== 0 ? (
                <CategoryComponent
                  catName={"Condiments"}
                  groceries={condimentsList}
                />
              ) : undefined}
              {snacksList.length !== 0 ? (
                <CategoryComponent catName={"Snacks"} groceries={snacksList} />
              ) : undefined}
            </View>
          }
          style={{ backgroundColor: colors.lightGrey }}
          nav={props.navigation}
        />
      </View>
      <View style={{ flex: 0.1, flexDirection: "row", alignItems: "center" }}>
        <View
          style={{
            width: "85%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ marginLeft: 55 }}>2 Items</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}
          style={{ alignSelf: "center" }}
        >
          <Entypo name="new-message" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GroceryList;
