import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
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
  const maxBench = useSelector((state) => state.maxBench);
  const maxSquat = useSelector((state) => state.maxSquat);
  const maxOHP = useSelector((state) => state.maxOHP);
  const noschedule = useSelector((state) => state.noschedule);
  const pushExersizes = useSelector((state) => state.pushExersizes);
  const pullExersizes = useSelector((state) => state.pullExersizes);
  const legsExersizes = useSelector((state) => state.legsExersizes);

  const dayDisp = moment().format("dddd");

  let exersizes;
  switch (dayDisp) {
    case "Monday": {
      exersizes = useSelector((state) => state.mondayExersizes);
      break;
    }
    case "Tuesday": {
      exersizes = useSelector((state) => state.tuesdayExersizes);
      break;
    }
    case "Wednesday": {
      exersizes = useSelector((state) => state.wednesdayExersizes);
      break;
    }
    case "Thursday": {
      exersizes = useSelector((state) => state.thursdayExersizes);
      break;
    }
    case "Friday": {
      exersizes = useSelector((state) => state.fridayExersizes);
      break;
    }
    case "Saturday": {
      exersizes = useSelector((state) => state.saturdayExersizes);
      break;
    }
    case "Sunday": {
      exersizes = useSelector((state) => state.sundayExersizes);
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

  const PPLComp = (props) => {
    let marginLeft;
    let marginRight;
    switch (props.day) {
      case "Push": {
        exersizes = pushExersizes;
        marginLeft = 17;
        marginRight = 30;
        break;
      }
      case "Pull": {
        exersizes = pullExersizes;
        marginLeft = 30;
        marginRight = 30;
        break;
      }
      case "Legs": {
        exersizes = legsExersizes;
        marginLeft = 30;
        marginRight = 17;
        break;
      }
    }

    return (
      <View
        style={{
          marginTop: 100,
          flex: 1,
          marginLeft: marginLeft,
          marginRight: marginRight,
          width: 340,
        }}
      >
        <View
          style={{
            backgroundColor: colors.darkGrey,
            padding: 5,
            borderRadius: 10,
          }}
        >
          {exersizes.map((item, index) => {
            const isMainLift =
              item.exersize === "Squat" ||
              item.exersize === "Bench" ||
              item.exersize === "Overhead Press";
            return (
              <View key={index} style={{ backgroundColor: colors.darkGrey }}>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 10,
                    marginBottom: 10,
                    backgroundColor: colors.darkGrey,
                    justifyContent: "space-between",
                    padding: 5,
                    alignItems: "center",
                  }}
                >
                  <View style={{ marginRight: 15, flex: 1 }}>
                    <Text
                      style={{
                        margin: 5,
                        padding: 5,
                        color: isMainLift ? colors.primary : "white",
                        fontSize: 15,
                        textAlign: "center",
                        fontWeight: isMainLift ? "bold" : "normal",
                        opacity: selectedIndexs.includes(index) ? 0.2 : 1,
                      }}
                    >
                      {item.exersize}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      marginLeft: 15,
                      flex: 1,
                      //justifyContent: "flex-end",
                    }}
                  >
                    <Text
                      style={{
                        margin: 5,
                        padding: 5,
                        color: "white",
                        fontSize: 15,
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
                        marginRight: 5,
                        textAlign: "center",
                        opacity: selectedIndexs.includes(index) ? 0.2 : 1,
                      }}
                    >
                      {isMainLift
                        ? convertMax(item.weight, item.exersize)
                        : item.weight}
                    </Text>
                  </View>
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
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollViewContainer
        content={
          noschedule ? (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                width: "100%",
              }}
            >
              <PPLComp day={"Push"} />
              <PPLComp day={"Pull"} />
              <PPLComp day={"Legs"} />
            </View>
          ) : exersizes.at(0).exersize === "Rest" ? (
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
            pos.nativeEvent.contentOffset.y < 20 &&
            pos.nativeEvent.contentOffset.y > 0
          ) {
            setBlur(pos.nativeEvent.contentOffset.y);
          } else if (pos.nativeEvent.contentOffset.y > 20) {
            setBlur(40);
          } else if (pos.nativeEvent.contentOffset.y < 0) {
            setBlur(0);
          }
        }}
        horizontal={noschedule}
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
          {noschedule ? "PPL" : dayDisp}
        </Text>
      </BlurView>
    </View>
  );
};

export default FitnessDay;
