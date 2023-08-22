import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { View, Text, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { switchMode } from "../store/actions/switchMode";
import { FontAwesome } from "@expo/vector-icons";

const SwitchIconComp = (props) => {
  const colors = useSelector((state) => state.colors);

  const dispatch = useDispatch();

  const mode = useSelector((state) => state.mode);

  const handlePress = () => {
    if (mode === "Fitness") {
      dispatch(switchMode("Grocery"));
    } else {
      dispatch(switchMode("Fitness"));
    }
  };

  return (
    <TouchableOpacity
      style={{ ...props.style, marginRight: 15 }}
      onPress={handlePress}
    >
      <FontAwesome name="exchange" size={24} color="black" />
    </TouchableOpacity>
  );
};

export default SwitchIconComp;
