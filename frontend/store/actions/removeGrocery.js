export const REMOVE_GROCERY = "REMOVE_GROCERY";

export const removeGroceryAction = (grocery) => (dispatch) => {
  return new Promise(async (resolve) => {
    try {
      dispatch({
        type: REMOVE_GROCERY,
        grocery: grocery,
      });
      resolve(true);
    } catch (err) {
      resolve(false);
      console.log("Failed Removing Grocery");
      console.log(err);
    }
  });
};
