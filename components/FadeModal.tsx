import { ReactNode } from "react";
import { Keyboard, Modal, StyleSheet, TouchableWithoutFeedback, View, ViewStyle } from "react-native";

interface FadeModalProps {
  children: ReactNode;
  modalVisible: boolean;
  innerViewStyle?: ViewStyle;
}

const FadeModal = ({ children, modalVisible, innerViewStyle }: FadeModalProps) => {
  return (
    <Modal animationType="fade" visible={modalVisible} transparent={true}>
      <TouchableWithoutFeedback onPressOut={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <View style={[styles.content, innerViewStyle]}>{children}</View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default FadeModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  content: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "60%",
  },
});
