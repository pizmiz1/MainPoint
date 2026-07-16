import { Image, Keyboard, LayoutAnimation, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import colors from "../constants/colors";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Custom Components
import MealIdeaModal from "../components/mealIdeaModal";
import Header from "../components/header";
import ScrollViewContainer from "../components/scrollViewContainer";
import asyncKeys from "../constants/asyncKeys";
import MealIdeaCard from "../components/mealIdeaCard";

const MealIdeaScreen = (props) => {
  const [mealIdeas, setMealIdeas] = useState([]);
  const [blur, setBlur] = useState(0);
  const [backgroundTrig, setBackgroundTrig] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMealIdea, setSelectedMealIdea] = useState(undefined);

  const clear = async () => {
    LayoutAnimation.configureNext(LayoutAnimation.create(200, LayoutAnimation.Types.linear, LayoutAnimation.Properties.opacity));
    const newMealIdeasJSON = JSON.stringify([]);
    await AsyncStorage.setItem(asyncKeys.mealIdeas, newMealIdeasJSON);
    setMealIdeas([]);
  };

  useEffect(() => {
    const load = async () => {
      const mealIdeasJSON = await AsyncStorage.getItem(asyncKeys.mealIdeas);
      const mealIdeasParsed = mealIdeasJSON != null ? JSON.parse(mealIdeasJSON) : null;

      if (mealIdeasParsed !== null) {
        setMealIdeas(mealIdeasParsed);
      }
    };

    load();
  }, []);

  return (
    <View style={{ flex: 1, marginTop: 25 }}>
      <MealIdeaModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        done={(passedMealIdeas) => {
          setMealIdeas(passedMealIdeas);
        }}
        mealIdeas={mealIdeas}
        mealIdea={selectedMealIdea}
      />

      <Header
        headerText="Ideas"
        descriptionText={`${mealIdeas.length} ${mealIdeas.length !== 1 ? "Items" : "Item"}`}
        backgroundTrig={backgroundTrig}
        blur={blur}
        actionPress={() => {
          setSelectedMealIdea(undefined);
          setModalVisible(true);
        }}
      />

      <ScrollViewContainer
        onScroll={(pos) => {
          if (mealIdeas.length === 0) {
            return;
          }

          setBackgroundTrig(pos.nativeEvent.contentOffset.y);
          if (pos.nativeEvent.contentOffset.y < 40 && pos.nativeEvent.contentOffset.y > 0) {
            setBlur(pos.nativeEvent.contentOffset.y);
          } else if (pos.nativeEvent.contentOffset.y > 40) {
            setBlur(40);
          } else if (pos.nativeEvent.contentOffset.y <= 0) {
            setBlur(0);
          }
        }}
      >
        <View
          style={{
            marginBottom: 20,
            marginTop: 80,
            paddingHorizontal: 20,
          }}
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
        </View>
      </ScrollViewContainer>
    </View>
  );
};

export default MealIdeaScreen;
