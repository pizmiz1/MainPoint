import { SWITCH_MODE } from "../actions/switchMode";

//Fitness
import { UPDATE_BENCH } from "../actions/updateBench";
import { UPDATE_SQUAT } from "../actions/updateSquat";
import { UPDATE_OHP } from "../actions/updateOHP";
import { UPDATE_EXERSIZES } from "../actions/updateExersizes";
import { TOGGLE_NO_SCHEDULE } from "../actions/switchNoSchedule";
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
  noschedule: false,
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
  shakeCrossed: false,
  yogurtCrossed: false,
  barCrossed: false,
  blur: 0,
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
      Protein: 0,
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
  pushExersizes: [
    {
      id: uuid.v4(),
      exersize: "",
      sets: "",
      reps: "",
      weight: "",
    },
  ],
  pullExersizes: [
    {
      id: uuid.v4(),
      exersize: "",
      sets: "",
      reps: "",
      weight: "",
    },
  ],
  legsExersizes: [
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
  darkGrey: "#1c1c1c",
  lightGrey: "#3b4043",
};

const runningColors = {
  primary: "#f9cedf",
  secondary: "white",
  textColors: {
    headerText: "black",
    drawerText: "black",
  },
  darkGrey: "#1c1c1c",
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
        case 7: {
          return { ...state, pushExersizes: action.exersizes };
        }
        case 8: {
          return { ...state, pullExersizes: action.exersizes };
        }
        case 9: {
          return { ...state, legsExersizes: action.exersizes };
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
              Protein: action.meal.Protein,
            };
          }
          return meal;
        }),
      };
    }
    case TOGGLE_NO_SCHEDULE: {
      return {
        ...state,
        noschedule: !state.noschedule,
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
