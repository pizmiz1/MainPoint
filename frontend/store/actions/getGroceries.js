export const UPDATE_GROCERIES = "UPDATE_GROCERIES";
import { db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export const getGroceries = () => (dispatch) => {
  return new Promise(async (resolve) => {
    try {
      const GroceriesDB = await getDocs(collection(db, "Grocery"));
      dispatch({
        type: UPDATE_GROCERIES,
        all: false,
        groceries: GroceriesDB.docs.at(1).data().Groceries,
      });
      dispatch({
        type: UPDATE_GROCERIES,
        all: true,
        groceries: GroceriesDB.docs.at(0).data().AllGroceries,
      });

      resolve(true);
    } catch (err) {
      console.log("Failed Getting Groceries");
      console.log(err);
    }
  });
};
