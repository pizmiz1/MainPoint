import { LayoutAnimation, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import colors from "../constants/colors";
import { useState } from "react";
import uuid from "react-native-uuid";
import { WeekMeal } from "../types/weekMeal";
import weekCategories from "../constants/weekCategories";
import { useGlobalContext } from "../store/GlobalContext";

// Custom Components
import CategorySelector from "./CategorySelector";
import FadeModal from "./FadeModal";

interface WeekMealModalProps {
  modalVisible: boolean;
  setModalVisible: (newModalVisible: boolean) => void;
  backgroundColor: (item: any) => string;
  selectedWeekMeal: WeekMeal | undefined;
}

const WeekMealModal = ({ modalVisible, setModalVisible, backgroundColor, selectedWeekMeal }: WeekMealModalProps) => {
  const { updateWeekMeals } = useGlobalContext();

  const [name, setName] = useState(selectedWeekMeal ? selectedWeekMeal.name : "");
  const [cat, setCat] = useState<string | null>(selectedWeekMeal ? selectedWeekMeal.category : null);
  const [catInvalid, setCatInvalid] = useState(false);

  const cats = Object.values(weekCategories);

  const closeModal = () => {
    setModalVisible(false);
  };

  const submit = () => {
    if (cat === null) {
      LayoutAnimation.configureNext(LayoutAnimation.create(200, LayoutAnimation.Types.linear, LayoutAnimation.Properties.opacity));
      setCatInvalid(true);
      return;
    }

    const weekMeal: WeekMeal = {
      id: selectedWeekMeal ? selectedWeekMeal.id : uuid.v4(),
      name: name,
      category: cat as (typeof weekCategories)[keyof typeof weekCategories],
    };

    if (selectedWeekMeal) {
      updateWeekMeals((prev) => prev.map((curr) => (curr.id === weekMeal.id ? { ...curr, name: weekMeal.name, category: weekMeal.category } : curr)));
    } else {
      updateWeekMeals((prev) => [...prev, weekMeal]);
    }
    closeModal();
  };

  const addDisabled = name === "" || cat === null;

  return (
    <FadeModal modalVisible={modalVisible} innerViewStyle={{ marginBottom: 110 }}>
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
          <Text style={[styles.addText, { opacity: addDisabled ? 0.4 : 1 }]}>{selectedWeekMeal ? "Update" : "Add"}</Text>
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
