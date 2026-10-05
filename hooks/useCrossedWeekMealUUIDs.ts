import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import asyncKeys from "../constants/asyncKeys";

export const useCrossedWeekMealUUIDs = () => {
  const [crossedWeekMealUUIDs, setCrossedWeekMealUUIDs] = useState<string[]>([]);

  useEffect(() => {
    const load = async () => {
      const crossedWeekMealUuidsJSON = await AsyncStorage.getItem(asyncKeys.crossedWeekMealUuids);
      const crossedWeekMealUuidsParsed = crossedWeekMealUuidsJSON != null ? JSON.parse(crossedWeekMealUuidsJSON) : null;

      if (crossedWeekMealUuidsParsed !== null) {
        setCrossedWeekMealUUIDs(crossedWeekMealUuidsParsed);
      }
    };

    load();
  }, []);

  const updateCrossedWeekMealUUIDs = async (newcrossedWeekMealUUIDs: string[]) => {
    setCrossedWeekMealUUIDs(newcrossedWeekMealUUIDs);
    const crossGroceryUUIDsJSON = JSON.stringify(newcrossedWeekMealUUIDs);
    await AsyncStorage.setItem(asyncKeys.crossedWeekMealUuids, crossGroceryUUIDsJSON);
  };

  return { crossedWeekMealUUIDs, updateCrossedWeekMealUUIDs };
};
