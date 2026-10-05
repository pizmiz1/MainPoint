import { StyleSheet, View, ViewStyle } from "react-native";
import { ReactNode, useState } from "react";

// Custom Components
import Header from "./Header";
import ScrollViewContainer from "./ScrollViewContainer";

interface PageContainerProps {
  children: ReactNode;
  headerText: string;
  headerDescriptionText: string;
  headerActionPress: () => void;
  viewStyle?: ViewStyle;
}

const PageContainer = ({ children, headerText, headerDescriptionText, headerActionPress, viewStyle }: PageContainerProps) => {
  const [blur, setBlur] = useState(0);
  const [backgroundTrig, setBackgroundTrig] = useState(0);

  return (
    <>
      <Header
        headerText={headerText}
        descriptionText={headerDescriptionText}
        backgroundTrig={backgroundTrig}
        blur={blur}
        actionPress={headerActionPress}
      />

      <ScrollViewContainer
        onScroll={(pos) => {
          setBackgroundTrig(pos.nativeEvent.contentOffset.y);
          if (pos.nativeEvent.contentOffset.y < 40 && pos.nativeEvent.contentOffset.y > 0) {
            setBlur(pos.nativeEvent.contentOffset.y);
          } else if (pos.nativeEvent.contentOffset.y > 40) {
            setBlur(40);
          } else if (pos.nativeEvent.contentOffset.y <= 0) {
            setBlur(0);
          }
        }}
      >
        <View style={[styles.content, viewStyle]}>{children}</View>
      </ScrollViewContainer>
    </>
  );
};

export default PageContainer;

const styles = StyleSheet.create({
  content: {
    marginBottom: 20,
    marginTop: 80,
  },
});
