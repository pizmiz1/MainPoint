import React from "react";
import { Text } from "react-native";

//components
import ScrollViewContainer from "../../components/scrollViewContainer";

const GroceryTest = (props) => {
  return (
    <ScrollViewContainer
      content={<Text style={{ fontSize: 30 }}>Fuck You LMAO</Text>}
      nav={props.navigation}
    />
  );
};

export default GroceryTest;
