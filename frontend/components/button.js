import { Text, TouchableOpacity } from "react-native";
import colors from "../constants/colors";

const Button = ({ style, label, onPress, size = 150 }) => {
  return (
    <TouchableOpacity
      style={{
        ...style,
        backgroundColor: colors.primaryBlue,
        width: size,
        height: size / 2.9,
        borderRadius: 200,
        alignItems: "center",
        justifyContent: "center",
      }}
      onPress={onPress}
    >
      <Text style={{ color: "white", fontWeight: "bold" }}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Button;
