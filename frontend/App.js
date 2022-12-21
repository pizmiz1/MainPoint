import "react-native-gesture-handler";
import React from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { NotifierWrapper } from "react-native-notifier";

//files
import MyNavigator from "./navigation/navigation";
import rootReducer from "./store/reducers/rootReducer";

const store = createStore(rootReducer, applyMiddleware(thunk));

const App = () => {
  return (
    <NotifierWrapper>
      <Provider store={store}>
        <MyNavigator />
      </Provider>
    </NotifierWrapper>
  );
};

export default App;
