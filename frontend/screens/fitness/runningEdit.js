import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  TouchableOpacity,
  Switch,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { switchRunning } from "../../store/actions/switchRunning";
import { AntDesign } from "@expo/vector-icons";
import { Notifier, Easing, NotifierComponents } from "react-native-notifier";
import uuid from "react-native-uuid";
import { FontAwesome } from "@expo/vector-icons";
import { updateRunning } from "../../store/actions/updateRunning";
import { updateRunningStartDate } from "../../store/actions/updateRunningStartDate";
import moment from "moment";
import Constants from "expo-constants";

import ScrollViewContainer from "../../components/scrollViewContainer";

const RunningEdit = (props) => {
  const colors = useSelector((state) => state.colors);
  const running = useSelector((state) => state.running);
  const runningData = useSelector((state) => state.runningData);
  const startDate = useSelector((state) => state.startDate);

  useEffect(() => {
    setChosenDate(new Date(startDate));
  }, []);

  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [chosenDate, setChosenDate] = useState(new Date());
  const [dateSelectOpen, setDateSelectOpen] = useState(true);
  const [weeks, setWeeks] = useState([
    {
      weekNum: 1,
      mondayMiles: "",
      tuesdayMiles: "",
      wednesdayMiles: "",
      thursdayMiles: "",
      fridayMiles: "",
      saturdayMiles: "",
      sundayMiles: "",
    },
  ]);

  useEffect(() => {
    setWeeks(runningData);
  }, []);

  const handleMondayChange = (index, val) => {
    if (submitDisabled) {
      setSubmitDisabled(false);
    }
    let data = [...weeks];
    data[index].mondayMiles = val;
    setWeeks(data);
  };

  const handleTuesdayChange = (index, val) => {
    if (submitDisabled) {
      setSubmitDisabled(false);
    }
    let data = [...weeks];
    data[index].tuesdayMiles = val;
    setWeeks(data);
  };

  const handleWednesdayChange = (index, val) => {
    if (submitDisabled) {
      setSubmitDisabled(false);
    }
    let data = [...weeks];
    data[index].wednesdayMiles = val;
    setWeeks(data);
  };

  const handleThursdayChange = (index, val) => {
    if (submitDisabled) {
      setSubmitDisabled(false);
    }
    let data = [...weeks];
    data[index].thursdayMiles = val;
    setWeeks(data);
  };

  const handleFridayChange = (index, val) => {
    if (submitDisabled) {
      setSubmitDisabled(false);
    }
    let data = [...weeks];
    data[index].fridayMiles = val;
    setWeeks(data);
  };

  const handleSaturdayChange = (index, val) => {
    if (submitDisabled) {
      setSubmitDisabled(false);
    }
    let data = [...weeks];
    data[index].saturdayMiles = val;
    setWeeks(data);
  };

  const handleSundayChange = (index, val) => {
    if (submitDisabled) {
      setSubmitDisabled(false);
    }
    let data = [...weeks];
    data[index].sundayMiles = val;
    setWeeks(data);
  };

  const addWeek = () => {
    if (submitDisabled) {
      setSubmitDisabled(false);
    }
    let newWeek = {
      weekNum: weeks.length + 1,
      mondayMiles: "",
      tuesdayMiles: "",
      wednesdayMiles: "",
      thursdayMiles: "",
      fridayMiles: "",
      saturdayMiles: "",
      sundayMiles: "",
    };
    setWeeks([...weeks, newWeek]);
  };

  const removeWeek = (index) => {
    if (submitDisabled) {
      setSubmitDisabled(false);
    }
    let data = [...weeks];
    data.splice(index, 1);
    setWeeks(data);
  };

  const dispatch = useDispatch();

  const submit = async () => {
    setSubmitDisabled(true);
    await AsyncStorage.setItem(
      "Running Data",
      JSON.stringify({
        data: weeks,
      })
    );
    const worked = await dispatch(updateRunning(weeks));
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
  };

  return (
    <ScrollViewContainer
      content={
        <View style={{ flex: 1, backgroundColor: colors.secondary }}>
          <View style={{ flexDirection: "row", marginLeft: 30, marginTop: 10 }}>
            <Text style={{ fontSize: 20, marginLeft: 8 }}>Mon</Text>
            <Text style={{ fontSize: 20, marginLeft: 5 }}>Tues</Text>
            <Text style={{ fontSize: 20, marginLeft: 4 }}>Wed</Text>
            <Text style={{ fontSize: 20, marginLeft: 5 }}>Thur</Text>
            <Text style={{ fontSize: 20, marginLeft: 12 }}>Fri</Text>
            <Text style={{ fontSize: 20, marginLeft: 20 }}>Sat</Text>
            <Text style={{ fontSize: 20, marginLeft: 13 }}>Sun</Text>
          </View>
          <View>
            {weeks.map((item, index) => {
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
                      color: colors.textColors.headerText,
                      fontSize: 30,
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
                      value={item.mondayMiles}
                      onChangeText={(val) => handleMondayChange(index, val)}
                      style={{
                        margin: 5,
                        padding: 5,
                        borderRadius: 10,
                        borderBottomWidth: 1,
                        color: colors.textColors.headerText,
                        fontSize: 15,
                        width: "10%",
                        marginRight: 5,
                      }}
                      textAlign="center"
                      keyboardType="number-pad"
                    />
                    <TextInput
                      value={item.tuesdayMiles}
                      onChangeText={(val) => handleTuesdayChange(index, val)}
                      style={{
                        margin: 5,
                        borderBottomWidth: 1,
                        padding: 5,
                        borderRadius: 10,
                        color: colors.textColors.headerText,
                        fontSize: 15,
                        width: "10%",
                        marginRight: 5,
                      }}
                      textAlign="center"
                      keyboardType="number-pad"
                    />
                    <TextInput
                      value={item.wednesdayMiles}
                      onChangeText={(val) => handleWednesdayChange(index, val)}
                      style={{
                        margin: 5,
                        borderBottomWidth: 1,
                        padding: 5,
                        borderRadius: 10,
                        color: colors.textColors.headerText,
                        fontSize: 15,
                        width: "10%",
                        marginRight: 5,
                      }}
                      textAlign="center"
                      keyboardType="number-pad"
                    />
                    <TextInput
                      value={item.thursdayMiles}
                      onChangeText={(val) => handleThursdayChange(index, val)}
                      style={{
                        margin: 5,
                        borderBottomWidth: 1,
                        padding: 5,
                        borderRadius: 10,
                        color: colors.textColors.headerText,
                        fontSize: 15,
                        width: "10%",
                        marginRight: 5,
                      }}
                      textAlign="center"
                      keyboardType="number-pad"
                    />
                    <TextInput
                      value={item.fridayMiles}
                      onChangeText={(val) => handleFridayChange(index, val)}
                      style={{
                        margin: 5,
                        borderBottomWidth: 1,
                        padding: 5,
                        borderRadius: 10,
                        color: colors.textColors.headerText,
                        fontSize: 15,
                        width: "10%",
                        marginRight: 5,
                      }}
                      textAlign="center"
                      keyboardType="number-pad"
                    />
                    <TextInput
                      value={item.saturdayMiles}
                      onChangeText={(val) => handleSaturdayChange(index, val)}
                      style={{
                        margin: 5,
                        borderBottomWidth: 1,
                        padding: 5,
                        borderRadius: 10,
                        color: colors.textColors.headerText,
                        fontSize: 15,
                        width: "10%",
                        marginRight: 5,
                      }}
                      textAlign="center"
                      keyboardType="number-pad"
                    />
                    <TextInput
                      value={item.sundayMiles}
                      onChangeText={(val) => handleSundayChange(index, val)}
                      style={{
                        margin: 5,
                        borderBottomWidth: 1,
                        padding: 5,
                        borderRadius: 10,
                        color: colors.textColors.headerText,
                        fontSize: 15,
                        width: "10%",
                        marginRight: 5,
                      }}
                      textAlign="center"
                      keyboardType="number-pad"
                    />
                    <TouchableOpacity
                      onPress={() => {
                        removeWeek(index);
                      }}
                      style={{ marginRight: 5, alignSelf: "flex-end" }}
                    >
                      <AntDesign name="minuscircleo" size={20} color="red" />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </View>
          <TouchableOpacity
            onPress={addWeek}
            style={{
              marginLeft: 5,
            }}
          >
            <AntDesign name="pluscircleo" size={30} color="green" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={submit}
            style={{
              padding: 5,
              borderRadius: 20,
              width: "50%",
              alignSelf: "center",
              backgroundColor: colors.primary,
              opacity: submitDisabled ? 0 : 1,
            }}
            disabled={submitDisabled ? true : false}
          >
            <Text
              style={{
                color: colors.textColors.headerText,
                fontSize: 20,
                textAlign: "center",
              }}
            >
              Submit
            </Text>
          </TouchableOpacity>
          <View
            style={{
              backgroundColor: colors.secondary,
              justifyContent: "flex-end",
              flex: 1,
              marginBottom: 40,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                backgroundColor: colors.lightGrey,
                justifyContent: "space-between",
                alignIte5: "center",
                borderRadius: 15,
                marginLeft: 20,
                marginRight: 20,
                marginTop: 20,
                padding: 15,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: colors.textColors.headerText,
                }}
              >
                Running
              </Text>
              <Switch
                onValueChange={() => {
                  dispatch(switchRunning(!running));
                }}
                value={running}
                ios_backgroundColor={colors.darkGrey}
              />
            </View>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                backgroundColor: colors.lightGrey,
                justifyContent: "space-between",
                alignIte5: "center",
                borderRadius: 15,
                marginLeft: 20,
                marginRight: 20,
                marginTop: 20,
                padding: 15,
              }}
              onPress={() => {
                setDateSelectOpen(!dateSelectOpen);
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: colors.textColors.headerText,
                  fontWeight: dateSelectOpen ? "normal" : "bold",
                }}
              >
                Start Date
              </Text>
              <DateTimePicker
                value={chosenDate}
                onChange={async (event, date) => {
                  setChosenDate(date);
                  if (event.type === "dismissed") {
                    let realDate;
                    if (moment(date).format("ddd") !== "Sun") {
                      realDate = new Date(moment(date).day("Sunday"));
                      setChosenDate(realDate);
                    } else {
                      realDate = date;
                    }
                    dispatch(updateRunningStartDate(realDate));
                    await AsyncStorage.setItem(
                      "Start Date",
                      JSON.stringify({
                        data: realDate,
                      })
                    );
                    setDateSelectOpen(true);
                  }
                }}
                mode="date"
                themeVariant="light"
                timeZoneOffsetInMinutes={
                  Constants.executionEnvironment === "storeClient" ? 300 : 0
                }
                disabled={dateSelectOpen}
              />
            </TouchableOpacity>
          </View>
        </View>
      }
      nav={props.navigation}
    />
  );
};

export default RunningEdit;
