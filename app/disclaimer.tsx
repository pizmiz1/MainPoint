import { View, Text, Image, StyleSheet } from "react-native";
import colors from "../constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import asyncKeys from "../constants/asyncKeys";
import { useRouter } from "expo-router";

// Custom Components
import Button from "../components/Button";

const DisclaimerScreen = () => {
  const router = useRouter();

  const continuePress = async () => {
    const firstUseJSON = JSON.stringify(false);
    await AsyncStorage.setItem(asyncKeys.firstUse, firstUseJSON);

    router.replace("(tabs)");
  };

  return (
    <View style={styles.container}>
      <Image style={styles.img} source={require("./../assets/Info.png")}></Image>
      <Text style={styles.headerText}>Welcome!</Text>
      <Text style={styles.subText}>
        Welcome to MainPoint. Any data entered in the app will be permanently lost if you delete MainPoint. This includes any groceries so be careful.
        Enjoy!
      </Text>
      <Button label="Continue" style={styles.btn} onPress={continuePress} />
    </View>
  );
};

export default DisclaimerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  img: {
    width: "0%",
    height: "35%",
    aspectRatio: 1,
    marginTop: "25%",
  },
  headerText: {
    fontSize: 40,
    fontWeight: "bold",
    marginTop: "5%",
    color: colors.darkGrey,
  },
  subText: {
    width: "90%",
    marginTop: "3%",
    color: colors.textGrey,
    textAlign: "center",
  },
  btn: {
    marginTop: "20%",
  },
});
