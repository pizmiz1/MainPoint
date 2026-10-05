import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface ClearAllProps {
  onPress: () => void;
  disabled?: boolean;
}

const ClearAll = ({ onPress, disabled }: ClearAllProps) => {
  return (
    <TouchableOpacity style={[styles.clearBtn, { opacity: !disabled ? 1 : 0 }]} onPress={onPress} disabled={disabled}>
      <Text style={styles.clearText}>Clear All</Text>
    </TouchableOpacity>
  );
};

export default ClearAll;

const styles = StyleSheet.create({
  clearBtn: {
    flex: 1,
    alignItems: "center",
    marginTop: 10,
  },
  clearText: {
    fontSize: 20,
    color: "red",
  },
});
