import React from "react";
import { ScrollView, Dimensions } from "react-native";

const ScrollViewContainer = (props) => {
  return (
    <ScrollView
      style={{
        ...props.style,
      }}
      keyboardShouldPersistTaps={
        props.keyboardShouldPersistTaps ? "handled" : "never"
      }
      contentContainerStyle={{ flexGrow: 1 }}
      scrollEnabled={!props.scrollDisabled}
      scrollEventThrottle={16}
      onScroll={props.onScroll}
      horizontal={props.horizontal}
      decelerationRate={props.horizontal ? "fast" : null}
      snapToInterval={props.horizontal ? Dimensions.get("screen").width : null}
      snapToAlignment={props.horizontal ? "center" : null}
    >
      {props.content}
    </ScrollView>
  );
};

export default ScrollViewContainer;
