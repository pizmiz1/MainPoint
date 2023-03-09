export const GET_MEALS = "GET_MEALS";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getMeals = () => (dispatch) => {
  return new Promise(async (resolve) => {
    try {
      // ############ OLD FIRESTORE CODE ##############
      // const GroceriesDB = await getDocs(collection(db, "Grocery"));

      const GroceryData = await AsyncStorage.getItem("Grocery Data");
      if (GroceryData) {
        const transformedGroceryData = await JSON.parse(GroceryData).data;
        dispatch({
          type: GET_MEALS,
          meals: transformedGroceryData.at(2).Meals,
        });
      }

      resolve(true);
    } catch (err) {
      console.log("Failed Getting Meals");
      console.log(err);
    }
  });
};
