import React, { useEffect, useState, useCallback } from "react";
import {
  Text,
  Switch,
  View,
  TouchableOpacity,
  LayoutAnimation,
  TextInput,
  Alert,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Entypo, AntDesign, Ionicons } from "@expo/vector-icons";
import { removeMealAction } from "../../store/actions/removeMeal";
import { addMealAction } from "../../store/actions/addMeal";
import { addGroceryAction } from "../../store/actions/addGrocery";
import { removeGroceryAction } from "../../store/actions/removeGrocery";
import { updateMealAction } from "../../store/actions/updateMeal";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SearchBar } from "@rneui/themed";
import DraggableFlatList, {
  ScaleDecorator,
  NestableDraggableFlatList,
  RenderItemParams,
} from "react-native-draggable-flatlist";
import { BlurView } from "expo-blur";

//components
import ScrollViewContainer from "../../components/scrollViewContainer";

const GroceryMeals = (props) => {
  const [editing, setEditing] = useState(false);
  const [mealSearch, setMealSearch] = useState("");
  const [filteredMeals, setFilteredMeals] = useState([]);

  const colors = useSelector((state) => state.colors);
  const meals = useSelector((state) => state.meals);
  const allGroceries = useSelector((state) => state.allGroceries);
  const groceryList = useSelector((state) => state.groceryList);

  const dispatch = useDispatch();

  const addMeal = () => {
    let newMeal = {
      Name: "",
      Groceries: [uuid.v4()],
      Calories: 0,
      Protein: 0,
    };
    dispatch(addMealAction(newMeal));
  };

  const searchMeals = (text) => {
    if (text) {
      const newMeals = meals.filter((curr) => {
        const itemData = curr.Name ? curr.Name.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredMeals(newMeals);
    } else {
      setFilteredMeals(meals);
    }
    setMealSearch(text);
  };

  useEffect(() => {
    setFilteredMeals(meals);
    searchMeals(mealSearch);
  }, [meals]);

  const MealSwitchComp = (props) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [mealName, updateMealName] = useState(props.mealName);
    const [groceries, setGroceries] = useState(
      allGroceries.filter((curr) => props.groceries.includes(curr.id))
    );

    const toggleSwitch = async () => {
      if (!isEnabled) {
        let groceryNames = groceries.map((curr) => curr.Name);
        let groceryListNames = groceryList.map((curr) => curr.Name);
        for (const currGroceryName of groceryNames) {
          const foundGrocery = groceryListNames.find(
            (currGrocery) => currGrocery === currGroceryName
          );
          if (!foundGrocery) {
            const grocery = allGroceries.find(
              (currAll) => currAll.Name === currGroceryName
            );
            if (grocery) {
              await dispatch(addGroceryAction(grocery));
              const GroceryData = await AsyncStorage.getItem("Grocery Data");
              if (GroceryData) {
                const transformedGroceryData = await JSON.parse(GroceryData)
                  .data;
                transformedGroceryData.at(1).Groceries = groceryList.concat([
                  grocery,
                ]);
                await AsyncStorage.setItem(
                  "Grocery Data",
                  JSON.stringify({
                    data: transformedGroceryData,
                  })
                );
              }
            }
          }
        }
      } else {
        let groceryNames = groceries.map((curr) => curr.Name);
        let groceryListNames = groceryList.map((curr) => curr.Name);
        for (const currGroceryName of groceryNames) {
          const foundGrocery = groceryListNames.find(
            (currGrocery) => currGrocery === currGroceryName
          );
          if (foundGrocery) {
            const grocery = allGroceries.find(
              (currAll) => currAll.Name === currGroceryName
            );
            if (grocery) {
              await dispatch(removeGroceryAction(grocery));
              const GroceryData = await AsyncStorage.getItem("Grocery Data");
              if (GroceryData) {
                const transformedGroceryData = await JSON.parse(GroceryData)
                  .data;
                transformedGroceryData.at(1).Groceries = groceryList.filter(
                  (item) => !groceries.includes(item)
                );
                await AsyncStorage.setItem(
                  "Grocery Data",
                  JSON.stringify({
                    data: transformedGroceryData,
                  })
                );
              }
            }
          }
        }
      }
      setIsEnabled(!isEnabled);
    };

    const addGrocery = () => {
      let newGrocery = {
        id: uuid.v4(),
        Name: "",
        Category: "",
      };
      LayoutAnimation.configureNext(
        LayoutAnimation.create(
          200,
          LayoutAnimation.Types.linear,
          LayoutAnimation.Properties.opacity
        )
      );
      setGroceries([...groceries, newGrocery]);
    };

    const removeGrocery = (index) => {
      let data = [...groceries];
      data.splice(index, 1);
      LayoutAnimation.configureNext(
        LayoutAnimation.create(
          200,
          LayoutAnimation.Types.linear,
          LayoutAnimation.Properties.opacity
        )
      );
      setGroceries(data);
    };

    const handleNameChange = (index, val) => {
      let data = JSON.parse(JSON.stringify(groceries));
      data[index].Name = val;
      const foundGrocery = allGroceries.find((curr) => curr.Name === val);
      if (foundGrocery) {
        data[index].id = foundGrocery.id;
      }
      setGroceries(data);
    };

    useEffect(() => {
      let mealExists = false;
      let groceryNames = groceries.map((curr) => curr.Name);
      let groceryListNames = groceryList.map((curr) => curr.Name);
      mealExists = groceryNames.every((curr) => {
        const foundGrocery = groceryListNames.find(
          (currGrocery) => currGrocery === curr
        );
        if (foundGrocery) {
          return true;
        } else {
          return false;
        }
      });
      if (mealExists) {
        setIsEnabled(true);
      } else {
        setIsEnabled(false);
      }
    }, [groceryList, groceries]);

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          borderRadius: 15,
          marginLeft: 20,
          marginRight: 20,
          marginTop: 20,
          padding: 15,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            //justifyContent: "space-between",
          }}
        >
          {showDetails ? (
            <TextInput
              value={mealName}
              placeholder="Meal Name"
              placeholderTextColor={colors.darkGrey}
              onChangeText={updateMealName}
              style={{ fontSize: 25, width: "90%" }}
            />
          ) : (
            <Text
              style={{
                alignSelf: "center",
                fontSize: 25,
                width: "90%",
              }}
            >
              {mealName}
            </Text>
          )}
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            {editing ? (
              !showDetails ? (
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    onPress={() => {
                      LayoutAnimation.configureNext(
                        LayoutAnimation.create(
                          200,
                          LayoutAnimation.Types.linear,
                          LayoutAnimation.Properties.opacity
                        )
                      );
                      setShowDetails(true);
                    }}
                    style={{ marginRight: 15 }}
                  >
                    <AntDesign name="edit" size={20} color={colors.primary} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      if (props.index !== -1) {
                        dispatch(removeMealAction(props.index));
                      }
                    }}
                  >
                    <AntDesign name="minuscircleo" size={20} color="red" />
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  onPress={async () => {
                    let validMeal = false;
                    let groceryNames = groceries.map((curr) => curr.Name);
                    let allGroceryNames = allGroceries.map((curr) => curr.Name);

                    validMeal = await groceryNames.every((curr) => {
                      const foundGrocery = allGroceryNames.find(
                        (currGrocery) => currGrocery === curr
                      );
                      if (foundGrocery) {
                        return true;
                      } else {
                        Alert.alert("Error", curr + " is not a valid grocery");
                      }
                    });

                    const nameChange = props.mealName !== mealName;

                    if (nameChange) {
                      const nameExists =
                        meals.filter((curr) => curr.Name === mealName).length >
                        0;

                      if (nameExists) {
                        Alert.alert(
                          "Error",
                          meals.filter((curr) => curr.Name === mealName)[0]
                            .Name + " already exists"
                        );
                        return;
                      }
                    }

                    if (validMeal === true) {
                      let groceryIds = groceries.map((curr) => curr.id);
                      const updatedMeal = {
                        Name: mealName,
                        Groceries: groceryIds,
                        Calories: props.cals,
                        Protein: props.protein,
                      };

                      LayoutAnimation.configureNext(
                        LayoutAnimation.create(
                          200,
                          LayoutAnimation.Types.linear,
                          LayoutAnimation.Properties.opacity
                        ),
                        () => {
                          dispatch(updateMealAction(updatedMeal, props.index));
                        }
                      );
                      setShowDetails(false);
                    }
                  }}
                >
                  <AntDesign name="check" size={24} color={colors.primary} />
                </TouchableOpacity>
              )
            ) : (
              <Switch value={isEnabled} onValueChange={toggleSwitch} />
            )}
          </View>
        </View>
        {showDetails ? (
          <View>
            <View
              style={{
                flex: 1,
                borderWidth: 0.5,
                borderColor: colors.darkGrey,
              }}
            />
            {groceries.map((item, index) => {
              return (
                <View style={{ width: "35%" }} key={index}>
                  <View style={{ marginTop: 15 }}>
                    <View style={{ flexDirection: "row" }}>
                      <TouchableOpacity
                        onPress={() => {
                          removeGrocery(index);
                        }}
                      >
                        <AntDesign name="minuscircleo" size={20} color="red" />
                      </TouchableOpacity>
                      <TextInput
                        value={item.Name}
                        placeholder="Grocery"
                        placeholderTextColor={colors.darkerGrey}
                        onChangeText={(val) => handleNameChange(index, val)}
                        style={{ marginLeft: 10 }}
                      />
                    </View>
                    <View
                      style={{
                        //flex: 1,
                        borderWidth: 0.5,
                        borderColor: colors.darkGrey,
                      }}
                    />
                  </View>
                </View>
              );
            })}
            <TouchableOpacity
              onPress={addGrocery}
              style={{ marginLeft: 0, marginTop: 15 }}
            >
              <AntDesign name="pluscircleo" size={20} color="green" />
            </TouchableOpacity>
          </View>
        ) : undefined}
      </View>
    );
  };

  const renderItem = (test) => {
    return (
      <ScaleDecorator>
        <TouchableOpacity
          onLongPress={test.drag}
          disabled={test.isActive || editing || mealSearch !== ""}
          key={test.getIndex()}
        >
          <MealSwitchComp
            mealName={test.item.Name}
            groceries={test.item.Groceries}
            cals={test.item.Calories}
            protein={test.item.Protein}
            index={test.getIndex()}
          />
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ScrollViewContainer
          isNestable={true}
          content={
            <View style={{ backgroundColor: colors.lightGrey, marginTop: 80 }}>
              <SearchBar
                placeholder="Search Meals"
                onChangeText={searchMeals}
                value={mealSearch}
                lightTheme={true}
                containerStyle={{
                  backgroundColor: colors.lightGrey,
                  borderTopWidth: 0,
                  borderBottomWidth: 0,
                  width: "100%",
                }}
                inputContainerStyle={{
                  borderRadius: 15,
                  height: 30,
                  marginTop: 5,
                }}
                platform="ios"
                showCancel={true}
              />
              <NestableDraggableFlatList
                data={filteredMeals}
                onDragEnd={async ({ data }) => {
                  setFilteredMeals(data);
                  const GroceryData = await AsyncStorage.getItem(
                    "Grocery Data"
                  );
                  if (GroceryData) {
                    let transformedGroceryData = await JSON.parse(GroceryData)
                      .data;
                    transformedGroceryData.at(2).Meals = data;
                    await AsyncStorage.setItem(
                      "Grocery Data",
                      JSON.stringify({
                        data: transformedGroceryData,
                      })
                    );
                  }
                }}
                keyExtractor={(item, index) => {
                  return item.Name + index;
                }}
                renderItem={renderItem}
                style={{ marginTop: -10 }}
              />
              {editing ? (
                <TouchableOpacity
                  onPress={addMeal}
                  style={{ flex: 1, alignItems: "center", marginTop: 20 }}
                >
                  <Text style={{ fontSize: 30, color: "green" }}>Add</Text>
                </TouchableOpacity>
              ) : undefined}
              <View style={{ marginTop: 150 }} />
            </View>
          }
          nav={props.navigation}
          style={{ backgroundColor: colors.lightGrey }}
        />
      </View>
      <BlurView
        style={{
          width: "100%",
          height: "12%",
          ...StyleSheet.absoluteFillObject,
        }}
        intensity={70}
      >
        <View
          style={{
            justifyContent: "flex-end",
            flexDirection: "row",
            alignItems: "center",
            marginTop: 30,
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginRight: 110,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              Meals
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: "#aaaaaa",
              }}
            >
              {meals.length} {meals.length !== 1 ? "Meals" : "Meal"}
            </Text>
          </View>
          {editing ? (
            <TouchableOpacity
              onPress={async () => {
                const GroceryData = await AsyncStorage.getItem("Grocery Data");
                if (GroceryData) {
                  const transformedGroceryData = await JSON.parse(GroceryData)
                    .data;
                  transformedGroceryData.at(2).Meals = meals;
                  await AsyncStorage.setItem(
                    "Grocery Data",
                    JSON.stringify({
                      data: transformedGroceryData,
                    })
                  );
                }
                LayoutAnimation.configureNext(
                  LayoutAnimation.create(
                    200,
                    LayoutAnimation.Types.linear,
                    LayoutAnimation.Properties.opacity
                  )
                );
                setEditing(false);
              }}
              style={{ alignSelf: "center", marginRight: 25 }}
            >
              <AntDesign name="check" size={24} color={colors.primary} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                LayoutAnimation.configureNext(
                  LayoutAnimation.create(
                    200,
                    LayoutAnimation.Types.linear,
                    LayoutAnimation.Properties.opacity
                  )
                );
                setEditing(true);
              }}
              style={{
                alignSelf: "center",
                marginRight: 25,
              }}
            >
              <Entypo name="new-message" size={24} color={colors.primary} />
            </TouchableOpacity>
          )}
        </View>
      </BlurView>
    </View>
  );
};

export default GroceryMeals;
