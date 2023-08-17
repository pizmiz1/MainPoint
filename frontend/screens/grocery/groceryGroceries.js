import React, { useState, useEffect, useRef } from "react";
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
import { Entypo, AntDesign, Ionicons, FontAwesome } from "@expo/vector-icons";
import { removeGroceryAction } from "../../store/actions/removeGrocery";
import { addNewGroceryAction } from "../../store/actions/addNewGrocery";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SelectDropdown from "react-native-select-dropdown";
import { Notifier, Easing, NotifierComponents } from "react-native-notifier";

//components
import ScrollViewContainer from "../../components/scrollViewContainer";

const GroceryGroceries = (props) => {
  const colors = useSelector((state) => state.colors);
  const allGroceries = useSelector((state) => state.allGroceries);

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
  const [newCat, setNewCat] = useState(null);
  const [typing, setTyping] = useState(false);
  const [groceryInvalid, setGroceryInvalid] = useState(false);
  const [catInvalid, setCatInvalid] = useState(false);

  const oldGrocery = useRef(null);
  const selectedCats = useRef([]);

  const cats = [
    "Produce",
    "Fish",
    "Meat",
    "Grain",
    "Dairy",
    "Condiment",
    "Snack",
    "Frozen",
    "Non Food",
  ];

  const setArrays = () => {
    setProduceList(
      allGroceries.filter((currGrocery) => currGrocery.Category === "Produce")
    );
    setFishList(
      allGroceries.filter((currGrocery) => currGrocery.Category === "Fish")
    );
    setMeatList(
      allGroceries.filter((currGrocery) => currGrocery.Category === "Meat")
    );
    setGrainsList(
      allGroceries.filter((currGrocery) => currGrocery.Category === "Grain")
    );
    setDairyList(
      allGroceries.filter((currGrocery) => currGrocery.Category === "Dairy")
    );
    setCondimentsList(
      allGroceries.filter((currGrocery) => currGrocery.Category === "Condiment")
    );
    setSnacksList(
      allGroceries.filter((currGrocery) => currGrocery.Category === "Snack")
    );
    setNonFoodList(
      allGroceries.filter((currGrocery) => currGrocery.Category === "Non Food")
    );
    setFrozenList(
      allGroceries.filter((currGrocery) => currGrocery.Category === "Frozen")
    );
  };

  useEffect(() => {
    setArrays();
  }, [allGroceries]);

  useEffect(() => {
    const saveData = async () => {
      const GroceryData = await AsyncStorage.getItem("Grocery Data");
      if (GroceryData) {
        const transformedGroceryData = await JSON.parse(GroceryData).data;
        transformedGroceryData.at(0).AllGroceries = allGroceries;
        await AsyncStorage.setItem(
          "Grocery Data",
          JSON.stringify({
            data: transformedGroceryData,
          })
        );
      }
    };
    if (!props.editing) {
      saveData();
    }
  }, [props.editing]);

  const dispatch = useDispatch();

  const removeGrocery = async (passedGrocery) => {
    await dispatch(removeGroceryAction(passedGrocery, true));
  };

  const backgroundColor = (cat) => {
    switch (cat) {
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
      case "Grain": {
        return "tan";
      }
      case "Dairy": {
        return "teal";
      }
      case "Condiments": {
        return "#f5ce42";
      }
      case "Condiment": {
        return "#f5ce42";
      }
      case "Snacks": {
        return "#f27e1f";
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
    const [selected, setSelected] = useState(false);

    useEffect(() => {
      if (props.groceries !== undefined) {
        setGroceries(props.groceries);
      }
      if (selectedCats.current.includes(props.catName)) {
        props.expanding(selectedCats.current.length === 0);
        setSelected(true);
      }
    }, []);

    return (
      <View style={{ marginTop: 20, alignItems: "center" }}>
        <TouchableOpacity
          style={{
            width: "60%",
            alignItems: "center",
            backgroundColor: backgroundColor(props.catName),
            borderRadius: 10,
            marginBottom: -10,
          }}
          onPress={async () => {
            if (selected) {
              const idx = selectedCats.current.indexOf(props.catName);
              selectedCats.current.splice(idx, 1);
            } else {
              selectedCats.current.push(props.catName);
            }
            props.expanding(selectedCats.current.length === 0);
            LayoutAnimation.configureNext(
              LayoutAnimation.create(
                200,
                LayoutAnimation.Types.linear,
                LayoutAnimation.Properties.opacity
              )
            );
            setSelected(!selected);
          }}
        >
          <Text
            style={{
              fontSize: 20,
              marginBottom: 10,
              color: "white",
              fontWeight: selected ? "bold" : "normal",
            }}
          >
            {props.catName}
          </Text>
        </TouchableOpacity>
        {selected ? (
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
                return (
                  <View key={index}>
                    <View style={{ flexDirection: "row", width: "100%" }}>
                      <TouchableOpacity
                        style={{ flex: props.editing ? 0 : 1 }}
                        onPress={() => props.selectGrocery(item)}
                        disabled={!props.editing}
                      >
                        <Text
                          style={{
                            fontSize: 25,
                            marginTop: 10,
                            marginBottom: 10,
                          }}
                        >
                          {item.Name}
                        </Text>
                      </TouchableOpacity>
                      {props.editing ? (
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
        ) : null}
        <View
          style={{
            marginBottom: selected ? 0 : 15,
          }}
        />
      </View>
    );
  };

  const addGrocery = () => {
    let returnFlag = false;

    if (newGroceryName === "") {
      setGroceryInvalid(true);
      returnFlag = true;
    }

    if (newCat === null) {
      setCatInvalid(true);
      returnFlag = true;
    }

    if (returnFlag) {
      return;
    }

    let newGrocery = {
      id: uuid.v4(),
      Name: newGroceryName,
      Category: newCat,
    };

    let toastMessage = "Added";

    if (oldGrocery.current !== null) {
      if (
        newGrocery.Category === oldGrocery.current.Category &&
        newGrocery.Name === oldGrocery.current.Name
      ) {
        updateNewGroceryName("");
        setNewCat(null);
        setCatInvalid(false);
        setGroceryInvalid(false);
        setModalVisible(false);
        oldGrocery.current = null;
        return;
      }
      dispatch(removeGroceryAction(oldGrocery.current, true));
      toastMessage = "Updated";
    }

    dispatch(addNewGroceryAction(newGrocery));

    updateNewGroceryName("");
    setNewCat(null);
    setCatInvalid(false);
    setGroceryInvalid(false);
    setModalVisible(false);
    oldGrocery.current = null;

    Notifier.showNotification({
      title: toastMessage,
      Component: NotifierComponents.Alert,
      componentProps: {
        alertType: "success",
        backgroundColor: backgroundColor(newCat),
      },
      duration: 2000,
    });
  };

  const changeGrocery = (grocery) => {
    updateNewGroceryName(grocery.Name);
    setNewCat(grocery.Category);
    oldGrocery.current = grocery;
    setModalVisible(true);
  };

  return (
    <View style={{ flex: 1 }}>
      <Modal animationType="slide" visible={modalVisible} transparent={true}>
        <TouchableWithoutFeedback
          onPressOut={() => {
            if (typing) {
              Keyboard.dismiss();
              setTyping(false);
              return;
            }
            setModalVisible(false);
            setNewCat(null);
            setCatInvalid(false);
            setGroceryInvalid(false);
            updateNewGroceryName("");
            oldGrocery.current = null;
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableWithoutFeedback
              onPressOut={() => {
                Keyboard.dismiss();
              }}
            >
              <View
                style={{
                  marginBottom: 100,
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
                  width: "70%",
                  height: "30%",
                }}
              >
                <TextInput
                  value={newGroceryName}
                  placeholder="Name"
                  onChangeText={(text) => {
                    setGroceryInvalid(false);
                    updateNewGroceryName(text);
                  }}
                  style={{
                    borderBottomWidth: 1,
                    padding: 5,
                    borderBottomColor: colors.darkGrey,
                    color: "black",
                    fontSize: 15,
                    width: "90%",
                    marginTop: -15,
                  }}
                  textAlign="center"
                  placeholderTextColor={colors.darkerGrey}
                  keyboardType="ascii-capable"
                  returnKeyType="done"
                  onSubmitEditing={addGrocery}
                  autoCapitalize="words"
                  onFocus={() => {
                    setTyping(true);
                  }}
                  onBlur={() => {
                    setTyping(false);
                  }}
                />
                <Text
                  style={{
                    color: "red",
                    opacity: groceryInvalid ? 1 : 0,
                    marginTop: 2,
                  }}
                >
                  Enter a Name!
                </Text>
                <View style={{ marginTop: 10 }}>
                  <SelectDropdown
                    data={cats}
                    disabled={typing}
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
                  <Text
                    style={{
                      color: "red",
                      opacity: catInvalid ? 1 : 0,
                      alignSelf: "center",
                      marginTop: 2,
                    }}
                  >
                    Select a Category!
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                    marginTop: 15,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(false);
                      setNewCat(null);
                      setCatInvalid(false);
                      setGroceryInvalid(false);
                      updateNewGroceryName("");
                      oldGrocery.current = null;
                    }}
                  >
                    <Text style={{ color: "red", fontSize: 17 }}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={addGrocery}>
                    <Text style={{ color: colors.primary, fontSize: 17 }}>
                      {oldGrocery.current === null ? "Add" : "Update"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

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
          <Text style={{ marginLeft: 35 }}>{allGroceries.length} Items</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}
          style={{
            alignSelf: "center",
            opacity: props.editing ? 1 : 0,
          }}
          disabled={!props.editing}
        >
          <Ionicons name="add" size={30} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={{ flex: 0.9 }}>
        <ScrollViewContainer
          content={
            <View
              style={{
                backgroundColor: "white",
                marginBottom: 20,
              }}
            >
              {produceList.length !== 0 ? (
                <CategoryComponent
                  catName={"Produce"}
                  groceries={produceList}
                  remove={removeGrocery}
                  selectGrocery={changeGrocery}
                  editing={props.editing}
                  expanding={props.expanding}
                />
              ) : undefined}
              {fishList.length !== 0 ? (
                <CategoryComponent
                  catName={"Fish"}
                  groceries={fishList}
                  remove={removeGrocery}
                  selectGrocery={changeGrocery}
                  editing={props.editing}
                  expanding={props.expanding}
                />
              ) : undefined}
              {meatList.length !== 0 ? (
                <CategoryComponent
                  catName={"Meat"}
                  groceries={meatList}
                  remove={removeGrocery}
                  selectGrocery={changeGrocery}
                  editing={props.editing}
                  expanding={props.expanding}
                />
              ) : undefined}
              {grainsList.length !== 0 ? (
                <CategoryComponent
                  catName={"Grains"}
                  groceries={grainsList}
                  remove={removeGrocery}
                  selectGrocery={changeGrocery}
                  editing={props.editing}
                  expanding={props.expanding}
                />
              ) : undefined}
              {dairyList.length !== 0 ? (
                <CategoryComponent
                  catName={"Dairy"}
                  groceries={dairyList}
                  remove={removeGrocery}
                  selectGrocery={changeGrocery}
                  editing={props.editing}
                  expanding={props.expanding}
                />
              ) : undefined}
              {condimentsList.length !== 0 ? (
                <CategoryComponent
                  catName={"Condiments"}
                  groceries={condimentsList}
                  remove={removeGrocery}
                  selectGrocery={changeGrocery}
                  editing={props.editing}
                  expanding={props.expanding}
                />
              ) : undefined}
              {snacksList.length !== 0 ? (
                <CategoryComponent
                  catName={"Snacks"}
                  groceries={snacksList}
                  remove={removeGrocery}
                  selectGrocery={changeGrocery}
                  editing={props.editing}
                  expanding={props.expanding}
                />
              ) : undefined}
              {frozenList.length !== 0 ? (
                <CategoryComponent
                  catName={"Frozen"}
                  groceries={frozenList}
                  remove={removeGrocery}
                  selectGrocery={changeGrocery}
                  editing={props.editing}
                  expanding={props.expanding}
                />
              ) : undefined}
              {nonFoodList.length !== 0 ? (
                <CategoryComponent
                  catName={"Non Food"}
                  groceries={nonFoodList}
                  remove={removeGrocery}
                  selectGrocery={changeGrocery}
                  editing={props.editing}
                  expanding={props.expanding}
                />
              ) : undefined}
            </View>
          }
          style={{ backgroundColor: "white" }}
          nav={props.navigation}
        />
      </View>
    </View>
  );
};

export default GroceryGroceries;
