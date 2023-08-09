import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  TextInput,
  Switch,
  Animated,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ScrollViewContainer from "../../components/scrollViewContainer";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { updateMealAction } from "../../store/actions/updateMeal";
import Card from "../../components/card";
import { AnimatedCircularProgress } from "react-native-circular-progress";

const Calories = (props) => {
  const dispatch = useDispatch();

  const colors = useSelector((state) => state.colors);
  const meals = useSelector((state) => state.meals);

  const [switchedMeals, setSwitchedMeals] = useState([]);
  const [calories, setCalories] = useState(0);
  const [bodyweight, setBodyweight] = useState(0);
  const [lbsPerWeek, setLbsPerWeek] = useState(0);
  const [calsTyped, setCalsTyped] = useState("");
  const [editing, setEditing] = useState(false);
  const [logs, setLogs] = useState([]);
  const [logsSelected, setLogsSelected] = useState(null);
  const [mealsSelected, setMealsSelected] = useState(null);

  const errorFade = useRef(new Animated.Value(0)).current;

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

      const mealsSelected = await AsyncStorage.getItem("Meals Selected");
      if (mealsSelected) {
        const transformed = await JSON.parse(mealsSelected).data;
        if (transformed) {
          setMealsSelected(transformed);
        }
      } else {
        setMealsSelected(true);
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

  const subtractOrAddCals = async (subtract) => {
    if (calsTyped === "") {
      Animated.timing(errorFade, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
      return;
    }
    setCalsTyped("");
    let newCals;
    if (subtract) {
      newCals = parseInt(calories) - parseInt(calsTyped);
    } else {
      newCals = parseInt(calories) + parseInt(calsTyped);
    }
    setCalories(newCals);
    await AsyncStorage.setItem(
      "Calories",
      JSON.stringify({
        data: newCals,
      })
    );
    const log = {
      type: subtract ? "sub" : "add",
      cals: calsTyped,
    };
    setLogs(logs.concat([log]));
    await AsyncStorage.setItem(
      "Logs",
      JSON.stringify({
        data: logs.concat([log]),
      })
    );
  };

  const handleCalorieEditing = async () => {
    if (!editing) {
      LayoutAnimation.configureNext(
        LayoutAnimation.create(
          200,
          LayoutAnimation.Types.linear,
          LayoutAnimation.Properties.opacity
        )
      );
      setEditing(true);
    } else {
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
        const transformedGroceryData = await JSON.parse(GroceryData).data;
        transformedGroceryData.at(2).Meals = meals;
        await AsyncStorage.setItem(
          "Grocery Data",
          JSON.stringify({
            data: transformedGroceryData,
          })
        );
      }
      setEditing(false);
    }
  };

  // COMPS
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
      }
      const log = {
        type: alreadySwitched ? "add" : "subtract",
        cals: mealCals,
      };
      setLogs(logs.concat([log]));
      await AsyncStorage.setItem(
        "Logs",
        JSON.stringify({
          data: logs.concat([log]),
        })
      );
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
              color: colors.textColors.headerText,
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
    <Animated.View style={{ flex: 1 }}>
      <ScrollViewContainer
        keyboardShouldPersistTaps={true}
        content={
          <View
            style={{
              //flex: 1,
              alignItems: "center",
              //justifyContent: "center",
              width: "90%",
              alignSelf: "center",
              //marginBottom: 65,
              backgroundColor: colors.secondary,
              marginTop: 20,
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                marginBottom: 10,
                alignItems: "flex-end",
              }}
            >
              <Text
                style={{
                  fontSize: 30,

                  fontWeight: "bold",
                }}
              >
                Calories
              </Text>
              <TouchableOpacity onPress={handleCalorieEditing}>
                {editing ? (
                  <AntDesign name="check" size={24} color="#3078cb" />
                ) : (
                  <Entypo name="new-message" size={24} color="#3078cb" />
                )}
              </TouchableOpacity>
            </View>
            <Card
              style={{ backgroundColor: colors.lightGrey }}
              content={
                <View>
                  <View style={{ alignItems: "center" }}>
                    <AnimatedCircularProgress
                      size={180}
                      width={15}
                      backgroundWidth={15}
                      fill={(calories / calcCalsRemaining()) * 100}
                      tintColor="#ff0000"
                      tintColorSecondary="#00ff00"
                      backgroundColor="#7d7a7a"
                      arcSweepAngle={240}
                      rotation={240}
                      lineCap="round"
                    >
                      {(fill) => (
                        <Text
                          style={{
                            textAlign: "center",
                            color: "black",
                            fontSize: 45,
                          }}
                        >
                          {calories}
                        </Text>
                      )}
                    </AnimatedCircularProgress>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      alignItems: "center",
                      borderRadius: 20,
                      padding: 5,
                      flexDirection: "row",
                      flex: 1,
                      justifyContent: "space-around",
                      marginTop: -15,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        subtractOrAddCals(true);
                      }}
                      style={{
                        borderRadius: 20,
                        alignSelf: "center",
                        opacity: 1,
                      }}
                    >
                      <AntDesign name="minuscircleo" size={27} color="red" />
                    </TouchableOpacity>

                    <TextInput
                      value={calsTyped}
                      onChangeText={(text) => {
                        errorFade.setValue(0);
                        setCalsTyped(text);
                      }}
                      keyboardType="number-pad"
                      maxLength={4}
                      style={{
                        fontSize: 30,
                        textAlign: "center",
                        width: "30%",
                      }}
                      placeholder="500"
                      placeholderTextColor="#a1a6ab"
                    />

                    <TouchableOpacity
                      onPress={() => {
                        subtractOrAddCals(false);
                      }}
                      style={{
                        borderRadius: 20,
                        alignSelf: "center",
                        opacity: 1,
                      }}
                    >
                      <AntDesign name="pluscircleo" size={27} color="green" />
                    </TouchableOpacity>
                  </View>
                  <Animated.View style={{ opacity: errorFade }}>
                    <Text
                      style={{
                        color: "red",
                        alignSelf: "center",
                        marginTop: -5,
                      }}
                    >
                      Enter Amount
                    </Text>
                  </Animated.View>
                  <TouchableOpacity
                    style={{ width: "100%", marginTop: 10 }}
                    onPress={async () => {
                      if (mealsSelected) {
                        LayoutAnimation.configureNext(
                          LayoutAnimation.create(
                            200,
                            LayoutAnimation.Types.linear,
                            LayoutAnimation.Properties.opacity
                          )
                        );
                      }
                      setMealsSelected(!mealsSelected);
                      await AsyncStorage.setItem(
                        "Meals Selected",
                        JSON.stringify({
                          data: !mealsSelected,
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
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 25,
                          color: colors.textColors.headerText,
                          fontWeight: mealsSelected ? "bold" : "normal",
                          marginLeft: 20,
                        }}
                      >
                        Meals
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
                          name={mealsSelected ? "arrowup" : "arrowdown"}
                          color={"black"}
                          size={20}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                  {mealsSelected
                    ? meals.map((item, index) => {
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
                      })
                    : null}
                  {editing ? (
                    <View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-around",
                          width: "100%",
                          marginTop: 20,
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
                    </View>
                  ) : (
                    <View style={{ width: "100%" }}>
                      <TouchableOpacity
                        onPress={async () => {
                          if (logsSelected) {
                            LayoutAnimation.configureNext(
                              LayoutAnimation.create(
                                200,
                                LayoutAnimation.Types.linear,
                                LayoutAnimation.Properties.opacity
                              )
                            );
                          }
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
                      </TouchableOpacity>
                      {logsSelected && logs.length !== 0 ? (
                        <View>
                          <View
                            style={{
                              backgroundColor: "white",
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
                                      backgroundColor: "white",
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
                      ) : null}
                    </View>
                  )}
                </View>
              }
            />
            <View style={{ marginBottom: 50 }} />
          </View>
        }
        nav={props.navigation}
      ></ScrollViewContainer>
    </Animated.View>
  );
};

export default Calories;
