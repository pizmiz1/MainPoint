export const UPDATE_EXERSIZES = "UPDATE_EXERSIZES";
import { db } from "../../firebaseConfig";
import { updateDoc, doc } from "firebase/firestore";

export const updateExersizes = (day, exersizes) => (dispatch) => {
  return new Promise(async (resolve) => {
    try {
      switch (day) {
        case 0: {
          const ExersizeDoc = await doc(db, "Fitness", "Monday");
          await updateDoc(ExersizeDoc, { Exersizes: exersizes });
        }
        case 1: {
          const ExersizeDoc = await doc(db, "Fitness", "Tuesday");
          await updateDoc(ExersizeDoc, { Exersizes: exersizes });
        }
        case 2: {
          const ExersizeDoc = await doc(db, "Fitness", "Wednesday");
          await updateDoc(ExersizeDoc, { Exersizes: exersizes });
        }
        case 3: {
          const ExersizeDoc = await doc(db, "Fitness", "Thursday");
          await updateDoc(ExersizeDoc, { Exersizes: exersizes });
        }
        case 4: {
          const ExersizeDoc = await doc(db, "Fitness", "Friday");
          await updateDoc(ExersizeDoc, { Exersizes: exersizes });
        }
        case 5: {
          const ExersizeDoc = await doc(db, "Fitness", "Saturday");
          await updateDoc(ExersizeDoc, { Exersizes: exersizes });
        }
        case 6: {
          const ExersizeDoc = await doc(db, "Fitness", "Sunday");
          await updateDoc(ExersizeDoc, { Exersizes: exersizes });
        }
      }

      dispatch({
        type: UPDATE_EXERSIZES,
        day: day,
        exersizes: exersizes,
      });
      resolve(true);
    } catch (err) {
      console.log("Failed Updating exersizes");
      console.log(err);
    }
  });
};
