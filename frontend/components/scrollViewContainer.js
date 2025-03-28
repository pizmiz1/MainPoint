import React, { useState, useEffect } from "react";
import { ScrollView, Dimensions } from "react-native";
import { useSelector } from "react-redux";
import { NestableScrollContainer } from "react-native-draggable-flatlist";

const ScrollViewContainer = (props) => {
  const colors = useSelector((state) => state.colors);
  const running = useSelector((state) => state.running);
  const mode = useSelector((state) => state.mode);

  return props.isNestable ? (
    <NestableScrollContainer
      style={{
        backgroundColor:
          mode === "Fitness" ? colors.secondary : colors.lightGrey,
        ...props.style,
      }}
      keyboardShouldPersistTaps={
        props.keyboardShouldPersistTaps ? "handled" : "never"
      }
      contentContainerStyle={{ flexGrow: 1 }}
      scrollEnabled={!props.scrollDisabled}
      scrollEventThrottle={16}
      onScroll={props.onScroll}
    >
      {props.content}
    </NestableScrollContainer>
  ) : (
    <ScrollView
      style={{
        backgroundColor:
          mode === "Fitness" ? colors.secondary : colors.lightGrey,
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
