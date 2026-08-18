import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import asyncKeys from "../constants/asyncKeys";

export const useCrossedGroceryUUIDs = () => {
  const [crossedGroceryUUIDs, setCrossedGroceryUUIDs] = useState([]);

  useEffect(() => {
    const load = async () => {
      const crossedGroceryUuidsJSON = await AsyncStorage.getItem(asyncKeys.crossedGroceryUuids);
      const crossedGroceryUuidsParsed = crossedGroceryUuidsJSON != null ? JSON.parse(crossedGroceryUuidsJSON) : null;

      if (crossedGroceryUuidsParsed !== null) {
        setCrossedGroceryUUIDs(crossedGroceryUuidsParsed);
      }
    };

    load();
  }, []);

  const updateCrossedGroceryUUIDs = async (newCrossedGroceryUUIDs) => {
    setCrossedGroceryUUIDs(newCrossedGroceryUUIDs);
    const crossGroceryUUIDsJSON = JSON.stringify(newCrossedGroceryUUIDs);
    await AsyncStorage.setItem(asyncKeys.crossedGroceryUuids, crossGroceryUUIDsJSON);
  };

  return { crossedGroceryUUIDs, updateCrossedGroceryUUIDs };
};
