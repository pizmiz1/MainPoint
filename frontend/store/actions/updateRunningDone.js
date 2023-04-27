export const UPDATE_RUNNING_DONE = "UPDATE_RUNNING_DONE";

export const updateRunningDone = (runningDone) => (dispatch) => {
  return new Promise(async (resolve) => {
    try {
      dispatch({
        type: UPDATE_RUNNING_DONE,
        runningDone: runningDone,
      });
      resolve(true);
    } catch (err) {
      resolve(false);
      console.log("Failed Updating Running Done");
      console.log(err);
    }
  });
};
