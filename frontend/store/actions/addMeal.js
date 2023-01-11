export const ADD_MEAL = "ADD_MEAL";

export const addMealAction = (meal) => (dispatch) => {
  return new Promise(async (resolve) => {
    try {
      dispatch({
        type: ADD_MEAL,
        meal: meal,
      });
      resolve(true);
    } catch (err) {
      resolve(false);
      console.log("Failed Adding Meal");
      console.log(err);
    }
  });
};
