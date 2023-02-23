import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, TouchableOpacity } from "react-native";
import {
  AntDesign,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
import { updatePower } from "../../store/actions/updatePower";
import moment from "moment";

//components
import ScrollViewContainer from "../../components/scrollViewContainer";
import BottomNavigationTab from "../../components/bottomNavTab";

const FitnessWeek = (props) => {
  const colors = useSelector((state) => state.colors);
  const power = useSelector((state) => state.power);
  const biweekly = useSelector((state) => state.biweekly);
  const maxBench = useSelector((state) => state.maxBench);
  const maxSquat = useSelector((state) => state.maxSquat);
  const maxOHP = useSelector((state) => state.maxOHP);

  const dispatch = useDispatch();

  let mondayExersizes;
  let tuesdayExersizes;
  let wednesdayExersizes;
  let thursdayExersizes;
  let fridayExersizes;
  let saturdayExersizes;
  let sundayExersizes;
  switch (power) {
    case true: {
      mondayExersizes = useSelector((state) => state.mondayExersizes);
      tuesdayExersizes = useSelector((state) => state.tuesdayExersizes);
      wednesdayExersizes = useSelector((state) => state.wednesdayExersizes);
      thursdayExersizes = useSelector((state) => state.thursdayExersizes);
      fridayExersizes = useSelector((state) => state.fridayExersizes);
      saturdayExersizes = useSelector((state) => state.saturdayExersizes);
      sundayExersizes = useSelector((state) => state.sundayExersizes);
      break;
    }
    case false: {
      mondayExersizes = useSelector((state) => state.mondayExersizesB);
      tuesdayExersizes = useSelector((state) => state.tuesdayExersizesB);
      wednesdayExersizes = useSelector((state) => state.wednesdayExersizesB);
      thursdayExersizes = useSelector((state) => state.thursdayExersizesB);
      fridayExersizes = useSelector((state) => state.fridayExersizesB);
      saturdayExersizes = useSelector((state) => state.saturdayExersizesB);
      sundayExersizes = useSelector((state) => state.sundayExersizesB);
      break;
    }
    default: {
      mondayExersizes = useSelector((state) => state.mondayExersizes);
      tuesdayExersizes = useSelector((state) => state.tuesdayExersizes);
      wednesdayExersizes = useSelector((state) => state.wednesdayExersizes);
      thursdayExersizes = useSelector((state) => state.thursdayExersizes);
      fridayExersizes = useSelector((state) => state.fridayExersizes);
      saturdayExersizes = useSelector((state) => state.saturdayExersizes);
      sundayExersizes = useSelector((state) => state.sundayExersizes);
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

  const DayComponent = (props) => {
    const [selected, setSelected] = useState(true);
    const [mainLiftIndexs, setMainLiftIndexs] = useState([]);
    const [isRestDay, setIsRestDay] = useState(false);
    const [exersizes, setExersizes] = useState([]);

    const currDay = moment().format("dddd");

    useEffect(() => {
      if (props.exersizes !== undefined) {
        setExersizes(props.exersizes);
      }
      if (props.exersizes.at(0).exersize === "Rest") {
        setIsRestDay(true);
      }
    }, []);

    return (
      <View>
        <TouchableOpacity
          onPress={() => {
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
      {!biweekly ? null : (
        <View
          style={{
            flex: 0,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            backgroundColor: colors.secondary,
          }}
        >
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={{ alignItems: "center" }}
              onPress={() => {
                dispatch(updatePower(true));
              }}
            >
              <MaterialCommunityIcons
                name={power ? "arm-flex" : "arm-flex-outline"}
                color={"white"}
                size={30}
              />
              <View style={{ marginBottom: 5 }} />
              <Text
                style={{
                  fontSize: 15,
                  color: colors.textColors.headerText,
                  fontWeight: power ? "bold" : "normal",
                  textAlign: "center",
                }}
              >
                Power
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={{ alignItems: "center" }}
              onPress={() => {
                dispatch(updatePower(false));
              }}
            >
              <AntDesign
                name={!power ? "smile-circle" : "smileo"}
                color={"white"}
                size={20}
              />
              <View style={{ marginBottom: 5 }} />
              <Text
                style={{
                  fontSize: 15,
                  color: colors.textColors.headerText,
                  fontWeight: !power ? "bold" : "normal",
                  textAlign: "center",
                }}
              >
                BB
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <View style={{ flex: 0.9 }}>
        <ScrollViewContainer
          content={
            <View>
              <View style={{ marginTop: 20 }} />
              <DayComponent day="Monday" exersizes={mondayExersizes} />
              <DayComponent day="Tuesday" exersizes={tuesdayExersizes} />
              <DayComponent day="Wednesday" exersizes={wednesdayExersizes} />
              <DayComponent day="Thursday" exersizes={thursdayExersizes} />
              <DayComponent day="Friday" exersizes={fridayExersizes} />
              <DayComponent day="Saturday" exersizes={saturdayExersizes} />
              <DayComponent day="Sunday" exersizes={sundayExersizes} />
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
