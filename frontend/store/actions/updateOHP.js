export const UPDATE_OHP = "UPDATE_OHP";

export const updateOHP = (maxOHP) => (dispatch) => {
  return new Promise(async (resolve) => {
    try {
      dispatch({
        type: UPDATE_OHP,
        maxOHP: maxOHP,
      });
      resolve(true);
    } catch (err) {
      resolve(false);
      console.log("Failed Updating OHP");
      console.log(err);
    }
  });
};
