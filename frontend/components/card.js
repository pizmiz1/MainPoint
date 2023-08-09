import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

const Card = (props) => {
  const colors = useSelector((state) => state.colors);

  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        borderRadius: 20,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        ...props.style,
      }}
    >
      {props.content}
    </View>
  );
};

export default Card;
