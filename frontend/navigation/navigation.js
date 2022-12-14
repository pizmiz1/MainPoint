import React from "react";
import { Text } from "react-native";
import { StatusBar } from "react-native";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

//shared screens
import SplashScreen from "../screens/splashScreen";
import SelectionScreen from "../screens/selectionScreen";

//grocery screens
import GroceryHome from "../screens/grocery/groceryHome";
import GroceryTest from "../screens/grocery/groceryTest";

//fitness screens
import FitnessHome from "../screens/fitness/fitnessHome";

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
        name="Fitness Home"
        component={FitnessHome}
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
