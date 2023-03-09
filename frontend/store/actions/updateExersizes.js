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
              // ############ OLD FIRESTORE CODE ##############
              // const ExersizeDoc = await doc(db, "Fitness", "Monday");
              // await updateDoc(ExersizeDoc, { Exersizes: exersizes });
              transformedFitnessData.at(3).Exersizes = exersizes;
              await AsyncStorage.setItem(
                "Fitness Data",
                JSON.stringify({
                  data: transformedFitnessData,
                })
              );
            } else {
              // ############ OLD FIRESTORE CODE ##############
              // const ExersizeDoc = await doc(db, "Fitness", "MondayB");
              // await updateDoc(ExersizeDoc, { Exersizes: exersizes });
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
              // ############ OLD FIRESTORE CODE ##############
              // const ExersizeDoc = await doc(db, "Fitness", "Tuesday");
              // await updateDoc(ExersizeDoc, { Exersizes: exersizes });
              transformedFitnessData.at(11).Exersizes = exersizes;
              await AsyncStorage.setItem(
                "Fitness Data",
                JSON.stringify({
                  data: transformedFitnessData,
                })
              );
            } else {
              // ############ OLD FIRESTORE CODE ##############
              // const ExersizeDoc = await doc(db, "Fitness", "TuesdayB");
              // await updateDoc(ExersizeDoc, { Exersizes: exersizes });
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
              // ############ OLD FIRESTORE CODE ##############
              // const ExersizeDoc = await doc(db, "Fitness", "Wednesday");
              // await updateDoc(ExersizeDoc, { Exersizes: exersizes });
              transformedFitnessData.at(13).Exersizes = exersizes;
              await AsyncStorage.setItem(
                "Fitness Data",
                JSON.stringify({
                  data: transformedFitnessData,
                })
              );
            } else {
              // ############ OLD FIRESTORE CODE ##############
              // const ExersizeDoc = await doc(db, "Fitness", "WednesdayB");
              // await updateDoc(ExersizeDoc, { Exersizes: exersizes });
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
              // ############ OLD FIRESTORE CODE ##############
              // const ExersizeDoc = await doc(db, "Fitness", "Thursday");
              // await updateDoc(ExersizeDoc, { Exersizes: exersizes });
              transformedFitnessData.at(9).Exersizes = exersizes;
              await AsyncStorage.setItem(
                "Fitness Data",
                JSON.stringify({
                  data: transformedFitnessData,
                })
              );
            } else {
              // ############ OLD FIRESTORE CODE ##############
              // const ExersizeDoc = await doc(db, "Fitness", "ThursdayB");
              // await updateDoc(ExersizeDoc, { Exersizes: exersizes });
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
              // ############ OLD FIRESTORE CODE ##############
              // const ExersizeDoc = await doc(db, "Fitness", "Friday");
              // await updateDoc(ExersizeDoc, { Exersizes: exersizes });
              transformedFitnessData.at(0).Exersizes = exersizes;
              await AsyncStorage.setItem(
                "Fitness Data",
                JSON.stringify({
                  data: transformedFitnessData,
                })
              );
            } else {
              // ############ OLD FIRESTORE CODE ##############
              // const ExersizeDoc = await doc(db, "Fitness", "FridayB");
              // await updateDoc(ExersizeDoc, { Exersizes: exersizes });
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
              // ############ OLD FIRESTORE CODE ##############
              // const ExersizeDoc = await doc(db, "Fitness", "Saturday");
              // await updateDoc(ExersizeDoc, { Exersizes: exersizes });
              transformedFitnessData.at(5).Exersizes = exersizes;
              await AsyncStorage.setItem(
                "Fitness Data",
                JSON.stringify({
                  data: transformedFitnessData,
                })
              );
            } else {
              // ############ OLD FIRESTORE CODE ##############
              // const ExersizeDoc = await doc(db, "Fitness", "SaturdayB");
              // await updateDoc(ExersizeDoc, { Exersizes: exersizes });
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
              // ############ OLD FIRESTORE CODE ##############
              // const ExersizeDoc = await doc(db, "Fitness", "Sunday");
              // await updateDoc(ExersizeDoc, { Exersizes: exersizes });
              transformedFitnessData.at(7).Exersizes = exersizes;
              await AsyncStorage.setItem(
                "Fitness Data",
                JSON.stringify({
                  data: transformedFitnessData,
                })
              );
            } else {
              // ############ OLD FIRESTORE CODE ##############
              // const ExersizeDoc = await doc(db, "Fitness", "SundayB");
              // await updateDoc(ExersizeDoc, { Exersizes: exersizes });
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
