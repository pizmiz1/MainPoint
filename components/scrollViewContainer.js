import React from "react";
import { ScrollView, Dimensions } from "react-native";

const ScrollViewContainer = ({ style, keyboardShouldPersistTaps, scrollDisabled, onScroll, horizontal, children }) => {
  return (
    <ScrollView
      style={{
        ...style,
      }}
      keyboardShouldPersistTaps={keyboardShouldPersistTaps ? "handled" : "never"}
      contentContainerStyle={{ flexGrow: 1 }}
      scrollEnabled={!scrollDisabled}
      scrollEventThrottle={16}
      onScroll={onScroll}
      horizontal={horizontal}
      decelerationRate={horizontal ? "fast" : null}
      snapToInterval={horizontal ? Dimensions.get("screen").width : null}
      snapToAlignment={horizontal ? "center" : null}
    >
      {children}
    </ScrollView>
  );
};

export default ScrollViewContainer;
