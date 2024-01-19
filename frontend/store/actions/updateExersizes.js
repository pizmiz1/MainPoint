export const UPDATE_EXERSIZES = "UPDATE_EXERSIZES";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const updateExersizes = (day, exersizes) => (dispatch) => {
  return new Promise(async (resolve) => {
    try {
      if (exersizes.length === 0) {
        exersizes.push({
          id: uuid.v4(),
          exersize: "",
          sets: "",
          reps: "",
          weight: "",
        });
      }

      const Exersizes = await AsyncStorage.getItem("Exersizes");
      if (Exersizes) {
        const transformed = await JSON.parse(Exersizes).data;

        switch (day) {
          case 0: {
            transformed.Monday = exersizes;
            await AsyncStorage.setItem(
              "Exersizes",
              JSON.stringify({
                data: transformed,
              })
            );
            break;
          }
          case 1: {
            transformed.Tuesday = exersizes;
            await AsyncStorage.setItem(
              "Exersizes",
              JSON.stringify({
                data: transformed,
              })
            );
            break;
          }
          case 2: {
            transformed.Wednesday = exersizes;
            await AsyncStorage.setItem(
              "Exersizes",
              JSON.stringify({
                data: transformed,
              })
            );
            break;
          }
          case 3: {
            transformed.Thursday = exersizes;
            await AsyncStorage.setItem(
              "Exersizes",
              JSON.stringify({
                data: transformed,
              })
            );
            break;
          }
          case 4: {
            transformed.Friday = exersizes;
            await AsyncStorage.setItem(
              "Exersizes",
              JSON.stringify({
                data: transformed,
              })
            );
            break;
          }
          case 5: {
            transformed.Saturday = exersizes;
            await AsyncStorage.setItem(
              "Exersizes",
              JSON.stringify({
                data: transformed,
              })
            );
            break;
          }
          case 6: {
            transformed.Sunday = exersizes;
            await AsyncStorage.setItem(
              "Exersizes",
              JSON.stringify({
                data: transformed,
              })
            );
            break;
          }
          case 7: {
            transformed.Push = exersizes;
            await AsyncStorage.setItem(
              "Exersizes",
              JSON.stringify({
                data: transformed,
              })
            );
            break;
          }
          case 8: {
            transformed.Pull = exersizes;
            await AsyncStorage.setItem(
              "Exersizes",
              JSON.stringify({
                data: transformed,
              })
            );
            break;
          }
          case 9: {
            transformed.Legs = exersizes;
            await AsyncStorage.setItem(
              "Exersizes",
              JSON.stringify({
                data: transformed,
              })
            );
            break;
          }
        }

        dispatch({
          type: UPDATE_EXERSIZES,
          day: day,
          exersizes: exersizes,
        });
        resolve(true);
      } else {
        resolve(false);
        console.log("ASYNC Doesnt Exist");
      }
    } catch (err) {
      resolve(false);
      console.log("Failed Updating exersizes");
      console.log(err);
    }
  });
};
