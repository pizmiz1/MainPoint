import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";

//constants
import colors from "../constants/colors";

const ScrollViewContainer = (props) => {
  const [shadowVisible, setShadowVisible] = useState(false);

  const handleSroll = (e) => {
    if (e.nativeEvent.contentOffset.y > 0) {
      setShadowVisible(true);
    } else {
      setShadowVisible(false);
    }
  };

  useEffect(() => {
    props.nav.setOptions({
      headerShadowVisible: shadowVisible,
      headerStyle: {
        backgroundColor: colors.secondary,
        shadowColor: "#000000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowRadius: 2,
        shadowOpacity: 0.2,
        borderBottomColor: colors.secondary === "white" ? null : "grey",
        borderBottomWidth: colors.secondary === "white" ? null : 0.5,
      },
    });
  }, [shadowVisible]);

  return (
    <ScrollView
      style={{
        backgroundColor: colors.secondary,
      }}
      contentContainerStyle={{ flexGrow: 1 }}
      onScroll={handleSroll}
      scrollEventThrottle={16}
    >
      {props.content}
    </ScrollView>
  );
};

export default ScrollViewContainer;
