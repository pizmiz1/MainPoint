import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  TextInput,
  Switch,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ScrollViewContainer from "../../components/scrollViewContainer";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { updateMealAction } from "../../store/actions/updateMeal";

const GroceryMacros = (props) => {
  const dispatch = useDispatch();

  const colors = useSelector((state) => state.colors);
  const meals = useSelector((state) => state.meals);

  const [switchedMeals, setSwitchedMeals] = useState([]);
  const [calories, setCalories] = useState(0);
  const [bodyweight, setBodyweight] = useState(0);
  const [lbsPerWeek, setLbsPerWeek] = useState(0);
  const [calsToSubtract, setCalsToSubtract] = useState(0);
  const [calsToAdd, setCalsToAdd] = useState(0);
  const [editing, setEditing] = useState(false);
  const [logs, setLogs] = useState([]);
  const [logsSelected, setLogsSelected] = useState(null);

  useEffect(() => {
    const load = async () => {
      const savedCals = await AsyncStorage.getItem("Calories");
      let foundCals;
      if (savedCals) {
        foundCals = await JSON.parse(savedCals).data;
        if (foundCals) {
          setCalories(foundCals);
        }
      }

      const savedBodyweight = await AsyncStorage.getItem("Bodyweight");
      if (savedBodyweight) {
        const transformed = await JSON.parse(savedBodyweight).data;
        if (transformed) {
          setBodyweight(transformed);
        }
      }

      const savedLbsPerWeek = await AsyncStorage.getItem("LbsPerWeek");
      if (savedLbsPerWeek) {
        const transformed = await JSON.parse(savedLbsPerWeek).data;
        if (transformed) {
          setLbsPerWeek(transformed);
        }
      }

      const switchedMeals = await AsyncStorage.getItem("Switched Meals");
      if (switchedMeals) {
        const transformed = await JSON.parse(switchedMeals).data;
        if (transformed) {
          setSwitchedMeals(transformed);
        }
      }

      const logs = await AsyncStorage.getItem("Logs");
      if (logs) {
        const transformed = await JSON.parse(logs).data;
        if (transformed) {
          setLogs(transformed);
        }
      }

      const logsSelected = await AsyncStorage.getItem("Logs Selected");
      if (logsSelected) {
        const transformed = await JSON.parse(logsSelected).data;
        if (transformed) {
          setLogsSelected(transformed);
        }
      } else {
        setLogsSelected(true);
      }
    };
    load();
  }, []);

  const calcCalsRemaining = () => {
    return parseInt(bodyweight) * 15 - parseFloat(lbsPerWeek) * 420;
  };

  const MealSwitchComp = (props) => {
    const [mealCals, updateMealCals] = useState(
      props.cals !== undefined ? props.cals.toString() : ""
    );

    const toggleSwitch = async () => {
      const alreadySwitched = switchedMeals.includes(props.index);
      if (alreadySwitched) {
        setSwitchedMeals(switchedMeals.filter((curr) => curr !== props.index));
        await AsyncStorage.setItem(
          "Switched Meals",
          JSON.stringify({
            data: switchedMeals.filter((curr) => curr !== props.index),
          })
        );
        if (mealCals === "") {
          return;
        }
        setCalories(parseInt(calories) + parseInt(mealCals));
        await AsyncStorage.setItem(
          "Calories",
          JSON.stringify({
            data: parseInt(calories) + parseInt(mealCals),
          })
        );
        const log = {
          type: "add",
          cals: mealCals,
        };
        setLogs(logs.concat([log]));
        await AsyncStorage.setItem(
          "Logs",
          JSON.stringify({
            data: logs.concat([log]),
          })
        );
      } else {
        const test = switchedMeals.concat([props.index]);
        setSwitchedMeals(test);
        await AsyncStorage.setItem(
          "Switched Meals",
          JSON.stringify({
            data: test,
          })
        );
        if (mealCals === "") {
          return;
        }
        setCalories(parseInt(calories) - parseInt(mealCals));
        await AsyncStorage.setItem(
          "Calories",
          JSON.stringify({
            data: parseInt(calories) - parseInt(mealCals),
          })
        );
        const log = {
          type: "subtract",
          cals: mealCals,
        };
        setLogs(logs.concat([log]));
        await AsyncStorage.setItem(
          "Logs",
          JSON.stringify({
            data: logs.concat([log]),
          })
        );
      }
    };

    return (
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 15,
          marginLeft: 20,
          marginRight: 20,
          marginTop: 20,
          padding: 15,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            //justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              alignSelf: "center",
              fontSize: 25,
              width: "90%",
            }}
          >
            {props.mealName}
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            {editing ? (
              <TextInput
                value={mealCals}
                onChangeText={updateMealCals}
                onEndEditing={async () => {
                  const oldCals = meals.filter(
                    (curr) => curr.Name === props.mealName
                  )[0].Calories;

                  const alreadySwitched = switchedMeals.includes(props.index);
                  if (alreadySwitched) {
                    setSwitchedMeals(
                      switchedMeals.filter((curr) => curr !== props.index)
                    );
                    await AsyncStorage.setItem(
                      "Switched Meals",
                      JSON.stringify({
                        data: switchedMeals.filter(
                          (curr) => curr !== props.index
                        ),
                      })
                    );
                    if (mealCals === "") {
                      return;
                    }
                    setCalories(parseInt(calories) + parseInt(oldCals));
                    await AsyncStorage.setItem(
                      "Calories",
                      JSON.stringify({
                        data: parseInt(calories) + parseInt(oldCals),
                      })
                    );
                    const log = {
                      type: "add",
                      cals: oldCals,
                    };
                    setLogs(logs.concat([log]));
                    await AsyncStorage.setItem(
                      "Logs",
                      JSON.stringify({
                        data: logs.concat([log]),
                      })
                    );
                  }

                  const updatedMeal = {
                    Name: props.mealName,
                    Groceries: props.groceries,
                    Calories: parseInt(mealCals),
                  };
                  await dispatch(updateMealAction(updatedMeal, props.index));
                }}
                keyboardType="numeric"
                maxLength={4}
                style={{
                  fontSize: 20,
                  borderBottomColor: "grey",
                  borderBottomWidth: 0.5,
                  width: "250%",
                  textAlign: "center",
                }}
              />
            ) : (
              <Switch
                value={switchedMeals.includes(props.index)}
                onValueChange={toggleSwitch}
              />
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.9 }}>
        <ScrollViewContainer
          keyboardShouldPersistTaps={true}
          style={{ backgroundColor: colors.lightGrey }}
          content={
            editing ? (
              <View
                style={{
                  //flex: 1,
                  alignItems: "center",
                  //justifyContent: "center",
                  marginBottom: 65,
                  backgroundColor: colors.lightGrey,
                  marginTop: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 40,
                    textDecorationLine: "underline",
                    color: colors.textColors.headerText,
                    marginTop: 0,
                  }}
                >
                  Calories Remaining
                </Text>
                <Text
                  style={{ fontSize: 70, color: colors.textColors.headerText }}
                >
                  {calories}
                </Text>
                {meals.map((item, index) => {
                  return (
                    <View key={index}>
                      <MealSwitchComp
                        mealName={item.Name}
                        cals={item.Calories}
                        groceries={item.Groceries}
                        index={index}
                      />
                    </View>
                  );
                })}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    width: "100%",
                    marginTop: 70,
                  }}
                >
                  <View style={{ alignItems: "center" }}>
                    <Text>Bodyweight</Text>
                    <TextInput
                      value={bodyweight}
                      onChangeText={setBodyweight}
                      keyboardType="numeric"
                      maxLength={3}
                      style={{
                        fontSize: 30,
                        borderBottomColor: "grey",
                        borderBottomWidth: 1,
                        width: "90%",
                        textAlign: "center",
                      }}
                      placeholder="100"
                      placeholderTextColor="#D4D4D4"
                    />
                  </View>
                  <View style={{ alignItems: "center" }}>
                    <Text>Lbs Per Week</Text>
                    <TextInput
                      value={lbsPerWeek}
                      onChangeText={setLbsPerWeek}
                      keyboardType="numeric"
                      maxLength={3}
                      style={{
                        fontSize: 30,
                        borderBottomColor: "grey",
                        borderBottomWidth: 1,
                        width: "90%",
                        textAlign: "center",
                      }}
                      placeholder="1.5"
                      placeholderTextColor="#D4D4D4"
                    />
                  </View>
                </View>
                <TouchableOpacity
                  onPress={async () => {
                    setCalories(calcCalsRemaining());
                    await AsyncStorage.setItem(
                      "Calories",
                      JSON.stringify({
                        data: calcCalsRemaining(),
                      })
                    );
                    setSwitchedMeals([]);
                    await AsyncStorage.setItem(
                      "Switched Meals",
                      JSON.stringify({
                        data: [],
                      })
                    );
                    const log = {
                      type: "add",
                      cals: "Reset",
                    };
                    setLogs(logs.concat([log]));
                    await AsyncStorage.setItem(
                      "Logs",
                      JSON.stringify({
                        data: logs.concat([log]),
                      })
                    );
                  }}
                  style={{
                    padding: 5,
                    borderRadius: 20,
                    width: "50%",
                    alignSelf: "center",
                    backgroundColor: colors.primary,
                    marginTop: 15,
                  }}
                >
                  <Text
                    style={{
                      color: colors.textColors.headerText,
                      fontSize: 20,
                      textAlign: "center",
                    }}
                  >
                    Reset Cals
                  </Text>
                </TouchableOpacity>
                <View style={{ marginBottom: 200 }} />
              </View>
            ) : (
              <View
                style={{
                  //flex: 1,
                  alignItems: "center",
                  //justifyContent: "center",
                  marginBottom: 65,
                  backgroundColor: colors.lightGrey,
                  marginTop: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 40,
                    textDecorationLine: "underline",
                    color: colors.textColors.headerText,
                    marginTop: 0,
                  }}
                >
                  Calories Remaining
                </Text>
                <Text
                  style={{ fontSize: 70, color: colors.textColors.headerText }}
                >
                  {calories}
                </Text>
                <View
                  style={{
                    width: "100%",
                    marginTop: 15,
                    marginBottom: 15,
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                >
                  <View style={{ width: "24%", alignItems: "center" }}>
                    <Text>Food</Text>
                    <TextInput
                      value={calsToSubtract}
                      onChangeText={setCalsToSubtract}
                      keyboardType="number-pad"
                      maxLength={4}
                      style={{
                        fontSize: 30,
                        borderBottomColor: "grey",
                        borderBottomWidth: 1,
                        textAlign: "center",
                        width: "90%",
                      }}
                      placeholder="500"
                      placeholderTextColor="#D4D4D4"
                    />
                    <TouchableOpacity
                      onPress={async () => {
                        setCalories(
                          parseInt(calories) - parseInt(calsToSubtract)
                        );
                        await AsyncStorage.setItem(
                          "Calories",
                          JSON.stringify({
                            data: parseInt(calories) - parseInt(calsToSubtract),
                          })
                        );
                        const log = {
                          type: "sub",
                          cals: calsToSubtract,
                        };
                        setLogs(logs.concat([log]));
                        await AsyncStorage.setItem(
                          "Logs",
                          JSON.stringify({
                            data: logs.concat([log]),
                          })
                        );
                        setCalsToSubtract(0);
                      }}
                      style={{
                        padding: 5,
                        borderRadius: 20,
                        width: "100%",
                        alignSelf: "center",
                        backgroundColor: colors.primary,
                        marginTop: 15,
                        width: "130%",
                      }}
                    >
                      <Text
                        style={{
                          color: colors.textColors.headerText,
                          fontSize: 20,
                          textAlign: "center",
                        }}
                      >
                        Subtract
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ width: "24%", alignItems: "center" }}>
                    <Text>Exercise</Text>
                    <TextInput
                      value={calsToAdd}
                      onChangeText={setCalsToAdd}
                      keyboardType="number-pad"
                      maxLength={4}
                      style={{
                        fontSize: 30,
                        borderBottomColor: "grey",
                        borderBottomWidth: 1,
                        textAlign: "center",
                        width: "100%",
                      }}
                      placeholder="500"
                      placeholderTextColor="#D4D4D4"
                    />
                    <TouchableOpacity
                      onPress={async () => {
                        setCalories(parseInt(calories) + parseInt(calsToAdd));
                        await AsyncStorage.setItem(
                          "Calories",
                          JSON.stringify({
                            data: parseInt(calories) + parseInt(calsToAdd),
                          })
                        );
                        const log = {
                          type: "add",
                          cals: calsToAdd,
                        };
                        setLogs(logs.concat([log]));
                        await AsyncStorage.setItem(
                          "Logs",
                          JSON.stringify({
                            data: logs.concat([log]),
                          })
                        );
                        setCalsToAdd(0);
                      }}
                      style={{
                        padding: 5,
                        borderRadius: 20,
                        width: "100%",
                        alignSelf: "center",
                        backgroundColor: colors.primary,
                        marginTop: 15,
                        width: "130%",
                      }}
                    >
                      <Text
                        style={{
                          color: colors.textColors.headerText,
                          fontSize: 20,
                          textAlign: "center",
                        }}
                      >
                        Add
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                {meals.map((item, index) => {
                  return (
                    <View key={index}>
                      <MealSwitchComp
                        mealName={item.Name}
                        cals={item.Calories}
                        groceries={item.Groceries}
                        index={index}
                      />
                    </View>
                  );
                })}
                <View style={{ width: "100%" }}>
                  <TouchableOpacity
                    onPress={async () => {
                      LayoutAnimation.configureNext(
                        LayoutAnimation.create(
                          200,
                          LayoutAnimation.Types.linear,
                          LayoutAnimation.Properties.opacity
                        )
                      );
                      setLogsSelected(!logsSelected);
                      await AsyncStorage.setItem(
                        "Logs Selected",
                        JSON.stringify({
                          data: !logsSelected,
                        })
                      );
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        //flex: 1,
                        width: "100%",
                        marginTop: 30,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 25,
                          color: colors.textColors.headerText,
                          fontWeight: logsSelected ? "bold" : "normal",
                          marginLeft: 20,
                        }}
                      >
                        Logs
                      </Text>
                      <View
                        style={{
                          //alignSelf: "center",
                          marginTop: 5,
                          //justifyContent: "center",
                          //flex: 1,
                          marginRight: 10,
                        }}
                      >
                        <AntDesign
                          name={logsSelected ? "arrowup" : "arrowdown"}
                          color={"black"}
                          size={20}
                        />
                      </View>
                    </View>
                    <View
                      style={{
                        borderBottomColor: "#D4D4D4",
                        borderBottomWidth: 1,
                        width: "100%",
                      }}
                    />
                  </TouchableOpacity>
                  {logsSelected && logs.length !== 0 ? (
                    <View>
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
                        {logs.map((item, index) => {
                          const getTColor = () => {
                            if (item.cals === "Reset") {
                              return "black";
                            } else if (item.type === "add") {
                              return "green";
                            } else {
                              return "red";
                            }
                          };

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
                                    color: getTColor(),
                                    fontSize: 20,
                                    width: "40%",
                                    textAlign: "center",
                                    fontWeight: "normal",
                                  }}
                                >
                                  {item.cals}
                                </Text>
                              </View>
                              {logs.length === index + 1 ? undefined : (
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
                      <TouchableOpacity
                        onPress={async () => {
                          setLogs([]);
                          await AsyncStorage.setItem(
                            "Logs",
                            JSON.stringify({
                              data: [],
                            })
                          );
                        }}
                        style={{
                          padding: 5,
                          borderRadius: 20,
                          width: "50%",
                          alignSelf: "center",
                          backgroundColor: colors.primary,
                          marginTop: 15,
                        }}
                      >
                        <Text
                          style={{
                            color: colors.textColors.headerText,
                            fontSize: 20,
                            textAlign: "center",
                          }}
                        >
                          Clear Logs
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ) : undefined}
                </View>
              </View>
            )
          }
          nav={props.navigation}
        ></ScrollViewContainer>
      </View>
      {editing ? (
        <View
          style={{
            flex: 0.1,
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            justifyContent: "flex-end",
            backgroundColor: colors.secondary,
          }}
        >
          <TouchableOpacity
            onPress={async () => {
              LayoutAnimation.configureNext(
                LayoutAnimation.create(
                  200,
                  LayoutAnimation.Types.linear,
                  LayoutAnimation.Properties.opacity
                )
              );
              if (calories === "") {
                setCalories(0);
              }
              setEditing(false);
              await AsyncStorage.setItem(
                "Calories",
                JSON.stringify({
                  data: calories,
                })
              );
              await AsyncStorage.setItem(
                "Bodyweight",
                JSON.stringify({
                  data: bodyweight,
                })
              );
              await AsyncStorage.setItem(
                "LbsPerWeek",
                JSON.stringify({
                  data: lbsPerWeek,
                })
              );
              const GroceryData = await AsyncStorage.getItem("Grocery Data");
              if (GroceryData) {
                const transformedGroceryData = await JSON.parse(GroceryData)
                  .data;
                transformedGroceryData.at(2).Meals = meals;
                await AsyncStorage.setItem(
                  "Grocery Data",
                  JSON.stringify({
                    data: transformedGroceryData,
                  })
                );
              }
            }}
            style={{ alignSelf: "center", marginRight: 13 }}
          >
            <AntDesign name="check" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={{
            flex: 0.1,
            flexDirection: "row",
            alignItems: "center",
            width: "90%",
            backgroundColor: colors.secondary,
          }}
        >
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: colors.secondary,
            }}
          >
            <Text
              style={{
                marginLeft: 35,
                color: parseInt(calories) < 0 ? "red" : "green",
              }}
            >
              {parseInt(calories) < 0
                ? calories * -1 + " Over"
                : calories + " Remaining"}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              LayoutAnimation.configureNext(
                LayoutAnimation.create(
                  200,
                  LayoutAnimation.Types.linear,
                  LayoutAnimation.Properties.opacity
                )
              );
              setEditing(true);
            }}
            style={{
              alignSelf: "center",
              backgroundColor: colors.secondary,
              width: "100%",
              height: "100%",
              justifyContent: "center",
            }}
          >
            <Entypo name="new-message" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default GroceryMacros;
