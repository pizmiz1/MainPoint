import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../constants/colors";

interface HeaderProps {
  headerText: string;
  descriptionText: string;
  backgroundTrig: number;
  blur: number;
  actionPress: () => void;
}

const Header = ({ headerText, descriptionText, backgroundTrig, blur, actionPress }: HeaderProps) => {
  const hideAction = actionPress === undefined;

  return (
    <BlurView
      style={[styles.container, { backgroundColor: backgroundTrig > 100 ? "rgba(255, 255, 255, .7)" : undefined }]}
      intensity={blur}
      tint="light"
    >
      <View style={[styles.content, { justifyContent: hideAction ? "center" : "space-between" }]}>
        {!hideAction && (
          <View style={styles.invisible}>
            <Ionicons name="add" size={30} color={colors.primaryBlue} />
          </View>
        )}
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>{headerText}</Text>
          <Text style={styles.headerDescriptionText}>{descriptionText}</Text>
        </View>
        {!hideAction && (
          <TouchableOpacity onPress={actionPress} style={styles.btn}>
            <Ionicons name="add" size={30} color={colors.primaryBlue} />
          </TouchableOpacity>
        )}
      </View>
    </BlurView>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "15%",
    ...StyleSheet.absoluteFill,
    top: -30,
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
});
