import React from "react";
import { View, Image } from "react-native";
import { useDispatch } from "react-redux";
import { switchMode } from "../store/actions/switchMode";

//components
import Card from "../components/card";

const SelectionScreen = (props) => {
  const dispatch = useDispatch();

  return (
    <View
      style={{
        justifyContent: "center",
        flex: 1,
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <Card
        style={{
          width: "70%",
          height: "20%",
          backgroundColor: "#03a9f5",
          marginBottom: 50,
          borderWidth: 0,
        }}
        isTouchable={true}
        onPress={() => {
          dispatch(switchMode("Grocery"));
          props.navigation.navigate("Grocery App");
        }}
        content={
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              style={{ width: "40%", height: undefined, aspectRatio: 1 }}
              source={require("./../assets/Grocery/Cart-Clear.png")}
            ></Image>
          </View>
        }
      />
      <Card
        style={{
          width: "70%",
          height: "20%",
          backgroundColor: "#0a9d6c",
          marginBottom: 50,
          borderWidth: 0,
        }}
        isTouchable={true}
        onPress={() => {
          dispatch(switchMode("Fitness"));
          props.navigation.navigate("Fitness App");
        }}
        content={
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              style={{ width: "50%", height: undefined, aspectRatio: 2 }}
              source={require("./../assets/Fitness/Dumbell-Clear.png")}
            ></Image>
          </View>
        }
      />
    </View>
  );
};

export default SelectionScreen;
