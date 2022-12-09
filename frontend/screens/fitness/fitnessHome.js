import React from "react";
import { Text } from "react-native";

//constants
import colors from "../../constants/colors";

//components
import ScrollViewContainer from "../../components/scrollViewContainer";

const FitnessHome = (props) => {
  return (
    <ScrollViewContainer
      content={
        <Text style={{ fontSize: 30, color: colors.textColors.headerText }}>
          Fitness Home!
        </Text>
      }
      nav={props.navigation}
    />
  );
};

export default FitnessHome;
