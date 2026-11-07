import { createContext, ReactNode, useContext, useState } from "react";
import { Grocery } from "../types/grocery";
import { WeekMeal } from "../types/weekMeal";
import { MealNote } from "../types/mealNote";
import asyncKeys from "../constants/asyncKeys";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface GlobalContextType {
  allGroceries: Grocery[];
  groceryList: Grocery[];
  weekMeals: WeekMeal[];
  mealNotes: MealNote[];
  crossedGroceryUUIDs: string[];
  crossedWeekMealUUIDs: string[];
  updateAllGroceries: (update: Grocery[] | ((prev: Grocery[]) => Grocery[])) => void;
  updateGroceryList: (update: Grocery[] | ((prev: Grocery[]) => Grocery[])) => void;
  updateWeekMeals: (update: WeekMeal[] | ((prev: WeekMeal[]) => WeekMeal[])) => void;
  updateMealNotes: (update: MealNote[] | ((prev: MealNote[]) => MealNote[])) => void;
  updateCrossedGroceryUUIDs: (update: string[] | ((prev: string[]) => string[])) => void;
  updateCrossedWeekMealUUIDs: (update: string[] | ((prev: string[]) => string[])) => void;
}

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [allGroceries, setAllGroceries] = useState<Grocery[]>([]);
  const [groceryList, setGroceryList] = useState<Grocery[]>([]);
  const [weekMeals, setWeekMeals] = useState<WeekMeal[]>([]);
  const [mealNotes, setMealNotes] = useState<MealNote[]>([]);
  const [crossedGroceryUUIDs, setCrossedGroceryUUIDs] = useState<string[]>([]);
  const [crossedWeekMealUUIDs, setCrossedWeekMealUUIDs] = useState<string[]>([]);

  const updateAllGroceries = async (update: Grocery[] | ((prev: Grocery[]) => Grocery[])) => {
    if (typeof update === "function") {
      setAllGroceries((prev) => {
        const nextState = update(prev);
        AsyncStorage.setItem(asyncKeys.allGroceries, JSON.stringify(nextState));
        return nextState;
      });
    } else {
      setAllGroceries(update);
      await AsyncStorage.setItem(asyncKeys.allGroceries, JSON.stringify(update));
    }
  };

  const updateGroceryList = async (update: Grocery[] | ((prev: Grocery[]) => Grocery[])) => {
    if (typeof update === "function") {
      setGroceryList((prev) => {
        const nextState = update(prev);
        AsyncStorage.setItem(asyncKeys.groceryList, JSON.stringify(nextState));
        return nextState;
      });
    } else {
      setGroceryList(update);
      await AsyncStorage.setItem(asyncKeys.groceryList, JSON.stringify(update));
    }
  };

  const updateWeekMeals = async (update: WeekMeal[] | ((prev: WeekMeal[]) => WeekMeal[])) => {
    if (typeof update === "function") {
      setWeekMeals((prev) => {
        const nextState = update(prev);
        AsyncStorage.setItem(asyncKeys.weekMeals, JSON.stringify(nextState));
        return nextState;
      });
    } else {
      setWeekMeals(update);
      await AsyncStorage.setItem(asyncKeys.weekMeals, JSON.stringify(update));
    }
  };

  const updateMealNotes = async (update: MealNote[] | ((prev: MealNote[]) => MealNote[])) => {
    if (typeof update === "function") {
      setMealNotes((prev) => {
        const nextState = update(prev);
        AsyncStorage.setItem(asyncKeys.mealNotes, JSON.stringify(nextState));
        return nextState;
      });
    } else {
      setMealNotes(update);
      await AsyncStorage.setItem(asyncKeys.mealNotes, JSON.stringify(update));
    }
  };

  const updateCrossedGroceryUUIDs = async (update: string[] | ((prev: string[]) => string[])) => {
    if (typeof update === "function") {
      setCrossedGroceryUUIDs((prev) => {
        const nextState = update(prev);
        AsyncStorage.setItem(asyncKeys.crossedGroceryUuids, JSON.stringify(nextState));
        return nextState;
      });
    } else {
      setCrossedGroceryUUIDs(update);
      await AsyncStorage.setItem(asyncKeys.crossedGroceryUuids, JSON.stringify(update));
    }
  };

  const updateCrossedWeekMealUUIDs = async (update: string[] | ((prev: string[]) => string[])) => {
    if (typeof update === "function") {
      setCrossedWeekMealUUIDs((prev) => {
        const nextState = update(prev);
        AsyncStorage.setItem(asyncKeys.crossedWeekMealUuids, JSON.stringify(nextState));
        return nextState;
      });
    } else {
      setCrossedWeekMealUUIDs(update);
      await AsyncStorage.setItem(asyncKeys.crossedWeekMealUuids, JSON.stringify(update));
    }
  };

  const contextValue: GlobalContextType = {
    allGroceries,
    groceryList,
    weekMeals,
    mealNotes,
    crossedGroceryUUIDs,
    crossedWeekMealUUIDs,
    updateAllGroceries,
    updateGroceryList,
    updateWeekMeals,
    updateMealNotes,
    updateCrossedGroceryUUIDs,
    updateCrossedWeekMealUUIDs,
  };

  return <GlobalContext.Provider value={contextValue}>{children}</GlobalContext.Provider>;
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
