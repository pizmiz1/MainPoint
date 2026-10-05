import { LayoutAnimation, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import colors from "../constants/colors";
import { useState } from "react";
import uuid from "react-native-uuid";
import { WeekMeal } from "../types/weekMeal";
import weekCategories from "../constants/weekCategories";

// Custom Components
import CategorySelector from "./CategorySelector";
import FadeModal from "./FadeModal";

interface WeekIdeaModalProps {
  modalVisible: boolean;
  setModalVisible: (newModalVisible: boolean) => void;
  onAdd: (weekMeal: WeekMeal) => void;
  backgroundColor: (item: any) => string;
}

const WeekMealModal = ({ modalVisible, setModalVisible, onAdd, backgroundColor }: WeekIdeaModalProps) => {
  const [name, setName] = useState("");
  const [cat, setCat] = useState<string | null>(null);
  const [catInvalid, setCatInvalid] = useState(false);

  const cats = Object.values(weekCategories);

  const closeModal = () => {
    setModalVisible(false);
    setTimeout(() => {
      setName("");
      setCat(null);
      setCatInvalid(false);
    }, 500);
  };

  const submit = () => {
    if (cat === null) {
      LayoutAnimation.configureNext(LayoutAnimation.create(200, LayoutAnimation.Types.linear, LayoutAnimation.Properties.opacity));
      setCatInvalid(true);
      return;
    }

    const newWeekMeal: WeekMeal = {
      id: uuid.v4(),
      name: name,
      category: cat as (typeof weekCategories)[keyof typeof weekCategories],
    };

    onAdd(newWeekMeal);
    closeModal();
  };

  const addDisabled = name === "" || cat === null;

  return (
    <FadeModal modalVisible={modalVisible} innerViewStyle={{ marginBottom: 80 }}>
      <TextInput
        value={name}
        placeholder="Name"
        onChangeText={setName}
        style={styles.nameInput}
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

      <View style={styles.catContainer}>
        <CategorySelector
          cats={cats}
          selectedCat={cat}
          onSelect={(selectedItem) => {
            setCat(selectedItem);
            setCatInvalid(false);
          }}
          backgroundColor={backgroundColor}
        />
        {catInvalid ? <Text style={styles.catInvalidText}>Select a Category!</Text> : null}
      </View>

      <View style={styles.btnContainer}>
        <TouchableOpacity onPress={closeModal}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity disabled={addDisabled} onPress={submit}>
          <Text style={[styles.addText, { opacity: addDisabled ? 0.4 : 1 }]}>Add</Text>
        </TouchableOpacity>
      </View>
    </FadeModal>
  );
};

export default WeekMealModal;

const styles = StyleSheet.create({
  nameInput: {
    padding: 5,
    color: "black",
    fontSize: 15,
    width: "90%",
  },
  catContainer: {
    marginTop: 5,
  },
  catInvalidText: {
    color: "red",
    alignSelf: "center",
    marginTop: 5,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 15,
  },
  cancelText: {
    color: "red",
    fontSize: 17,
  },
  addText: {
    color: colors.primaryBlue,
    fontSize: 17,
    fontWeight: "bold",
  },
});
