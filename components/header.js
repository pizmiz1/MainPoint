import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../constants/colors";

const Header = ({ headerText, descriptionText, backgroundTrig, blur, actionPress }) => {
  return (
    <BlurView
      style={{
        width: "100%",
        height: "10%",
        ...StyleSheet.absoluteFill,
        zIndex: 300,
        backgroundColor: backgroundTrig > 100 ? "rgba(255, 255, 255, .7)" : null,
      }}
      intensity={blur}
      tint="light"
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
          <Ionicons name="add" size={30} color={colors.primaryBlue} />
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
            {headerText}
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: colors.textGrey,
            }}
          >
            {descriptionText}
          </Text>
        </View>
        <TouchableOpacity onPress={actionPress} style={{ alignSelf: "center" }}>
          <Ionicons name="add" size={30} color={colors.primaryBlue} />
        </TouchableOpacity>
      </View>
    </BlurView>
  );
};

export default Header;
