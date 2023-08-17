import "react-native-gesture-handler";
import React from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { Alert } from "react-native";
import thunk from "redux-thunk";
import { NotifierWrapper } from "react-native-notifier";
import { setJSExceptionHandler } from "react-native-exception-handler";
import Constants from "expo-constants";
import { Provider as PaperProvider } from "react-native-paper";

//files
import MyNavigator from "./navigation/navigation";
import rootReducer from "./store/reducers/rootReducer";

if (Constants.executionEnvironment !== "storeClient") {
  const errorHandler = (e, isFatal) => {
    Alert.alert(
      "Unexpected Error",
      `Error: ${isFatal ? "Fatal" : ""} ${e.name} ${e.message}
       Please close the app and try again!
       `
    );
  };
  setJSExceptionHandler(errorHandler, true);
}

const store = createStore(rootReducer, applyMiddleware(thunk));

const App = () => {
  return (
    <PaperProvider
      theme={{
        colors: {
          secondaryContainer: "transparent",
        },
      }}
    >
      <NotifierWrapper>
        <Provider store={store}>
          <MyNavigator />
        </Provider>
      </NotifierWrapper>
    </PaperProvider>
  );
};

export default App;
