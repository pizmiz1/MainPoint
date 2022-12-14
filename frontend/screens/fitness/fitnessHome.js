import React from "react";
import { useSelector } from "react-redux";
import { Text } from "react-native";

//components
import ScrollViewContainer from "../../components/scrollViewContainer";

const FitnessHome = (props) => {
  const colors = useSelector((state) => state.colors);
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
