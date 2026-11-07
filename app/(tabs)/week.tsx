import { StyleSheet, View } from "react-native";
import { useRef, useState } from "react";
import { WeekMeal } from "../../types/weekMeal";
import weekCategories from "../../constants/weekCategories";
import colors from "../../constants/colors";
import { useGlobalContext } from "../../store/GlobalContext";

// Custom Components
import WeekMealModal from "../../components/WeekMealModal";
import PageContainer from "../../components/PageContainer";
import Category from "../../components/Category";
import ClearAll from "../../components/ClearAll";

const WeekScreen = () => {
  const { weekMeals, updateWeekMeals } = useGlobalContext();
  const { crossedWeekMealUUIDs, updateCrossedWeekMealUUIDs } = useGlobalContext();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedWeekMeal, setSelectedWeekMeal] = useState<WeekMeal | undefined>();

  const modalKey = useRef(0);

  const backgroundColor = (cat: string) => {
    switch (cat) {
      case weekCategories.week: {
        return colors.primaryBlue;
      }
      case weekCategories.future: {
        return "#7C3AED";
      }
      case weekCategories.lunch: {
        return "#14B8A6";
      }
      default: {
        return "#EFEFEF";
      }
    }
  };

  const removeWeekMeal = (passedWeekMeal: WeekMeal) => {
    updateWeekMeals((prev) => prev.filter((curr) => curr.id !== passedWeekMeal.id));
    updateCrossedWeekMealUUIDs((prev) => {
      if (prev.includes(passedWeekMeal.id)) {
        return prev.filter((currId) => passedWeekMeal.id !== currId);
      }

      return prev;
    });
  };

  const crossWeekMeal = (passedWeekMeal: WeekMeal) => {
    updateCrossedWeekMealUUIDs((prev) => {
      if (!prev.includes(passedWeekMeal.id)) {
        return [...prev, passedWeekMeal.id];
      } else {
        return prev.filter((currId) => passedWeekMeal.id !== currId);
      }
    });
  };

  const clear = () => {
    updateWeekMeals([]);
    updateCrossedWeekMealUUIDs([]);
  };

  const weekList = weekMeals.filter((curr) => curr.category === weekCategories.week);
  const futureList = weekMeals.filter((curr) => curr.category === weekCategories.future);
  const lunchList = weekMeals.filter((curr) => curr.category === weekCategories.lunch);

  const categoryLists = [
    { name: weekCategories.lunch, list: lunchList },
    { name: weekCategories.week, list: weekList },
    { name: weekCategories.future, list: futureList },
  ];

  return (
    <View style={styles.container}>
      <WeekMealModal
        key={modalKey.current}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        backgroundColor={backgroundColor}
        selectedWeekMeal={selectedWeekMeal}
      />

      <PageContainer
        headerText="Week"
        listLength={weekMeals.length}
        headerActionPress={() => {
          modalKey.current = modalKey.current + 1;
          setSelectedWeekMeal(undefined);
          setModalVisible(true);
        }}
        scrollDisabled={weekMeals.length === 0}
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
                onEdit={(currMeal) => {
                  modalKey.current = modalKey.current + 1;
                  setSelectedWeekMeal(currMeal);
                  setModalVisible(true);
                }}
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
  },
});
