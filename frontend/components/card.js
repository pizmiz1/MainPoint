import React from "react";
import { View, TouchableOpacity } from "react-native";

// constants
import colors from "../constants/colors";

const Card = (props) => {
  if (props.isTouchable) {
    return (
      <TouchableOpacity
        style={{
          ...props.style,
          shadowColor: "#000000",
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowRadius: 3,
          shadowOpacity: 0.5,
          borderRadius: 20,
        }}
        onPress={props.onPress}
      >
        {props.content}
      </TouchableOpacity>
    );
  } else {
    return (
      <View
        style={{
          ...props.style,
          shadowColor: "#000000",
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowRadius: 3,
          shadowOpacity: 0.5,
          borderRadius: 20,
        }}
      >
        {props.content}
      </View>
    );
  }
};

export default Card;
