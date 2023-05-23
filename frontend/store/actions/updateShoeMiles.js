export const UPDATE_SHOE_MILES = "UPDATE_SHOE_MILES";

export const updateShoeMiles =
  (addOrSubtract, miles) => (dispatch, getState) => {
    return new Promise(async (resolve) => {
      try {
        let currShoeMiles = getState().shoeMiles;
        switch (addOrSubtract) {
          case "Add": {
            currShoeMiles = currShoeMiles + miles;
            break;
          }
          case "Subtract": {
            if (currShoeMiles !== 0) {
              currShoeMiles = currShoeMiles - miles;
            }
            break;
          }
          default: {
            break;
          }
        }
        dispatch({
          type: UPDATE_SHOE_MILES,
          shoeMiles: currShoeMiles,
        });
        resolve(true);
      } catch (err) {
        resolve(false);
        console.log("Failed Updating Shoe Miles");
        console.log(err);
      }
    });
  };
