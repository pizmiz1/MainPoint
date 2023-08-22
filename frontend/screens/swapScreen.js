import React, { useEffect } from "react";
import { View, Text, LayoutAnimation } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { switchMode } from "../store/actions/switchMode";
import ScrollViewContainer from "../components/scrollViewContainer";
import { useIsFocused } from "@react-navigation/native";

const SwapScreen = (props) => {
  const colors = useSelector((state) => state.colors);
  const mode = useSelector((state) => state.mode);

  const dispatch = useDispatch();

  useEffect(() => {
    if (mode === "Fitness") {
      LayoutAnimation.configureNext(
        LayoutAnimation.create(
          200,
          LayoutAnimation.Types.easeIn,
          LayoutAnimation.Properties.scaleY
        )
      );
      dispatch(switchMode("Grocery"));
    } else {
      LayoutAnimation.configureNext(
        LayoutAnimation.create(
          200,
          LayoutAnimation.Types.easeIn,
          LayoutAnimation.Properties.scaleY
        )
      );
      dispatch(switchMode("Fitness"));
    }
  }, []);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("tabPress", (e) => {
      if (mode === "Fitness") {
        LayoutAnimation.configureNext(
          LayoutAnimation.create(
            200,
            LayoutAnimation.Types.easeIn,
            LayoutAnimation.Properties.scaleY
          )
        );
        dispatch(switchMode("Grocery"));
      } else {
        LayoutAnimation.configureNext(
          LayoutAnimation.create(
            200,
            LayoutAnimation.Types.easeIn,
            LayoutAnimation.Properties.scaleY
          )
        );
        dispatch(switchMode("Fitness"));
      }
    });

    return unsubscribe;
  }, [props.navigation, mode]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollViewContainer
        content={
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text style={{ fontSize: 20, color: colors.textColors.headerText }}>
              Mode
            </Text>
            <Text
              style={{
                fontSize: 30,
                color: colors.primary,
                fontWeight: "bold",
              }}
            >
              {mode}
            </Text>
          </View>
        }
        nav={props.navigation}
      />
    </View>
  );
};

export default SwapScreen;
