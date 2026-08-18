import { Keyboard, Modal, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import colors from "../constants/colors";
import { useState } from "react";
import uuid from "react-native-uuid";

const WeekMealModal = ({ modalVisible, setModalVisible, onAdd }) => {
  const [name, setName] = useState("");

  const closeModal = () => {
    setModalVisible(false);
    setTimeout(() => {
      setName("");
    }, 500);
  };

  const submit = () => {
    const newWeekMeal = {
      id: uuid.v4(),
      name: name,
    };

    onAdd(newWeekMeal);
    closeModal();
  };

  return (
    <Modal animationType="fade" visible={modalVisible} transparent={true}>
      <TouchableWithoutFeedback onPressOut={() => Keyboard.dismiss()}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              marginBottom: 40,
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
            }}
          >
            <TextInput
              value={name}
              placeholder="Name"
              onChangeText={setName}
              style={{
                padding: 5,
                color: "black",
                fontSize: 15,
                width: "90%",
              }}
              textAlign="center"
              placeholderTextColor="#7d7a7a"
              keyboardType="ascii-capable"
              autoFocus={true}
              enablesReturnKeyAutomatically={true}
              returnKeyType="done"
              onSubmitEditing={submit}
              autoCapitalize="words"
              maxLength={20}
            />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                marginTop: 15,
              }}
            >
              <TouchableOpacity onPress={closeModal}>
                <Text style={{ color: "red", fontSize: 17 }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity disabled={name === ""} onPress={submit}>
                <Text
                  style={{
                    color: colors.primaryBlue,
                    fontSize: 17,
                    fontWeight: "bold",
                    opacity: name === "" ? 0.4 : 1,
                  }}
                >
                  Add
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default WeekMealModal;
