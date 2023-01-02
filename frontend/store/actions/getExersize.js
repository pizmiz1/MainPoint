import { UPDATE_EXERSIZES } from "./updateExersizes";
import { db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export const getExersize = (day) => (dispatch) => {
  return new Promise(async (resolve) => {
    try {
      let passedDay;
      let exersizes;
      if (day === "Monday") {
        passedDay = 0;
        const FitnessDB = await getDocs(collection(db, "Fitness"));
        exersizes = FitnessDB.docs.at(2).data().Exersizes;
      } else if (day === "Tuesday") {
        passedDay = 1;
        const FitnessDB = await getDocs(collection(db, "Fitness"));
        exersizes = FitnessDB.docs.at(6).data().Exersizes;
      } else if (day === "Wednesday") {
        passedDay = 2;
        const FitnessDB = await getDocs(collection(db, "Fitness"));
        exersizes = FitnessDB.docs.at(7).data().Exersizes;
      } else if (day === "Thursday") {
        passedDay = 3;
        const FitnessDB = await getDocs(collection(db, "Fitness"));
        exersizes = FitnessDB.docs.at(5).data().Exersizes;
      } else if (day === "Friday") {
        passedDay = 4;
        const FitnessDB = await getDocs(collection(db, "Fitness"));
        exersizes = FitnessDB.docs.at(0).data().Exersizes;
      } else if (day === "Saturday") {
        passedDay = 5;
        const FitnessDB = await getDocs(collection(db, "Fitness"));
        exersizes = FitnessDB.docs.at(3).data().Exersizes;
      } else if (day === "Sunday") {
        passedDay = 6;
        const FitnessDB = await getDocs(collection(db, "Fitness"));
        exersizes = FitnessDB.docs.at(4).data().Exersizes;
      }

      dispatch({
        type: UPDATE_EXERSIZES,
        day: passedDay,
        exersizes: exersizes,
      });
      resolve(true);
    } catch (err) {
      console.log("Failed Getting Exersize");
      console.log(err);
    }
  });
};
