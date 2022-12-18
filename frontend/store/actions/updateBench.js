export const UPDATE_BENCH = "UPDATE_BENCH";

export const updateBench = (maxBench) => (dispatch) => {
  return new Promise(async (resolve) => {
    try {
      dispatch({
        type: UPDATE_BENCH,
        maxBench: maxBench,
      });
      resolve(true);
    } catch (err) {
      console.log("Failed Updating Bench");
      console.log(err);
    }
  });
};
