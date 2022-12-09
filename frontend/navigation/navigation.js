import React, { useCallBack } from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

//shared screens
import SplashScreen from "../screens/splashScreen";
import SelectionScreen from "../screens/selectionScreen";

//grocery screens
import GroceryHome from "../screens/grocery/groceryHome";

//fitness screens
import FitnessHome from "../screens/fitness/fitnessHome";

//constants
import colors from "../constants/colors";

//components
import MyDrawerContainer from "../components/drawerContainer";

//Grocery Nav
const GroceryDrawer = createDrawerNavigator();

const GroceryDrawerNavigator = () => {
  console.log("Reload");
  return (
    <GroceryDrawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.secondary,
        },
        headerTintColor: colors.textColors.headerText,
        headerTitleStyle: { fontSize: 20, fontWeight: "bold" },
        headerShadowVisible: false,
      }}
      drawerContent={(props) => <MyDrawerContainer {...props} />}
      useLegacyImplementation={true}
    >
      <GroceryDrawer.Screen
        name="Grocery Home"
        component={GroceryHome}
        options={{ headerTitle: "Home" }}
      />
    </GroceryDrawer.Navigator>
  );
};

//Fitness Nav
const FitnessDrawer = createDrawerNavigator();

const FitnessDrawerNavigator = () => {
  console.log("Reload");
  return (
    <FitnessDrawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.secondary,
        },
        headerTintColor: colors.textColors.headerText,
        headerTitleStyle: { fontSize: 20, fontWeight: "bold" },
        headerShadowVisible: false,
      }}
      drawerContent={(props) => <MyDrawerContainer {...props} />}
      useLegacyImplementation={true}
    >
      <FitnessDrawer.Screen
        name="Fitness Home"
        component={FitnessHome}
        options={{ headerTitle: "Home" }}
      />
    </FitnessDrawer.Navigator>
  );
};

//Root Nav
const Stack = createNativeStackNavigator();

const StackNavigator = () => {
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
