import { useRef, useEffect } from "react";
import { View, Animated, Image, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import asyncKeys from "../constants/asyncKeys";
import { RootStackParamList } from "../navigation/Navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import colors from "../constants/colors";

interface SplashScreenProps extends NativeStackScreenProps<RootStackParamList, "Splash"> {}

const SplashScreen = (props: SplashScreenProps) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  Animated.loop(
    Animated.sequence([
      Animated.timing(pulseAnim, {
        toValue: 0,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
    ]),
  ).start();

  useEffect(() => {
    const setupInitialAsyncStructure = async () => {
      AsyncStorage.clear();

      const emptyArrJSON = JSON.stringify([]);

      // Crossed grocery uuids
      await AsyncStorage.setItem(asyncKeys.crossedGroceryUuids, emptyArrJSON);

      // Grocery list
      await AsyncStorage.setItem(asyncKeys.groceryList, emptyArrJSON);

      // All groceries
      await AsyncStorage.setItem(asyncKeys.allGroceries, emptyArrJSON);

      // Meal ideas
      await AsyncStorage.setItem(asyncKeys.mealIdeas, emptyArrJSON);

      // Week meals
      await AsyncStorage.setItem(asyncKeys.weekMeals, emptyArrJSON);

      // Crossed week meal uuids
      await AsyncStorage.setItem(asyncKeys.crossedWeekMealUuids, emptyArrJSON);
    };

    const load = async () => {
      const firstUseJSON = await AsyncStorage.getItem(asyncKeys.firstUse);
      const firstUseParsed = firstUseJSON != null ? JSON.parse(firstUseJSON) : null;

      if (firstUseParsed === null) {
        setupInitialAsyncStructure();

        props.navigation.navigate("Disclaimer");
      } else {
        props.navigation.navigate("Tabs");
      }
    };

    load();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Animated.View style={[styles.imgContainer, { opacity: pulseAnim }]}>
          <Image style={styles.img} source={require("./../assets/Logo/MainLogo.png")}></Image>
        </Animated.View>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primaryBlue,
  },
  content: {
    alignItems: "center",
  },
  imgContainer: {
    alignItems: "center",
    width: "70%",
  },
  img: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
  },
});
