export const UPDATE_EXCERSIZES = "UPDATE_EXCERSIZES";

export const updateExcersizes = (day, excersizes) => (dispatch) => {
  return new Promise(async (resolve) => {
    try {
      dispatch({
        type: UPDATE_EXCERSIZES,
        day: day,
        excersizes: excersizes,
      });
      resolve(true);
    } catch (err) {
      console.log("Failed Updating Excersizes");
      console.log(err);
    }
  });
};
