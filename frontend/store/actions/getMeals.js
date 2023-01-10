export const GET_MEALS = "GET_MEALS";
import { db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export const getMeals = () => (dispatch) => {
  return new Promise(async (resolve) => {
    try {
      const GroceriesDB = await getDocs(collection(db, "Grocery"));
      dispatch({
        type: GET_MEALS,
        meals: GroceriesDB.docs.at(2).data().Meals,
      });

      resolve(true);
    } catch (err) {
      console.log("Failed Getting Meals");
      console.log(err);
    }
  });
};
