import { UPDATE_EXERSIZES } from "./updateExersizes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

export const getExersizes = () => (dispatch) => {
  return new Promise(async (resolve) => {
    try {
      const Exersizes = await AsyncStorage.getItem("Exersizes");
      if (Exersizes) {
        const transformed = await JSON.parse(Exersizes).data;

        dispatch({
          type: UPDATE_EXERSIZES,
          day: 0,
          exersizes: transformed.Monday,
        });
        dispatch({
          type: UPDATE_EXERSIZES,
          day: 1,
          exersizes: transformed.Tuesday,
        });
        dispatch({
          type: UPDATE_EXERSIZES,
          day: 2,
          exersizes: transformed.Wednesday,
        });
        dispatch({
          type: UPDATE_EXERSIZES,
          day: 3,
          exersizes: transformed.Thursday,
        });
        dispatch({
          type: UPDATE_EXERSIZES,
          day: 4,
          exersizes: transformed.Friday,
        });
        dispatch({
          type: UPDATE_EXERSIZES,
          day: 5,
          exersizes: transformed.Saturday,
        });
        dispatch({
          type: UPDATE_EXERSIZES,
          day: 6,
          exersizes: transformed.Sunday,
        });
        dispatch({
          type: UPDATE_EXERSIZES,
          day: 7,
          exersizes: transformed.Push,
        });
        dispatch({
          type: UPDATE_EXERSIZES,
          day: 8,
          exersizes: transformed.Pull,
        });
        dispatch({
          type: UPDATE_EXERSIZES,
          day: 9,
          exersizes: transformed.Legs,
        });

        resolve(true);
      } else {
        await AsyncStorage.setItem(
          "Exersizes",
          JSON.stringify({
            data: {
              Monday: [
                {
                  id: uuid.v4(),
                  exersize: "",
                  sets: "",
                  reps: "",
                  weight: "",
                },
              ],
              Tuesday: [
                {
                  id: uuid.v4(),
                  exersize: "",
                  sets: "",
                  reps: "",
                  weight: "",
                },
              ],
              Wednesday: [
                {
                  id: uuid.v4(),
                  exersize: "",
                  sets: "",
                  reps: "",
                  weight: "",
                },
              ],
              Thursday: [
                {
                  id: uuid.v4(),
                  exersize: "",
                  sets: "",
                  reps: "",
                  weight: "",
                },
              ],
              Friday: [
                {
                  id: uuid.v4(),
                  exersize: "",
                  sets: "",
                  reps: "",
                  weight: "",
                },
              ],
              Saturday: [
                {
                  id: uuid.v4(),
                  exersize: "",
                  sets: "",
                  reps: "",
                  weight: "",
                },
              ],
              Sunday: [
                {
                  id: uuid.v4(),
                  exersize: "",
                  sets: "",
                  reps: "",
                  weight: "",
                },
              ],
              Push: [
                {
                  id: uuid.v4(),
                  exersize: "",
                  sets: "",
                  reps: "",
                  weight: "",
                },
              ],
              Pull: [
                {
                  id: uuid.v4(),
                  exersize: "",
                  sets: "",
                  reps: "",
                  weight: "",
                },
              ],
              Legs: [
                {
                  id: uuid.v4(),
                  exersize: "",
                  sets: "",
                  reps: "",
                  weight: "",
                },
              ],
            },
          })
        );

        dispatch({
          type: UPDATE_EXERSIZES,
          day: 0,
          exersizes: [
            {
              id: uuid.v4(),
              exersize: "",
              sets: "",
              reps: "",
              weight: "",
            },
          ],
        });
        dispatch({
          type: UPDATE_EXERSIZES,
          day: 1,
          exersizes: [
            {
              id: uuid.v4(),
              exersize: "",
              sets: "",
              reps: "",
              weight: "",
            },
          ],
        });
        dispatch({
          type: UPDATE_EXERSIZES,
          day: 2,
          exersizes: [
            {
              id: uuid.v4(),
              exersize: "",
              sets: "",
              reps: "",
              weight: "",
            },
          ],
        });
        dispatch({
          type: UPDATE_EXERSIZES,
          day: 3,
          exersizes: [
            {
              id: uuid.v4(),
              exersize: "",
              sets: "",
              reps: "",
              weight: "",
            },
          ],
        });
        dispatch({
          type: UPDATE_EXERSIZES,
          day: 4,
          exersizes: [
            {
              id: uuid.v4(),
              exersize: "",
              sets: "",
              reps: "",
              weight: "",
            },
          ],
        });
        dispatch({
          type: UPDATE_EXERSIZES,
          day: 5,
          exersizes: [
            {
              id: uuid.v4(),
              exersize: "",
              sets: "",
              reps: "",
              weight: "",
            },
          ],
        });
        dispatch({
          type: UPDATE_EXERSIZES,
          day: 6,
          exersizes: [
            {
              id: uuid.v4(),
              exersize: "",
              sets: "",
              reps: "",
              weight: "",
            },
          ],
        });
        dispatch({
          type: UPDATE_EXERSIZES,
          day: 7,
          exersizes: [
            {
              id: uuid.v4(),
              exersize: "",
              sets: "",
              reps: "",
              weight: "",
            },
          ],
        });
        dispatch({
          type: UPDATE_EXERSIZES,
          day: 8,
          exersizes: [
            {
              id: uuid.v4(),
              exersize: "",
              sets: "",
              reps: "",
              weight: "",
            },
          ],
        });
        dispatch({
          type: UPDATE_EXERSIZES,
          day: 9,
          exersizes: [
            {
              id: uuid.v4(),
              exersize: "",
              sets: "",
              reps: "",
              weight: "",
            },
          ],
        });
      }
    } catch (err) {
      resolve(false);
      console.log("Failed Getting Exersize");
      console.log(err);
    }
  });
};
