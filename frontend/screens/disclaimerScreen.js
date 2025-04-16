import { View, Text, Image } from "react-native";
import colors from "../constants/colors";
import Button from "../components/button";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DisclaimerScreen = (props) => {
  const continuePress = async () => {
    const firstUseJSON = JSON.stringify({ FirstUse: false });
    await AsyncStorage.setItem("FirstUse", firstUseJSON);

    // Nav to grocery list
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
      }}
    >
      <Image
        style={{ width: "0%", height: "35%", aspectRatio: 1, marginTop: "25%" }}
        source={require("./../assets/Info.png")}
      ></Image>
      <Text
        style={{
          fontSize: 40,
          fontWeight: "bold",
          marginTop: "5%",
          color: colors.darkGrey,
        }}
      >
        Welcome!
      </Text>
      <Text
        style={{
          width: "90%",
          marginTop: "3%",
          color: colors.lightGrey,
          textAlign: "center",
        }}
      >
        Welcome to MainPoint. Any data entered in the app will be permanently
        lost if you delete MainPoint. This includes any groceries so be careful.
        Enjoy!
      </Text>
      <Button
        label="Continue"
        style={{ marginTop: "20%" }}
        onPress={continuePress}
      />
    </View>
  );
};

export default DisclaimerScreen;
