export const GET_GROCERIES = "GET_GROCERIES";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getGroceries = () => (dispatch) => {
  return new Promise(async (resolve) => {
    try {
      // ############ OLD FIRESTORE CODE ##############
      // const GroceriesDB = await getDocs(collection(db, "Grocery"));

      const GroceryData = await AsyncStorage.getItem("Grocery Data");
      if (GroceryData) {
        const transformedGroceryData = await JSON.parse(GroceryData).data;
        dispatch({
          type: GET_GROCERIES,
          all: false,
          groceries: transformedGroceryData.at(1).Groceries,
        });
        dispatch({
          type: GET_GROCERIES,
          all: true,
          groceries: transformedGroceryData.at(0).AllGroceries,
        });
      }

      resolve(true);
    } catch (err) {
      console.log("Failed Getting Groceries");
      console.log(err);
    }
  });
};
