import React from "react";
import { useSelector } from "react-redux";
import { View, Text } from "react-native";

//components
import ScrollViewContainer from "../../components/scrollViewContainer";
import BottomNavigationTab from "../../components/bottomNavTab";

const FitnessWeek = (props) => {
  const colors = useSelector((state) => state.colors);
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.9 }}>
        <ScrollViewContainer
          content={
            <View>
              <Text
                style={{ fontSize: 30, color: colors.textColors.headerText }}
              >
                Fitness Week Screen!
              </Text>
            </View>
          }
          nav={props.navigation}
        />
      </View>
      <BottomNavigationTab screenName="WEEK" {...props} />
    </View>
  );
};

export default FitnessWeek;
