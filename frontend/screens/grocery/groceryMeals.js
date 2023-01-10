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
import { updateGroceries } from "./../../store/actions/updateGroceries";
import { Entypo, AntDesign, Ionicons } from "@expo/vector-icons";

//components
import ScrollViewContainer from "../../components/scrollViewContainer";

const GroceryMeals = (props) => {
  const [editing, setEditing] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const colors = useSelector((state) => state.colors);
  const meals = useSelector((state) => state.meals);
  const allGroceries = useSelector((state) => state.allGroceries);

  const MealSwitchComp = (props) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [mealName, updateMealName] = useState(props.mealName);
    const toggleSwitch = () => {
      setIsEnabled(!isEnabled);
    };
    const [groceries, setGroceries] = useState(
      allGroceries.filter((curr) => props.groceries.includes(curr.id))
    );

    const handleNameChange = (index, val) => {
      let data = JSON.parse(JSON.stringify(groceries));
      data[index].Name = val;
      setGroceries(data);
    };

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
            justifyContent: "space-between",
          }}
        >
          {showDetails ? (
            <TextInput
              value={mealName}
              placeholder="Meal Name"
              placeholderTextColor={colors.darkGrey}
              onChangeText={updateMealName}
              style={{ flex: 1, fontSize: 25 }}
            />
          ) : (
            <Text
              style={{
                alignSelf: "center",
                fontSize: 25,
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
                        meals.splice(props.index, 1);
                      }
                      setRefreshTrigger(!refreshTrigger);
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
                      meals[props.index] = {
                        Name: mealName,
                        Groceries: groceryIds,
                      };

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
                <View style={{ width: "30%" }} key={index}>
                  <View style={{ marginTop: 15 }}>
                    <TextInput
                      value={item.Name}
                      placeholder="Grocery"
                      placeholderTextColor={colors.darkerGrey}
                      onChangeText={(val) => handleNameChange(index, val)}
                    />
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
                  style={{ flex: 1, alignItems: "center", marginTop: 30 }}
                >
                  <Text style={{ fontSize: 30, color: "green" }}>Add</Text>
                </TouchableOpacity>
              ) : undefined}
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
            onPress={() => {
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
