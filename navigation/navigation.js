import React from "react";
import { StatusBar, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import colors from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";

// Screens
import SplashScreen from "../screens/splashScreen";
import DisclaimerScreen from "../screens/disclaimerScreen";
import GroceryListScreen from "../screens/groceryListScreen";
import MealIdeaScreen from "../screens/mealIdeaScreen";
import WeekScreen from "../screens/weekScreen";

const MyNav = () => {
  // Tab Nav
  const Tab = createBottomTabNavigator();

  const Tabs = () => {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.primaryBlue,
          tabBarStyle: {
            paddingTop: 10,
            paddingBottom: 10,
            shadowColor: "#000000",
            shadowOffset: { width: 0, height: -1 },
            shadowOpacity: 0.08,
            shadowRadius: 5,
            elevation: 8,
            overflow: "visible",
          },
          tabBarItemStyle: {
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      >
        <Tab.Screen
          name="Grocery List Screen"
          component={GroceryListScreen}
          options={{
            tabBarLabel: ({ focused, color }) => (
              <Text
                style={{
                  color: color,
                  marginTop: 6,
                  fontSize: 12,
                  fontWeight: focused ? "bold" : "normal",
                }}
              >
                List
              </Text>
            ),
            tabBarIcon: ({ focused, color, size }) => <Ionicons name={focused ? "menu" : "menu-outline"} size={size} color={color} />,
          }}
        />
        <Tab.Screen
          name="Week Screen"
          component={WeekScreen}
          options={{
            tabBarLabel: ({ focused, color }) => (
              <Text
                style={{
                  color: color,
                  marginTop: 6,
                  fontSize: 12,
                  fontWeight: focused ? "bold" : "normal",
                }}
              >
                Week
              </Text>
            ),
            tabBarIcon: ({ focused, color, size }) => <Ionicons name={focused ? "calendar" : "calendar-outline"} size={size} color={color} />,
          }}
        />
        <Tab.Screen
          name="Meal Idea Screen"
          component={MealIdeaScreen}
          options={{
            tabBarLabel: ({ focused, color }) => (
              <Text
                style={{
                  color: color,
                  marginTop: 6,
                  fontSize: 12,
                  fontWeight: focused ? "bold" : "normal",
                }}
              >
                Ideas
              </Text>
            ),
            tabBarIcon: ({ focused, color, size }) => <Ionicons name={focused ? "bulb" : "bulb-outline"} size={size} color={color} />,
          }}
        />
      </Tab.Navigator>
    );
  };

  // Root Nav
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
        <Stack.Screen name="Tabs" component={Tabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyNav;
