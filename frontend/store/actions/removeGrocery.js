export const REMOVE_GROCERY = "REMOVE_GROCERY";

export const removeGroceryAction = (grocery, all) => (dispatch) => {
  return new Promise(async (resolve) => {
    try {
      if (all === undefined) {
        all = false;
      }
      dispatch({
        type: REMOVE_GROCERY,
        grocery: grocery,
        all: all,
      });
      resolve(true);
    } catch (err) {
      resolve(false);
      console.log("Failed Removing Grocery");
      console.log(err);
    }
  });
};
