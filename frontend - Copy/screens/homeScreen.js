import React from "react";
import { View, Text, ScrollView } from "react-native";

//components
import ScrollViewContainer from "../components/scrollViewContainer";

//constants
import colors from "../constants/colors";

const HomeScreen = (props) => {
  return (
    <ScrollViewContainer
      nav={props.navigation}
      content={
        <View
          style={{
            justifyContent: "flex-end",
            flex: 1,
            alignItems: "center",
          }}
        >
          <Text style={{ color: colors.textColors.headerText, fontSize: 400 }}>
            Test
          </Text>
        </View>
      }
    />
  );
};

export default HomeScreen;
