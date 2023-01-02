import { UPDATE_EXERSIZES } from "./updateExersizes";
import { db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export const getExersizes = () => (dispatch) => {
  return new Promise(async (resolve) => {
    try {
      const FitnessDB = await getDocs(collection(db, "Fitness"));
      dispatch({
        type: UPDATE_EXERSIZES,
        day: 4,
        power: true,
        exersizes: FitnessDB.docs.at(0).data().Exersizes,
      });
      dispatch({
        type: UPDATE_EXERSIZES,
        day: 4,
        power: false,
        exersizes: FitnessDB.docs.at(1).data().Exersizes,
      });
      dispatch({
        type: UPDATE_EXERSIZES,
        day: 0,
        power: true,
        exersizes: FitnessDB.docs.at(3).data().Exersizes,
      });
      dispatch({
        type: UPDATE_EXERSIZES,
        day: 0,
        power: false,
        exersizes: FitnessDB.docs.at(4).data().Exersizes,
      });
      dispatch({
        type: UPDATE_EXERSIZES,
        day: 5,
        power: true,
        exersizes: FitnessDB.docs.at(5).data().Exersizes,
      });
      dispatch({
        type: UPDATE_EXERSIZES,
        day: 5,
        power: false,
        exersizes: FitnessDB.docs.at(6).data().Exersizes,
      });
      dispatch({
        type: UPDATE_EXERSIZES,
        day: 6,
        power: true,
        exersizes: FitnessDB.docs.at(7).data().Exersizes,
      });
      dispatch({
        type: UPDATE_EXERSIZES,
        day: 6,
        power: false,
        exersizes: FitnessDB.docs.at(8).data().Exersizes,
      });
      dispatch({
        type: UPDATE_EXERSIZES,
        day: 3,
        power: true,
        exersizes: FitnessDB.docs.at(9).data().Exersizes,
      });
      dispatch({
        type: UPDATE_EXERSIZES,
        day: 3,
        power: false,
        exersizes: FitnessDB.docs.at(10).data().Exersizes,
      });
      dispatch({
        type: UPDATE_EXERSIZES,
        day: 1,
        power: true,
        exersizes: FitnessDB.docs.at(11).data().Exersizes,
      });
      dispatch({
        type: UPDATE_EXERSIZES,
        day: 1,
        power: false,
        exersizes: FitnessDB.docs.at(12).data().Exersizes,
      });
      dispatch({
        type: UPDATE_EXERSIZES,
        day: 2,
        power: true,
        exersizes: FitnessDB.docs.at(13).data().Exersizes,
      });
      dispatch({
        type: UPDATE_EXERSIZES,
        day: 2,
        power: false,
        exersizes: FitnessDB.docs.at(14).data().Exersizes,
      });

      resolve(true);
    } catch (err) {
      console.log("Failed Getting Exersize");
      console.log(err);
    }
  });
};
