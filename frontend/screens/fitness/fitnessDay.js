import React, { useState } from "react";
import { useSelector } from "react-redux";
import { View, Text } from "react-native";
import moment from "moment";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { FontAwesome } from "@expo/vector-icons";

//components
import ScrollViewContainer from "../../components/scrollViewContainer";
import BottomNavigationTab from "../../components/bottomNavTab";

const FitnessDay = (props) => {
  const [mainLiftIndexs, setMainLiftIndexs] = useState([]);
  const [isRestDay, setIsRestDay] = useState(false);

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
      <View style={{ flex: 0.9 }}>
        <ScrollViewContainer
          content={
            exersizes.at(0).exersize === "Rest" ? (
              <View>
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
              <View>
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
                      justifyContent: "flex-end",
                      alignItems: "center",
                      flexDirection: "row",
                      marginBottom: 10,
                      borderBottomColor: colors.lightGrey,
                      borderBottomWidth: 1,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 20,
                        width: "30%",
                        textAlign: "left",
                        fontWeight: "bold",
                      }}
                    >
                      Exersize
                    </Text>
                    <Text
                      style={{
                        color: "white",
                        fontSize: 20,
                        width: "15%",
                        textAlign: "left",
                        fontWeight: "bold",
                      }}
                    >
                      Sets
                    </Text>
                    <Text
                      style={{
                        color: "white",
                        fontSize: 20,
                        width: "15%",
                        textAlign: "left",
                        fontWeight: "bold",
                      }}
                    >
                      Reps
                    </Text>
                    <Text
                      style={{
                        color: "white",
                        fontSize: 20,
                        width: "20%",
                        textAlign: "left",
                        fontWeight: "bold",
                      }}
                    >
                      Weight
                    </Text>
                  </View>
                </View>

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
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        width: "100%",
                        marginTop: 10,
                      }}
                      key={index}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontSize: 30,
                          fontWeight: mainLiftIndexs.includes(index)
                            ? "bold"
                            : "normal",
                        }}
                      >
                        {" "}
                        {index + 1}.
                      </Text>
                      <View
                        style={{
                          //flex: 1,
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "row",
                          borderWidth: 1,
                          borderColor: "white",
                          borderRadius: 20,
                          width: "85%",
                          marginLeft: 20,
                          backgroundColor: mainLiftIndexs.includes(index)
                            ? colors.primary
                            : colors.secondary,
                        }}
                      >
                        <Text
                          style={{
                            margin: 5,
                            padding: 5,
                            color: "white",
                            fontSize: 15,
                            width: "40%",
                            textAlign: "center",
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
                          }}
                        >
                          {mainLiftIndexs.includes(index)
                            ? convertMax(item.weight, item.exersize)
                            : item.weight}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            )
          }
          nav={props.navigation}
        />
      </View>
      <BottomNavigationTab screenName="DAY" {...props} />
    </View>
  );
};

export default FitnessDay;
