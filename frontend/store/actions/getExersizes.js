import { UPDATE_EXERSIZES } from "./updateExersizes";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getExersizes = () => (dispatch) => {
  return new Promise(async (resolve) => {
    try {
      const FitnessData = await AsyncStorage.getItem("Fitness Data");
      if (FitnessData) {
        const transformedFitnessData = await JSON.parse(FitnessData).data;

        dispatch({
          type: UPDATE_EXERSIZES,
          day: 4,
          power: true,
          exersizes: transformedFitnessData.at(0).Exersizes,
        });
        dispatch({
          type: UPDATE_EXERSIZES,
          day: 4,
          power: false,
          exersizes: transformedFitnessData.at(1).Exersizes,
        });
        dispatch({
          type: UPDATE_EXERSIZES,
          day: 0,
          power: true,
          exersizes: transformedFitnessData.at(3).Exersizes,
        });
        dispatch({
          type: UPDATE_EXERSIZES,
          day: 0,
          power: false,
          exersizes: transformedFitnessData.at(4).Exersizes,
        });
        dispatch({
          type: UPDATE_EXERSIZES,
          day: 5,
          power: true,
          exersizes: transformedFitnessData.at(5).Exersizes,
        });
        dispatch({
          type: UPDATE_EXERSIZES,
          day: 5,
          power: false,
          exersizes: transformedFitnessData.at(6).Exersizes,
        });
        dispatch({
          type: UPDATE_EXERSIZES,
          day: 6,
          power: true,
          exersizes: transformedFitnessData.at(7).Exersizes,
        });
        dispatch({
          type: UPDATE_EXERSIZES,
          day: 6,
          power: false,
          exersizes: transformedFitnessData.at(8).Exersizes,
        });
        dispatch({
          type: UPDATE_EXERSIZES,
          day: 3,
          power: true,
          exersizes: transformedFitnessData.at(9).Exersizes,
        });
        dispatch({
          type: UPDATE_EXERSIZES,
          day: 3,
          power: false,
          exersizes: transformedFitnessData.at(10).Exersizes,
        });
        dispatch({
          type: UPDATE_EXERSIZES,
          day: 1,
          power: true,
          exersizes: transformedFitnessData.at(11).Exersizes,
        });
        dispatch({
          type: UPDATE_EXERSIZES,
          day: 1,
          power: false,
          exersizes: transformedFitnessData.at(12).Exersizes,
        });
        dispatch({
          type: UPDATE_EXERSIZES,
          day: 2,
          power: true,
          exersizes: transformedFitnessData.at(13).Exersizes,
        });
        dispatch({
          type: UPDATE_EXERSIZES,
          day: 2,
          power: false,
          exersizes: transformedFitnessData.at(14).Exersizes,
        });

        resolve(true);
      } else {
        resolve(false);
        console.log("Failed Getting Exersize Thru ASYNC");
      }
    } catch (err) {
      resolve(false);
      console.log("Failed Getting Exersize");
      console.log(err);
    }
  });
};
