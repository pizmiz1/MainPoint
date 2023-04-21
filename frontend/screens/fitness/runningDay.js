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
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ScrollViewContainer from "../../components/scrollViewContainer";
import BottomNavigationTab from "../../components/bottomNavTab";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import moment from "moment/moment";

const RunningDay = (props) => {
  const colors = useSelector((state) => state.colors);
  const runningData = useSelector((state) => state.runningData);
  const startDate = useSelector((state) => state.startDate);
  const [milesTextColor, setMilesTextColor] = useState();
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
    getTColor();
  }, []);

  const dispatch = useDispatch();

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.9 }}>
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
                  {todaysRunningMiles() === "0" ||
                  todaysRunningMiles() === "" ? (
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
                    <TouchableOpacity onPress={getTColor}>
                      <Text
                        style={{
                          fontSize: 200,
                          textAlign: "center",
                          color: milesTextColor,
                        }}
                      >
                        {todaysRunningMiles()}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </View>
          }
          nav={props.navigation}
          scrollDisabled={
            determineWeekNum() < 0 || determineWeekNum() > runningData.length
              ? false
              : todaysRunningMiles() === "0" || todaysRunningMiles() === ""
          }
        ></ScrollViewContainer>
      </View>
      <BottomNavigationTab screenName="DAY" {...props} />
    </View>
  );
};

export default RunningDay;
