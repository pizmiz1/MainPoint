import React, { useRef, useEffect } from "react";
import { View, Animated, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { switchMode } from "../store/actions/switchMode";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { updateBench } from "../store/actions/updateBench";
import { updateSquat } from "../store/actions/updateSquat";

const SplashScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const load = async () => {
      const MaxesDB = await getDocs(collection(db, "Maxes"));
      dispatch(updateBench(MaxesDB.docs.at(0).data().Bench));
      dispatch(updateSquat(MaxesDB.docs.at(0).data().Squat));

      const mode = await AsyncStorage.getItem("Mode");
      if (!mode) {
        props.navigation.navigate("Selection Screen");
      } else {
        const transformedMode = JSON.parse(mode);
        if (transformedMode.mode === "Fitness") {
          dispatch(switchMode("Fitness"));
          props.navigation.navigate("Fitness App");
        } else if (transformedMode.mode === "Grocery") {
          dispatch(switchMode("Grocery"));
          props.navigation.navigate("Grocery App");
        } else {
          props.navigation.navigate("Selection Screen");
        }
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
