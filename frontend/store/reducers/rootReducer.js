import { SWITCH_MODE } from "../actions/switchMode";

//Fitness
import { UPDATE_BENCH } from "../actions/updateBench";
import { UPDATE_SQUAT } from "../actions/updateSquat";
import { UPDATE_OHP } from "../actions/updateOHP";
import { UPDATE_POWER } from "../actions/updatePower";
import { UPDATE_EXERSIZES } from "../actions/updateExersizes";

// Grocery
import { GET_GROCERIES } from "../actions/getGroceries";
import { UPDATE_GROCERIES } from "../actions/updateGroceries";
import { REMOVE_GROCERY } from "../actions/removeGrocery";

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
  maxOHP: 0,
  power: true,
  groceryList: [
    {
      id: uuid.v4(),
      name: "Broccoli",
      category: "Produce",
    },
  ],
  allGroceries: [
    {
      id: uuid.v4(),
      name: "Broccoli",
      category: "Produce",
    },
  ],
  mondayExersizes: [
    {
      id: uuid.v4(),
      exersize: "",
      sets: "",
      reps: "",
      weight: "",
    },
  ],
  mondayExersizesB: [
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
  tuesdayExersizesB: [
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
  wednesdayExersizesB: [
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
  thursdayExersizesB: [
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
  fridayExersizesB: [
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
  saturdayExersizesB: [
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
  sundayExersizesB: [
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
            lightGrey: "#f2f1f6",
            darkGrey: "#e6e6e6",
            darkerGrey: "#7d7a7a",
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
    case UPDATE_OHP: {
      return {
        ...state,
        maxOHP: action.maxOHP,
      };
    }
    case UPDATE_POWER: {
      return {
        ...state,
        power: action.power,
      };
    }
    case UPDATE_EXERSIZES: {
      switch (action.day) {
        case 0: {
          if (action.power) {
            return { ...state, mondayExersizes: action.exersizes };
          } else {
            return { ...state, mondayExersizesB: action.exersizes };
          }
        }
        case 1: {
          if (action.power) {
            return { ...state, tuesdayExersizes: action.exersizes };
          } else {
            return { ...state, tuesdayExersizesB: action.exersizes };
          }
        }
        case 2: {
          if (action.power) {
            return { ...state, wednesdayExersizes: action.exersizes };
          } else {
            return { ...state, wednesdayExersizesB: action.exersizes };
          }
        }
        case 3: {
          if (action.power) {
            return { ...state, thursdayExersizes: action.exersizes };
          } else {
            return { ...state, thursdayExersizesB: action.exersizes };
          }
        }
        case 4: {
          if (action.power) {
            return { ...state, fridayExersizes: action.exersizes };
          } else {
            return { ...state, fridayExersizesB: action.exersizes };
          }
        }
        case 5: {
          if (action.power) {
            return { ...state, saturdayExersizes: action.exersizes };
          } else {
            return { ...state, saturdayExersizesB: action.exersizes };
          }
        }
        case 6: {
          if (action.power) {
            return { ...state, sundayExersizes: action.exersizes };
          } else {
            return { ...state, sundayExersizesB: action.exersizes };
          }
        }
        default:
          return state;
      }
    }
    case GET_GROCERIES: {
      if (action.all) {
        return { ...state, allGroceries: action.groceries };
      } else {
        return { ...state, groceryList: action.groceries };
      }
    }
    case UPDATE_GROCERIES: {
      return {
        ...state,
        groceryList: action.groceryList,
        allGroceries: action.allGroceries,
      };
    }
    case REMOVE_GROCERY: {
      return {
        ...state,
        groceryList: state.groceryList.filter(
          (currGrocery) => currGrocery.Name !== action.grocery.Name
        ),
      };
    }
    default:
      return state;
  }
};

export default rootReducer;
