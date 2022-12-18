import React, { useState } from "react";
import { useSelector } from "react-redux";
import { View, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

//components
import ScrollViewContainer from "../../components/scrollViewContainer";

const FitnessEdit = (props) => {
  const colors = useSelector((state) => state.colors);

  const DayComponent = (props) => {
    const [selected, setSelected] = useState(false);

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
              marginTop: 10,
              flex: 1,
              width: "100%",
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
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollViewContainer
        content={
          <View>
            <DayComponent day="Monday" />
          </View>
        }
        nav={props.navigation}
      />
    </View>
  );
};

export default FitnessEdit;
