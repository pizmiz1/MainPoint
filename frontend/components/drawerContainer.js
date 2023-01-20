import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { View, Text, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { switchMode } from "../store/actions/switchMode";

const MyDrawerContainer = (props) => {
  const colors = useSelector((state) => state.colors);

  const dispatch = useDispatch();

  const mode = useSelector((state) => state.mode);

  const handlePress = () => {
    if (mode === "Fitness") {
      dispatch(switchMode("Grocery"));
    } else {
      dispatch(switchMode("Fitness"));
    }
    props.navigation.toggleDrawer();
  };

  return (
    <DrawerContentScrollView
      contentContainerStyle={{
        height: "100%",
      }}
      scrollEnabled={false}
      {...props}
    >
      <View style={{ flex: 5 }}>
        <DrawerItemList {...props} />
      </View>

      <View
        style={{
          alignItems: "center",
          height: "95%",
          justifyContent: "flex-end",
          flex: 1,
          marginVertical: 20,
        }}
      >
        <TouchableOpacity onPress={handlePress}>
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              color: "white",
            }}
          >
            Switch
          </Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

export default MyDrawerContainer;
