import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { updateBench } from "../../store/actions/updateBench";
import { updateSquat } from "../../store/actions/updateSquat";
import { updateOHP } from "../../store/actions/updateOHP";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Card from "../../components/card";

const FitnessMaxes = (props) => {
  const colors = useSelector((state) => state.colors);
  const globalBench = useSelector((state) => state.maxBench);
  const globalSquat = useSelector((state) => state.maxSquat);
  const globalOHP = useSelector((state) => state.maxOHP);

  const [bench, onBenchChange] = useState(null);
  const [squat, onChangeSquat] = useState(null);
  const [OHP, onChangeOHP] = useState(null);
  const [benchUpdating, setBenchUpdating] = useState(false);
  const [squatUpdating, setSquatUpdating] = useState(false);
  const [OHPUpdating, setOHPUpdating] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    onBenchChange(globalBench);
    onChangeSquat(globalSquat);
    onChangeOHP(globalOHP);
  }, []);

  return (
    <View style={{ flex: 1, marginTop: 30 }}>
      <View style={{ width: "90%", alignSelf: "center" }}>
        <Text
          style={{
            fontSize: 30,
            color: "white",
            fontWeight: "bold",
          }}
        >
          Maxes
        </Text>
        <Card
          style={{ backgroundColor: "#1c1c1e" }}
          content={
            <TouchableWithoutFeedback
              accessible={false}
              onPress={() => {
                Keyboard.dismiss();
              }}
            >
              <View
                style={{
                  backgroundColor: "#1c1c1e",
                  justifyContent: "center",
                }}
              >
                <View
                  style={{ flexDirection: "row", justifyContent: "center" }}
                >
                  <View style={{ alignSelf: "center" }}>
                    <Text style={{ color: "white", fontSize: 30 }}>Bench:</Text>
                  </View>
                  <TextInput
                    style={{
                      margin: 12,
                      borderWidth: 1,
                      padding: 10,
                      borderColor: "white",
                      width: "25%",
                      borderRadius: 10,
                      color: "white",
                      fontSize: 30,
                    }}
                    onChangeText={onBenchChange}
                    onEndEditing={async () => {
                      if (bench !== "") {
                        setBenchUpdating(true);
                        await dispatch(updateBench(bench));
                        const Maxes = await AsyncStorage.getItem("Maxes");
                        if (Maxes) {
                          const transformed = await JSON.parse(Maxes).data;
                          transformed.Bench = bench;
                          await AsyncStorage.setItem(
                            "Maxes",
                            JSON.stringify({
                              data: transformed,
                            })
                          );
                        }
                        setBenchUpdating(false);
                      }
                    }}
                    value={bench}
                    placeholder="999"
                    keyboardType="numeric"
                    maxLength={3}
                    textAlign="center"
                    editable={benchUpdating ? false : true}
                  />
                  {benchUpdating ? (
                    <ActivityIndicator
                      size={"large"}
                      style={{ marginLeft: 10 }}
                    />
                  ) : (
                    <Entypo
                      name="check"
                      size={45}
                      color="green"
                      style={{ alignSelf: "center" }}
                    />
                  )}
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <View style={{ alignSelf: "center" }}>
                    <Text style={{ color: "white", fontSize: 30 }}>Squat:</Text>
                  </View>
                  <TextInput
                    style={{
                      margin: 12,
                      borderWidth: 1,
                      padding: 10,
                      borderColor: "white",
                      width: "25%",
                      borderRadius: 10,
                      color: "white",
                      fontSize: 30,
                    }}
                    onChangeText={onChangeSquat}
                    onEndEditing={async () => {
                      if (squat !== "") {
                        setSquatUpdating(true);
                        await dispatch(updateSquat(squat));
                        const Maxes = await AsyncStorage.getItem("Maxes");
                        if (Maxes) {
                          const transformed = await JSON.parse(Maxes).data;
                          transformed.Squat = squat;
                          await AsyncStorage.setItem(
                            "Maxes",
                            JSON.stringify({
                              data: transformed,
                            })
                          );
                        }
                        setSquatUpdating(false);
                      }
                    }}
                    value={squat}
                    placeholder="999"
                    keyboardType="numeric"
                    maxLength={3}
                    textAlign="center"
                    editable={squatUpdating ? false : true}
                  />
                  {squatUpdating ? (
                    <ActivityIndicator
                      size={"large"}
                      style={{ marginLeft: 10 }}
                    />
                  ) : (
                    <Entypo
                      name="check"
                      size={45}
                      color="green"
                      style={{ alignSelf: "center" }}
                    />
                  )}
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <View style={{ alignSelf: "center" }}>
                    <Text style={{ color: "white", fontSize: 30 }}>OHP:</Text>
                  </View>
                  <TextInput
                    style={{
                      margin: 12,
                      borderWidth: 1,
                      padding: 10,
                      borderColor: "white",
                      width: "25%",
                      borderRadius: 10,
                      color: "white",
                      fontSize: 30,
                    }}
                    onChangeText={onChangeOHP}
                    onEndEditing={async () => {
                      if (OHP !== "") {
                        setOHPUpdating(true);
                        await dispatch(updateOHP(OHP));
                        const Maxes = await AsyncStorage.getItem("Maxes");
                        if (Maxes) {
                          const transformed = await JSON.parse(Maxes).data;
                          transformed.OHP = OHP;
                          await AsyncStorage.setItem(
                            "Maxes",
                            JSON.stringify({
                              data: transformed,
                            })
                          );
                        }
                        setOHPUpdating(false);
                      }
                    }}
                    value={OHP}
                    placeholder="999"
                    keyboardType="numeric"
                    maxLength={3}
                    textAlign="center"
                    editable={OHPUpdating ? false : true}
                  />
                  {OHPUpdating ? (
                    <ActivityIndicator
                      size={"large"}
                      style={{ marginLeft: 10 }}
                    />
                  ) : (
                    <Entypo
                      name="check"
                      size={45}
                      color="green"
                      style={{ alignSelf: "center" }}
                    />
                  )}
                </View>
              </View>
            </TouchableWithoutFeedback>
          }
        />
      </View>
    </View>
  );
};

export default FitnessMaxes;
