import { LayoutAnimation, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";

// Custom Hooks
import { useMealIdeas } from "../hooks/useMealIdeas";

// Custom Components
import MealIdeaModal from "../components/mealIdeaModal";
import MealIdeaCard from "../components/mealIdeaCard";
import PageContainer from "../components/pageContainer";

const MealIdeaScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMealIdea, setSelectedMealIdea] = useState(undefined);

  const { mealIdeas, updateMealIdeas } = useMealIdeas();

  const clear = () => {
    LayoutAnimation.configureNext(LayoutAnimation.create(200, LayoutAnimation.Types.linear, LayoutAnimation.Properties.opacity));
    updateMealIdeas([]);
  };

  return (
    <View style={{ flex: 1, marginTop: 25 }}>
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
        viewStyle={{ paddingHorizontal: 20 }}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: "center",
            marginTop: 10,
            opacity: mealIdeas.length > 0 ? 1 : 0,
          }}
          onPress={clear}
          disabled={mealIdeas.length === 0}
        >
          <Text style={{ fontSize: 20, color: "red" }}>Clear All</Text>
        </TouchableOpacity>

        <View style={{ gap: 20, marginTop: 20 }}>
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
