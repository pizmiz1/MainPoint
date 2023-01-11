export const ADD_GROCERY = "ADD_GROCERY";

export const addGroceryAction = (grocery) => (dispatch) => {
  return new Promise(async (resolve) => {
    try {
      dispatch({
        type: ADD_GROCERY,
        grocery: grocery,
      });
      resolve(true);
    } catch (err) {
      resolve(false);
      console.log("Failed Adding Grocery");
      console.log(err);
    }
  });
};
