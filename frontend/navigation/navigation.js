import React, { useRef, useEffect } from "react";
import { Text } from "react-native";
import { StatusBar, Animated } from "react-native";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import moment from "moment/moment";
import AsyncStorage from "@react-native-async-storage/async-storage";

//shared screens
import SplashScreen from "../screens/splashScreen";

//grocery screens
import GroceryList from "../screens/grocery/groceryList";
import GroceryMeals from "../screens/grocery/groceryMeals";

//fitness screens
import FitnessDay from "../screens/fitness/fitnessDay";
import FitnessWeek from "../screens/fitness/fitnessWeek";
import FitnessEdit from "../screens/fitness/fitnessEdit";
import FitnessMaxes from "../screens/fitness/fitnessMaxes";
import FitnessDailyFood from "../screens/fitness/fitnessDailyFood";
import FitnessNotes from "../screens/fitness/fitnessNotes";

//components
import MyDrawerContainer from "../components/drawerContainer";

//Grocery Nav
const MyDrawer = createDrawerNavigator();

const MyDrawerNav = (props) => {
  let myInitialRoute = props.route.params;
  const colors = useSelector((state) => state.colors);
  const mode = useSelector((state) => state.mode);

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
      <MyDrawer.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.secondary,
          },
          headerTintColor: colors.textColors.headerText,
          headerTitleStyle: { fontSize: 20, fontWeight: "bold" },
          headerShadowVisible: false,
          drawerStyle: {
            backgroundColor: bColor(),
          },
          drawerActiveBackgroundColor: bColor(),
          drawerActiveTintColor: colors.textColors.headerText,
          drawerInactiveTintColor: colors.textColors.headerText,
        }}
        drawerContent={(props) => <MyDrawerContainer {...props} />}
        useLegacyImplementation={true}
        initialRouteName={myInitialRoute}
        screenListeners={async (state) => {
          const lastRoute = await AsyncStorage.getItem("Last Route");
          let transformedLastRoute;
          if (lastRoute) {
            transformedLastRoute = await JSON.parse(lastRoute).data;
          }

          if (
            transformedLastRoute !== undefined &&
            transformedLastRoute !== null
          ) {
            if (transformedLastRoute.includes("Grocery")) {
              const fitnessInitialRoute = await AsyncStorage.getItem(
                "Initial Fitness Route"
              );
              let transformedFitnessInitialRoute;
              if (lastRoute) {
                transformedFitnessInitialRoute = await JSON.parse(
                  fitnessInitialRoute
                ).data;
              }
              props.navigation.navigate(transformedFitnessInitialRoute);
            } else {
              await AsyncStorage.setItem(
                "Initial Fitness Route",
                JSON.stringify({
                  data: state.route.name,
                })
              );
            }
          } else {
            await AsyncStorage.setItem(
              "Initial Fitness Route",
              JSON.stringify({
                data: state.route.name,
              })
            );
          }
          await AsyncStorage.setItem(
            "Last Route",
            JSON.stringify({
              data: state.route.name,
            })
          );
        }}
      >
        <MyDrawer.Screen
          name="Fitness Day"
          component={FitnessDay}
          options={{
            headerTitle: dayDisp,
            drawerLabel: ({ focused, color }) => (
              <Text
                style={{
                  fontWeight: focused ? "bold" : "normal",
                  textDecorationLine: focused ? "underline" : "none",
                  color,
                  fontSize: 20,
                }}
              >
                Program
              </Text>
            ),
          }}
        />
        <MyDrawer.Screen
          name="Fitness Edit"
          component={FitnessEdit}
          options={{
            headerTitle: "",
            drawerLabel: ({ focused, color }) => (
              <Text
                style={{
                  fontWeight: focused ? "bold" : "normal",
                  textDecorationLine: focused ? "underline" : "none",
                  color,
                  fontSize: 20,
                }}
              >
                Edit
              </Text>
            ),
          }}
        />
        <MyDrawer.Screen
          name="Fitness Daily Food"
          component={FitnessDailyFood}
          options={{
            headerTitle: dayDisp,
            headerStyle: {
              backgroundColor: color,
            },
            drawerLabel: ({ focused, color }) => (
              <Text
                style={{
                  fontWeight: focused ? "bold" : "normal",
                  textDecorationLine: focused ? "underline" : "none",
                  color,
                  fontSize: 20,
                }}
              >
                Daily Food
              </Text>
            ),
          }}
        />
        <MyDrawer.Screen
          name="Fitness Maxes"
          component={FitnessMaxes}
          options={{
            headerTitle: "Maxes",
            drawerLabel: ({ focused, color }) => (
              <Text
                style={{
                  fontWeight: focused ? "bold" : "normal",
                  textDecorationLine: focused ? "underline" : "none",
                  color,
                  fontSize: 20,
                }}
              >
                Maxes
              </Text>
            ),
          }}
        />
        <MyDrawer.Screen
          name="Fitness Notes"
          component={FitnessNotes}
          options={{
            headerTitle: "Notes",
            drawerLabel: ({ focused, color }) => (
              <Text
                style={{
                  fontWeight: focused ? "bold" : "normal",
                  textDecorationLine: focused ? "underline" : "none",
                  color,
                  fontSize: 20,
                }}
              >
                Notes
              </Text>
            ),
          }}
        />
        <MyDrawer.Screen
          name="Fitness Week"
          component={FitnessWeek}
          options={{
            headerTitle: "Week of " + weekDisp,
            drawerItemStyle: {
              display: "none",
            },
          }}
        />
      </MyDrawer.Navigator>
    );
  } else {
    return (
      <MyDrawer.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.secondary,
          },
          headerTintColor: colors.textColors.headerText,
          headerTitleStyle: { fontSize: 20, fontWeight: "bold" },
          headerShadowVisible: false,
          drawerStyle: { backgroundColor: colors.primary },
          drawerActiveBackgroundColor: colors.primary,
          drawerActiveTintColor: "white",
          drawerInactiveTintColor: "white",
        }}
        drawerContent={(props) => <MyDrawerContainer {...props} />}
        useLegacyImplementation={true}
        initialRouteName={myInitialRoute}
        screenListeners={async (state) => {
          const lastRoute = await AsyncStorage.getItem("Last Route");
          let transformedLastRoute;
          if (lastRoute) {
            transformedLastRoute = await JSON.parse(lastRoute).data;
          }

          if (
            transformedLastRoute !== undefined &&
            transformedLastRoute !== null
          ) {
            if (transformedLastRoute.includes("Fitness")) {
              const groceryInitialRoute = await AsyncStorage.getItem(
                "Initial Grocery Route"
              );
              let transformedGroceryInitialRoute;
              if (lastRoute) {
                transformedGroceryInitialRoute = await JSON.parse(
                  groceryInitialRoute
                ).data;
              }
              props.navigation.navigate(transformedGroceryInitialRoute);
            } else {
              await AsyncStorage.setItem(
                "Initial Grocery Route",
                JSON.stringify({
                  data: state.route.name,
                })
              );
            }
          } else {
            await AsyncStorage.setItem(
              "Initial Grocery Route",
              JSON.stringify({
                data: state.route.name,
              })
            );
          }
          await AsyncStorage.setItem(
            "Last Route",
            JSON.stringify({
              data: state.route.name,
            })
          );
        }}
      >
        <MyDrawer.Screen
          name="Grocery List"
          component={GroceryList}
          options={{
            headerTitle: "List",
            drawerLabel: ({ focused, color }) => (
              <Text
                style={{
                  fontWeight: focused ? "bold" : "normal",
                  textDecorationLine: focused ? "underline" : "none",
                  color,
                  fontSize: 20,
                }}
              >
                List
              </Text>
            ),
          }}
        />
        <MyDrawer.Screen
          name="Grocery Meals"
          component={GroceryMeals}
          options={{
            headerTitle: "Meals",
            drawerLabel: ({ focused, color }) => (
              <Text
                style={{
                  fontWeight: focused ? "bold" : "normal",
                  textDecorationLine: focused ? "underline" : "none",
                  color,
                  fontSize: 20,
                }}
              >
                Meals
              </Text>
            ),
          }}
        />
      </MyDrawer.Navigator>
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
