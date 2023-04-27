import React, { useEffect, useState } from "react";
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
import moment from "moment/moment";
import { Feather } from "@expo/vector-icons";

const RunningWeek = (props) => {
  const colors = useSelector((state) => state.colors);
  const runningData = useSelector((state) => state.runningData);
  const startDate = useSelector((state) => state.startDate);

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

  const dispatch = useDispatch();

  const DayComponent = (props) => {
    const dayDisp = moment().format("ddd");
    let weekDisp;
    if (props.day === "Tue") {
      weekDisp = moment().subtract(1, "days").format("yyyy-MM-DD");
    } else if (props.day === "Wed") {
      weekDisp = moment().subtract(2, "days").format("yyyy-MM-DD");
    } else if (props.day === "Thu") {
      weekDisp = moment().subtract(3, "days").format("yyyy-MM-DD");
    } else if (props.day === "Fri") {
      weekDisp = moment().subtract(4, "days").format("yyyy-MM-DD");
    } else if (props.day === "Sat") {
      weekDisp = moment().subtract(5, "days").format("yyyy-MM-DD");
    } else if (props.day === "Sun") {
      weekDisp = moment().subtract(6, "days").format("yyyy-MM-DD");
    } else {
      weekDisp = moment().format("yyyy-MM-DD");
    }
    weekDisp = moment(weekDisp);
    const diff = moment.duration(moment().startOf("isoweek").diff(weekDisp));
    const daysAway = Math.floor(diff.asDays());

    const isRestDay = props.miles === "" || props.miles === 0;

    const bColor = () => {
      if (daysAway === 0) {
        return colors.primary;
      } else if (daysAway < 0) {
        return "#8cbbf1";
      } else {
        return "#d7dde9";
      }
    };

    return (
      <View
        style={{ marginTop: 5, marginBottom: props.day === "Sun" ? 30 : 5 }}
      >
        <View
          style={{
            backgroundColor: bColor(),
            width: "90%",
            alignSelf: "center",
            //flex: 1,
            padding: 5,
            borderRadius: 10,
            marginTop: props.day === "Mon" ? 10 : 0,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              textDecorationLine: "underline",
              color: "black",
              fontWeight: daysAway === 0 ? "bold" : "normal",
            }}
          >
            {props.day}
          </Text>
          {isRestDay ? (
            <Text
              style={{
                fontSize: 20,
                textAlign: "center",
                color: "black",
                fontWeight: daysAway === 0 ? "bold" : "normal",
              }}
            >
              Rest
            </Text>
          ) : (
            <Text
              style={{
                fontSize: 20,
                textAlign: "center",
                color: "black",
                fontWeight: daysAway === 0 ? "bold" : "normal",
              }}
            >
              {props.miles} Miles
            </Text>
          )}
        </View>
        {props.day === "Sun" ? null : (
          <Feather
            name={daysAway < 0 ? "chevrons-up" : "chevrons-down"}
            size={24}
            color="black"
            style={{ marginTop: 10, alignSelf: "center" }}
          />
        )}
      </View>
    );
  };

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
              ) : myRunningWeek !== undefined ? (
                <View>
                  <DayComponent day={"Mon"} miles={myRunningWeek.mondayMiles} />
                  <DayComponent
                    day={"Tue"}
                    miles={myRunningWeek.tuesdayMiles}
                  />
                  <DayComponent
                    day={"Wed"}
                    miles={myRunningWeek.wednesdayMiles}
                  />
                  <DayComponent
                    day={"Thu"}
                    miles={myRunningWeek.thursdayMiles}
                  />
                  <DayComponent day={"Fri"} miles={myRunningWeek.fridayMiles} />
                  <DayComponent
                    day={"Sat"}
                    miles={myRunningWeek.saturdayMiles}
                  />
                  <DayComponent day={"Sun"} miles={myRunningWeek.sundayMiles} />
                </View>
              ) : (
                <View>
                  <Text>Unable To Get Running Data</Text>
                </View>
              )}
            </View>
          }
          nav={props.navigation}
        ></ScrollViewContainer>
      </View>
      <BottomNavigationTab screenName="WEEK" {...props} />
    </View>
  );
};

export default RunningWeek;
