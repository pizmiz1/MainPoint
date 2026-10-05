import { StatusBar, StyleSheet, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import colors from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";

// Screens
import SplashScreen from "../screens/SplashScreen";
import DisclaimerScreen from "../screens/DisclaimerScreen";
import GroceryListScreen from "../screens/GroceryListScreen";
import MealIdeaScreen from "../screens/MealIdeaScreen";
import WeekScreen from "../screens/WeekScreen";

export interface RootStackParamList {
  [key: string]: object | undefined;
  Splash: undefined;
  Disclaimer: undefined;
  Tabs: undefined;
}

const MyNav = () => {
  // Tab Nav
  const Tab = createBottomTabNavigator();

  const Tabs = () => {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.primaryBlue,
          tabBarStyle: styles.tabContainer,
          tabBarItemStyle: styles.tab,
        }}
      >
        <Tab.Screen
          name="Grocery List Screen"
          component={GroceryListScreen}
          options={{
            tabBarLabel: ({ focused, color }) => (
              <Text style={[styles.tabText, { color: color, fontWeight: focused ? "bold" : "normal" }]}>List</Text>
            ),
            tabBarIcon: ({ focused, color, size }) => <Ionicons name={focused ? "menu" : "menu-outline"} size={size} color={color} />,
          }}
        />
        <Tab.Screen
          name="Week Screen"
          component={WeekScreen}
          options={{
            tabBarLabel: ({ focused, color }) => (
              <Text style={[styles.tabText, { color: color, fontWeight: focused ? "bold" : "normal" }]}>Week</Text>
            ),
            tabBarIcon: ({ focused, color, size }) => <Ionicons name={focused ? "calendar" : "calendar-outline"} size={size} color={color} />,
          }}
        />
        <Tab.Screen
          name="Meal Idea Screen"
          component={MealIdeaScreen}
          options={{
            tabBarLabel: ({ focused, color }) => (
              <Text style={[styles.tabText, { color: color, fontWeight: focused ? "bold" : "normal" }]}>Ideas</Text>
            ),
            tabBarIcon: ({ focused, color, size }) => <Ionicons name={focused ? "bulb" : "bulb-outline"} size={size} color={color} />,
          }}
        />
      </Tab.Navigator>
    );
  };

  // Root Nav
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <StatusBar barStyle={"dark-content"} />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}
        initialRouteName="Splash"
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Disclaimer" component={DisclaimerScreen} />
        <Stack.Screen name="Tabs" component={Tabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyNav;

const styles = StyleSheet.create({
  tabContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 8,
    overflow: "visible",
  },
  tab: {
    justifyContent: "center",
    alignItems: "center",
  },
  tabText: {
    marginTop: 6,
    fontSize: 12,
  },
});
