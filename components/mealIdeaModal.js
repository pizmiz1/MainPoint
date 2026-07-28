import {
  ActivityIndicator,
  Animated,
  FlatList,
  Image,
  Keyboard,
  LayoutAnimation,
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import colors from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import uuid from "react-native-uuid";
import asyncKeys from "../constants/asyncKeys";
import AsyncStorage from "@react-native-async-storage/async-storage";
import foodImages from "../constants/foodImages";

const MealIdeaModal = ({ modalVisible, setModalVisible, mealIdea, done, mealIdeas }) => {
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState(mealIdea ? mealIdea.name : "");
  const [imageId, setImageId] = useState(mealIdea ? mealIdea.imageId : undefined);
  const [description, setDescription] = useState(mealIdea ? mealIdea.description : "");

  const nameBorderVal = useRef(new Animated.Value(0)).current;
  const descriptionBorderVal = useRef(new Animated.Value(0)).current;

  const nameBorder = nameBorderVal.interpolate({
    inputRange: [0, 1],
    outputRange: ["white", "black"],
  });

  const descriptionBorder = descriptionBorderVal.interpolate({
    inputRange: [0, 1],
    outputRange: ["white", "black"],
  });

  const changeText = (newText, setText, animatedValue) => {
    if (newText.length > 0 && animatedValue.__getValue() === 0) {
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
    } else if (newText.length === 0 && animatedValue.__getValue() === 1) {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }

    setText(newText);
  };

  const resetState = () => {
    Animated.parallel(
      [
        Animated.timing(nameBorderVal, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(descriptionBorderVal, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
      ],
      { stopTogether: false },
    ).start();

    setName("");
    setDescription("");
    setImageId(undefined);
  };

  const save = async (operation) => {
    LayoutAnimation.configureNext(LayoutAnimation.create(200, LayoutAnimation.Types.linear, LayoutAnimation.Properties.opacity));
    setSaving(true);

    let newMealIdeas = [];

    switch (operation) {
      case "add": {
        const newMealIdea = {
          id: uuid.v4(),
          name: name,
          description: description,
          imageId: imageId,
        };
        newMealIdeas = mealIdeas.concat([newMealIdea]);
        break;
      }
      case "delete": {
        newMealIdeas = mealIdeas.filter((curr) => curr.id !== mealIdea.id);
        break;
      }
      case "update": {
        const index = mealIdeas.findIndex((curr) => curr.id === mealIdea.id);
        const updatedMealIdea = { ...mealIdeas[index], name: name, description: description, imageId: imageId };
        newMealIdeas = mealIdeas.with(index, updatedMealIdea);
        break;
      }
    }

    const newMealIdeasJSON = JSON.stringify(newMealIdeas);
    await AsyncStorage.setItem(asyncKeys.mealIdeas, newMealIdeasJSON);

    done(newMealIdeas);
    setSaving(false);
    resetState();
    setModalVisible(false);
  };

  useEffect(() => {
    setName(mealIdea ? mealIdea.name : "");
    setDescription(mealIdea ? mealIdea.description : "");
    setImageId(mealIdea ? mealIdea.imageId : undefined);

    if (mealIdea && modalVisible && nameBorderVal.__getValue() === 0) {
      Animated.parallel(
        [
          Animated.timing(nameBorderVal, {
            toValue: 1,
            duration: 200,
            useNativeDriver: false,
          }),
          Animated.timing(descriptionBorderVal, {
            toValue: 1,
            duration: 200,
            useNativeDriver: false,
          }),
        ],
        { stopTogether: false },
      ).start();
    }
  }, [modalVisible]);

  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={() => {
        if (saving) {
          return;
        }

        setModalVisible(false);
        resetState();
      }}
    >
      <Pressable
        style={{
          backgroundColor: "white",
          flex: 1,
          padding: 15,
        }}
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 10,
          }}
        >
          <TouchableOpacity
            disabled={!mealIdea || saving}
            onPress={() => {
              save("delete");
            }}
            hitSlop={20}
            style={{ opacity: !mealIdea ? 0 : saving ? 0.3 : 1 }}
          >
            <Ionicons name="trash" size={30} color="orangered" />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 40,
              fontStyle: "italic",
              textAlign: "center",
              fontWeight: "bold",
              width: "70%",
            }}
            numberOfLines={1}
          >
            {mealIdea ? mealIdea.name : "New Idea"}
          </Text>
          <TouchableOpacity
            disabled={saving}
            onPress={() => {
              resetState();
              setModalVisible(false);
            }}
            hitSlop={20}
            style={{ opacity: saving ? 0.3 : 1 }}
          >
            <Ionicons name="close" size={30} color="#757575" />
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 20 }}>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 2, justifyContent: "space-between" }}>
            <Text style={{ fontWeight: "500", fontSize: 20 }}>Name</Text>
          </View>
          <Animated.View style={{ borderWidth: 1, borderColor: nameBorder, borderRadius: 7, opacity: saving ? 0.3 : 1 }}>
            <TextInput
              autoFocus={mealIdea ? false : true}
              value={name}
              onChangeText={(text) => {
                changeText(text, setName, nameBorderVal);
              }}
              style={{ height: 40, padding: 10, borderRadius: 7, backgroundColor: colors.lightGrey }}
              placeholder="Name..."
              placeholderTextColor="#aaa"
              editable={!saving}
              submitBehavior="blurAndSubmit"
              autoCapitalize="words"
            />
          </Animated.View>
        </View>

        <View style={{ marginTop: 20 }}>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 2, justifyContent: "space-between" }}>
            <Text style={{ fontWeight: "500", fontSize: 20 }}>Description</Text>
          </View>

          <Animated.View style={{ borderWidth: 1, borderColor: descriptionBorder, borderRadius: 7, opacity: saving ? 0.3 : 1 }}>
            <TextInput
              value={description}
              onChangeText={(text) => {
                changeText(text, setDescription, descriptionBorderVal);
              }}
              style={{ height: 200, padding: 10, borderRadius: 7, backgroundColor: colors.lightGrey }}
              placeholder="Description..."
              placeholderTextColor="#aaa"
              editable={!saving}
              multiline={true}
            />
          </Animated.View>
        </View>

        <View style={{ marginTop: 20 }}>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 2, justifyContent: "space-between" }}>
            <Text style={{ fontWeight: "500", fontSize: 20 }}>Image</Text>
          </View>

          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 15 }}>
            {foodImages.map((curr) => {
              return (
                <TouchableOpacity
                  key={curr.id}
                  onPress={() => {
                    setImageId(curr.id);
                  }}
                  disabled={saving}
                  style={{ borderWidth: 2, borderColor: imageId === curr.id ? "#6b6b6b" : "white", borderRadius: 22, opacity: saving ? 0.3 : 1 }}
                >
                  <Image style={{ height: 100, aspectRatio: 1 }} source={curr.source} />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {saving ? (
          <View style={{ flex: 1, alignItems: "center", justifyContent: "flex-end", marginBottom: 30 }}>
            <ActivityIndicator size="large" color={colors.darkGrey} />
          </View>
        ) : (
          <View style={{ flexDirection: "row", flex: 1, alignItems: "flex-end", justifyContent: "space-evenly", marginBottom: 30 }}>
            <TouchableOpacity
              disabled={saving || (name.length === 0 && description.length === 0 && imageId === undefined)}
              onPress={() => {
                resetState();
              }}
              style={{
                backgroundColor: colors.lightGrey,
                paddingVertical: 15,
                paddingHorizontal: 50,
                borderRadius: 30,
                opacity: saving || (name.length === 0 && description.length === 0 && imageId === undefined) ? 0.3 : 1,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={saving || name.length === 0 || description.length === 0 || imageId === undefined}
              onPress={() => {
                if (mealIdea) {
                  save("update");
                } else {
                  save("add");
                }
              }}
              style={{
                backgroundColor: colors.primaryBlue,
                paddingVertical: 15,
                paddingHorizontal: 50,
                borderRadius: 30,
                opacity: saving || name.length === 0 || description.length === 0 || imageId === undefined ? 0.3 : 1,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                Save
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Pressable>
    </Modal>
  );
};

export default MealIdeaModal;
