import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

//screens
import HomeScreen from "../screens/homeScreen";

//constants
import colors from "../constants/colors";

const Stack = createStackNavigator();

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
          headerStyle: {
            backgroundColor: colors.secondary,
          },
          headerTintColor: colors.textColors.headerText,
          headerTitleStyle: { fontSize: 20, fontWeight: "bold" },
          headerTitle: "Home",
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen name="Home Screen" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const MyNavigator = () => {
  const MyRetObj = StackNavigator();
  return MyRetObj;
};

export default MyNavigator;
