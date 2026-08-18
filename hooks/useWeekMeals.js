import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import asyncKeys from "../constants/asyncKeys";

export const useWeekMeals = () => {
  const [weekMeals, setWeekMeals] = useState([]);

  useEffect(() => {
    const load = async () => {
      const weekMealsJSON = await AsyncStorage.getItem(asyncKeys.weekMeals);
      const weekMealsParsed = weekMealsJSON != null ? JSON.parse(weekMealsJSON) : null;

      if (weekMealsParsed !== null) {
        setWeekMeals(weekMealsParsed);
      }
    };

    load();
  }, []);

  const updateWeekMeals = async (newWeekMeals) => {
    setWeekMeals(newWeekMeals);
    const newWeekMealsJSON = JSON.stringify(newWeekMeals);
    await AsyncStorage.setItem(asyncKeys.weekMeals, newWeekMealsJSON);
  };

  return { weekMeals, updateWeekMeals };
};
