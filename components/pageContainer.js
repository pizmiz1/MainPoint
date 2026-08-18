import { View } from "react-native";
import Header from "./header";
import ScrollViewContainer from "./scrollViewContainer";
import { useState } from "react";

const PageContainer = ({ children, headerText, headerDescriptionText, headerActionPress, viewStyle }) => {
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
        <View
          style={{
            marginBottom: 20,
            marginTop: 80,
            ...viewStyle,
          }}
        >
          {children}
        </View>
      </ScrollViewContainer>
    </>
  );
};

export default PageContainer;
