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
import { toggleBiweekly } from "../store/actions/toggleBiweekly";
import { getGroceries } from "../store/actions/getGroceries";
import { getMeals } from "../store/actions/getMeals";
import { crossDailyFood } from "../store/actions/crossDailyFood";
import moment from "moment/moment";

const SplashScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const load = async () => {
      const FitnessData = await AsyncStorage.getItem("Fitness Data");
      if (FitnessData) {
        const currDay = moment().format("dddd");
        const currDayStorage = await AsyncStorage.getItem("Current Day");
        if (currDayStorage) {
          const transformedCurrDayStorage = await JSON.parse(currDayStorage)
            .data;
          if (transformedCurrDayStorage !== currDay) {
            await dispatch(crossDailyFood(3));
            const ShakeCrossed = await AsyncStorage.getItem("Shake Crossed");
            if (ShakeCrossed) {
              await AsyncStorage.setItem(
                "Shake Crossed",
                JSON.stringify({
                  data: false,
                })
              );
            }
            const YogurtCrossed = await AsyncStorage.getItem("Yogurt Crossed");
            if (YogurtCrossed) {
              await AsyncStorage.setItem(
                "Yogurt Crossed",
                JSON.stringify({
                  data: false,
                })
              );
            }
            const BarCrossed = await AsyncStorage.getItem("Bar Crossed");
            if (BarCrossed) {
              await AsyncStorage.setItem(
                "Bar Crossed",
                JSON.stringify({
                  data: false,
                })
              );
            }
            await AsyncStorage.setItem(
              "Current Day",
              JSON.stringify({
                data: currDay,
              })
            );
          } else {
            const ShakeCrossed = await AsyncStorage.getItem("Shake Crossed");
            if (ShakeCrossed) {
              const shakeCrossedData = await JSON.parse(ShakeCrossed).data;
              if (shakeCrossedData) {
                await dispatch(crossDailyFood(0));
              }
            }

            const YogurtCrossed = await AsyncStorage.getItem("Yogurt Crossed");
            if (YogurtCrossed) {
              const yogurtCrossedData = await JSON.parse(YogurtCrossed).data;
              if (yogurtCrossedData) {
                await dispatch(crossDailyFood(1));
              }
            }

            const BarCrossed = await AsyncStorage.getItem("Bar Crossed");
            if (BarCrossed) {
              const barCrossedData = await JSON.parse(BarCrossed).data;
              if (barCrossedData) {
                await dispatch(crossDailyFood(2));
              }
            }
          }
        } else {
          await AsyncStorage.setItem(
            "Current Day",
            JSON.stringify({
              data: currDay,
            })
          );
        }

        const transformedFitnessData = await JSON.parse(FitnessData).data;
        await dispatch(updateBench(transformedFitnessData.at(2).Bench));
        await dispatch(updateSquat(transformedFitnessData.at(2).Squat));
        await dispatch(updateOHP(transformedFitnessData.at(2).OHP));
        await dispatch(getExersizes());
        await dispatch(getGroceries());
        await dispatch(getMeals());

        const biweekly = await AsyncStorage.getItem("Biweekly");
        if (biweekly) {
          const transformedBiweekly = JSON.parse(biweekly);
          if (transformedBiweekly.biweekly) {
            dispatch(toggleBiweekly());
          }
        }

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
      } else {
        const FitnessDB = await getDocs(collection(db, "Fitness"));
        let FitnessData = [];
        for (const currDoc of FitnessDB.docs) {
          FitnessData.push(currDoc.data());
        }
        const GroceryDB = await getDocs(collection(db, "Grocery"));
        let GroceryData = [];
        for (const currDoc of GroceryDB.docs) {
          GroceryData.push(currDoc.data());
        }
        await AsyncStorage.setItem(
          "Fitness Data",
          JSON.stringify({
            data: FitnessData,
          })
        );
        await AsyncStorage.setItem(
          "Grocery Data",
          JSON.stringify({
            data: GroceryData,
          })
        );
        load();
      }
      // ############ OLD FIRESTORE CODE ##############
      // const FitnessDB = await getDocs(collection(db, "Fitness"));
      // await dispatch(updateBench(transformedFitnessData.at(2).Bench));
      // await dispatch(updateSquat(FitnessDB.docs.at(2).data().Squat));
      // await dispatch(updateOHP(FitnessDB.docs.at(2).data().OHP));
      // await dispatch(getExersizes());
      // await dispatch(getGroceries());
      // await dispatch(getMeals());
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
