import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  LayoutAnimation,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ScrollViewContainer from "../../components/scrollViewContainer";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { updateTotalMiles } from "../../store/actions/updateTotalMiles";
import { updateShoeMiles } from "../../store/actions/updateShoeMiles";

const RunningTotal = (props) => {
  const colors = useSelector((state) => state.colors);
  const totalMiles = useSelector((state) => state.totalMiles);
  const shoeMiles = useSelector((state) => state.shoeMiles);

  const [editing, setEditing] = useState(false);

  const dispatch = useDispatch();

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.9 }}>
        <ScrollViewContainer
          content={
            editing ? (
              <View>
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 100,
                  }}
                >
                  <Text
                    style={{ fontSize: 40, textDecorationLine: "underline" }}
                  >
                    Total Miles
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                      onPress={() => {
                        dispatch(updateTotalMiles("Subtract", 1));
                        dispatch(updateShoeMiles("Subtract", 1));
                      }}
                      style={{ marginRight: 20, alignSelf: "center" }}
                    >
                      <AntDesign name="minuscircleo" size={40} color="red" />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 100 }}>{totalMiles}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        dispatch(updateTotalMiles("Add", 1));
                        dispatch(updateShoeMiles("Add", 1));
                      }}
                      style={{ marginLeft: 20, alignSelf: "center" }}
                    >
                      <AntDesign name="pluscircleo" size={40} color="green" />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: 30,
                    }}
                  >
                    <Text
                      style={{ fontSize: 40, textDecorationLine: "underline" }}
                    >
                      Shoe Miles
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <TouchableOpacity
                        onPress={() => {
                          dispatch(updateShoeMiles("Subtract", 1));
                        }}
                        style={{ marginRight: 20, alignSelf: "center" }}
                      >
                        <AntDesign name="minuscircleo" size={40} color="red" />
                      </TouchableOpacity>
                      <Text style={{ fontSize: 100 }}>{shoeMiles}</Text>
                      <TouchableOpacity
                        onPress={() => {
                          dispatch(updateShoeMiles("Add", 1));
                        }}
                        style={{ marginLeft: 20, alignSelf: "center" }}
                      >
                        <AntDesign name="pluscircleo" size={40} color="green" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            ) : (
              <View>
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 100,
                  }}
                >
                  <Text
                    style={{ fontSize: 40, textDecorationLine: "underline" }}
                  >
                    Total Miles
                  </Text>
                  <Text style={{ fontSize: 100 }}>{totalMiles}</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 30,
                  }}
                >
                  <Text
                    style={{ fontSize: 40, textDecorationLine: "underline" }}
                  >
                    Shoe Miles
                  </Text>
                  <Text style={{ fontSize: 100 }}>{shoeMiles}</Text>
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
            backgroundColor: "white",
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
              setEditing(false);
              await AsyncStorage.setItem(
                "Running Total",
                JSON.stringify({
                  data: totalMiles,
                })
              );
              await AsyncStorage.setItem(
                "Running Shoe Total",
                JSON.stringify({
                  data: shoeMiles,
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
            <Text style={{ marginLeft: 35 }}>{totalMiles} Miles</Text>
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

export default RunningTotal;
