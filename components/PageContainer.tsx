import { Animated, StyleSheet, View, ViewStyle } from "react-native";
import { ReactNode, useRef, useState } from "react";

// Custom Components
import Header from "./Header";
import ScrollViewContainer from "./ScrollViewContainer";

interface PageContainerProps {
  children: ReactNode;
  headerText: string;
  listLength: number;
  headerActionPress: () => void;
  viewStyle?: ViewStyle;
  scrollDisabled?: boolean;
}

const PageContainer = ({ children, headerText, listLength, headerActionPress, viewStyle, scrollDisabled }: PageContainerProps) => {
  const [blur, setBlur] = useState(0);
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <>
      <Header
        headerText={headerText}
        descriptionText={`${listLength} ${listLength !== 1 ? "Items" : "Item"}`}
        scrollY={scrollY}
        blur={blur}
        actionPress={headerActionPress}
      />

      <ScrollViewContainer
        onScroll={(pos) => {
          const y = Math.max(0, pos.nativeEvent.contentOffset.y);

          scrollY.setValue(y);
          setBlur(y);
        }}
        scrollDisabled={scrollDisabled}
      >
        <View style={[styles.content, { paddingTop: 100 }, viewStyle]}>{children}</View>
      </ScrollViewContainer>
    </>
  );
};

export default PageContainer;

const styles = StyleSheet.create({
  content: {
    marginBottom: 20,
  },
});
