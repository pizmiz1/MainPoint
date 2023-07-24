export const ADD_NEW_GROCERY = "ADD_NEW_GROCERY";

export const addNewGroceryAction = (grocery) => (dispatch) => {
  return new Promise(async (resolve) => {
    try {
      dispatch({
        type: ADD_NEW_GROCERY,
        grocery: grocery,
      });
      resolve(true);
    } catch (err) {
      resolve(false);
      console.log("Failed Adding New Grocery");
      console.log(err);
    }
  });
};
