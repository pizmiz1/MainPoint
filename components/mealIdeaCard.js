import { Animated, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import colors from "../constants/colors";
import { useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import foodImages from "../constants/foodImages";
import MealIdeaModal from "./mealIdeaModal";

const descriptionDefaultHeight = 75;

const MealIdeaCard = ({ mealIdea, onPress }) => {
  const [descriptionHeight, setDescriptionHeight] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const animatedHeight = useRef(new Animated.Value(descriptionDefaultHeight)).current;

  const expandOrShrink = () => {
    const collapsedHeight = Math.min(descriptionHeight, descriptionDefaultHeight);
    const toValue = expanded ? collapsedHeight : descriptionHeight;

    Animated.timing(animatedHeight, {
      toValue: toValue,
      duration: 200,
      useNativeDriver: false,
    }).start();

    setExpanded(!expanded);
  };

  const imgSource = foodImages.find((curr) => curr.id === mealIdea.imageId).source;

  return (
    <TouchableOpacity
      onPress={() => {
        onPress(mealIdea.id);
      }}
      style={{ width: "100%", backgroundColor: "white", borderRadius: 25, padding: 10, gap: 10, paddingBottom: 15 }}
    >
      <View style={{ flexDirection: "row", gap: 15 }}>
        <View style={{ marginTop: 5 }}>
          <Image style={{ height: 95, aspectRatio: 1 }} source={imgSource} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontWeight: "bold", fontSize: 22, flexShrink: 1 }} numberOfLines={1} ellipsizeMode="tail">
            {mealIdea.name}
          </Text>
          {/* Invisible element to calculate description height */}
          <View
            pointerEvents="none"
            onLayout={(event) => {
              const { height } = event.nativeEvent.layout;
              setDescriptionHeight(height);
            }}
            style={{
              position: "absolute",
              opacity: 0,
              left: 10,
              right: 10,
              padding: 10,
              borderRadius: 10,
              zIndex: -999,
            }}
          >
            <Text style={{ fontSize: 15 }}>{mealIdea.description}</Text>
          </View>

          {/* Actual element */}
          <Animated.View style={{ height: animatedHeight, overflow: "hidden", position: "relative" }}>
            <TouchableOpacity
              disabled={descriptionHeight <= descriptionDefaultHeight}
              onPress={expandOrShrink}
              activeOpacity={0.7}
              style={{
                flex: 1,
                backgroundColor: colors.lightGrey,
                padding: 10,
                borderRadius: 15,
              }}
            >
              <Text style={{ fontSize: 15, color: "#2c2c2c", width: "90%" }}>{mealIdea.description}</Text>
            </TouchableOpacity>

            {descriptionHeight > descriptionDefaultHeight && (
              <Ionicons
                name={expanded ? "chevron-up" : "chevron-down"}
                style={{ position: "absolute", bottom: 2, right: 2 }}
                size={25}
                color="#2c2c2c"
                pointerEvents="none"
              />
            )}
          </Animated.View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MealIdeaCard;
