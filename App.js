import React from "react";

//files
import MyNavigator from "./navigation/navigation";
import ErrorBoundary from "./components/errorBoundary";

const App = () => {
  return (
    <ErrorBoundary>
      <MyNavigator />
    </ErrorBoundary>
  );
};

export default App;
