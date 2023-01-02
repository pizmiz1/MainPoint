import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator,
} from "react-native";
import uuid from "react-native-uuid";
import { updateExersizes } from "../../store/actions/updateExersizes";
import { updatePower } from "../../store/actions/updatePower";
import { Notifier, Easing, NotifierComponents } from "react-native-notifier";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

//components
import ScrollViewContainer from "../../components/scrollViewContainer";

const FitnessEdit = (props) => {
  const colors = useSelector((state) => state.colors);
  const power = useSelector((state) => state.power);
  const mondayExersizes = useSelector((state) => state.mondayExersizes);
  const tuesdayExersizes = useSelector((state) => state.tuesdayExersizes);
  const wednesdayExersizes = useSelector((state) => state.wednesdayExersizes);
  const thursdayExersizes = useSelector((state) => state.thursdayExersizes);
  const fridayExersizes = useSelector((state) => state.fridayExersizes);
  const saturdayExersizes = useSelector((state) => state.saturdayExersizes);
  const sundayExersizes = useSelector((state) => state.sundayExersizes);
  const mondayExersizesB = useSelector((state) => state.mondayExersizesB);
  const tuesdayExersizesB = useSelector((state) => state.tuesdayExersizesB);
  const wednesdayExersizesB = useSelector((state) => state.wednesdayExersizesB);
  const thursdayExersizesB = useSelector((state) => state.thursdayExersizesB);
  const fridayExersizesB = useSelector((state) => state.fridayExersizesB);
  const saturdayExersizesB = useSelector((state) => state.saturdayExersizesB);
  const sundayExersizesB = useSelector((state) => state.sundayExersizesB);

  const dispatch = useDispatch();

  const DayComponent = (props) => {
    const [selected, setSelected] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [mainLiftIndexs, setMainLiftIndexs] = useState([]);
    const [isRestDay, setIsRestDay] = useState(false);
    const [exersizes, setExersizes] = useState([
      {
        id: uuid.v4(),
        exersize: "",
        sets: "",
        reps: "",
        weight: "",
      },
    ]);

    useEffect(() => {
      if (props.exersizes !== undefined) {
        setExersizes(props.exersizes);
      }
      if (props.exersizes.at(0).exersize === "Rest") {
        setIsRestDay(true);
      }
    }, []);

    const submit = async () => {
      setSubmitLoading(true);
      let passedDay;
      if (props.day === "Monday") {
        passedDay = 0;
      } else if (props.day === "Tuesday") {
        passedDay = 1;
      } else if (props.day === "Wednesday") {
        passedDay = 2;
      } else if (props.day === "Thursday") {
        passedDay = 3;
      } else if (props.day === "Friday") {
        passedDay = 4;
      } else if (props.day === "Saturday") {
        passedDay = 5;
      } else if (props.day === "Sunday") {
        passedDay = 6;
      }
      const worked = await dispatch(
        updateExersizes(passedDay, power, exersizes)
      );
      if (worked) {
        Notifier.showNotification({
          title: "Success!",
          description: "Your program was updated successfully.",
          Component: NotifierComponents.Alert,
          componentProps: {
            alertType: "success",
          },
        });
      } else {
        Notifier.showNotification({
          title: "Failure",
          description: "Your program failed to update.",
          Component: NotifierComponents.Alert,
          componentProps: {
            alertType: "error",
          },
        });
      }
      setSubmitLoading(false);
    };

    const handleExersizeChange = (index, val) => {
      let data = [...exersizes];
      data[index].exersize = val;
      if (val === "Rest") {
        setIsRestDay(true);
      } else {
        setIsRestDay(false);
      }
      setExersizes(data);
    };

    const handleSetsChange = (index, val) => {
      let data = [...exersizes];
      data[index].sets = val;
      setExersizes(data);
    };

    const handleRepsChange = (index, val) => {
      let data = [...exersizes];
      data[index].reps = val;
      setExersizes(data);
    };

    const handleWeightChange = (index, val) => {
      let data = [...exersizes];
      data[index].weight = val;
      setExersizes(data);
    };

    const addExersize = () => {
      let newExersize = {
        id: uuid.v4(),
        exersize: "",
        sets: "",
        reps: "",
        weight: "",
      };
      setExersizes([...exersizes, newExersize]);
    };

    const removeExersize = (index) => {
      let data = [...exersizes];
      data.splice(index, 1);
      setExersizes(data);
    };

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
            <View>
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
                        flex: 1,
                        justifyContent: "flex-end",
                        alignItems: "center",
                        flexDirection: "row",
                      }}
                    >
                      <TextInput
                        value={item.exersize}
                        placeholder="Exersize"
                        onChangeText={(val) => handleExersizeChange(index, val)}
                        style={{
                          //margin: 5,
                          borderWidth: 1,
                          padding: 5,
                          borderColor: "white",
                          borderRadius: 10,
                          color: "white",
                          fontSize: 15,
                          width: "40%",
                        }}
                        textAlign="center"
                      />
                      <TextInput
                        value={item.sets}
                        placeholder="Sets"
                        onChangeText={(val) => handleSetsChange(index, val)}
                        style={{
                          margin: 5,
                          borderWidth: 1,
                          padding: 5,
                          borderColor: "white",
                          borderRadius: 10,
                          color: "white",
                          fontSize: 15,
                          width: "12%",
                        }}
                        textAlign="center"
                        keyboardType="number-pad"
                      />
                      <TextInput
                        value={item.reps}
                        placeholder="Reps"
                        onChangeText={(val) => handleRepsChange(index, val)}
                        style={{
                          //margin: 5,
                          borderWidth: 1,
                          padding: 5,
                          borderColor: "white",
                          borderRadius: 10,
                          color: "white",
                          fontSize: 15,
                          width: "13%",
                        }}
                        textAlign="center"
                        keyboardType="number-pad"
                      />
                      <TextInput
                        value={item.weight}
                        placeholder={
                          mainLiftIndexs.includes(index) ? "Percent" : "Weight"
                        }
                        onChangeText={(val) => handleWeightChange(index, val)}
                        style={{
                          margin: 5,
                          borderWidth: 1,
                          padding: 5,
                          borderColor: "white",
                          borderRadius: 10,
                          color: "white",
                          fontSize: 15,
                          width: "17%",
                          marginRight: 5,
                        }}
                        textAlign="center"
                        keyboardType={
                          mainLiftIndexs.includes(index)
                            ? "decimal-pad"
                            : "number-pad"
                        }
                      />
                      <TouchableOpacity
                        onPress={() => {
                          removeExersize(index);
                        }}
                        style={{ marginRight: 5 }}
                      >
                        <AntDesign name="minuscircleo" size={20} color="red" />
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
              <TouchableOpacity
                onPress={addExersize}
                style={{ marginLeft: 5, marginTop: 10 }}
              >
                <AntDesign name="pluscircleo" size={30} color="green" />
              </TouchableOpacity>
              {submitLoading ? (
                <ActivityIndicator size="large" />
              ) : (
                <TouchableOpacity
                  onPress={submit}
                  style={{
                    borderWidth: 1,
                    borderColor: "grey",
                    padding: 5,
                    borderRadius: 20,
                    width: "50%",
                    alignSelf: "center",
                    backgroundColor: colors.primary,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 20,
                      textAlign: "center",
                    }}
                  >
                    Submit
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          ) : (
            <View>
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
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                      }}
                    >
                      <TextInput
                        value={item.exersize}
                        placeholder="Exersize"
                        onChangeText={(val) => handleExersizeChange(index, val)}
                        style={{
                          margin: 5,
                          borderWidth: 1,
                          padding: 5,
                          borderColor: "white",
                          borderRadius: 10,
                          color: "white",
                          fontSize: 15,
                          width: "90%",
                        }}
                        textAlign="center"
                      />
                    </View>
                  </View>
                );
              })}
              {submitLoading ? (
                <ActivityIndicator size="large" />
              ) : (
                <TouchableOpacity
                  onPress={submit}
                  style={{
                    borderWidth: 1,
                    borderColor: "grey",
                    padding: 5,
                    borderRadius: 20,
                    width: "50%",
                    alignSelf: "center",
                    backgroundColor: colors.primary,
                    marginTop: 10,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 20,
                      textAlign: "center",
                    }}
                  >
                    Submit
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )
        ) : undefined}
        <View style={{ marginBottom: 30 }} />
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 0,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
          backgroundColor: colors.secondary,
          borderBottomColor: colors.lightGrey,
          borderBottomWidth: 1,
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
      <ScrollViewContainer
        content={
          <View style={{ flex: 1, marginTop: 20 }}>
            <DayComponent
              day="Monday"
              exersizes={power ? mondayExersizes : mondayExersizesB}
            />
            <DayComponent
              day="Tuesday"
              exersizes={power ? tuesdayExersizes : tuesdayExersizesB}
            />
            <DayComponent
              day="Wednesday"
              exersizes={power ? wednesdayExersizes : wednesdayExersizesB}
            />
            <DayComponent
              day="Thursday"
              exersizes={power ? thursdayExersizes : thursdayExersizesB}
            />
            <DayComponent
              day="Friday"
              exersizes={power ? fridayExersizes : fridayExersizesB}
            />
            <DayComponent
              day="Saturday"
              exersizes={power ? saturdayExersizes : saturdayExersizesB}
            />
            <DayComponent
              day="Sunday"
              exersizes={power ? sundayExersizes : sundayExersizesB}
            />
            <View style={{ marginBottom: 200 }} />
          </View>
        }
        nav={props.navigation}
      />
    </View>
  );
};

export default FitnessEdit;
