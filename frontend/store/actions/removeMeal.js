export const REMOVE_MEAL = "REMOVE_MEAL";

export const removeMealAction = (mealIndex) => (dispatch) => {
  return new Promise(async (resolve) => {
    try {
      dispatch({
        type: REMOVE_MEAL,
        mealIndex: mealIndex,
      });
      resolve(true);
    } catch (err) {
      resolve(false);
      console.log("Failed Removing Meal");
      console.log(err);
    }
  });
};
