export const UPDATE_RUNNING = "UPDATE_RUNNING";

export const updateRunning = (runningData) => (dispatch) => {
  return new Promise(async (resolve) => {
    try {
      dispatch({
        type: UPDATE_RUNNING,
        runningData: runningData,
      });
      resolve(true);
    } catch (err) {
      resolve(false);
      console.log("Failed Updating Running Data");
      console.log(err);
    }
  });
};
