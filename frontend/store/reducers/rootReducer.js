import { SWITCH_MODE } from "../actions/switchMode";
import { UPDATE_BENCH } from "../actions/updateBench";
import { UPDATE_SQUAT } from "../actions/updateSquat";
import { UPDATE_EXCERSIZES } from "../actions/updateExcersizes";

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
  mondayExcersizes: [
    {
      id: "Example",
      excersize: "",
      sets: "",
      reps: "",
      weight: "",
    },
  ],
  tuesdayExcersizes: [
    {
      id: "Example",
      excersize: "",
      sets: "",
      reps: "",
      weight: "",
    },
  ],
  wednesdayExcersizes: [
    {
      id: "Example",
      excersize: "",
      sets: "",
      reps: "",
      weight: "",
    },
  ],
  thursdayExcersizes: [
    {
      id: "Example",
      excersize: "",
      sets: "",
      reps: "",
      weight: "",
    },
  ],
  fridayExcersizes: [
    {
      id: "Example",
      excersize: "",
      sets: "",
      reps: "",
      weight: "",
    },
  ],
  saturdayExcersizes: [
    {
      id: "Example",
      excersize: "",
      sets: "",
      reps: "",
      weight: "",
    },
  ],
  sundayExcersizes: [
    {
      id: "Example",
      excersize: "",
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
    case UPDATE_EXCERSIZES: {
      console.log(action.day, action.excersizes);
      switch (action.day) {
        case 0: {
          return { ...state, mondayExcersizes: action.excersizes };
        }
        case 1: {
          return { ...state, tuesdayExcersizes: action.excersizes };
        }
        case 2: {
          return { ...state, wednesdayExcersizes: action.excersizes };
        }
        case 3: {
          return { ...state, thursdayExcersizes: action.excersizes };
        }
        case 4: {
          return { ...state, fridayExcersizes: action.excersizes };
        }
        case 5: {
          return { ...state, saturdayExcersizes: action.excersizes };
        }
        case 6: {
          return { ...state, sundayExcersizes: action.excersizes };
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
