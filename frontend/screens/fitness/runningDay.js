import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  Switch,
  TouchableOpacity,
  LayoutAnimation,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ScrollViewContainer from "../../components/scrollViewContainer";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import moment from "moment/moment";
import ConfettiCannon from "react-native-confetti-cannon";
import { updateTotalMiles } from "../../store/actions/updateTotalMiles";
import { updateShoeMiles } from "../../store/actions/updateShoeMiles";
import { updateRunningDone } from "../../store/actions/updateRunningDone";

const RunningDay = (props) => {
  const colors = useSelector((state) => state.colors);
  const runningData = useSelector((state) => state.runningData);
  const startDate = useSelector((state) => state.startDate);
  const totalMiles = useSelector((state) => state.totalMiles);
  const shoeMiles = useSelector((state) => state.shoeMiles);
  const done = useSelector((state) => state.runningDone);
  const [runningAlreadyDone, setRunningAlreadyDone] = useState(false);
  const [milesTextColor, setMilesTextColor] = useState();
  const [shoot, setShoot] = useState(false);
  const [rainbow, setRainbow] = useState([
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "indigo",
    "violet",
  ]);

  const determineWeekNum = () => {
    let weekDisp;
    const dayDisp = moment().format("dddd");
    if (dayDisp === "Tuesday") {
      weekDisp = moment().subtract(1, "days").format("yyyy-MM-DD");
    } else if (dayDisp === "Wednesday") {
      weekDisp = moment().subtract(2, "days").format("yyyy-MM-DD");
    } else if (dayDisp === "Thursday") {
      weekDisp = moment().subtract(3, "days").format("yyyy-MM-DD");
    } else if (dayDisp === "Friday") {
      weekDisp = moment().subtract(4, "days").format("yyyy-MM-DD");
    } else if (dayDisp === "Saturday") {
      weekDisp = moment().subtract(5, "days").format("yyyy-MM-DD");
    } else if (dayDisp === "Sunday") {
      weekDisp = moment().subtract(6, "days").format("yyyy-MM-DD");
    } else {
      weekDisp = moment().format("yyyy-MM-DD");
    }
    weekDisp = moment(weekDisp);
    const diff = moment.duration(weekDisp.diff(moment(startDate)));
    if (Math.floor(diff.asWeeks()) === -1) {
      return Math.floor(diff.asWeeks());
    } else {
      return Math.floor(diff.asWeeks()) + 1;
    }
  };

  const myRunningWeek = runningData.find((currWeek) => {
    return currWeek.weekNum == determineWeekNum().toString();
  });

  const todaysRunningMiles = () => {
    const dayDisp = moment().format("dddd");
    if (myRunningWeek === undefined) {
      return;
    }
    let myRunningMiles;
    switch (dayDisp) {
      case "Monday": {
        myRunningMiles = myRunningWeek.mondayMiles;
        break;
      }
      case "Tuesday": {
        myRunningMiles = myRunningWeek.tuesdayMiles;
        break;
      }
      case "Wednesday": {
        myRunningMiles = myRunningWeek.wednesdayMiles;
        break;
      }
      case "Thursday": {
        myRunningMiles = myRunningWeek.thursdayMiles;
        break;
      }
      case "Friday": {
        myRunningMiles = myRunningWeek.fridayMiles;
        break;
      }
      case "Saturday": {
        myRunningMiles = myRunningWeek.saturdayMiles;
        break;
      }
      case "Sunday": {
        myRunningMiles = myRunningWeek.sundayMiles;
        break;
      }
    }
    return myRunningMiles;
  };

  const getTColor = () => {
    if (rainbow.length === 1) {
      setRainbow([
        "red",
        "orange",
        "yellow",
        "green",
        "blue",
        "indigo",
        "violet",
      ]);
    }
    const randomIdx = Math.floor(Math.random() * rainbow.length);
    const returnColor = rainbow[randomIdx];
    rainbow.splice(randomIdx, 1);
    setMilesTextColor(returnColor);
  };

  useEffect(() => {
    if (done) {
      setRunningAlreadyDone(true);
      setMilesTextColor("black");
    } else {
      getTColor();
    }
  }, []);

  const dispatch = useDispatch();

  return (
    <View style={{ flex: 1 }}>
      <ScrollViewContainer
        content={
          <View style={{ flex: 1, backgroundColor: colors.secondary }}>
            {determineWeekNum() < 0 ||
            determineWeekNum() > runningData.length ? (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontSize: 40 }}>
                  Program is over or has not started.
                </Text>
                <Text style={{ fontSize: 50 }}>😎 😎 😎</Text>
              </View>
            ) : (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {todaysRunningMiles() === "0" || todaysRunningMiles() === "" ? (
                  <View style={{ width: "100%", flex: 1 }}>
                    <LinearGradient
                      colors={["#12c2e9", "#c471ed", "#f64f59"]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={{ flex: 1 }}
                    >
                      <View
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                          flex: 1,
                        }}
                      >
                        <Text style={{ fontSize: 70, color: "white" }}>
                          Rest Day
                        </Text>
                        <Text style={{ fontSize: 70 }}>😴 😴 😴</Text>
                      </View>
                    </LinearGradient>
                  </View>
                ) : (
                  <View style={{ width: "100%" }}>
                    <TouchableOpacity onPress={getTColor} disabled={done}>
                      <Text
                        style={{
                          fontSize: todaysRunningMiles() === "C" ? 55 : 200,
                          textAlign: "center",
                          color: milesTextColor,
                        }}
                      >
                        {todaysRunningMiles() === "C"
                          ? "Cross Training"
                          : todaysRunningMiles()}
                      </Text>
                      {shoot || runningAlreadyDone ? (
                        <Text
                          style={{
                            fontSize: 30,
                            textAlign: "center",
                            color: milesTextColor,
                          }}
                        >
                          {todaysRunningMiles() === "C"
                            ? "Done Today!"
                            : "Miles Ran Today!"}
                        </Text>
                      ) : null}
                    </TouchableOpacity>
                    {!shoot || runningAlreadyDone ? (
                      <TouchableOpacity
                        onPress={() => {
                          LayoutAnimation.configureNext(
                            LayoutAnimation.create(
                              200,
                              LayoutAnimation.Types.linear,
                              LayoutAnimation.Properties.opacity
                            )
                          );
                          dispatch(updateRunningDone(true));
                          setTimeout(() => {
                            setMilesTextColor("red");
                          }, 200);
                          setTimeout(() => {
                            setMilesTextColor("orange");
                          }, 400);
                          setTimeout(() => {
                            setMilesTextColor("yellow");
                          }, 600);
                          setTimeout(() => {
                            setMilesTextColor("green");
                          }, 800);
                          setTimeout(() => {
                            setMilesTextColor("blue");
                          }, 1000);
                          setTimeout(() => {
                            setMilesTextColor("indigo");
                          }, 1200);
                          setTimeout(() => {
                            setMilesTextColor("violet");
                          }, 1400);
                          setTimeout(() => {
                            setMilesTextColor("black");
                          }, 1600);
                          setTimeout(async () => {
                            setShoot(true);
                            if (todaysRunningMiles() !== "C") {
                              dispatch(
                                updateTotalMiles(
                                  "Add",
                                  parseInt(todaysRunningMiles())
                                )
                              );
                              dispatch(
                                updateShoeMiles(
                                  "Add",
                                  parseInt(todaysRunningMiles())
                                )
                              );
                              await AsyncStorage.setItem(
                                "Running Total",
                                JSON.stringify({
                                  data:
                                    totalMiles + parseInt(todaysRunningMiles()),
                                })
                              );
                              await AsyncStorage.setItem(
                                "Running Shoe Total",
                                JSON.stringify({
                                  data:
                                    shoeMiles + parseInt(todaysRunningMiles()),
                                })
                              );
                            }
                            await AsyncStorage.setItem(
                              "Running Done",
                              JSON.stringify({
                                data: true,
                              })
                            );
                          }, 1610);
                        }}
                        style={{
                          padding: 5,
                          borderRadius: 20,
                          width: "50%",
                          alignSelf: "center",
                          alignItems: "center",
                          backgroundColor: colors.primary,
                          opacity: done ? 0 : 1,
                        }}
                        disabled={done}
                      >
                        <Text style={{ fontSize: 30 }}>Done</Text>
                      </TouchableOpacity>
                    ) : null}
                  </View>
                )}
              </View>
            )}
          </View>
        }
        nav={props.navigation}
        scrollDisabled={
          determineWeekNum() < 0 || determineWeekNum() > runningData.length
            ? false
            : todaysRunningMiles() === "0" ||
              todaysRunningMiles() === "" ||
              done
        }
      ></ScrollViewContainer>
      {shoot ? (
        <ConfettiCannon count={200} origin={{ x: -10, y: 0 }} fadeOut={true} />
      ) : null}
    </View>
  );
};

export default RunningDay;
