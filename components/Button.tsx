import { StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";
import colors from "../constants/colors";

interface ButtonProps {
  style: StyleProp<ViewStyle>;
  label: string;
  onPress: () => void;
  color?: string;
  size?: number;
}

const Button = ({ style, label, onPress, color = colors.primaryBlue, size }: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.btn, style, color && { backgroundColor: color }, size !== undefined && { width: size, height: size / 2.9 }]}
      onPress={onPress}
    >
      <Text style={{ color: "white", fontWeight: "bold" }}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  btn: { borderRadius: 200, alignItems: "center", justifyContent: "center", width: 150, height: 150 / 2.9 },
  btnText: {
    color: "white",
    fontWeight: "bold",
  },
});
