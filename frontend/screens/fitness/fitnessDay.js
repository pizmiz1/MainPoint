import React from "react";
import { useSelector } from "react-redux";
import { View, Text } from "react-native";

//components
import ScrollViewContainer from "../../components/scrollViewContainer";
import BottomNavigationTab from "../../components/bottomNavTab";

const FitnessDay = (props) => {
  const colors = useSelector((state) => state.colors);
  return (
    <View style={{ flex: 1 }}>
      <ScrollViewContainer
        content={
          <View>
            <Text style={{ fontSize: 30, color: colors.textColors.headerText }}>
              Fitness Day Screen!
            </Text>
          </View>
        }
        nav={props.navigation}
      />
      <BottomNavigationTab screenName="DAY" {...props} />
    </View>
  );
};

export default FitnessDay;
