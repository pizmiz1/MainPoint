export const SWITCH_RUNNING = "SWITCH_RUNNING";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LayoutAnimation } from "react-native";

export const switchRunning = (running) => (dispatch) => {
  LayoutAnimation.configureNext(
    LayoutAnimation.create(
      200,
      LayoutAnimation.Types.linear,
      LayoutAnimation.Properties.opacity
    )
  );
  dispatch({
    type: SWITCH_RUNNING,
    running: running,
  });
  AsyncStorage.setItem(
    "Running",
    JSON.stringify({
      running: running,
    })
  );
};
