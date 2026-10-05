import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../constants/colors";
import { useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import foodImages from "../constants/foodImages";
import { MealIdea } from "../types/mealIdea";

const descriptionDefaultHeight = 75;

interface MealIdeaCardProps {
  mealIdea: MealIdea;
  onPress: (id: string) => void;
}

const MealIdeaCard = ({ mealIdea, onPress }: MealIdeaCardProps) => {
  const [descriptionHeight, setDescriptionHeight] = useState(0);
  const [expanded, setExpanded] = useState(false);

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

  const imgSource = foodImages.find((curr) => curr.id === mealIdea.imageId)!.source;

  return (
    <TouchableOpacity
      onPress={() => {
        onPress(mealIdea.id);
      }}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.imgContainer}>
          <Image style={styles.img} source={imgSource} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.headerText} numberOfLines={1} ellipsizeMode="tail">
            {mealIdea.name}
          </Text>
          {/* Invisible element to calculate description height */}
          <View
            pointerEvents="none"
            onLayout={(event) => {
              const { height } = event.nativeEvent.layout;
              setDescriptionHeight(height);
            }}
            style={styles.invisibleDescriptionContainer}
          >
            <Text style={styles.invisibleDescriptionText}>{mealIdea.description}</Text>
          </View>

          {/* Actual element */}
          <Animated.View style={[styles.descriptionContainer, { height: animatedHeight }]}>
            <TouchableOpacity
              disabled={descriptionHeight <= descriptionDefaultHeight}
              onPress={expandOrShrink}
              activeOpacity={0.7}
              style={styles.descriptionBtn}
            >
              <Text style={styles.descriptionText}>{mealIdea.description}</Text>
            </TouchableOpacity>

            {descriptionHeight > descriptionDefaultHeight && (
              <Ionicons name={expanded ? "chevron-up" : "chevron-down"} style={styles.icon} size={25} color="#2c2c2c" pointerEvents="none" />
            )}
          </Animated.View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MealIdeaCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 25,
    padding: 10,
    gap: 10,
    paddingBottom: 15,
  },
  content: {
    flexDirection: "row",
    gap: 15,
  },
  imgContainer: {
    marginTop: 5,
  },
  img: {
    height: 95,
    aspectRatio: 1,
  },
  textContainer: {
    flex: 1,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 22,
    flexShrink: 1,
  },
  invisibleDescriptionContainer: {
    position: "absolute",
    opacity: 0,
    left: 10,
    right: 10,
    padding: 10,
    borderRadius: 10,
    zIndex: -999,
  },
  invisibleDescriptionText: {
    fontSize: 15,
  },
  descriptionContainer: {
    overflow: "hidden",
    position: "relative",
  },
  descriptionBtn: {
    flex: 1,
    backgroundColor: colors.lightGrey,
    padding: 10,
    borderRadius: 15,
  },
  descriptionText: {
    fontSize: 15,
    color: "#2c2c2c",
    width: "90%",
  },
  icon: {
    position: "absolute",
    bottom: 2,
    right: 2,
  },
});
