import { SWITCH_MODE } from "../actions/switchMode";

const initialState = {
  mode: undefined,
  colors: {
    primary: "#03a9f5",
    secondary: "white",
    textColors: {
      headerText: "black",
    },
  },
};

const rootReducer = (state, action) => {
  if (state === undefined) {
    state = initialState;
  }
  switch (action.type) {
    case SWITCH_MODE: {
      if (action.mode === "Grocery") {
        return {
          ...state,
          mode: action.mode,
          colors: {
            primary: "#03a9f5",
            secondary: "white",
            textColors: {
              headerText: "black",
            },
            lightGrey: "#E7E7E7",
          },
        };
      } else if (action.mode === "Fitness") {
        return {
          ...state,
          mode: action.mode,
          colors: {
            primary: "#0a9d6c",
            secondary: "black",
            textColors: {
              headerText: "white",
            },
            darkGrey: "#1c1c1e",
            lightGrey: "#3b4043",
          },
        };
      }
    }
    default:
      return state;
  }
};

export default rootReducer;
