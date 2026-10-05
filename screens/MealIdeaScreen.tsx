import { LayoutAnimation, StyleSheet, View } from "react-native";
import { useState } from "react";
import { MealIdea } from "../types/mealIdea";

// Custom Hooks
import { useMealIdeas } from "../hooks/useMealIdeas";

// Custom Components
import MealIdeaModal from "../components/MealIdeaModal";
import MealIdeaCard from "../components/MealIdeaCard";
import PageContainer from "../components/PageContainer";
import ClearAll from "../components/ClearAll";

const MealIdeaScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMealIdea, setSelectedMealIdea] = useState<MealIdea | undefined>(undefined);

  const { mealIdeas, updateMealIdeas } = useMealIdeas();

  const clear = () => {
    LayoutAnimation.configureNext(LayoutAnimation.create(200, LayoutAnimation.Types.linear, LayoutAnimation.Properties.opacity));
    updateMealIdeas([]);
  };

  return (
    <View style={styles.container}>
      <MealIdeaModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        mealIdeas={mealIdeas}
        updateMealIdeas={updateMealIdeas}
        mealIdea={selectedMealIdea}
      />

      <PageContainer
        headerText="Ideas"
        headerDescriptionText={`${mealIdeas.length} ${mealIdeas.length !== 1 ? "Items" : "Item"}`}
        headerActionPress={() => {
          setSelectedMealIdea(undefined);
          setModalVisible(true);
        }}
        viewStyle={styles.pageContainer}
      >
        <ClearAll onPress={clear} disabled={mealIdeas.length === 0} />

        <View style={styles.ideaContainer}>
          {mealIdeas.map((curr) => {
            return (
              <MealIdeaCard
                key={curr.id}
                mealIdea={curr}
                onPress={(mealIdeaId) => {
                  setSelectedMealIdea(mealIdeas.find((curr) => curr.id === mealIdeaId));
                  setModalVisible(true);
                }}
              />
            );
          })}
        </View>
      </PageContainer>
    </View>
  );
};

export default MealIdeaScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
  },
  pageContainer: {
    paddingHorizontal: 20,
  },
  ideaContainer: {
    gap: 20,
    marginTop: 20,
  },
});
