import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import asyncKeys from "../constants/asyncKeys";

export const useGroceryList = () => {
  const [groceryList, setGroceryList] = useState([]);

  useEffect(() => {
    const load = async () => {
      const groceryListJSON = await AsyncStorage.getItem(asyncKeys.groceryList);
      const groceryListParsed = groceryListJSON != null ? JSON.parse(groceryListJSON) : null;

      if (groceryListParsed !== null) {
        setGroceryList(groceryListParsed);
      }
    };

    load();
  }, []);

  const updateGroceryList = async (newGroceryList) => {
    setGroceryList(newGroceryList);
    const groceryListJSON = JSON.stringify(newGroceryList);
    await AsyncStorage.setItem(asyncKeys.groceryList, groceryListJSON);
  };

  return { groceryList, updateGroceryList };
};
