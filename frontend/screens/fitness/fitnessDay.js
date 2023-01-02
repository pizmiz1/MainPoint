import React, { useState } from "react";
import { useSelector } from "react-redux";
import { View, Text } from "react-native";
import moment from "moment";

//components
import ScrollViewContainer from "../../components/scrollViewContainer";
import BottomNavigationTab from "../../components/bottomNavTab";

const FitnessDay = (props) => {
  const [mainLiftIndexs, setMainLiftIndexs] = useState([]);
  const [isRestDay, setIsRestDay] = useState(false);

  const colors = useSelector((state) => state.colors);
  const power = useSelector((state) => state.power);

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

  return (
    <View style={{ flex: 1 }}>
      <ScrollViewContainer
        content={
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
                    mainLiftIndexs.filter((currIndex) => index !== currIndex)
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
                      {item.weight}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        }
        nav={props.navigation}
      />
      <BottomNavigationTab screenName="DAY" {...props} />
    </View>
  );
};

export default FitnessDay;
