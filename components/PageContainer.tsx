import { Animated, StyleSheet, View, ViewStyle } from "react-native";
import { ReactNode, useRef, useState } from "react";
import { BlurView } from "expo-blur";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import type { ComponentProps, ComponentType, ReactElement } from "react";

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

const TypedMaskedView = MaskedView as unknown as ComponentType<ComponentProps<typeof View> & { maskElement: ReactElement }>;

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

      <TypedMaskedView
        style={{ position: "absolute", bottom: 0, height: 70, width: "100%", zIndex: 300 }}
        maskElement={
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.5)", "rgba(0,0,0,0.7)", "black"]}
            locations={[0, 0.2, 0.5, 0.9]}
            style={StyleSheet.absoluteFill}
          />
        }
      >
        <BlurView intensity={90} style={StyleSheet.absoluteFill} />
      </TypedMaskedView>
    </>
  );
};

export default PageContainer;

const styles = StyleSheet.create({
  content: {
    marginBottom: 120,
  },
});
