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
import SelectionScreen from "../screens/selectionScreen";

//grocery screens
import GroceryHome from "../screens/grocery/groceryHome";
import GroceryTest from "../screens/grocery/groceryTest";

//fitness screens
import FitnessDay from "../screens/fitness/fitnessDay";
import FitnessWeek from "../screens/fitness/fitnessWeek";
import FitnessEdit from "../screens/fitness/fitnessEdit";
import FitnessMaxes from "../screens/fitness/fitnessMaxes";

//components
import MyDrawerContainer from "../components/drawerContainer";

//Grocery Nav
const GroceryDrawer = createDrawerNavigator();

const GroceryDrawerNavigator = () => {
  const colors = useSelector((state) => state.colors);
  return (
    <GroceryDrawer.Navigator
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
      <GroceryDrawer.Screen
        name="Grocery Home"
        component={GroceryHome}
        options={{
          headerTitle: "Home",
          drawerLabel: ({ focused, color }) => (
            <Text
              style={{
                fontWeight: focused ? "bold" : "normal",
                textDecorationLine: focused ? "underline" : "none",
                color,
                fontSize: 20,
              }}
            >
              Home
            </Text>
          ),
        }}
      />
      <GroceryDrawer.Screen
        name="Grocery Test"
        component={GroceryTest}
        options={{
          headerTitle: "Test",
          drawerLabel: ({ focused, color }) => (
            <Text
              style={{
                fontWeight: focused ? "bold" : "normal",
                textDecorationLine: focused ? "underline" : "none",
                color,
                fontSize: 20,
              }}
            >
              Test
            </Text>
          ),
        }}
      />
    </GroceryDrawer.Navigator>
  );
};

//Fitness Nav
const FitnessDrawer = createDrawerNavigator();

const FitnessDrawerNavigator = () => {
  let weekDisp;
  const dayDisp = moment().format("dddd");
  if (dayDisp === "Tuesday") {
    weekDisp = moment().subtract(1, "days").format("MMM Do");
  } else if (dayDisp === "Wednesday") {
    weekDisp = moment().subtract(2, "days").format("MMM Do");
  } else if (dayDisp === "Thrusday") {
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

  const colors = useSelector((state) => state.colors);
  return (
    <FitnessDrawer.Navigator
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
      <FitnessDrawer.Screen
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
      <FitnessDrawer.Screen
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
      <FitnessDrawer.Screen
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
      <FitnessDrawer.Screen
        name="Fitness Week"
        component={FitnessWeek}
        options={{
          headerTitle: weekDisp,
          drawerItemStyle: {
            display: "none",
          },
        }}
      />
    </FitnessDrawer.Navigator>
  );
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
        <Stack.Screen
          name="Selection Screen"
          component={SelectionScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Grocery App" component={GroceryDrawerNavigator} />
        <Stack.Screen name="Fitness App" component={FitnessDrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const MyNavigator = () => {
  const MyRetObj = StackNavigator();
  return MyRetObj;
};

export default MyNavigator;
