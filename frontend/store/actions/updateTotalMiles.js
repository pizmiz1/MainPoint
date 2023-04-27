export const UPDATE_TOTAL_MILES = "UPDATE_TOTAL_MILES";

export const updateTotalMiles =
  (addOrSubtract, miles) => (dispatch, getState) => {
    return new Promise(async (resolve) => {
      try {
        let currTotalMiles = getState().totalMiles;
        switch (addOrSubtract) {
          case "Add": {
            currTotalMiles = currTotalMiles + miles;
            break;
          }
          case "Subtract": {
            if (currTotalMiles !== 0) {
              currTotalMiles = currTotalMiles - miles;
            }
            break;
          }
          default: {
            break;
          }
        }
        dispatch({
          type: UPDATE_TOTAL_MILES,
          totalMiles: currTotalMiles,
        });
        resolve(true);
      } catch (err) {
        resolve(false);
        console.log("Failed Updating Total Miles");
        console.log(err);
      }
    });
  };
