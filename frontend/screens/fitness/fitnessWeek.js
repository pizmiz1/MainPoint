import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  StyleSheet,
} from "react-native";
import {
  AntDesign,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
import moment from "moment";
import { BlurView } from "expo-blur";

//components
import ScrollViewContainer from "../../components/scrollViewContainer";

const FitnessWeek = (props) => {
  const colors = useSelector((state) => state.colors);
  const noschedule = useSelector((state) => state.noschedule);
  const maxBench = useSelector((state) => state.maxBench);
  const maxSquat = useSelector((state) => state.maxSquat);
  const maxOHP = useSelector((state) => state.maxOHP);
  const mondayExersizes = useSelector((state) => state.mondayExersizes);
  const tuesdayExersizes = useSelector((state) => state.tuesdayExersizes);
  const wednesdayExersizes = useSelector((state) => state.wednesdayExersizes);
  const thursdayExersizes = useSelector((state) => state.thursdayExersizes);
  const fridayExersizes = useSelector((state) => state.fridayExersizes);
  const saturdayExersizes = useSelector((state) => state.saturdayExersizes);
  const sundayExersizes = useSelector((state) => state.sundayExersizes);
  const pushExersizes = useSelector((state) => state.pushExersizes);
  const pullExersizes = useSelector((state) => state.pullExersizes);
  const legsExersizes = useSelector((state) => state.legsExersizes);

  let weekDisp;
  const dayDisp = moment().format("dddd");
  if (dayDisp === "Tuesday") {
    weekDisp = moment().subtract(1, "days").format("MMM Do");
  } else if (dayDisp === "Wednesday") {
    weekDisp = moment().subtract(2, "days").format("MMM Do");
  } else if (dayDisp === "Thursday") {
    weekDisp = moment().subtract(3, "days").format("MMM Do");
  } else if (dayDisp === "Friday") {
    weekDisp = moment().subtract(4, "days").format("MMM Do");
  } else if (dayDisp === "Saturday") {
    weekDisp = moment().subtract(5, "days").format("MMM Do");
  } else if (dayDisp === "Sunday") {
    weekDisp = moment().subtract(6, "days").format("MMM Do");
  } else {
    weekDisp = moment().format("MMM Do");
  }

  const dispatch = useDispatch();

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

  const DayComponent = (props) => {
    const [selected, setSelected] = useState(true);
    const [mainLiftIndexs, setMainLiftIndexs] = useState([]);
    const [isRestDay, setIsRestDay] = useState(
      props.exersizes.at(0).exersize === "Rest"
    );

    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            LayoutAnimation.configureNext(
              LayoutAnimation.create(
                200,
                LayoutAnimation.Types.linear,
                LayoutAnimation.Properties.opacity
              )
            );
            setSelected(!selected);
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              flex: 1,
              width: "100%",
              marginTop: 5,
            }}
          >
            <Text
              style={{
                fontSize: 25,
                color: colors.textColors.headerText,
                fontWeight: selected ? "bold" : "normal",
                marginLeft: 10,
              }}
            >
              {props.day}
            </Text>
            <View
              style={{
                alignItems: "flex-end",
                alignSelf: "flex-end",
                marginBottom: 3,
                flex: 1,
              }}
            >
              <AntDesign
                name={selected ? "arrowup" : "arrowdown"}
                color={"white"}
                size={20}
              />
            </View>
          </View>
          <View
            style={{
              borderBottomColor: colors.lightGrey,
              borderBottomWidth: 1,
            }}
          />
        </TouchableOpacity>
        {selected ? (
          !isRestDay ? (
            <View
              style={{
                backgroundColor: colors.darkGrey,
                width: "90%",
                alignSelf: "center",
                flex: 1,
                padding: 5,
                borderRadius: 10,
                marginTop: 20,
              }}
            >
              {props.exersizes.map((item, index) => {
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
                      mainLiftIndexs.filter((currIndex) => index !== currIndex)
                    );
                  }
                }
                return (
                  <View key={index}>
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
                    {props.exersizes.length === index + 1 ? undefined : (
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
          ) : (
            <View
              style={{
                backgroundColor: colors.darkGrey,
                width: "90%",
                alignSelf: "center",
                flex: 1,
                padding: 5,
                borderRadius: 10,
                marginTop: 20,
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
                <FontAwesome
                  name={"bed"}
                  color={"white"}
                  size={20}
                  style={{ marginLeft: 5, marginRight: 5 }}
                />
                <FontAwesome
                  name={"bed"}
                  color={"white"}
                  size={20}
                  style={{ marginLeft: 5, marginRight: 5 }}
                />
                <FontAwesome
                  name={"bed"}
                  color={"white"}
                  size={20}
                  style={{ marginLeft: 5, marginRight: 5 }}
                />
                <Text
                  style={{
                    //margin: 5,
                    //padding: 5,
                    color: "white",
                    fontSize: 15,
                    textAlign: "center",
                  }}
                >
                  Rest Day {"  "}
                </Text>
                <FontAwesome
                  name={"bed"}
                  color={"white"}
                  size={20}
                  style={{ marginLeft: 5, marginRight: 5 }}
                />
                <FontAwesome
                  name={"bed"}
                  color={"white"}
                  size={20}
                  style={{ marginLeft: 5, marginRight: 5 }}
                />
                <FontAwesome
                  name={"bed"}
                  color={"white"}
                  size={20}
                  style={{ marginLeft: 5, marginRight: 5 }}
                />
              </View>
            </View>
          )
        ) : undefined}
        <View style={{ marginBottom: 30 }} />
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollViewContainer
        content={
          <View>
            <View style={{ marginTop: 80 }} />
            {noschedule ? (
              <View>
                <DayComponent day="Push" exersizes={pushExersizes} />
                <DayComponent day="Pull" exersizes={pullExersizes} />
                <DayComponent day="Legs" exersizes={legsExersizes} />
              </View>
            ) : (
              <View>
                <DayComponent day="Monday" exersizes={mondayExersizes} />
                <DayComponent day="Tuesday" exersizes={tuesdayExersizes} />
                <DayComponent day="Wednesday" exersizes={wednesdayExersizes} />
                <DayComponent day="Thursday" exersizes={thursdayExersizes} />
                <DayComponent day="Friday" exersizes={fridayExersizes} />
                <DayComponent day="Saturday" exersizes={saturdayExersizes} />
                <DayComponent day="Sunday" exersizes={sundayExersizes} />
              </View>
            )}
          </View>
        }
        nav={props.navigation}
      />
      <BlurView
        intensity={20}
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
          {weekDisp}
        </Text>
      </BlurView>
    </View>
  );
};

export default FitnessWeek;
