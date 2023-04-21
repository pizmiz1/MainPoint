export const UPDATE_START_DATE = "UPDATE_START_DATE";

export const updateRunningStartDate = (startDate) => (dispatch) => {
  return new Promise(async (resolve) => {
    try {
      dispatch({
        type: UPDATE_START_DATE,
        startDate: startDate,
      });
      resolve(true);
    } catch (err) {
      resolve(false);
      console.log("Failed Updating Running Start Date");
      console.log(err);
    }
  });
};
