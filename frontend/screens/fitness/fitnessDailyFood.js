import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { crossDailyFood } from "../../store/actions/crossDailyFood";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FitnessDailyFood = (props) => {
  const colors = useSelector((state) => state.colors);
  const shakeCrossed = useSelector((state) => state.shakeCrossed);
  const yogurtCrossed = useSelector((state) => state.yogurtCrossed);
  const barCrossed = useSelector((state) => state.barCrossed);

  const determineValue = () => {
    if (!shakeCrossed && !yogurtCrossed && !barCrossed) {
      return 0;
    } else if (!shakeCrossed && !yogurtCrossed && barCrossed) {
      return 1;
    } else if (!shakeCrossed && yogurtCrossed && !barCrossed) {
      return 1;
    } else if (shakeCrossed && !yogurtCrossed && !barCrossed) {
      return 1;
    } else if (!shakeCrossed && yogurtCrossed && barCrossed) {
      return 2;
    } else if (shakeCrossed && !yogurtCrossed && barCrossed) {
      return 2;
    } else if (shakeCrossed && yogurtCrossed && !barCrossed) {
      return 2;
    } else {
      return 3;
    }
  };

  const fadeAnim = useRef(new Animated.Value(determineValue())).current;

  var color = fadeAnim.interpolate({
    inputRange: [0, 1, 2, 3],
    outputRange: ["red", "orange", "#90EE90", "green"],
  });

  Animated.timing(fadeAnim, {
    toValue: determineValue(),
    useNativeDriver: false,
    duration: 400,
  }).start();

  const dispatch = useDispatch();

  return (
    <Animated.View
      style={{
        flex: 1,
        backgroundColor: color,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{ marginBottom: 100, alignItems: "center", width: "100%" }}>
        <TouchableOpacity
          onPress={async () => {
            const ShakeCrossed = await AsyncStorage.getItem("Shake Crossed");
            if (ShakeCrossed) {
              const shakeCrossedData = await JSON.parse(ShakeCrossed).data;
              await AsyncStorage.setItem(
                "Shake Crossed",
                JSON.stringify({
                  data: !shakeCrossedData,
                })
              );
            } else {
              await AsyncStorage.setItem(
                "Shake Crossed",
                JSON.stringify({
                  data: true,
                })
              );
            }
            await dispatch(crossDailyFood(0));
          }}
          style={{ width: "100%", alignItems: "center" }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 50,
              padding: 10,
              opacity: shakeCrossed ? 0.5 : 1,
              textDecorationLine: shakeCrossed ? "line-through" : "none",
            }}
          >
            Shake
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            const YogurtCrossed = await AsyncStorage.getItem("Yogurt Crossed");
            if (YogurtCrossed) {
              const yogurtCrossedData = await JSON.parse(YogurtCrossed).data;
              await AsyncStorage.setItem(
                "Yogurt Crossed",
                JSON.stringify({
                  data: !yogurtCrossedData,
                })
              );
            } else {
              await AsyncStorage.setItem(
                "Yogurt Crossed",
                JSON.stringify({
                  data: true,
                })
              );
            }
            await dispatch(crossDailyFood(1));
          }}
          style={{ width: "100%", alignItems: "center" }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 50,
              padding: 10,
              opacity: yogurtCrossed ? 0.5 : 1,
              textDecorationLine: yogurtCrossed ? "line-through" : "none",
            }}
          >
            Yogurt
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            const BarCrossed = await AsyncStorage.getItem("Bar Crossed");
            if (BarCrossed) {
              const barCrossedData = await JSON.parse(BarCrossed).data;
              await AsyncStorage.setItem(
                "Bar Crossed",
                JSON.stringify({
                  data: !barCrossedData,
                })
              );
            } else {
              await AsyncStorage.setItem(
                "Bar Crossed",
                JSON.stringify({
                  data: true,
                })
              );
            }
            await dispatch(crossDailyFood(2));
          }}
          style={{ width: "100%", alignItems: "center" }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 50,
              padding: 10,
              opacity: barCrossed ? 0.5 : 1,
              textDecorationLine: barCrossed ? "line-through" : "none",
            }}
          >
            Protein Bar
          </Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default FitnessDailyFood;
