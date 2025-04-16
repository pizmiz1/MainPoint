import { View, Text, Image } from "react-native";
import colors from "../constants/colors";

const DisclaimerScreen = () => {
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
      <Text style={{ width: "80%", marginTop: "3%", color: colors.lightGrey }}>
        Welcome to MainPoint. Any data entered in the app will be permanently
        lost if you delete MainPoint. This includes any groceries so be careful.
        Enjoy!
      </Text>
    </View>
  );
};

export default DisclaimerScreen;
