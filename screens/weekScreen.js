import { Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { useWeekMeals } from "../hooks/useWeekMeals";
import { AntDesign } from "@expo/vector-icons";

// Custom Hooks
import { useCrossedWeekMealUUIDs } from "../hooks/useCrossedWeekMealUUIDs";

// Custom Components
import WeekMealModal from "../components/weekMealModal";
import PageContainer from "../components/pageContainer";

const WeekScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const { weekMeals, updateWeekMeals } = useWeekMeals();
  const { crossedWeekMealUUIDs, updateCrossedWeekMealUUIDs } = useCrossedWeekMealUUIDs();

  const addWeekMeal = (newWeekMeal) => {
    updateWeekMeals([...weekMeals, newWeekMeal]);
  };

  const removeWeekMeal = (passedWeekMeal) => {
    updateWeekMeals(weekMeals.filter((curr) => curr.id !== passedWeekMeal.id));
    if (crossedWeekMealUUIDs.includes(passedWeekMeal.id)) {
      updateCrossedWeekMealUUIDs(crossedWeekMealUUIDs.filter((currId) => passedWeekMeal.id !== currId));
    }
  };

  const crossWeekMeal = (passedWeekMeal) => {
    if (!crossedWeekMealUUIDs.includes(passedWeekMeal.id)) {
      updateCrossedWeekMealUUIDs([...crossedWeekMealUUIDs, passedWeekMeal.id]);
    } else {
      updateCrossedWeekMealUUIDs(crossedWeekMealUUIDs.filter((currId) => passedWeekMeal.id !== currId));
    }
  };

  return (
    <View style={{ flex: 1, marginTop: 25 }}>
      <WeekMealModal modalVisible={modalVisible} setModalVisible={setModalVisible} onAdd={addWeekMeal} />

      <PageContainer
        headerText="Week"
        headerDescriptionText={`${weekMeals.length} ${weekMeals.length !== 1 ? "Meals" : "Meal"}`}
        viewStyle={{ paddingHorizontal: 20 }}
        headerActionPress={() => {
          setModalVisible(true);
        }}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: "center",
            marginTop: 10,
            opacity: weekMeals.length > 0 ? 1 : 0,
          }}
          onPress={() => {
            updateWeekMeals([]);
            updateCrossedWeekMealUUIDs([]);
          }}
          disabled={weekMeals.length === 0}
        >
          <Text style={{ fontSize: 20, color: "red" }}>Clear All</Text>
        </TouchableOpacity>

        <View style={{ marginTop: 20, gap: 20 }}>
          {weekMeals.map((curr) => {
            return (
              <View
                key={curr.id}
                style={{
                  backgroundColor: "white",
                  borderRadius: 20,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  style={{ flex: 1 }}
                  onPress={() => {
                    crossWeekMeal(curr);
                  }}
                >
                  <Text
                    style={{
                      fontSize: 25,
                      marginTop: 10,
                      marginBottom: 10,
                      marginLeft: 20,
                      textDecorationLine: crossedWeekMealUUIDs.includes(curr.id) ? "line-through" : "none",
                      opacity: crossedWeekMealUUIDs.includes(curr.id) ? 0.2 : 1,
                    }}
                  >
                    {curr.name}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    paddingHorizontal: 10,
                  }}
                  onPress={() => {
                    removeWeekMeal(curr);
                  }}
                >
                  <AntDesign name="minus-circle" size={20} color="red" />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </PageContainer>
    </View>
  );
};

export default WeekScreen;
