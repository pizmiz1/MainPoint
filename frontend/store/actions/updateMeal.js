export const UPDATE_MEAL = "UPDATE_MEAL";

export const updateMealAction = (meal, mealIndex) => (dispatch) => {
  return new Promise(async (resolve) => {
    try {
      dispatch({
        type: UPDATE_MEAL,
        meal: meal,
        mealIndex: mealIndex,
      });
      resolve(true);
    } catch (err) {
      resolve(false);
      console.log("Failed Updating Meal");
      console.log(err);
    }
  });
};
