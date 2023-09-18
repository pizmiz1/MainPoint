export const GET_GROCERIES = "GET_GROCERIES";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getGroceries = () => (dispatch) => {
  return new Promise(async (resolve) => {
    try {
      const GroceryData = await AsyncStorage.getItem("Grocery Data");
      if (GroceryData) {
        const transformedGroceryData = await JSON.parse(GroceryData).data;
        const nonNulls = transformedGroceryData
          .at(1)
          .Groceries.filter((x) => x !== null);
        dispatch({
          type: GET_GROCERIES,
          all: false,
          groceries: nonNulls,
        });
        dispatch({
          type: GET_GROCERIES,
          all: true,
          groceries: transformedGroceryData.at(0).AllGroceries,
        });
      }

      resolve(true);
    } catch (err) {
      console.log("Failed Getting Groceries");
      console.log(err);
    }
  });
};
