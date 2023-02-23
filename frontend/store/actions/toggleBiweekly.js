export const TOGGLE_BIWEEKLY = "TOGGLE_BIWEEKLY";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const toggleBiweekly = () => (dispatch, getState) => {
  dispatch({
    type: TOGGLE_BIWEEKLY,
  });
  AsyncStorage.setItem(
    "Biweekly",
    JSON.stringify({
      biweekly: getState().biweekly,
    })
  );
};
