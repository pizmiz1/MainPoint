import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// screens
import SplashScreen from "../screens/splashScreen";
import DisclaimerScreen from "../screens/disclaimerScreen";
import GroceryListScreen from "../screens/groceryListScreen";

const MyNav = () => {
  //Root Nav
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <StatusBar barStyle={"dark-content"} />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}
        initialRouteName="Splash Screen"
      >
        <Stack.Screen name="Splash Screen" component={SplashScreen} />
        <Stack.Screen name="Disclaimer Screen" component={DisclaimerScreen} />
        <Stack.Screen name="Grocery List Screen" component={GroceryListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyNav;
