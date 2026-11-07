import { useRef, useEffect } from "react";
import { View, Animated, Image, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import asyncKeys from "../constants/asyncKeys";
import colors from "../constants/colors";
import { useRouter } from "expo-router";
import { useGlobalContext } from "../store/GlobalContext";

const SplashScreen = () => {
  const { updateGroceryList, updateAllGroceries, updateWeekMeals, updateMealNotes, updateCrossedGroceryUUIDs, updateCrossedWeekMealUUIDs } =
    useGlobalContext();

  const router = useRouter();

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

  const setupInitialAsyncStructure = async () => {
    AsyncStorage.clear();

    const emptyArrJSON = JSON.stringify([]);

    // Grocery list
    await AsyncStorage.setItem(asyncKeys.groceryList, emptyArrJSON);

    // All groceries
    await AsyncStorage.setItem(asyncKeys.allGroceries, emptyArrJSON);

    // Week meals
    await AsyncStorage.setItem(asyncKeys.weekMeals, emptyArrJSON);

    // Meal notes
    await AsyncStorage.setItem(asyncKeys.mealNotes, emptyArrJSON);

    // Crossed grocery uuids
    await AsyncStorage.setItem(asyncKeys.crossedGroceryUuids, emptyArrJSON);

    // Crossed week meal uuids
    await AsyncStorage.setItem(asyncKeys.crossedWeekMealUuids, emptyArrJSON);
  };

  const loadData = async () => {
    const loaders = {
      [asyncKeys.groceryList]: updateGroceryList,
      [asyncKeys.allGroceries]: updateAllGroceries,
      [asyncKeys.weekMeals]: updateWeekMeals,
      [asyncKeys.mealNotes]: updateMealNotes,
      [asyncKeys.crossedGroceryUuids]: updateCrossedGroceryUUIDs,
      [asyncKeys.crossedWeekMealUuids]: updateCrossedWeekMealUUIDs,
    };

    const entries = await AsyncStorage.multiGet(Object.keys(loaders));

    for (const [key, raw] of entries) {
      const parsed = raw ? JSON.parse(raw) : null;

      if (parsed !== null && loaders[key]) {
        loaders[key](parsed);
      }
    }
  };

  useEffect(() => {
    const load = async () => {
      const firstUseJSON = await AsyncStorage.getItem(asyncKeys.firstUse);
      const firstUseParsed = firstUseJSON != null ? JSON.parse(firstUseJSON) : null;

      if (firstUseParsed === null) {
        await setupInitialAsyncStructure();

        router.replace("/disclaimer");
      } else {
        await loadData();

        router.replace("/(tabs)");
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
