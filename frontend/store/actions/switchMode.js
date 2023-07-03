export const SWITCH_MODE = "SWITCH_MODE";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const switchMode = (mode, nav) => async (dispatch) => {
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
  let lastRoute;
  if (mode === "Grocery") {
    lastRoute = await AsyncStorage.getItem("Last Grocery Route");
  } else {
    lastRoute = await AsyncStorage.getItem("Last Fitness Route");
  }
  if (lastRoute) {
    const transformed = await JSON.parse(lastRoute).data;
    nav.navigation.navigate(transformed);
  }
};
