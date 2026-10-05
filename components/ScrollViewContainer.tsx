import { ReactNode } from "react";
import { ScrollView, Dimensions, ViewStyle, NativeSyntheticEvent, NativeScrollEvent } from "react-native";

interface ScrollViewContainerProps {
  children: ReactNode;
  onScroll: ((event: NativeSyntheticEvent<NativeScrollEvent>) => void) | undefined;
  style?: ViewStyle;
  keyboardShouldPersistTaps?: boolean | "handled" | "never" | "always" | undefined;
  scrollDisabled?: boolean;
  horizontal?: boolean;
}

const ScrollViewContainer = ({ style, keyboardShouldPersistTaps, scrollDisabled, onScroll, horizontal, children }: ScrollViewContainerProps) => {
  return (
    <ScrollView
      style={style}
      keyboardShouldPersistTaps={keyboardShouldPersistTaps ? "handled" : "never"}
      contentContainerStyle={{ flexGrow: 1 }}
      scrollEnabled={!scrollDisabled}
      scrollEventThrottle={16}
      onScroll={onScroll}
      horizontal={horizontal}
      decelerationRate={horizontal ? "fast" : undefined}
      snapToInterval={horizontal ? Dimensions.get("screen").width : undefined}
      snapToAlignment={horizontal ? "center" : undefined}
    >
      {children}
    </ScrollView>
  );
};

export default ScrollViewContainer;
