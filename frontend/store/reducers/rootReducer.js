import { SWITCH_MODE } from "../actions/switchMode";

//Fitness
import { UPDATE_BENCH } from "../actions/updateBench";
import { UPDATE_SQUAT } from "../actions/updateSquat";
import { UPDATE_OHP } from "../actions/updateOHP";
import { UPDATE_POWER } from "../actions/updatePower";
import { UPDATE_EXERSIZES } from "../actions/updateExersizes";
import { TOGGLE_BIWEEKLY } from "../actions/toggleBiweekly";
import { CROSS_DAILY_FOOD } from "../actions/crossDailyFood";
import { SWITCH_RUNNING } from "../actions/switchRunning";
import { UPDATE_RUNNING } from "../actions/updateRunning";
import { UPDATE_START_DATE } from "../actions/updateRunningStartDate";
import { UPDATE_TOTAL_MILES } from "../actions/updateTotalMiles";
import { UPDATE_SHOE_MILES } from "../actions/updateShoeMiles";
import { UPDATE_RUNNING_DONE } from "../actions/updateRunningDone";

// Grocery
import { GET_GROCERIES } from "../actions/getGroceries";
import { ADD_GROCERY } from "../actions/addGrocery";
import { ADD_NEW_GROCERY } from "../actions/addNewGrocery";
import { REMOVE_GROCERY } from "../actions/removeGrocery";
import { GET_MEALS } from "../actions/getMeals";
import { REMOVE_MEAL } from "../actions/removeMeal";
import { ADD_MEAL } from "../actions/addMeal";
import { UPDATE_MEAL } from "../actions/updateMeal";

import uuid from "react-native-uuid";

const initialState = {
  mode: undefined,
  running: false,
  startDate: undefined,
  biweekly: false,
  totalMiles: 0,
  shoeMiles: 0,
  runningDone: false,
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
  shakeCrossed: false,
  yogurtCrossed: false,
  barCrossed: false,
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
  meals: [
    {
      Name: "Test Meal",
      Groceries: ["id1", "id2"],
      Calories: 0,
    },
  ],
  runningData: [{}],
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

const groceryColors = {
  primary: "#03a9f5",
  secondary: "white",
  textColors: {
    headerText: "black",
    drawerText: "white",
  },
  lightGrey: "#f2f1f6",
  darkGrey: "#e6e6e6",
  darkerGrey: "#7d7a7a",
};

const fitnessColors = {
  primary: "#0a9d6c",
  secondary: "black",
  textColors: {
    headerText: "white",
    drawerText: "white",
  },
  darkGrey: "#1c1c1e",
  lightGrey: "#3b4043",
};

const runningColors = {
  primary: "#f9cedf",
  secondary: "white",
  textColors: {
    headerText: "black",
    drawerText: "black",
  },
  darkGrey: "#1c1c1e",
  lightGrey: "#f2f1f6",
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
          colors: groceryColors,
        };
      } else if (action.mode === "Fitness") {
        return {
          ...state,
          mode: action.mode,
          colors: state.running ? runningColors : fitnessColors,
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
    case CROSS_DAILY_FOOD: {
      switch (action.passedDailyFood) {
        case 0: {
          return {
            ...state,
            shakeCrossed: !state.shakeCrossed,
          };
        }
        case 1: {
          return {
            ...state,
            yogurtCrossed: !state.yogurtCrossed,
          };
        }
        case 2: {
          return {
            ...state,
            barCrossed: !state.barCrossed,
          };
        }
        case 3: {
          return {
            ...state,
            shakeCrossed: false,
            yogurtCrossed: false,
            barCrossed: false,
          };
        }
        default: {
          return state;
        }
      }
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
    case UPDATE_RUNNING: {
      return {
        ...state,
        runningData: action.runningData,
      };
    }
    case GET_GROCERIES: {
      if (action.all) {
        return { ...state, allGroceries: action.groceries };
      } else {
        return { ...state, groceryList: action.groceries };
      }
    }
    case ADD_GROCERY: {
      return {
        ...state,
        groceryList: state.groceryList.concat([action.grocery]),
      };
    }
    case ADD_NEW_GROCERY: {
      return {
        ...state,
        allGroceries: state.allGroceries.concat([action.grocery]),
      };
    }
    case REMOVE_GROCERY: {
      if (action.all) {
        return {
          ...state,
          allGroceries: state.allGroceries.filter(
            (currGrocery) => currGrocery.Name !== action.grocery.Name
          ),
        };
      } else {
        return {
          ...state,
          groceryList: state.groceryList.filter(
            (currGrocery) => currGrocery.Name !== action.grocery.Name
          ),
        };
      }
    }
    case GET_MEALS: {
      return {
        ...state,
        meals: action.meals,
      };
    }
    case REMOVE_MEAL: {
      return {
        ...state,
        meals: state.meals.filter((item, index) => index !== action.mealIndex),
      };
    }
    case ADD_MEAL: {
      return {
        ...state,
        meals: state.meals.concat([action.meal]),
      };
    }
    case UPDATE_MEAL: {
      return {
        ...state,
        meals: state.meals.map((meal, index) => {
          if (index === action.mealIndex) {
            return {
              ...meal,
              Name: action.meal.Name,
              Groceries: action.meal.Groceries,
              Calories: action.meal.Calories,
            };
          }
          return meal;
        }),
      };
    }
    case TOGGLE_BIWEEKLY: {
      return {
        ...state,
        biweekly: !state.biweekly,
      };
    }
    case SWITCH_RUNNING: {
      return {
        ...state,
        running: action.running,
        colors: action.running ? runningColors : fitnessColors,
      };
    }
    case UPDATE_START_DATE: {
      return {
        ...state,
        startDate: action.startDate,
      };
    }
    case UPDATE_TOTAL_MILES: {
      return {
        ...state,
        totalMiles: action.totalMiles,
      };
    }
    case UPDATE_SHOE_MILES: {
      return {
        ...state,
        shoeMiles: action.shoeMiles,
      };
    }
    case UPDATE_RUNNING_DONE: {
      return {
        ...state,
        runningDone: action.runningDone,
      };
    }
    default:
      return state;
  }
};

export default rootReducer;
