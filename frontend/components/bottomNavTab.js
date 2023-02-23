import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

const BottomNavigationTab = (props) => {
  const colors = useSelector((state) => state.colors);

  const [dayIcon, setDayIcon] = useState("ios-sunny-outline");
  const [weekIcon, setWeekIcon] = useState("list-outline");

  useEffect(() => {
    switch (props.screenName) {
      case "DAY":
        setDayIcon("ios-sunny");
        setWeekIcon("list-outline");
        break;
      case "WEEK":
        setWeekIcon("list-sharp");
        setDayIcon("ios-sunny-outline");
        break;
      default:
        break;
    }
  }, []);

  return (
    <View
      style={{
        flex: 0.1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        backgroundColor: colors.secondary,
      }}
    >
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={() => {
            props.navigation.jumpTo("Fitness Day");
          }}
        >
          <Ionicons name={dayIcon} color={"white"} size={20} />
          <View style={{ marginBottom: 5 }} />
          <Text
            style={{
              fontSize: 15,
              color: colors.textColors.headerText,
              fontWeight: dayIcon === "ios-sunny" ? "bold" : "normal",
              textAlign: "center",
            }}
          >
            Day
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={() => {
            props.navigation.jumpTo("Fitness Week");
          }}
        >
          <Ionicons name={weekIcon} color={"white"} size={20} />
          <View style={{ marginBottom: 5 }} />
          <Text
            style={{
              fontSize: 15,
              color: colors.textColors.headerText,
              fontWeight: weekIcon === "list-sharp" ? "bold" : "normal",
              textAlign: "center",
            }}
          >
            Week
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BottomNavigationTab;
