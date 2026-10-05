import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { useWeekMeals } from "../hooks/useWeekMeals";
import { WeekMeal } from "../types/weekMeal";
import weekCategories from "../constants/weekCategories";
import colors from "../constants/colors";

// Custom Hooks
import { useCrossedWeekMealUUIDs } from "../hooks/useCrossedWeekMealUUIDs";

// Custom Components
import WeekMealModal from "../components/WeekMealModal";
import PageContainer from "../components/PageContainer";
import Category from "../components/Category";
import ClearAll from "../components/ClearAll";

const WeekScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const { weekMeals, updateWeekMeals } = useWeekMeals();
  const { crossedWeekMealUUIDs, updateCrossedWeekMealUUIDs } = useCrossedWeekMealUUIDs();

  const backgroundColor = (cat: string) => {
    switch (cat) {
      case weekCategories.week: {
        return colors.primaryBlue;
      }
      case weekCategories.future: {
        return "#7C3AED";
      }
      default: {
        return "#EFEFEF";
      }
    }
  };

  const addWeekMeal = (newWeekMeal: WeekMeal) => {
    updateWeekMeals([...weekMeals, newWeekMeal]);
  };

  const removeWeekMeal = (passedWeekMeal: WeekMeal) => {
    updateWeekMeals(weekMeals.filter((curr) => curr.id !== passedWeekMeal.id));
    if (crossedWeekMealUUIDs.includes(passedWeekMeal.id)) {
      updateCrossedWeekMealUUIDs(crossedWeekMealUUIDs.filter((currId) => passedWeekMeal.id !== currId));
    }
  };

  const crossWeekMeal = (passedWeekMeal: WeekMeal) => {
    if (!crossedWeekMealUUIDs.includes(passedWeekMeal.id)) {
      updateCrossedWeekMealUUIDs([...crossedWeekMealUUIDs, passedWeekMeal.id]);
    } else {
      updateCrossedWeekMealUUIDs(crossedWeekMealUUIDs.filter((currId) => passedWeekMeal.id !== currId));
    }
  };

  const clear = () => {
    updateWeekMeals([]);
    updateCrossedWeekMealUUIDs([]);
  };

  const weekList = weekMeals.filter((curr) => curr.category === weekCategories.week);
  const futureList = weekMeals.filter((curr) => curr.category === weekCategories.future);

  const categoryLists = [
    { name: weekCategories.week, list: weekList },
    { name: weekCategories.future, list: futureList },
  ];

  return (
    <View style={styles.container}>
      <WeekMealModal modalVisible={modalVisible} setModalVisible={setModalVisible} onAdd={addWeekMeal} backgroundColor={backgroundColor} />

      <PageContainer
        headerText="Week"
        headerDescriptionText={`${weekMeals.length} ${weekMeals.length !== 1 ? "Meals" : "Meal"}`}
        headerActionPress={() => {
          setModalVisible(true);
        }}
      >
        <ClearAll onPress={clear} disabled={weekMeals.length === 0} />

        {categoryLists
          .filter((curr) => curr.list.length > 0)
          .map((curr) => {
            return (
              <Category
                key={curr.name}
                catName={curr.name}
                backgroundColor={backgroundColor(curr.name)}
                data={curr.list}
                onCross={crossWeekMeal}
                onRemove={removeWeekMeal}
                crossedUUIDs={crossedWeekMealUUIDs}
              />
            );
          })}
      </PageContainer>
    </View>
  );
};

export default WeekScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
  },
});
