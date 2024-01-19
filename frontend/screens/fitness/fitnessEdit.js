import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator,
  Switch,
  LayoutAnimation,
  SafeAreaView,
  Alert,
} from "react-native";
import uuid from "react-native-uuid";
import { updateExersizes } from "../../store/actions/updateExersizes";
import { toggleNoSchedule } from "../../store/actions/switchNoSchedule";
import { switchRunning } from "../../store/actions/switchRunning";
import { Notifier, Easing, NotifierComponents } from "react-native-notifier";
import {
  AntDesign,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import FitnessMaxes from "./fitnessMaxes";
import Card from "../../components/card";

//components
import ScrollViewContainer from "../../components/scrollViewContainer";

const FitnessEdit = (props) => {
  const colors = useSelector((state) => state.colors);
  const noschedule = useSelector((state) => state.noschedule);
  const running = useSelector((state) => state.running);
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

  const [switchSelected, setSwitchSelected] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Monday", value: "monday" },
    { label: "Tuesday", value: "tuesday" },
    { label: "Wednesday", value: "wednesday" },
    { label: "Thursday", value: "thursday" },
    { label: "Friday", value: "friday" },
    { label: "Saturday", value: "saturday" },
    { label: "Sunday", value: "sunday" },
  ]);

  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  const [items2, setItems2] = useState([
    { label: "Monday", value: "monday" },
    { label: "Tuesday", value: "tuesday" },
    { label: "Wednesday", value: "wednesday" },
    { label: "Thursday", value: "thursday" },
    { label: "Friday", value: "friday" },
    { label: "Saturday", value: "saturday" },
    { label: "Sunday", value: "sunday" },
  ]);

  const DayComponent = (props) => {
    const [selected, setSelected] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [mainLiftIndexs, setMainLiftIndexs] = useState([]);
    const [isRestDay, setIsRestDay] = useState(false);
    const [swapExersize, setSwapExersize] = useState(false);
    const [swapExersizeFirst, setSwapExersizeFirst] = useState(null);
    const [wasEdited, setWasEdited] = useState(false);
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
      if (props.exersizes.at(0).exersize.toLowerCase() === "rest") {
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
      } else if (props.day === "Push") {
        passedDay = 7;
      } else if (props.day === "Pull") {
        passedDay = 8;
      } else if (props.day === "Legs") {
        passedDay = 9;
      }
      const worked = await dispatch(updateExersizes(passedDay, exersizes));
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
      setWasEdited(false);
    };

    const handleExersizeChange = (index, val) => {
      if (!wasEdited) {
        setWasEdited(true);
      }
      let data = [...exersizes];
      data[index].exersize = val;
      if (val.toLowerCase() === "rest") {
        setIsRestDay(true);
      } else {
        setIsRestDay(false);
      }
      setExersizes(data);
    };

    const handleSetsChange = (index, val) => {
      if (!wasEdited) {
        setWasEdited(true);
      }
      let data = [...exersizes];
      data[index].sets = val;
      setExersizes(data);
    };

    const handleRepsChange = (index, val) => {
      if (!wasEdited) {
        setWasEdited(true);
      }
      let data = [...exersizes];
      data[index].reps = val;
      setExersizes(data);
    };

    const handleWeightChange = (index, val) => {
      if (!wasEdited) {
        setWasEdited(true);
      }
      let data = [...exersizes];
      data[index].weight = val;
      setExersizes(data);
    };

    const addExersize = () => {
      if (!wasEdited) {
        setWasEdited(true);
      }
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
      if (!wasEdited) {
        setWasEdited(true);
      }
      let data = [...exersizes];
      data.splice(index, 1);
      setExersizes(data);
    };

    const swapExersizes = (exersize, index) => {
      if (swapExersizeFirst === exersize) {
        setSwapExersizeFirst(null);
        return;
      } else if (swapExersizeFirst === null) {
        setSwapExersizeFirst(exersize);
        return;
      } else {
        if (!wasEdited) {
          setWasEdited(true);
        }
        const firstIndex = exersizes.findIndex(
          (curr) => curr === swapExersizeFirst
        );
        const localExersizes = [...exersizes];
        const b = localExersizes[index];
        localExersizes[index] = localExersizes[firstIndex];
        localExersizes[firstIndex] = b;
        setExersizes(localExersizes);
        setSwapExersizeFirst(null);
      }
    };

    const submitDisabled = () => {
      if (swapExersize) {
        return true;
      } else if (!wasEdited) {
        return true;
      } else {
        return false;
      }
    };

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
          disabled={!submitDisabled()}
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
              return !isRestDay ? (
                <TouchableOpacity
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    width: "100%",
                  }}
                  key={index}
                  disabled={!swapExersize}
                  onPress={() => {
                    swapExersizes(item, index);
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 30,
                      fontWeight: mainLiftIndexs.includes(index)
                        ? "bold"
                        : "normal",
                      opacity:
                        swapExersize && swapExersizeFirst !== item ? 0.4 : 1,
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
                      editable={swapExersize ? false : true}
                      selectTextOnFocus={swapExersize ? false : true}
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
                      editable={swapExersize ? false : true}
                      selectTextOnFocus={swapExersize ? false : true}
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
                      editable={swapExersize ? false : true}
                      selectTextOnFocus={swapExersize ? false : true}
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
                      editable={swapExersize ? false : true}
                      selectTextOnFocus={swapExersize ? false : true}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        removeExersize(index);
                      }}
                      style={{ marginRight: 5, opacity: swapExersize ? 0 : 1 }}
                      disabled={swapExersize ? true : false}
                    >
                      <AntDesign name="minuscircleo" size={20} color="red" />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ) : (
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
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                marginTop: 10,
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                onPress={addExersize}
                style={{
                  marginLeft: 5,
                  opacity: swapExersize || isRestDay ? 0 : 1,
                }}
                disabled={swapExersize || isRestDay ? true : false}
              >
                <AntDesign name="pluscircleo" size={30} color="green" />
              </TouchableOpacity>
              {isRestDay ? null : (
                <TouchableOpacity
                  onPress={() => {
                    setSwapExersize(!swapExersize);
                  }}
                  style={{
                    marginRight: 10,
                    alignItems: "flex-end",
                  }}
                >
                  {exersizes.length > 1 ? (
                    swapExersize ? (
                      <AntDesign name="check" size={30} color="#03a9f5" />
                    ) : (
                      <Ionicons
                        name="ios-swap-vertical"
                        size={30}
                        color="#03a9f5"
                      />
                    )
                  ) : null}
                </TouchableOpacity>
              )}
            </View>
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
                  opacity: submitDisabled() ? 0 : 1,
                }}
                disabled={submitDisabled() ? true : false}
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
        ) : undefined}
        <View style={{ marginBottom: 30 }} />
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.secondary }}>
      <ScrollViewContainer
        content={
          <View style={{ flex: 1, marginTop: 20 }}>
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
            <View style={{ width: "90%", alignSelf: "center", marginTop: 20 }}>
              <Text
                style={{
                  fontSize: 30,
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Options
              </Text>
              <Card
                style={{ backgroundColor: "#1c1c1e" }}
                content={
                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        backgroundColor: "#1c1c1e",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginLeft: 20,
                        marginTop: 10,
                        marginRight: 20,
                        padding: 15,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 20,
                          color: "white",
                        }}
                      >
                        Running
                      </Text>
                      <Switch
                        onValueChange={() => {
                          Alert.alert(
                            "Beta",
                            "Running mode is in beta, some features may not work as expected!",
                            [
                              {
                                text: "Ok",
                                onPress: () => {
                                  dispatch(switchRunning(!running));
                                },
                              },
                              {
                                text: "Cancel",
                                style: "cancel",
                              },
                            ]
                          );
                        }}
                        value={running}
                        ios_backgroundColor={colors.darkGrey}
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        backgroundColor: "#1c1c1e",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginLeft: 20,
                        marginTop: 10,
                        marginRight: 20,
                        padding: 15,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 20,
                          color: "white",
                        }}
                      >
                        No Schedule
                      </Text>
                      <Switch
                        onValueChange={() => {
                          LayoutAnimation.configureNext(
                            LayoutAnimation.create(
                              200,
                              LayoutAnimation.Types.linear,
                              LayoutAnimation.Properties.opacity
                            )
                          );
                          dispatch(toggleNoSchedule());
                        }}
                        value={noschedule}
                        ios_backgroundColor={colors.darkGrey}
                      />
                    </View>
                    <View
                      style={{
                        backgroundColor: "#1c1c1e",
                        marginLeft: 20,
                        marginRight: 20,
                        marginTop: 10,
                        padding: 15,
                        flex: 1,
                        marginBottom: 20,
                      }}
                    >
                      <View
                        style={{
                          flex: 1,
                          justifyContent: "space-between",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            LayoutAnimation.configureNext(
                              LayoutAnimation.create(
                                200,
                                LayoutAnimation.Types.linear,
                                LayoutAnimation.Properties.opacity
                              )
                            );
                            setSwitchSelected(!switchSelected);
                          }}
                          style={{ flex: 1 }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "center",
                              flex: 1,
                              width: "100%",
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 20,
                                color: colors.textColors.headerText,
                                fontWeight: switchSelected ? "bold" : "normal",
                              }}
                            >
                              Switch Days
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
                                name={switchSelected ? "arrowup" : "arrowdown"}
                                color={"white"}
                                size={20}
                              />
                            </View>
                          </View>
                        </TouchableOpacity>
                      </View>
                      {switchSelected ? (
                        <View style={{ marginTop: 20 }}>
                          <View
                            style={{
                              backgroundColor: "#1c1c1e",
                              flex: 1,
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <DropDownPicker
                              open={open}
                              value={value}
                              items={items}
                              setOpen={setOpen}
                              setValue={setValue}
                              setItems={setItems}
                              theme="DARK"
                              multiple={false}
                              mode="SIMPLE"
                              placeholder="Select a day"
                              dropDownDirection="TOP"
                            />
                          </View>
                          <View
                            style={{
                              backgroundColor: "#1c1c1e",
                              flex: 1,
                              alignItems: "center",
                              justifyContent: "center",
                              marginTop: 10,
                            }}
                          >
                            <DropDownPicker
                              open={open2}
                              value={value2}
                              items={items2}
                              setOpen={setOpen2}
                              setValue={setValue2}
                              setItems={setItems2}
                              theme="DARK"
                              multiple={false}
                              mode="SIMPLE"
                              placeholder="Select a day"
                              dropDownDirection="BOTTOM"
                            />
                          </View>

                          {value !== null &&
                          value2 !== null &&
                          !open &&
                          !open2 ? (
                            !submitLoading ? (
                              <TouchableOpacity
                                onPress={async () => {
                                  setSubmitLoading(true);
                                  let day1;
                                  let day2;
                                  let day1exersizes;
                                  let day2exersizes;
                                  switch (value) {
                                    case "monday":
                                      day1 = 0;
                                      day1exersizes = mondayExersizes;
                                      break;
                                    case "tuesday":
                                      day1 = 1;
                                      day1exersizes = tuesdayExersizes;
                                      break;
                                    case "wednesday":
                                      day1 = 2;
                                      day1exersizes = wednesdayExersizes;
                                      break;
                                    case "thursday":
                                      day1 = 3;
                                      day1exersizes = thursdayExersizes;
                                      break;
                                    case "friday":
                                      day1 = 4;
                                      day1exersizes = fridayExersizes;
                                      break;
                                    case "saturday":
                                      day1 = 5;
                                      day1exersizes = saturdayExersizes;
                                      break;
                                    case "sunday":
                                      day1 = 6;
                                      day1exersizes = sundayExersizes;
                                      break;
                                    default:
                                      break;
                                  }

                                  switch (value2) {
                                    case "monday":
                                      day2 = 0;
                                      day2exersizes = mondayExersizes;
                                      break;
                                    case "tuesday":
                                      day2 = 1;
                                      day2exersizes = tuesdayExersizes;
                                      break;
                                    case "wednesday":
                                      day2 = 2;
                                      day2exersizes = wednesdayExersizes;
                                      break;
                                    case "thursday":
                                      day2 = 3;
                                      day2exersizes = thursdayExersizes;
                                      break;
                                    case "friday":
                                      day2 = 4;
                                      day2exersizes = fridayExersizes;
                                      break;
                                    case "saturday":
                                      day2 = 5;
                                      day2exersizes = saturdayExersizes;
                                      break;
                                    case "sunday":
                                      day2 = 6;
                                      day2exersizes = sundayExersizes;
                                      break;
                                    default:
                                      break;
                                  }
                                  const worked1 = await dispatch(
                                    updateExersizes(day1, day2exersizes)
                                  );
                                  const worked2 = await dispatch(
                                    updateExersizes(day2, day1exersizes)
                                  );
                                  if (worked1 && worked2) {
                                    Notifier.showNotification({
                                      title: "Success!",
                                      description:
                                        "Your program was updated successfully.",
                                      Component: NotifierComponents.Alert,
                                      componentProps: {
                                        alertType: "success",
                                      },
                                    });
                                  } else {
                                    Notifier.showNotification({
                                      title: "Failure",
                                      description:
                                        "Your program failed to update.",
                                      Component: NotifierComponents.Alert,
                                      componentProps: {
                                        alertType: "error",
                                      },
                                    });
                                  }
                                  setSubmitLoading(false);
                                  setSwitchSelected(false);
                                  setValue(null);
                                  setValue2(null);
                                }}
                                style={{
                                  borderWidth: 1,
                                  borderColor: "grey",
                                  padding: 5,
                                  borderRadius: 20,
                                  width: "50%",
                                  alignSelf: "center",
                                  backgroundColor: colors.primary,
                                  marginTop: 20,
                                }}
                              >
                                <Text
                                  style={{
                                    color: "white",
                                    fontSize: 20,
                                    textAlign: "center",
                                  }}
                                >
                                  Switch
                                </Text>
                              </TouchableOpacity>
                            ) : (
                              <ActivityIndicator
                                size="large"
                                style={{ marginTop: 20 }}
                              />
                            )
                          ) : null}
                        </View>
                      ) : null}
                    </View>
                  </View>
                }
              />
            </View>
            <FitnessMaxes props={props} />
            <View style={{ marginBottom: 160 }} />
          </View>
        }
        nav={props.navigation}
      />
    </SafeAreaView>
  );
};

export default FitnessEdit;
