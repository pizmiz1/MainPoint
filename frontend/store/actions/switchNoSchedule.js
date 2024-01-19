export const TOGGLE_NO_SCHEDULE = "TOGGLE_NO_SCHEDULE";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const toggleNoSchedule = () => (dispatch, getState) => {
  dispatch({
    type: TOGGLE_NO_SCHEDULE,
  });
  AsyncStorage.setItem(
    "NoSchedule",
    JSON.stringify({
      noschedule: getState().noschedule,
    })
  );
};
