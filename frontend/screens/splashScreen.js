import React, { useRef, useEffect } from "react";
import { View, Animated, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { switchMode } from "../store/actions/switchMode";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { updateBench } from "../store/actions/updateBench";
import { updateSquat } from "../store/actions/updateSquat";
import { updateOHP } from "../store/actions/updateOHP";
import { getExersizes } from "../store/actions/getExersizes";
import { updatePower } from "../store/actions/updatePower";
import { getGroceries } from "../store/actions/getGroceries";
import { getMeals } from "../store/actions/getMeals";

const SplashScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const load = async () => {
      const FitnessDB = await getDocs(collection(db, "Fitness"));
      await dispatch(updateBench(FitnessDB.docs.at(2).data().Bench));
      await dispatch(updateSquat(FitnessDB.docs.at(2).data().Squat));
      await dispatch(updateOHP(FitnessDB.docs.at(2).data().OHP));
      await dispatch(getExersizes());
      await dispatch(getGroceries());
      await dispatch(getMeals());

      const power = await AsyncStorage.getItem("Power");
      if (power) {
        const transformedPower = JSON.parse(power);
        dispatch(updatePower(transformedPower.power));
      }

      const mode = await AsyncStorage.getItem("Mode");
      if (!mode) {
        dispatch(switchMode("Grocery"));
      } else {
        const transformedMode = JSON.parse(mode);
        if (transformedMode.mode === "Fitness") {
          dispatch(switchMode("Fitness"));
        } else {
          dispatch(switchMode("Grocery"));
        }
      }
      props.navigation.navigate("App");
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
          <Image
            style={{ width: "100%", height: undefined, aspectRatio: 1 }}
            source={require("./../assets/Logo/MainLogo.jpg")}
          ></Image>
        </Animated.View>
      </View>
    </View>
  );
};

export default SplashScreen;
