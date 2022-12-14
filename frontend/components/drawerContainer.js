import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { View, Text, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

const MyDrawerContainer = (props) => {
  const colors = useSelector((state) => state.colors);

  const handlePress = () => {
    props.navigation.navigate("Selection Screen");
  };

  return (
    <DrawerContentScrollView
      contentContainerStyle={{
        height: "100%",
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
              color: "white",
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
