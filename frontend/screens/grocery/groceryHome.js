import React from "react";
import { Text } from "react-native";

//components
import ScrollViewContainer from "../../components/scrollViewContainer";

const GroceryHome = (props) => {
  return (
    <ScrollViewContainer
      content={<Text style={{ fontSize: 30 }}>Grocery Home!</Text>}
      nav={props.navigation}
    />
  );
};

export default GroceryHome;
