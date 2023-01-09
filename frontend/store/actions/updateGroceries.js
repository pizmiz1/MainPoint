export const UPDATE_GROCERIES = "UPDATE_GROCERIES";
import { db } from "../../firebaseConfig";
import { updateDoc, doc } from "firebase/firestore";

export const updateGroceries =
  (passedGroceryList, passedAllGroceryList) => (dispatch, getState) => {
    return new Promise(async (resolve) => {
      try {
        const GroceryListDoc = await doc(db, "Grocery", "GroceryList");
        await updateDoc(GroceryListDoc, { Groceries: passedGroceryList });

        const AllGroceryListDoc = await doc(db, "Grocery", "AllGroceries");
        await updateDoc(AllGroceryListDoc, {
          AllGroceries: passedAllGroceryList,
        });

        dispatch({
          type: UPDATE_GROCERIES,
          groceryList: passedGroceryList,
          allGroceries: passedAllGroceryList,
        });
        resolve(true);
      } catch (err) {
        resolve(false);
        console.log("Failed Updating Groceries");
        console.log(err);
      }
    });
  };
