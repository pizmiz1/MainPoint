import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ScrollViewContainer from "../../components/scrollViewContainer";
import { AntDesign, Entypo } from "@expo/vector-icons";

const Macros = (props) => {
  const colors = useSelector((state) => state.colors);

  const [calories, setCalories] = useState(0);
  const [clearVisible, setClearVisible] = useState(false);
  const [minusVisible, setMinusVisible] = useState(false);
  const [plusVisible, setPlusVisible] = useState(false);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const load = async () => {
      const savedCals = await AsyncStorage.getItem("Calories");
      if (savedCals) {
        const transformedSavedCals = await JSON.parse(savedCals).data;
        if (transformedSavedCals) {
          setCalories(transformedSavedCals);
        }
      }
    };
    load();
  }, []);

  useEffect(() => {
    if (calories === 0 || calories === "") {
      setClearVisible(false);
    } else {
      setClearVisible(true);
    }

    if (calories >= 50) {
      setMinusVisible(true);
    } else {
      setMinusVisible(false);
    }

    if (calories < 9950) {
      setPlusVisible(true);
    } else {
      setPlusVisible(false);
    }
  }, [calories]);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.9 }}>
        <ScrollViewContainer
          content={
            editing ? (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 65,
                }}
              >
                <Text
                  style={{
                    fontSize: 40,
                    textDecorationLine: "underline",
                    color: colors.textColors.headerText,
                  }}
                >
                  Today's Calories
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    onPress={() => {
                      setCalories(parseInt(calories) - 50);
                    }}
                    style={{
                      marginRight: 20,
                      alignSelf: "center",
                      opacity: minusVisible ? 1 : 0,
                    }}
                    disabled={!minusVisible}
                  >
                    <AntDesign name="minuscircleo" size={40} color="red" />
                  </TouchableOpacity>
                  <TextInput
                    style={{
                      fontSize: 100,
                      color: colors.textColors.headerText,
                    }}
                    value={calories.toString()}
                    onChangeText={setCalories}
                    keyboardType="number-pad"
                    maxLength={4}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      setCalories(parseInt(calories) + 50);
                    }}
                    style={{
                      marginLeft: 20,
                      alignSelf: "center",
                      opacity: plusVisible ? 1 : 0,
                    }}
                    disabled={!plusVisible}
                  >
                    <AntDesign name="pluscircleo" size={40} color="green" />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={{
                    alignItems: "center",
                    marginTop: 10,
                    opacity: clearVisible ? 1 : 0,
                  }}
                  onPress={() => {
                    setCalories(0);
                  }}
                  disabled={!clearVisible}
                >
                  <Text style={{ fontSize: 20, color: "red" }}>Clear</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 100,
                }}
              >
                <Text
                  style={{
                    fontSize: 40,
                    textDecorationLine: "underline",
                    color: colors.textColors.headerText,
                  }}
                >
                  Today's Calories
                </Text>
                <Text
                  style={{ fontSize: 100, color: colors.textColors.headerText }}
                >
                  {calories}
                </Text>
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
              style={{ marginLeft: 35, color: colors.textColors.headerText }}
            >
              {calories} Calories
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

export default Macros;
