import { SWITCH_MODE } from "../actions/switchMode";
import { UPDATE_BENCH } from "../actions/updateBench";
import { UPDATE_SQUAT } from "../actions/updateSquat";
import { UPDATE_EXERSIZES } from "../actions/updateExersizes";
import uuid from "react-native-uuid";

const initialState = {
  mode: undefined,
  colors: {
    primary: "#03a9f5",
    secondary: "white",
    textColors: {
      headerText: "black",
    },
  },
  maxBench: 0,
  maxSquat: 0,
  mondayExersizes: [
    {
      id: uuid.v4(),
      exersize: "",
      sets: "",
      reps: "",
      weight: "",
    },
  ],
  tuesdayExersizes: [
    {
      id: uuid.v4(),
      exersize: "",
      sets: "",
      reps: "",
      weight: "",
    },
  ],
  wednesdayExersizes: [
    {
      id: uuid.v4(),
      exersize: "",
      sets: "",
      reps: "",
      weight: "",
    },
  ],
  thursdayExersizes: [
    {
      id: uuid.v4(),
      exersize: "",
      sets: "",
      reps: "",
      weight: "",
    },
  ],
  fridayExersizes: [
    {
      id: uuid.v4(),
      exersize: "",
      sets: "",
      reps: "",
      weight: "",
    },
  ],
  saturdayExersizes: [
    {
      id: uuid.v4(),
      exersize: "",
      sets: "",
      reps: "",
      weight: "",
    },
  ],
  sundayExersizes: [
    {
      id: uuid.v4(),
      exersize: "",
      sets: "",
      reps: "",
      weight: "",
    },
  ],
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
    case UPDATE_BENCH: {
      return {
        ...state,
        maxBench: action.maxBench,
      };
    }
    case UPDATE_SQUAT: {
      return {
        ...state,
        maxSquat: action.maxSquat,
      };
    }
    case UPDATE_EXERSIZES: {
      switch (action.day) {
        case 0: {
          return { ...state, mondayExersizes: action.exersizes };
        }
        case 1: {
          return { ...state, tuesdayExersizes: action.exersizes };
        }
        case 2: {
          return { ...state, wednesdayExersizes: action.exersizes };
        }
        case 3: {
          return { ...state, thursdayExersizes: action.exersizes };
        }
        case 4: {
          return { ...state, fridayExersizes: action.exersizes };
        }
        case 5: {
          return { ...state, saturdayExersizes: action.exersizes };
        }
        case 6: {
          return { ...state, sundayExersizes: action.exersizes };
        }
        default:
          return state;
      }
    }
    default:
      return state;
  }
};

export default rootReducer;
