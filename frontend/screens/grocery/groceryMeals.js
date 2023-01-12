import React, { useEffect, useState } from "react";
import {
  Text,
  Switch,
  View,
  TouchableOpacity,
  LayoutAnimation,
  TextInput,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Entypo, AntDesign, Ionicons } from "@expo/vector-icons";
import { removeMealAction } from "../../store/actions/removeMeal";
import { addMealAction } from "../../store/actions/addMeal";
import { addGroceryAction } from "../../store/actions/addGrocery";
import { removeGroceryAction } from "../../store/actions/removeGrocery";
import { updateMealAction } from "../../store/actions/updateMeal";
import { db } from "../../firebaseConfig";
import { updateDoc, doc } from "firebase/firestore";
import uuid from "react-native-uuid";

//components
import ScrollViewContainer from "../../components/scrollViewContainer";

const GroceryMeals = (props) => {
  const [editing, setEditing] = useState(false);

  const colors = useSelector((state) => state.colors);
  const meals = useSelector((state) => state.meals);
  const allGroceries = useSelector((state) => state.allGroceries);
  const groceryList = useSelector((state) => state.groceryList);

  const dispatch = useDispatch();

  const addMeal = () => {
    let newMeal = {
      Name: "",
      Groceries: [uuid.v4()],
    };
    dispatch(addMealAction(newMeal));
  };

  const MealSwitchComp = (props) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [mealName, updateMealName] = useState(props.mealName);
    const [groceries, setGroceries] = useState(
      allGroceries.filter((curr) => props.groceries.includes(curr.id))
    );

    useEffect(() => {
      const test = async () => {
        const GroceryListDoc = await doc(db, "Grocery", "GroceryList");
        await updateDoc(GroceryListDoc, { Groceries: groceryList });
      };
      test();
    }, []);

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
      setGroceries([...groceries, newGrocery]);
    };

    const removeGrocery = (index) => {
      let data = [...groceries];
      data.splice(index, 1);
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

                    if (validMeal === true) {
                      let groceryIds = groceries.map((curr) => curr.id);
                      const updatedMeal = {
                        Name: mealName,
                        Groceries: groceryIds,
                      };
                      dispatch(updateMealAction(updatedMeal, props.index));

                      LayoutAnimation.configureNext(
                        LayoutAnimation.create(
                          200,
                          LayoutAnimation.Types.linear,
                          LayoutAnimation.Properties.opacity
                        )
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

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.9 }}>
        <ScrollViewContainer
          content={
            <View style={{ backgroundColor: colors.lightGrey }}>
              {meals.map((item, index) => {
                return (
                  <View key={index}>
                    <MealSwitchComp
                      mealName={item.Name}
                      groceries={item.Groceries}
                      index={index}
                    />
                  </View>
                );
              })}
              {editing ? (
                <TouchableOpacity
                  onPress={addMeal}
                  style={{ flex: 1, alignItems: "center", marginTop: 30 }}
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
          <Text style={{ marginLeft: 35 }}>{meals.length} Meals</Text>
        </View>
        {editing ? (
          <TouchableOpacity
            onPress={async () => {
              const MealsDoc = doc(db, "Grocery", "Meals");
              await updateDoc(MealsDoc, { Meals: meals });
              setEditing(false);
            }}
            style={{ alignSelf: "center" }}
          >
            <AntDesign name="check" size={24} color={colors.primary} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              setEditing(true);
            }}
            style={{ alignSelf: "center" }}
          >
            <Entypo name="new-message" size={24} color={colors.primary} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default GroceryMeals;
