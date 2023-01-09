export const UPDATE_SQUAT = "UPDATE_SQUAT";

export const updateSquat = (maxSquat) => (dispatch) => {
  return new Promise(async (resolve) => {
    try {
      dispatch({
        type: UPDATE_SQUAT,
        maxSquat: maxSquat,
      });
      resolve(true);
    } catch (err) {
      resolve(false);
      console.log("Failed Updating Squat");
      console.log(err);
    }
  });
};
