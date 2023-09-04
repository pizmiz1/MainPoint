import React, { useRef, useEffect } from "react";
import { Text, View } from "react-native";
import { StatusBar, Animated } from "react-native";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome,
  FontAwesome5,
} from "@expo/vector-icons";
import moment from "moment/moment";
import AsyncStorage from "@react-native-async-storage/async-storage";

//shared screens
import SplashScreen from "../screens/splashScreen";
import SwapScreen from "../screens/swapScreen";

//grocery screens
import GroceryList from "../screens/grocery/groceryList";
import GroceryMeals from "../screens/grocery/groceryMeals";
import GroceryMacros from "../screens/grocery/groceryMacros";

//fitness screens
import FitnessDay from "../screens/fitness/fitnessDay";
import FitnessWeek from "../screens/fitness/fitnessWeek";
import FitnessEdit from "../screens/fitness/fitnessEdit";
import FitnessMaxes from "../screens/fitness/fitnessMaxes";
import FitnessDailyFood from "../screens/fitness/fitnessDailyFood";
import RunningEdit from "../screens/fitness/runningEdit";
import RunningDay from "../screens/fitness/runningDay";
import RunningWeek from "../screens/fitness/runningWeek";
import RunningTotal from "../screens/fitness/runningTotal";

//Tab Nav
const MyTab = createMaterialBottomTabNavigator();

const MyDrawerNav = (props) => {
  let myInitialRoute = props.route.params;
  const colors = useSelector((state) => state.colors);
  const mode = useSelector((state) => state.mode);
  const running = useSelector((state) => state.running);

  const shakeCrossed = useSelector((state) => state.shakeCrossed);
  const yogurtCrossed = useSelector((state) => state.yogurtCrossed);
  const barCrossed = useSelector((state) => state.barCrossed);

  const determineValue = () => {
    if (!shakeCrossed && !yogurtCrossed && !barCrossed) {
      return 0;
    } else if (!shakeCrossed && !yogurtCrossed && barCrossed) {
      return 1;
    } else if (!shakeCrossed && yogurtCrossed && !barCrossed) {
      return 1;
    } else if (shakeCrossed && !yogurtCrossed && !barCrossed) {
      return 1;
    } else if (!shakeCrossed && yogurtCrossed && barCrossed) {
      return 2;
    } else if (shakeCrossed && !yogurtCrossed && barCrossed) {
      return 2;
    } else if (shakeCrossed && yogurtCrossed && !barCrossed) {
      return 2;
    } else {
      return 3;
    }
  };

  const fadeAnim = useRef(new Animated.Value(determineValue())).current;

  var color = fadeAnim.interpolate({
    inputRange: [0, 1, 2, 3],
    outputRange: ["red", "orange", "#90EE90", "green"],
  });

  Animated.timing(fadeAnim, {
    toValue: determineValue(),
    useNativeDriver: false,
    duration: 400,
  }).start();

  let weekDisp;
  const dayDisp = moment().format("dddd");
  if (dayDisp === "Tuesday") {
    weekDisp = moment().subtract(1, "days").format("MMM Do");
  } else if (dayDisp === "Wednesday") {
    weekDisp = moment().subtract(2, "days").format("MMM Do");
  } else if (dayDisp === "Thursday") {
    weekDisp = moment().subtract(3, "days").format("MMM Do");
  } else if (dayDisp === "Friday") {
    weekDisp = moment().subtract(4, "days").format("MMM Do");
  } else if (dayDisp === "Saturday") {
    weekDisp = moment().subtract(5, "days").format("MMM Do");
  } else if (dayDisp === "Sunday") {
    weekDisp = moment().subtract(6, "days").format("MMM Do");
  } else {
    weekDisp = moment().format("MMM Do");
  }

  const bColor = () => {
    const val = determineValue();
    switch (val) {
      case 0: {
        return "red";
      }
      case 1: {
        return "orange";
      }
      case 2: {
        return "#90EE90";
      }
      case 3: {
        return "green";
      }
      default: {
        return "red";
      }
    }
  };

  if (mode === "Fitness") {
    return (
      <MyTab.Navigator
        shifting={true}
        initialRouteName={myInitialRoute}
        activeColor={colors.primary}
        inactiveColor="#717171"
        barStyle={{
          backgroundColor: running ? colors.lightGrey : colors.secondary,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.27,
          shadowRadius: 4.65,
        }}
        screenListeners={async (state) => {
          await AsyncStorage.setItem(
            "Last Route",
            JSON.stringify({
              data: state.route.name,
            })
          );
        }}
      >
        <MyTab.Group>
          <MyTab.Screen
            name={running ? "Fitness Running Day" : "Fitness Day"}
            component={running ? RunningDay : FitnessDay}
            options={{
              tabBarLabel: "Day",
              tabBarIcon: ({ focused, color }) => (
                <Ionicons
                  name={focused ? "ios-sunny" : "ios-sunny-outline"}
                  color={color}
                  size={24}
                />
              ),
            }}
          />
          <MyTab.Screen
            name={running ? "Fitness Running Week" : "Fitness Week"}
            component={running ? RunningWeek : FitnessWeek}
            options={{
              tabBarLabel: "Week",
              tabBarIcon: ({ focused, color }) => (
                <Ionicons
                  name={focused ? "ios-calendar" : "ios-calendar-outline"}
                  size={24}
                  color={color}
                />
              ),
            }}
          />
          <MyTab.Screen
            name={running ? "Fitness Running Edit" : "Fitness Edit"}
            component={running ? RunningEdit : FitnessEdit}
            options={{
              tabBarLabel: "Edit",
              tabBarIcon: ({ focused, color }) => (
                <Ionicons
                  name={focused ? "ios-settings" : "ios-settings-outline"}
                  size={24}
                  color={color}
                />
              ),
            }}
          />
          <MyTab.Screen
            name="Swap"
            component={SwapScreen}
            options={{
              tabBarLabel: "Swap",
              tabBarIcon: ({ color }) => (
                <FontAwesome name="exchange" size={24} color={color} />
              ),
              unmountOnBlur: true,
            }}
          />
        </MyTab.Group>
      </MyTab.Navigator>
    );
  } else {
    return (
      <MyTab.Navigator
        shifting={true}
        initialRouteName={myInitialRoute}
        activeColor={colors.primary}
        inactiveColor="#717171"
        barStyle={{
          backgroundColor: "white",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.27,
          shadowRadius: 4.65,
        }}
        screenListeners={async (state) => {
          await AsyncStorage.setItem(
            "Last Route",
            JSON.stringify({
              data: state.route.name,
            })
          );
        }}
      >
        <MyTab.Screen
          name="Grocery List"
          component={GroceryList}
          options={{
            tabBarLabel: "List",
            tabBarIcon: ({ focused, color }) => (
              <Ionicons
                name={focused ? "ios-list" : "ios-list-outline"}
                size={24}
                color={color}
              />
            ),
          }}
        />
        <MyTab.Screen
          name="Grocery Macros"
          component={GroceryMacros}
          options={{
            tabBarLabel: "Macros",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="balance-scale" size={24} color={color} />
            ),
          }}
        />
        <MyTab.Screen
          name="Grocery Meals"
          component={GroceryMeals}
          options={{
            tabBarLabel: "Meals",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="food-turkey"
                size={24}
                color={color}
              />
            ),
          }}
        />
        <MyTab.Screen
          name="Swap"
          component={SwapScreen}
          options={{
            tabBarLabel: "Swap",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="exchange" size={24} color={color} />
            ),
            unmountOnBlur: true,
          }}
        />
      </MyTab.Navigator>
    );
  }
};

//Root Nav
const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const colors = useSelector((state) => state.colors);
  return (
    <NavigationContainer>
      <StatusBar
        barStyle={
          colors.secondary === "white" ? "dark-content" : "light-content"
        }
      />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}
        initialRouteName="Splash Screen"
      >
        <Stack.Screen
          name="Splash Screen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="App" component={MyDrawerNav} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const MyNavigator = () => {
  const MyRetObj = StackNavigator();
  return MyRetObj;
};

export default MyNavigator;
