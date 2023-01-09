export const UPDATE_EXERSIZES = "UPDATE_EXERSIZES";
import { db } from "../../firebaseConfig";
import { updateDoc, doc } from "firebase/firestore";

export const updateExersizes = (day, power, exersizes) => (dispatch) => {
  return new Promise(async (resolve) => {
    try {
      switch (day) {
        case 0: {
          if (power) {
            const ExersizeDoc = await doc(db, "Fitness", "Monday");
            await updateDoc(ExersizeDoc, { Exersizes: exersizes });
          } else {
            const ExersizeDoc = await doc(db, "Fitness", "MondayB");
            await updateDoc(ExersizeDoc, { Exersizes: exersizes });
          }
          break;
        }
        case 1: {
          if (power) {
            const ExersizeDoc = await doc(db, "Fitness", "Tuesday");
            await updateDoc(ExersizeDoc, { Exersizes: exersizes });
          } else {
            const ExersizeDoc = await doc(db, "Fitness", "TuesdayB");
            await updateDoc(ExersizeDoc, { Exersizes: exersizes });
          }
          break;
        }
        case 2: {
          if (power) {
            const ExersizeDoc = await doc(db, "Fitness", "Wednesday");
            await updateDoc(ExersizeDoc, { Exersizes: exersizes });
          } else {
            const ExersizeDoc = await doc(db, "Fitness", "WednesdayB");
            await updateDoc(ExersizeDoc, { Exersizes: exersizes });
          }
          break;
        }
        case 3: {
          if (power) {
            const ExersizeDoc = await doc(db, "Fitness", "Thursday");
            await updateDoc(ExersizeDoc, { Exersizes: exersizes });
          } else {
            const ExersizeDoc = await doc(db, "Fitness", "ThursdayB");
            await updateDoc(ExersizeDoc, { Exersizes: exersizes });
          }
          break;
        }
        case 4: {
          if (power) {
            const ExersizeDoc = await doc(db, "Fitness", "Friday");
            await updateDoc(ExersizeDoc, { Exersizes: exersizes });
          } else {
            const ExersizeDoc = await doc(db, "Fitness", "FridayB");
            await updateDoc(ExersizeDoc, { Exersizes: exersizes });
          }
          break;
        }
        case 5: {
          if (power) {
            const ExersizeDoc = await doc(db, "Fitness", "Saturday");
            await updateDoc(ExersizeDoc, { Exersizes: exersizes });
          } else {
            const ExersizeDoc = await doc(db, "Fitness", "SaturdayB");
            await updateDoc(ExersizeDoc, { Exersizes: exersizes });
          }
          break;
        }
        case 6: {
          if (power) {
            const ExersizeDoc = await doc(db, "Fitness", "Sunday");
            await updateDoc(ExersizeDoc, { Exersizes: exersizes });
          } else {
            const ExersizeDoc = await doc(db, "Fitness", "SundayB");
            await updateDoc(ExersizeDoc, { Exersizes: exersizes });
          }
          break;
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
