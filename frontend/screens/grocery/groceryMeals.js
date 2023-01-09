import React from "react";
import { Text } from "react-native";

//components
import ScrollViewContainer from "../../components/scrollViewContainer";

const GroceryMeals = (props) => {
  return (
    <ScrollViewContainer
      content={
        <Text style={{ fontSize: 30 }}>Meal Page In Construction...</Text>
      }
      nav={props.navigation}
    />
  );
};

export default GroceryMeals;
