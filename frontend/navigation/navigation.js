import React from "react";
import { Text } from "react-native";
import { StatusBar } from "react-native";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import moment from "moment/moment";

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

//components
import MyDrawerContainer from "../components/drawerContainer";

//Grocery Nav
const MyDrawer = createDrawerNavigator();

const MyDrawerNav = () => {
  const colors = useSelector((state) => state.colors);
  const mode = useSelector((state) => state.mode);

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
          drawerStyle: { backgroundColor: colors.primary },
          drawerActiveBackgroundColor: colors.primary,
          drawerActiveTintColor: colors.textColors.headerText,
          drawerInactiveTintColor: colors.textColors.headerText,
        }}
        drawerContent={(props) => <MyDrawerContainer {...props} />}
        useLegacyImplementation={true}
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
