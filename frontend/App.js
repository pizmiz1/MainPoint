import "react-native-gesture-handler";
import React from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

//files
import MyNavigator from "./navigation/navigation";
import rootReducer from "./store/reducers/rootReducer";

const store = createStore(rootReducer, applyMiddleware(thunk));

const App = () => {
  return (
    <Provider store={store}>
      <MyNavigator />
    </Provider>
  );
};

export default App;
