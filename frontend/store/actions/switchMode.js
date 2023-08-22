export const SWITCH_MODE = "SWITCH_MODE";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const switchMode = (mode) => async (dispatch) => {
  dispatch({
    type: SWITCH_MODE,
    mode: mode,
  });
  await AsyncStorage.setItem(
    "Mode",
    JSON.stringify({
      mode: mode,
    })
  );
};
