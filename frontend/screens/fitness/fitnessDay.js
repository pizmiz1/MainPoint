import React, { useState } from "react";
import { useSelector } from "react-redux";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import moment from "moment";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { FontAwesome } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

//components
import ScrollViewContainer from "../../components/scrollViewContainer";

const FitnessDay = (props) => {
  const [mainLiftIndexs, setMainLiftIndexs] = useState([]);
  const [selectedIndexs, setSelectedIndexs] = useState([]);
  const [blur, setBlur] = useState(0);

  const colors = useSelector((state) => state.colors);
  const power = useSelector((state) => state.power);
  const maxBench = useSelector((state) => state.maxBench);
  const maxSquat = useSelector((state) => state.maxSquat);
  const maxOHP = useSelector((state) => state.maxOHP);

  const dayDisp = moment().format("dddd");

  let exersizes;
  switch (dayDisp) {
    case "Monday": {
      if (power) {
        exersizes = useSelector((state) => state.mondayExersizes);
      } else {
        exersizes = useSelector((state) => state.mondayExersizesB);
      }
      break;
    }
    case "Tuesday": {
      if (power) {
        exersizes = useSelector((state) => state.tuesdayExersizes);
      } else {
        exersizes = useSelector((state) => state.tuesdayExersizesB);
      }
      break;
    }
    case "Wednesday": {
      if (power) {
        exersizes = useSelector((state) => state.wednesdayExersizes);
      } else {
        exersizes = useSelector((state) => state.wednesdayExersizesB);
      }
      break;
    }
    case "Thursday": {
      if (power) {
        exersizes = useSelector((state) => state.thursdayExersizes);
      } else {
        exersizes = useSelector((state) => state.thursdayExersizesB);
      }
      break;
    }
    case "Friday": {
      if (power) {
        exersizes = useSelector((state) => state.fridayExersizes);
      } else {
        exersizes = useSelector((state) => state.fridayExersizesB);
      }
      break;
    }
    case "Saturday": {
      if (power) {
        exersizes = useSelector((state) => state.saturdayExersizes);
      } else {
        exersizes = useSelector((state) => state.saturdayExersizesB);
      }
      break;
    }
    case "Sunday": {
      if (power) {
        exersizes = useSelector((state) => state.sundayExersizes);
      } else {
        exersizes = useSelector((state) => state.sundayExersizesB);
      }
      break;
    }
  }

  const convertMax = (weight, exersize) => {
    const floatWeight = parseFloat(weight);
    let retWeight;
    switch (exersize) {
      case "Bench": {
        retWeight = Math.floor(parseFloat(maxBench) * floatWeight);
        return retWeight;
      }
      case "Squat": {
        retWeight = Math.floor(parseFloat(maxSquat) * floatWeight);
        return retWeight;
      }
      case "Overhead Press": {
        retWeight = Math.floor(parseFloat(maxOHP) * floatWeight);
        return retWeight;
      }
      default:
        return floatWeight;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollViewContainer
        content={
          exersizes.at(0).exersize === "Rest" ? (
            <View style={{ marginTop: 100 }}>
              <MaskedView
                style={{ height: "50%" }}
                maskElement={
                  <Text
                    style={{
                      fontSize: 85,
                      textAlign: "center",
                      marginTop: 30,
                    }}
                  >
                    Rest Day!
                  </Text>
                }
              >
                <LinearGradient
                  colors={["#c6ffdd", "#fbd786", "#f7797d"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{ flex: 1 }}
                />
              </MaskedView>
              <View style={{ alignItems: "center" }}>
                <FontAwesome name={"bed"} color={"white"} size={100} />
              </View>
            </View>
          ) : (
            <View style={{ marginTop: 100 }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  width: "100%",
                }}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: "flex-start",
                    alignItems: "center",
                    flexDirection: "row",
                    marginBottom: 10,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 20,
                      textAlign: "left",
                      fontWeight: "bold",
                    }}
                  >
                    {"              "}
                    Exersize
                    {"       "}
                    Sets
                    {"  "}
                    Reps
                    {"  "}
                    Weight
                  </Text>
                </View>
              </View>

              <View
                style={{
                  backgroundColor: colors.darkGrey,
                  width: "90%",
                  alignSelf: "center",
                  flex: 1,
                  padding: 5,
                  borderRadius: 10,
                }}
              >
                {exersizes.map((item, index) => {
                  if (!mainLiftIndexs.includes(index)) {
                    if (
                      item.exersize === "Squat" ||
                      item.exersize === "Bench" ||
                      item.exersize === "Overhead Press"
                    ) {
                      setMainLiftIndexs(mainLiftIndexs.concat([index]));
                    }
                  } else {
                    if (
                      item.exersize !== "Squat" &&
                      item.exersize !== "Bench" &&
                      item.exersize !== "Overhead Press"
                    ) {
                      setMainLiftIndexs(
                        mainLiftIndexs.filter(
                          (currIndex) => index !== currIndex
                        )
                      );
                    }
                  }
                  return (
                    <TouchableOpacity
                      key={index}
                      style={{ flex: 1 }}
                      onPress={() => {
                        if (!selectedIndexs.includes(index)) {
                          setSelectedIndexs(selectedIndexs.concat([index]));
                        } else {
                          setSelectedIndexs(
                            selectedIndexs.filter(
                              (currIndex) => currIndex !== index
                            )
                          );
                        }
                      }}
                    >
                      <View
                        style={{
                          flex: 1,
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "row",
                          width: "100%",
                          marginTop: 10,
                          marginBottom: 10,
                          backgroundColor: colors.darkGrey,
                        }}
                      >
                        <Text
                          style={{
                            margin: 5,
                            padding: 5,
                            color: mainLiftIndexs.includes(index)
                              ? colors.primary
                              : "white",
                            fontSize: 15,
                            width: "40%",
                            textAlign: "center",
                            fontWeight: mainLiftIndexs.includes(index)
                              ? "bold"
                              : "normal",
                            opacity: selectedIndexs.includes(index) ? 0.2 : 1,
                          }}
                        >
                          {item.exersize}
                        </Text>
                        <Text
                          style={{
                            margin: 5,
                            padding: 5,
                            color: "white",
                            fontSize: 15,
                            width: "12%",
                            textAlign: "center",
                            opacity: selectedIndexs.includes(index) ? 0.2 : 1,
                          }}
                        >
                          {item.sets}
                        </Text>
                        <Text
                          style={{
                            margin: 5,
                            padding: 5,
                            color: "white",
                            fontSize: 15,
                            width: "13%",
                            textAlign: "center",
                            opacity: selectedIndexs.includes(index) ? 0.2 : 1,
                          }}
                        >
                          {item.reps}
                        </Text>
                        <Text
                          style={{
                            margin: 5,
                            padding: 5,
                            color: "white",
                            fontSize: 15,
                            width: "17%",
                            marginRight: 5,
                            textAlign: "center",
                            opacity: selectedIndexs.includes(index) ? 0.2 : 1,
                          }}
                        >
                          {mainLiftIndexs.includes(index)
                            ? convertMax(item.weight, item.exersize)
                            : item.weight}
                        </Text>
                      </View>
                      {exersizes.length === index + 1 ? undefined : (
                        <View
                          style={{
                            borderColor: colors.lightGrey,
                            borderWidth: 0.5,
                            width: "95%",
                            alignSelf: "flex-end",
                          }}
                        />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )
        }
        nav={props.navigation}
        onScroll={(pos) => {
          if (
            pos.nativeEvent.contentOffset.y < 40 &&
            pos.nativeEvent.contentOffset.y > 0
          ) {
            setBlur(pos.nativeEvent.contentOffset.y);
          } else if (pos.nativeEvent.contentOffset.y > 40) {
            setBlur(40);
          } else if (pos.nativeEvent.contentOffset.y < 0) {
            setBlur(0);
          }
        }}
      />
      <BlurView
        intensity={blur}
        style={{
          width: "100%",
          height: "12%",
          justifyContent: "flex-end",
          ...StyleSheet.absoluteFillObject,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: colors.textColors.headerText,
            alignSelf: "center",
            marginBottom: 10,
          }}
        >
          {dayDisp}
        </Text>
      </BlurView>
    </View>
  );
};

export default FitnessDay;
