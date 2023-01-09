export const UPDATE_POWER = "UPDATE_POWER";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const updatePower = (power) => (dispatch) => {
  return new Promise(async (resolve) => {
    try {
      dispatch({
        type: UPDATE_POWER,
        power: power,
      });
      AsyncStorage.setItem(
        "Power",
        JSON.stringify({
          power: power,
        })
      );
      resolve(true);
    } catch (err) {
      resolve(false);
      console.log("Failed Updating Power");
      console.log(err);
    }
  });
};
