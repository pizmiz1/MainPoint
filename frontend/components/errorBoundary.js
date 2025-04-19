import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import colors from "../constants/colors";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log("ERROR: " + error);
    console.log("STACK:" + errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View
          style={{
            flex: 1,
            alignItems: "center",
          }}
        >
          <Image style={{ width: "0%", height: "35%", aspectRatio: 1, marginTop: "25%", marginLeft: "5%" }} source={require("./../assets/Error.png")}></Image>
          <Text
            style={{
              fontSize: 40,
              fontWeight: "bold",
              marginTop: "5%",
              color: colors.darkGrey,
            }}
          >
            Oops
          </Text>
          <Text
            style={{
              width: "90%",
              marginTop: "3%",
              color: colors.lightGrey,
              textAlign: "center",
            }}
          >
            Sorry something went wrong, try reloading the app.
          </Text>
        </View>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
