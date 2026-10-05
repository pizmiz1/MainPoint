import groceryCategories from "../constants/groceryCategories";

export interface Grocery {
  id: string;
  name: string;
  category: (typeof groceryCategories)[keyof typeof groceryCategories];
}
