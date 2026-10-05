import weekCategories from "../constants/weekCategories";

export interface WeekMeal {
  id: string;
  name: string;
  category: (typeof weekCategories)[keyof typeof weekCategories];
}
