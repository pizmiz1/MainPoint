export const REMOVE_GROCERY = "REMOVE_GROCERY";
import { db } from "../../firebaseConfig";
import { updateDoc, doc } from "firebase/firestore";

export const removeGrocery = (grocery) => (dispatch, getState) => {
  return new Promise(async (resolve) => {
    try {
      const groceryList = await getState().groceryList;
      const newGroceryList = groceryList.filter(
        (currGrocery) => currGrocery.Name !== grocery.Name
      );
      const GroceryListDoc = await doc(db, "Grocery", "GroceryList");
      await updateDoc(GroceryListDoc, { Groceries: newGroceryList });

      dispatch({
        type: REMOVE_GROCERY,
        grocery: grocery,
      });
      resolve(true);
    } catch (err) {
      resolve(false);
      console.log("Failed Removing Groceries");
      console.log(err);
    }
  });
};
