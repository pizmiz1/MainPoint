import React, { useRef, useEffect } from "react";
import { View, Animated, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
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
import { switchRunning } from "../store/actions/switchRunning";
import { updateRunning } from "../store/actions/updateRunning";
import { updateRunningStartDate } from "../store/actions/updateRunningStartDate";
import { updateTotalMiles } from "../store/actions/updateTotalMiles";
import { updateRunningDone } from "../store/actions/updateRunningDone";
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

            await AsyncStorage.setItem(
              "Running Done",
              JSON.stringify({
                data: false,
              })
            );

            let myBodyWeight;
            let myLbsPerWeek;

            const savedBodyweight = await AsyncStorage.getItem("Bodyweight");
            if (savedBodyweight) {
              const transformed = await JSON.parse(savedBodyweight).data;
              if (transformed) {
                myBodyWeight = transformed;
              }
            }

            const savedLbsPerWeek = await AsyncStorage.getItem("LbsPerWeek");
            if (savedLbsPerWeek) {
              const transformed = await JSON.parse(savedLbsPerWeek).data;
              if (transformed) {
                myLbsPerWeek = transformed;
              }
            }

            if (savedBodyweight && savedLbsPerWeek) {
              await AsyncStorage.setItem(
                "Calories",
                JSON.stringify({
                  data:
                    parseInt(myBodyWeight) * 15 -
                    parseFloat(myLbsPerWeek) * 420,
                })
              );
            }

            await AsyncStorage.setItem(
              "Logs",
              JSON.stringify({
                data: [],
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

            const RunningDone = await AsyncStorage.getItem("Running Done");
            if (RunningDone) {
              const transformedRunningDone = await JSON.parse(RunningDone).data;
              if (transformedRunningDone) {
                dispatch(updateRunningDone(true));
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

        const running = await AsyncStorage.getItem("Running");
        if (running) {
          const transformedRunning = JSON.parse(running);
          dispatch(switchRunning(transformedRunning.running));
        }

        const RunningData = await AsyncStorage.getItem("Running Data");
        if (RunningData) {
          const transformedRunningData = await JSON.parse(RunningData).data;
          dispatch(updateRunning(transformedRunningData));
        }

        const RunningStartDate = await AsyncStorage.getItem("Start Date");
        if (RunningStartDate) {
          const transformedRunningStartDate = await JSON.parse(RunningStartDate)
            .data;
          dispatch(updateRunningStartDate(transformedRunningStartDate));
        }

        const RunningTotalMiles = await AsyncStorage.getItem("Running Total");
        if (RunningTotalMiles) {
          const transformedRunningTotalMiles = await JSON.parse(
            RunningTotalMiles
          ).data;
          dispatch(updateTotalMiles("Add", transformedRunningTotalMiles));
        }

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

        let transformedMyInitialRoute;

        const mode = await AsyncStorage.getItem("Mode");
        if (!mode) {
          dispatch(switchMode("Grocery"));
        } else {
          const transformedMode = JSON.parse(mode);
          if (transformedMode.mode === "Fitness") {
            dispatch(switchMode("Fitness"));
            const myInitialRoute = await AsyncStorage.getItem(
              "Initial Fitness Route"
            );
            if (myInitialRoute) {
              transformedMyInitialRoute = await JSON.parse(myInitialRoute).data;
            }
          } else {
            const myInitialRoute = await AsyncStorage.getItem(
              "Initial Grocery Route"
            );
            if (myInitialRoute) {
              transformedMyInitialRoute = await JSON.parse(myInitialRoute).data;
            }
            dispatch(switchMode("Grocery"));
          }
        }

        props.navigation.navigate("App", transformedMyInitialRoute);
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
