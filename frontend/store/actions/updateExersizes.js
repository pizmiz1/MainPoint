export const UPDATE_EXERSIZES = "UPDATE_EXERSIZES";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const updateExersizes = (day, power, exersizes) => (dispatch) => {
  return new Promise(async (resolve) => {
    try {
      if (exersizes.length === 0) {
        let restDay = {
          id: uuid.v4(),
          exersize: "Rest",
          sets: "",
          reps: "",
          weight: "",
        };
        exersizes.push(restDay);
      }

      const FitnessData = await AsyncStorage.getItem("Fitness Data");
      if (FitnessData) {
        const transformedFitnessData = await JSON.parse(FitnessData).data;

        switch (day) {
          case 0: {
            if (power) {
              transformedFitnessData.at(3).Exersizes = exersizes;
              await AsyncStorage.setItem(
                "Fitness Data",
                JSON.stringify({
                  data: transformedFitnessData,
                })
              );
            } else {
              transformedFitnessData.at(4).Exersizes = exersizes;
              await AsyncStorage.setItem(
                "Fitness Data",
                JSON.stringify({
                  data: transformedFitnessData,
                })
              );
            }
            break;
          }
          case 1: {
            if (power) {
              transformedFitnessData.at(11).Exersizes = exersizes;
              await AsyncStorage.setItem(
                "Fitness Data",
                JSON.stringify({
                  data: transformedFitnessData,
                })
              );
            } else {
              transformedFitnessData.at(12).Exersizes = exersizes;
              await AsyncStorage.setItem(
                "Fitness Data",
                JSON.stringify({
                  data: transformedFitnessData,
                })
              );
            }
            break;
          }
          case 2: {
            if (power) {
              transformedFitnessData.at(13).Exersizes = exersizes;
              await AsyncStorage.setItem(
                "Fitness Data",
                JSON.stringify({
                  data: transformedFitnessData,
                })
              );
            } else {
              transformedFitnessData.at(14).Exersizes = exersizes;
              await AsyncStorage.setItem(
                "Fitness Data",
                JSON.stringify({
                  data: transformedFitnessData,
                })
              );
            }
            break;
          }
          case 3: {
            if (power) {
              transformedFitnessData.at(9).Exersizes = exersizes;
              await AsyncStorage.setItem(
                "Fitness Data",
                JSON.stringify({
                  data: transformedFitnessData,
                })
              );
            } else {
              transformedFitnessData.at(10).Exersizes = exersizes;
              await AsyncStorage.setItem(
                "Fitness Data",
                JSON.stringify({
                  data: transformedFitnessData,
                })
              );
            }
            break;
          }
          case 4: {
            if (power) {
              transformedFitnessData.at(0).Exersizes = exersizes;
              await AsyncStorage.setItem(
                "Fitness Data",
                JSON.stringify({
                  data: transformedFitnessData,
                })
              );
            } else {
              transformedFitnessData.at(1).Exersizes = exersizes;
              await AsyncStorage.setItem(
                "Fitness Data",
                JSON.stringify({
                  data: transformedFitnessData,
                })
              );
            }
            break;
          }
          case 5: {
            if (power) {
              transformedFitnessData.at(5).Exersizes = exersizes;
              await AsyncStorage.setItem(
                "Fitness Data",
                JSON.stringify({
                  data: transformedFitnessData,
                })
              );
            } else {
              transformedFitnessData.at(6).Exersizes = exersizes;
              await AsyncStorage.setItem(
                "Fitness Data",
                JSON.stringify({
                  data: transformedFitnessData,
                })
              );
            }
            break;
          }
          case 6: {
            if (power) {
              transformedFitnessData.at(7).Exersizes = exersizes;
              await AsyncStorage.setItem(
                "Fitness Data",
                JSON.stringify({
                  data: transformedFitnessData,
                })
              );
            } else {
              transformedFitnessData.at(8).Exersizes = exersizes;
              await AsyncStorage.setItem(
                "Fitness Data",
                JSON.stringify({
                  data: transformedFitnessData,
                })
              );
            }
            break;
          }
        }
      }

      dispatch({
        type: UPDATE_EXERSIZES,
        day: day,
        power: power,
        exersizes: exersizes,
      });
      resolve(true);
    } catch (err) {
      resolve(false);
      console.log("Failed Updating exersizes");
      console.log(err);
    }
  });
};
