export const CROSS_DAILY_FOOD = "CROSS_DAILY_FOOD";

export const crossDailyFood = (passedDailyFood) => (dispatch) => {
  return new Promise(async (resolve) => {
    try {
      dispatch({
        type: CROSS_DAILY_FOOD,
        passedDailyFood: passedDailyFood,
      });
      resolve(true);
    } catch (err) {
      console.log("Failed Crossing Daily Food");
      console.log(err);
    }
  });
};
