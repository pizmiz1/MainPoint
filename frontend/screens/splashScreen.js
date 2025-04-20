import React, { useRef, useEffect } from "react";
import { View, Animated, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SplashScreen = (props) => {
  useEffect(() => {
    const setupInitialAsyncStructure = async () => {
      AsyncStorage.clear();

      const EmptyArrJSON = JSON.stringify([]);

      // Crossed grocery uuids
      await AsyncStorage.setItem("CrossedGroceryUuids", EmptyArrJSON);

      // Grocery list
      await AsyncStorage.setItem("GroceryList", EmptyArrJSON);

      // All groceries
      await AsyncStorage.setItem("AllGroceries", EmptyArrJSON);
    };

    const load = async () => {
      const FirstUseJSON = await AsyncStorage.getItem("FirstUse");
      const FirstUseParsed = FirstUseJSON != null ? JSON.parse(FirstUseJSON) : null;

      if (FirstUseParsed === null) {
        setupInitialAsyncStructure();

        props.navigation.navigate("Disclaimer Screen");
      } else {
        props.navigation.navigate("Grocery List Screen");
      }
    };

    load();
  }, []);

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
    ])
  ).start();

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#03a9f5",
      }}
    >
      <View style={{ alignItems: "center" }}>
        <Animated.View
          style={{
            alignItems: "center",
            width: "70%",
            opacity: pulseAnim,
          }}
        >
          <Image style={{ width: "100%", height: undefined, aspectRatio: 1 }} source={require("./../assets/Logo/MainLogo.jpg")}></Image>
        </Animated.View>
      </View>
    </View>
  );
};

export default SplashScreen;
