import {
  ActivityIndicator,
  Animated,
  Image,
  Keyboard,
  LayoutAnimation,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import uuid from "react-native-uuid";
import foodImages from "../constants/foodImages";
import { MealIdea } from "../types/mealIdea";

// Custom Components
import MealIdeaSection from "./MealIdeaSection";

interface MealIdeaModalProps {
  modalVisible: boolean;
  setModalVisible: (newModalVisible: boolean) => void;
  mealIdea: MealIdea | undefined;
  mealIdeas: MealIdea[];
  updateMealIdeas: (newMealIdeas: MealIdea[]) => void;
}

const MealIdeaModal = ({ modalVisible, setModalVisible, mealIdea, mealIdeas, updateMealIdeas }: MealIdeaModalProps) => {
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

  const changeText = (newText: string, setText: (newText: string) => void, animatedValue: Animated.Value) => {
    // @ts-ignore
    if (newText.length > 0 && animatedValue.__getValue() === 0) {
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
      // @ts-ignore
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

  const save = async (operation: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.create(200, LayoutAnimation.Types.linear, LayoutAnimation.Properties.opacity));
    setSaving(true);

    let newMealIdeas: MealIdea[] = [];

    switch (operation) {
      case "add": {
        const newMealIdea: MealIdea = {
          id: uuid.v4(),
          name: name,
          description: description,
          imageId: imageId!,
        };
        newMealIdeas = mealIdeas.concat([newMealIdea]);
        break;
      }
      case "delete": {
        newMealIdeas = mealIdeas.filter((curr) => curr.id !== mealIdea!.id);
        break;
      }
      case "update": {
        const index = mealIdeas.findIndex((curr) => curr.id === mealIdea!.id);
        const updatedMealIdea: MealIdea = { ...mealIdeas[index], name: name, description: description, imageId: imageId! };
        newMealIdeas = mealIdeas.with(index, updatedMealIdea);
        break;
      }
    }

    updateMealIdeas(newMealIdeas);
    setSaving(false);
    resetState();
    setModalVisible(false);
  };

  useEffect(() => {
    setName(mealIdea ? mealIdea.name : "");
    setDescription(mealIdea ? mealIdea.description : "");
    setImageId(mealIdea ? mealIdea.imageId : undefined);

    // @ts-ignore
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

  const resetDisabled = saving || (name.length === 0 && description.length === 0 && imageId === undefined);
  const saveDisabled = saving || name.length === 0 || description.length === 0 || imageId === undefined;

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
        style={styles.container}
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={styles.headerContainer}>
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
          <Text style={styles.headerText} numberOfLines={1}>
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

        <MealIdeaSection sectionLabel="Name">
          <Animated.View style={[styles.textInputContainer, { borderColor: nameBorder, opacity: saving ? 0.3 : 1 }]}>
            <TextInput
              autoFocus={mealIdea ? false : true}
              value={name}
              onChangeText={(text) => {
                changeText(text, setName, nameBorderVal);
              }}
              style={styles.nameInput}
              placeholder="Name..."
              placeholderTextColor="#aaa"
              editable={!saving}
              submitBehavior="blurAndSubmit"
              autoCapitalize="words"
            />
          </Animated.View>
        </MealIdeaSection>

        <MealIdeaSection sectionLabel="Description">
          <Animated.View style={[styles.textInputContainer, { borderColor: descriptionBorder, opacity: saving ? 0.3 : 1 }]}>
            <TextInput
              value={description}
              onChangeText={(text) => {
                changeText(text, setDescription, descriptionBorderVal);
              }}
              style={styles.descriptionInput}
              placeholder="Description..."
              placeholderTextColor="#aaa"
              editable={!saving}
              multiline={true}
            />
          </Animated.View>
        </MealIdeaSection>

        <MealIdeaSection sectionLabel="Image">
          <View style={styles.imgContainer}>
            {foodImages.map((curr) => {
              return (
                <TouchableOpacity
                  key={curr.id}
                  onPress={() => {
                    setImageId(curr.id);
                  }}
                  disabled={saving}
                  style={[styles.imgBtn, { borderColor: imageId === curr.id ? "#6b6b6b" : "white", opacity: saving ? 0.3 : 1 }]}
                >
                  <Image style={styles.img} source={curr.source} />
                </TouchableOpacity>
              );
            })}
          </View>
        </MealIdeaSection>

        {saving ? (
          <View style={styles.spinnerContainer}>
            <ActivityIndicator size="large" color={colors.darkGrey} />
          </View>
        ) : (
          <View style={styles.btnContainer}>
            <TouchableOpacity
              disabled={resetDisabled}
              onPress={() => {
                resetState();
              }}
              style={[styles.btn, { backgroundColor: colors.lightGrey, opacity: resetDisabled ? 0.3 : 1 }]}
            >
              <Text style={styles.resetText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={saveDisabled}
              onPress={() => {
                if (mealIdea) {
                  save("update");
                } else {
                  save("add");
                }
              }}
              style={[styles.btn, { backgroundColor: colors.primaryBlue, opacity: saveDisabled ? 0.3 : 1 }]}
            >
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
          </View>
        )}
      </Pressable>
    </Modal>
  );
};

export default MealIdeaModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 15,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 40,
    fontStyle: "italic",
    textAlign: "center",
    fontWeight: "bold",
    width: "70%",
  },
  textInputContainer: {
    borderWidth: 1,
    borderRadius: 7,
  },
  nameInput: {
    height: 40,
    padding: 10,
    borderRadius: 7,
    backgroundColor: colors.lightGrey,
  },
  descriptionInput: {
    height: 200,
    padding: 10,
    borderRadius: 7,
    backgroundColor: colors.lightGrey,
  },
  imgContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
  },
  imgBtn: {
    borderWidth: 2,
    borderRadius: 22,
  },
  img: {
    height: 100,
    aspectRatio: 1,
  },
  spinnerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 30,
  },
  btnContainer: {
    flexDirection: "row",
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "space-evenly",
    marginBottom: 30,
  },
  btn: {
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
  },
  resetText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  saveText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
