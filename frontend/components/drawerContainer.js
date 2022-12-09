import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { View, Text, TouchableOpacity } from "react-native";

//constants
import colors from "../constants/colors";

const MyDrawerContainer = (props) => {
  const handlePress = () => {
    props.navigation.navigate("Selection Screen");
  };

  return (
    <DrawerContentScrollView
      contentContainerStyle={{
        height: "100%",
        backgroundColor: colors.secondary,
      }}
      scrollEnabled={false}
      {...props}
    >
      <View style={{ flex: 5 }}>
        <DrawerItemList {...props} />
      </View>

      <View
        style={{
          alignItems: "center",
          height: "95%",
          justifyContent: "flex-end",
          flex: 1,
          marginVertical: 20,
        }}
      >
        <TouchableOpacity onPress={handlePress}>
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              color: colors.textColors.headerText,
            }}
          >
            Switch
          </Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

export default MyDrawerContainer;
