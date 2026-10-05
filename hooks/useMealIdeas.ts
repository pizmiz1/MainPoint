import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import asyncKeys from "../constants/asyncKeys";
import { MealIdea } from "../types/mealIdea";

export const useMealIdeas = () => {
  const [mealIdeas, setMealIdeas] = useState<MealIdea[]>([]);

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

  const updateMealIdeas = async (newMealIdeas: MealIdea[]) => {
    setMealIdeas(newMealIdeas);
    const newMealIdeasJSON = JSON.stringify(newMealIdeas);
    await AsyncStorage.setItem(asyncKeys.mealIdeas, newMealIdeasJSON);
  };

  return { mealIdeas, updateMealIdeas };
};
