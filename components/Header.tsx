import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Animated, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../constants/colors";

interface HeaderProps {
  headerText: string;
  descriptionText: string;
  scrollY: Animated.Value;
  blur: number;
  actionPress: () => void;
}

const Header = ({ headerText, descriptionText, scrollY, blur, actionPress }: HeaderProps) => {
  const backgroundOpacity = scrollY.interpolate({
    inputRange: [40, 150],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const hideAction = actionPress === undefined;

  return (
    <BlurView style={styles.container} intensity={Math.min(blur, 25)} tint="light">
      <Animated.View
        pointerEvents="none"
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: "rgba(251, 250, 254, 0.7)",
            opacity: backgroundOpacity,
          },
        ]}
      />

      <View style={[styles.content, { justifyContent: hideAction ? "center" : "space-between" }]}>
        {!hideAction && (
          <View style={styles.invisible}>
            <Ionicons name="add" size={35} color={colors.primaryBlue} />
          </View>
        )}
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>{headerText}</Text>
          <Text style={styles.headerDescriptionText}>{descriptionText}</Text>
        </View>
        {!hideAction && (
          <TouchableOpacity onPress={actionPress} style={styles.btn}>
            <Ionicons name="add" size={35} color={colors.primaryBlue} />
          </TouchableOpacity>
        )}
      </View>

      <Animated.View pointerEvents="none" style={[styles.bottomBorder, { opacity: backgroundOpacity }]} />
    </BlurView>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: -5,
    width: "100%",
    height: 110,
    justifyContent: "flex-end",
    zIndex: 300,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 10,
    width: "90%",
  },
  invisible: {
    opacity: 0,
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  headerDescriptionText: {
    fontSize: 15,
    color: colors.textGrey,
  },
  btn: {
    alignSelf: "center",
  },
  bottomBorder: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 1,
    backgroundColor: "#D0D5DA",
  },
});
