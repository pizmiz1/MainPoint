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
  ScrollView,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ScrollViewContainer from "../../components/scrollViewContainer";
import { AntDesign, Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";
import { updateMealAction } from "../../store/actions/updateMeal";
import Card from "../../components/card";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { BlurView } from "expo-blur";

const GroceryMacros = (props) => {
  const dispatch = useDispatch();

  const colors = useSelector((state) => state.colors);
  const meals = useSelector((state) => state.meals);

  const [switchedMeals, setSwitchedMeals] = useState([]);
  const [calories, setCalories] = useState(0);
  const [protein, setProtein] = useState(0);
  const [bodyweight, setBodyweight] = useState("");
  const [lbsPerWeek, setLbsPerWeek] = useState("");
  const [proteinPerLb, setProteinPerLb] = useState("");
  const [calsFill, setCalsFill] = useState(0);
  const [calsTyped, setCalsTyped] = useState("");
  const [proteinTyped, setProteinTyped] = useState("");
  const [proteinFill, setProteinFill] = useState(0);
  const [editing, setEditing] = useState(false);
  const [logs, setLogs] = useState([]);
  const [logsSelected, setLogsSelected] = useState(null);
  const [mealsSelected, setMealsSelected] = useState(null);
  const [mealSearch, setMealSearch] = useState("");
  const [filteredMeals, setFilteredMeals] = useState([]);

  const calsErrorFade = useRef(new Animated.Value(0)).current;
  const proteinErrorFade = useRef(new Animated.Value(0)).current;
  const changedLbsPer = useRef(false);
  const changedProteinPer = useRef(false);

  useEffect(() => {
    setFilteredMeals(meals);
    searchMeals(mealSearch);
  }, [meals]);

  useEffect(() => {
    const load = async () => {
      const savedCals = await AsyncStorage.getItem("Calories");
      let localCals;
      if (savedCals) {
        localCals = await JSON.parse(savedCals).data;
        if (localCals) {
          setCalories(localCals);
        }
      }

      const savedProtein = await AsyncStorage.getItem("Protein");
      let localProtein;
      if (savedProtein) {
        localProtein = await JSON.parse(savedProtein).data;
        if (localProtein) {
          setProtein(localProtein);
        }
      }

      const savedBodyweight = await AsyncStorage.getItem("Bodyweight");
      let localBodyWeight;
      if (savedBodyweight) {
        localBodyWeight = await JSON.parse(savedBodyweight).data;
        if (localBodyWeight) {
          setBodyweight(localBodyWeight);
        }
      }

      const savedLbsPerWeek = await AsyncStorage.getItem("LbsPerWeek");
      let localLbsPerWeek;
      if (savedLbsPerWeek) {
        localLbsPerWeek = await JSON.parse(savedLbsPerWeek).data;
        if (localLbsPerWeek) {
          setLbsPerWeek(localLbsPerWeek);
        }
      }

      const savedProteinPerLb = await AsyncStorage.getItem("ProteinPerLb");
      let localProteinPerLb;
      if (savedProteinPerLb) {
        localProteinPerLb = await JSON.parse(savedProteinPerLb).data;
        if (localProteinPerLb) {
          setProteinPerLb(localProteinPerLb);
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

      setFilteredMeals(meals);

      setCalsFill(
        (100 * localCals) /
          (parseInt(localBodyWeight) * 15 - parseFloat(localLbsPerWeek) * 420)
      );
      setProteinFill(
        (100 * localProtein) /
          (parseInt(localBodyWeight) * parseFloat(localProteinPerLb))
      );
    };
    load();
  }, []);

  const subtractOrAddProtein = async (subtract, passedProtein) => {
    if (proteinTyped === "" && passedProtein === undefined) {
      Animated.timing(proteinErrorFade, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(proteinErrorFade, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
          delay: 2000,
        }).start();
      });
      return;
    }
    setProteinTyped("");
    let newProtein;
    if (subtract) {
      if (passedProtein !== undefined) {
        newProtein = parseInt(protein) - passedProtein;
      } else {
        newProtein = parseInt(protein) - parseInt(proteinTyped);
      }
    } else {
      if (passedProtein !== undefined) {
        newProtein = parseInt(protein) + passedProtein;
      } else {
        newProtein = parseInt(protein) + parseInt(proteinTyped);
      }
    }
    setProteinFill(
      (100 * newProtein) / (parseInt(bodyweight) * parseFloat(proteinPerLb))
    );
    setProtein(newProtein);
    await AsyncStorage.setItem(
      "Protein",
      JSON.stringify({
        data: newProtein,
      })
    );
    const log = {
      type: "protein",
      cals: passedProtein !== undefined ? passedProtein : proteinTyped,
    };
    if (proteinTyped !== "") {
      setLogs(logs.concat([log]));
    } else {
      logs.push(log);
    }
    await AsyncStorage.setItem(
      "Logs",
      JSON.stringify({
        data: logs.concat([log]),
      })
    );
  };

  const subtractOrAddCals = async (subtract, cals) => {
    if (calsTyped === "" && cals === undefined) {
      Animated.timing(calsErrorFade, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(calsErrorFade, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
          delay: 2000,
        }).start();
      });
      return;
    }
    setCalsTyped("");
    let newCals;
    if (subtract) {
      if (cals !== undefined) {
        newCals = parseInt(calories) - cals;
      } else {
        newCals = parseInt(calories) - parseInt(calsTyped);
      }
    } else {
      if (cals !== undefined) {
        newCals = parseInt(calories) + cals;
      } else {
        newCals = parseInt(calories) + parseInt(calsTyped);
      }
    }
    setCalsFill(
      (100 * newCals) /
        (parseInt(bodyweight) * 15 - parseFloat(lbsPerWeek) * 420)
    );
    setCalories(newCals);
    await AsyncStorage.setItem(
      "Calories",
      JSON.stringify({
        data: newCals,
      })
    );
    const log = {
      type: subtract ? "sub" : "add",
      cals: cals !== undefined ? cals : calsTyped,
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
      await AsyncStorage.setItem(
        "Calories",
        JSON.stringify({
          data: calories,
        })
      );
      await AsyncStorage.setItem(
        "Protein",
        JSON.stringify({
          data: protein,
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
      changedLbsPer.current = false;
      await AsyncStorage.setItem(
        "ProteinPerLb",
        JSON.stringify({
          data: proteinPerLb,
        })
      );
      changedProteinPer.current = false;
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

  const searchMeals = (text) => {
    if (text) {
      const newMeals = meals.filter((curr) => {
        const itemData = curr.Name ? curr.Name.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredMeals(newMeals);
    } else {
      setFilteredMeals(meals);
    }
    setMealSearch(text);
  };

  const MealSwitchComp = (props) => {
    const [mealCals, updateMealCals] = useState(
      props.cals !== undefined ? props.cals.toString() : ""
    );
    const [mealProtein, updateMealProtein] = useState(
      props.protein !== undefined ? props.protein.toString() : ""
    );

    const toggleSwitch = async () => {
      const alreadySwitched = switchedMeals.includes(props.mealName);
      if (alreadySwitched) {
        subtractOrAddCals(false, parseInt(mealCals));
        subtractOrAddProtein(true, parseInt(mealProtein));
        setSwitchedMeals(
          switchedMeals.filter((curr) => curr !== props.mealName)
        );
        await AsyncStorage.setItem(
          "Switched Meals",
          JSON.stringify({
            data: switchedMeals.filter((curr) => curr !== props.mealName),
          })
        );
        if (mealCals === "") {
          return;
        }
      } else {
        subtractOrAddCals(true, parseInt(mealCals));
        subtractOrAddProtein(false, parseInt(mealProtein));
        const test = switchedMeals.concat([props.mealName]);
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

    const endEditing = async () => {
      const oldCals = meals.filter((curr) => curr.Name === props.mealName)[0]
        .Calories;
      const oldProtein = meals.filter((curr) => curr.Name === props.mealName)[0]
        .Protein;

      const alreadySwitched = switchedMeals.includes(props.mealName);
      let updateCals = mealCals;
      if (mealCals === "") {
        updateCals = 0;
      }
      let updateProtein = mealProtein;
      if (mealProtein === "") {
        updateProtein = 0;
      }

      if (alreadySwitched) {
        setSwitchedMeals(
          switchedMeals.filter((curr) => curr !== props.mealName)
        );
        await AsyncStorage.setItem(
          "Switched Meals",
          JSON.stringify({
            data: switchedMeals.filter((curr) => curr !== props.mealName),
          })
        );

        subtractOrAddCals(false, parseInt(oldCals));
        subtractOrAddProtein(true, parseInt(oldProtein));
      }

      const updatedMeal = {
        Name: props.mealName,
        Groceries: props.groceries,
        Calories: parseInt(updateCals),
        Protein: parseInt(updateProtein),
      };
      await dispatch(updateMealAction(updatedMeal, props.index));
    };

    return (
      <TouchableOpacity
        style={{
          padding: 10,
          height: 45,
        }}
        onPress={toggleSwitch}
        disabled={editing}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              alignSelf: "center",
              fontSize: 20,
              width: editing ? "50%" : undefined,
              color: colors.textColors.headerText,
              opacity: switchedMeals.includes(props.mealName) ? 1 : 0.5,
              fontWeight: switchedMeals.includes(props.mealName)
                ? "bold"
                : "normal",
            }}
            numberOfLines={1}
          >
            {props.mealName}
          </Text>
          {editing ? (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                //flex: 1,
                width: "50%",
              }}
            >
              <View>
                <TextInput
                  value={mealCals}
                  onChangeText={updateMealCals}
                  onEndEditing={endEditing}
                  keyboardType="numeric"
                  maxLength={4}
                  style={{
                    fontSize: 20,
                    width: 60,
                    textAlign: "center",
                    color: "#46e7bd",
                    fontWeight: "bold",
                  }}
                />
              </View>
              <View>
                <TextInput
                  value={mealProtein}
                  onChangeText={updateMealProtein}
                  onEndEditing={endEditing}
                  keyboardType="numeric"
                  maxLength={3}
                  style={{
                    fontSize: 20,
                    width: 40,
                    textAlign: "center",
                    color: "#2ca3ee",
                    fontWeight: "bold",
                  }}
                />
              </View>
            </View>
          ) : switchedMeals.includes(props.mealName) ? (
            <Ionicons
              name="ios-checkmark-circle"
              size={26}
              color="#3078cb"
              style={{
                padding: 0,
                marginRight: -2,
                marginBottom: -1,
                marginTop: -1,
              }}
            />
          ) : (
            <FontAwesome name="circle-thin" size={26} color="grey" />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ScrollViewContainer
          style={{ backgroundColor: colors.lightGrey }}
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
                backgroundColor: colors.lightGrey,
                marginTop: 90,
              }}
            >
              <Card
                style={{ backgroundColor: "white" }}
                animating={mealsSelected || editing || logsSelected}
                content={
                  <View style={{ marginTop: 15, marginBottom: 15 }}>
                    <View
                      style={{
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "space-around",
                      }}
                    >
                      <View style={{ alignItems: "center" }}>
                        <AnimatedCircularProgress
                          size={140}
                          width={10}
                          backgroundWidth={10}
                          fill={calsFill}
                          tintColor="#46e7bd"
                          backgroundColor="#7d7a7a"
                          arcSweepAngle={240}
                          rotation={240}
                          lineCap="round"
                        >
                          {(fill) => (
                            <View
                              style={{ alignItems: "center", marginTop: -15 }}
                            >
                              <Text
                                style={{
                                  textAlign: "center",
                                  color: "black",
                                  fontSize: 35,
                                  fontWeight: "bold",
                                }}
                              >
                                {calories}
                              </Text>
                              <Text
                                style={{
                                  fontSize: 15,
                                  opacity: 0.5,
                                }}
                              >
                                Calories
                              </Text>
                            </View>
                          )}
                        </AnimatedCircularProgress>
                        <View
                          style={{
                            alignItems: "center",
                            borderRadius: 20,
                            //padding: 5,
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
                              opacity:
                                bodyweight !== "" && lbsPerWeek !== "" ? 1 : 0,
                            }}
                            disabled={!(bodyweight !== "" && lbsPerWeek !== "")}
                          >
                            <AntDesign
                              name="minuscircleo"
                              size={27}
                              color="red"
                            />
                          </TouchableOpacity>

                          <TextInput
                            value={calsTyped}
                            onChangeText={(text) => {
                              calsErrorFade.setValue(0);
                              setCalsTyped(text);
                            }}
                            keyboardType="number-pad"
                            maxLength={4}
                            style={{
                              fontSize: 25,
                              textAlign: "center",
                              width: "40%",
                              opacity:
                                bodyweight !== "" && lbsPerWeek !== "" ? 1 : 0,
                            }}
                            placeholder="500"
                            placeholderTextColor="#a1a6ab"
                            editable={bodyweight !== "" && lbsPerWeek !== ""}
                          />

                          <TouchableOpacity
                            onPress={() => {
                              subtractOrAddCals(false);
                            }}
                            style={{
                              borderRadius: 20,
                              alignSelf: "center",
                              opacity:
                                bodyweight !== "" && lbsPerWeek !== "" ? 1 : 0,
                            }}
                            disabled={!(bodyweight !== "" && lbsPerWeek !== "")}
                          >
                            <AntDesign
                              name="pluscircleo"
                              size={27}
                              color="green"
                            />
                          </TouchableOpacity>
                        </View>
                        <Animated.View style={{ opacity: calsErrorFade }}>
                          <Text
                            style={{
                              color: "red",
                              alignSelf: "center",
                            }}
                          >
                            Enter Amount
                          </Text>
                        </Animated.View>
                      </View>
                      <View style={{ alignItems: "center" }}>
                        <AnimatedCircularProgress
                          size={140}
                          width={10}
                          backgroundWidth={10}
                          fill={proteinFill}
                          tintColor="#2ca3ee"
                          backgroundColor="#7d7a7a"
                          arcSweepAngle={240}
                          rotation={240}
                          lineCap="round"
                        >
                          {(fill) => (
                            <View
                              style={{ alignItems: "center", marginTop: -15 }}
                            >
                              <Text
                                style={{
                                  textAlign: "center",
                                  color: "black",
                                  fontSize: 35,
                                  fontWeight: "bold",
                                }}
                              >
                                {protein}
                              </Text>
                              <Text
                                style={{
                                  fontSize: 15,
                                  opacity: 0.5,
                                }}
                              >
                                Protein
                              </Text>
                            </View>
                          )}
                        </AnimatedCircularProgress>
                        <View
                          style={{
                            alignItems: "center",
                            borderRadius: 20,
                            //padding: 5,
                            flexDirection: "row",
                            flex: 1,
                            justifyContent: "space-around",
                            marginTop: -15,
                          }}
                        >
                          <TouchableOpacity
                            onPress={() => {
                              subtractOrAddProtein(true);
                            }}
                            style={{
                              borderRadius: 20,
                              alignSelf: "center",
                              opacity:
                                bodyweight !== "" && proteinPerLb !== ""
                                  ? 1
                                  : 0,
                            }}
                            disabled={
                              !(bodyweight !== "" && proteinPerLb !== "")
                            }
                          >
                            <AntDesign
                              name="minuscircleo"
                              size={27}
                              color="red"
                            />
                          </TouchableOpacity>

                          <TextInput
                            value={proteinTyped}
                            onChangeText={(text) => {
                              proteinErrorFade.setValue(0);
                              setProteinTyped(text);
                            }}
                            keyboardType="number-pad"
                            maxLength={3}
                            style={{
                              fontSize: 25,
                              textAlign: "center",
                              width: "40%",
                              opacity:
                                bodyweight !== "" && proteinPerLb !== ""
                                  ? 1
                                  : 0,
                            }}
                            placeholder="25"
                            placeholderTextColor="#a1a6ab"
                            editable={bodyweight !== "" && proteinPerLb !== ""}
                          />

                          <TouchableOpacity
                            onPress={() => {
                              subtractOrAddProtein(false);
                            }}
                            style={{
                              borderRadius: 20,
                              alignSelf: "center",
                              opacity:
                                bodyweight !== "" && proteinPerLb !== ""
                                  ? 1
                                  : 0,
                            }}
                            disabled={
                              !(bodyweight !== "" && proteinPerLb !== "")
                            }
                          >
                            <AntDesign
                              name="pluscircleo"
                              size={27}
                              color="green"
                            />
                          </TouchableOpacity>
                        </View>
                        <Animated.View style={{ opacity: proteinErrorFade }}>
                          <Text
                            style={{
                              color: "red",
                              alignSelf: "center",
                            }}
                          >
                            Enter Amount
                          </Text>
                        </Animated.View>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={{ width: "100%", marginTop: 10 }}
                      onPress={async () => {
                        LayoutAnimation.configureNext(
                          LayoutAnimation.create(
                            200,
                            LayoutAnimation.Types.linear,
                            LayoutAnimation.Properties.opacity
                          )
                        );
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

                    {mealsSelected ? (
                      <ScrollView
                        style={{
                          backgroundColor: "white",
                          width: "95%",
                          alignSelf: "center",
                          //flex: 1,
                          padding: 5,
                          borderRadius: 10,
                          marginTop: 5,
                          height: 200,
                        }}
                      >
                        {filteredMeals.map((item, index) => {
                          return (
                            <View key={index}>
                              <MealSwitchComp
                                mealName={item.Name}
                                cals={item.Calories}
                                protein={item.Protein}
                                groceries={item.Groceries}
                                index={index}
                              />
                              {filteredMeals.length === index + 1 ? (
                                <View style={{ marginBottom: 10 }} />
                              ) : (
                                <View
                                  style={{
                                    borderColor: "#cfcfcf",
                                    borderWidth: 0.5,
                                    width: "95%",
                                    alignSelf: "flex-end",
                                  }}
                                />
                              )}
                            </View>
                          );
                        })}
                      </ScrollView>
                    ) : null}

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
                          <View style={{ alignItems: "center" }}>
                            <Text>Protein Per Lb</Text>
                            <TextInput
                              value={proteinPerLb}
                              onChangeText={setProteinPerLb}
                              keyboardType="numeric"
                              maxLength={3}
                              style={{
                                fontSize: 30,
                                borderBottomColor: "grey",
                                borderBottomWidth: 1,
                                width: "90%",
                                textAlign: "center",
                              }}
                              placeholder="1"
                              placeholderTextColor="#D4D4D4"
                            />
                          </View>
                        </View>
                        <TouchableOpacity
                          onPress={async () => {
                            const savedProteinPerLb =
                              await AsyncStorage.getItem("ProteinPerLb");
                            let localProteinPerLb;
                            if (savedProteinPerLb) {
                              localProteinPerLb = await JSON.parse(
                                savedProteinPerLb
                              ).data;
                            }

                            const savedLbsPerWeek = await AsyncStorage.getItem(
                              "LbsPerWeek"
                            );
                            let localLbsPerWeek;
                            if (savedLbsPerWeek) {
                              localLbsPerWeek = await JSON.parse(
                                savedLbsPerWeek
                              ).data;
                            }

                            if (
                              bodyweight === "" ||
                              lbsPerWeek === "" ||
                              proteinPerLb === ""
                            ) {
                              return;
                            }

                            setCalories(
                              parseInt(bodyweight) * 15 -
                                parseFloat(lbsPerWeek) * 420
                            );
                            setProtein(0);
                            setCalsFill(100);
                            setProteinFill(0);

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
                            Reset Macros
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ) : (
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
                              marginTop: 10,
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
                            <ScrollView
                              style={{
                                backgroundColor: "white",
                                width: "95%",
                                alignSelf: "center",
                                //flex: 1,
                                padding: 5,
                                borderRadius: 10,
                                marginTop: 5,
                                height: 200,
                              }}
                            >
                              {logs.map((item, index) => {
                                const getTColor = () => {
                                  if (item.cals === "Reset") {
                                    return "black";
                                  } else if (item.type === "protein") {
                                    return "#2ca3ee";
                                  } else {
                                    return "#46e7bd";
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
                                        marginTop: 5,
                                        marginBottom: 5,
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
                                          borderColor: "#cfcfcf",
                                          borderWidth: 0.5,
                                          width: "95%",
                                          alignSelf: "flex-end",
                                        }}
                                      />
                                    )}
                                  </View>
                                );
                              })}
                            </ScrollView>
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

              <Text
                style={{
                  fontSize: 30,
                  color: "#aaaaaa",
                  marginTop: "100%",
                  marginBottom: 15,
                }}
              >
                More Coming Soon!
              </Text>
            </View>
          }
          nav={props.navigation}
        ></ScrollViewContainer>
      </View>
      <BlurView
        style={{
          width: "100%",
          height: "12%",
          ...StyleSheet.absoluteFillObject,
        }}
        intensity={40}
      >
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "center",
            marginTop: 30,
            width: "90%",
          }}
        >
          <View style={{ opacity: 0 }}>
            <Entypo name="new-message" size={24} color={colors.primary} />
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              Macros
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: "#aaaaaa",
              }}
            >
              Calories and Protein
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleCalorieEditing}
            style={{
              alignSelf: "center",
            }}
          >
            {editing ? (
              <AntDesign name="check" size={24} color={colors.primary} />
            ) : (
              <Entypo name="new-message" size={24} color={colors.primary} />
            )}
          </TouchableOpacity>
        </View>
      </BlurView>
    </View>
  );
};

export default GroceryMacros;
