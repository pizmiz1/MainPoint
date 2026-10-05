import { useEffect, useRef } from "react";
import asyncKeys from "../constants/asyncKeys";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Grocery } from "../types/grocery";

export const useAllGroceries = () => {
  const allGroceries = useRef<Grocery[]>([]);

  useEffect(() => {
    const load = async () => {
      const allGroceriesJSON = await AsyncStorage.getItem(asyncKeys.allGroceries);
      const allGroceriesParsed = allGroceriesJSON != null ? JSON.parse(allGroceriesJSON) : null;

      if (allGroceriesParsed !== null) {
        allGroceries.current = allGroceriesParsed;
      }
    };

    load();
  }, []);

  const updateAllGroceries = async (newAllGroceries: Grocery[]) => {
    allGroceries.current = newAllGroceries;
    const allGroceriesJSON = JSON.stringify(newAllGroceries);
    await AsyncStorage.setItem(asyncKeys.allGroceries, allGroceriesJSON);
  };

  return { allGroceries, updateAllGroceries };
};
