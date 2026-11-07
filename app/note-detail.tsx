import {
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  TextInputKeyPressEvent,
  TextInputSelectionChangeEvent,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInputInstance } from "react-native";
import { MealNoteType } from "../types/mealNote";
import { useLocalSearchParams, useRouter } from "expo-router";
import colors from "../constants/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { Platform } from "expo";
import { useGlobalContext } from "../store/GlobalContext";

const MealNoteDetailScreen = () => {
  const { id, label: initialLabel, note: initialNote } = useLocalSearchParams<Partial<MealNoteType>>();

  const { updateMealNotes } = useGlobalContext();

  const [label, setLabel] = useState(initialLabel ?? "");
  const [note, setNote] = useState(initialNote ?? "");
  const [isEditable, setIsEditable] = useState(true);

  const labelRef = useRef<TextInputInstance | null>(null);
  const noteRef = useRef<TextInputInstance | null>(null);
  const enterPressed = useRef<boolean>(false);
  const backPressed = useRef<boolean>(false);
  const labelTextRef = useRef(initialLabel ?? "");
  const noteTextRef = useRef(initialNote ?? "");
  const timerRef = useRef<number | null>(null);

  const router = useRouter();

  const listPrefix = "    –   ";
  const deletePrefix = "    –  ";

  const save = async () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    updateMealNotes((prev) =>
      prev.map((curr) =>
        curr.id === id ? { ...curr, label: labelTextRef.current, note: noteTextRef.current, editedAt: new Date().toISOString() } : curr,
      ),
    );
  };

  const goBack = () => {
    router.back();
  };

  const debounceSave = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      save();
    }, 300);
  };

  const updateLabelText = (text: string) => {
    labelTextRef.current = text;
    setLabel(text);
    debounceSave();
  };

  const updateNoteText = (text: string) => {
    noteTextRef.current = text;
    setNote(text);
    debounceSave();
  };

  const noteKeyPress = (e: TextInputKeyPressEvent) => {
    const key = e.nativeEvent.key;

    switch (key) {
      case "Enter": {
        enterPressed.current = true;
        break;
      }
      case "Backspace": {
        backPressed.current = true;
        break;
      }
    }
  };

  const noteSelectionChange = (event: TextInputSelectionChangeEvent) => {
    const { start } = event.nativeEvent.selection;

    requestAnimationFrame(() => {
      const latestNote = noteTextRef.current;
      const textUpToCursor = latestNote.substring(0, start);
      const lineIndex = textUpToCursor.split("\n").length - 1;
      const lines = latestNote.split("\n");

      // Selecting list prefix
      if (lines[lineIndex].startsWith(listPrefix)) {
        let amountToMove = 0;

        if (latestNote.charAt(start + 4) === "–") {
          amountToMove = 8;
        } else if (latestNote.charAt(start + 3) === "–") {
          amountToMove = 7;
        } else if (latestNote.charAt(start + 2) === "–") {
          amountToMove = 6;
        } else if (latestNote.charAt(start + 1) === "–") {
          amountToMove = 5;
        } else if (latestNote.charAt(start) === "–") {
          amountToMove = 4;
        } else if (latestNote.charAt(start - 1) === "–") {
          amountToMove = 3;
        } else if (latestNote.charAt(start - 2) === "–") {
          amountToMove = 2;
        } else if (latestNote.charAt(start - 3) === "–") {
          amountToMove = 1;
        }

        if (amountToMove > 0) {
          noteRef.current?.setSelection(start + amountToMove, start + amountToMove);
        }
      }

      // New list
      if (lines[lineIndex].startsWith("- ")) {
        lines[lineIndex] = lines[lineIndex].slice(2);
        lines[lineIndex] = listPrefix + lines[lineIndex];
        const text = lines.join("\n");
        updateNoteText(text);
      }

      // Enter
      if (enterPressed.current) {
        enterPressed.current = false;

        if (lines[lineIndex - 1].startsWith(listPrefix)) {
          const textAfter = lines[lineIndex];
          const textAfterBlank = textAfter.length === 0;
          const lineAboveBlank = lines[lineIndex - 1] === listPrefix;

          if (textAfterBlank && lineAboveBlank) {
            lines.splice(lineIndex, 1);
            lines[lineIndex - 1] = "";
          } else {
            lines[lineIndex] = listPrefix + textAfter;
          }

          const text = lines.join("\n");
          updateNoteText(text);
        }
      }

      // Back
      if (backPressed.current) {
        backPressed.current = false;

        if (lines[lineIndex].startsWith(deletePrefix) && !lines[lineIndex].startsWith(listPrefix)) {
          // No Text
          if (lines[lineIndex] === deletePrefix) {
            lines.splice(lineIndex, 1);
          }
          // Text
          else {
            if (lines[lineIndex - 1].startsWith(listPrefix)) {
              const remainingText = lines[lineIndex].slice(7);
              lines[lineIndex - 1] = lines[lineIndex - 1] + remainingText;
              lines.splice(lineIndex, 1);
            } else {
              lines[lineIndex] = lines[lineIndex].slice(7);
            }
          }

          const text = lines.join("\n");
          updateNoteText(text);
        }
      }
    });
  };

  useEffect(() => {
    if (label === "" && note === "") {
      labelRef.current?.focus();
    }

    return () => {
      if (labelTextRef.current !== initialLabel || noteTextRef.current !== initialNote) {
        save();
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goBack} style={styles.backBtnContainer}>
        <MaterialIcons name="arrow-back" size={35} color={colors.primaryBlue} />
      </TouchableOpacity>

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.content}>
        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
          onScrollBeginDrag={() => setIsEditable(false)}
          onScrollEndDrag={() => setIsEditable(true)}
          onMomentumScrollEnd={() => setIsEditable(true)}
        >
          <View style={styles.inputContainer}>
            <TextInput
              ref={labelRef}
              style={styles.labelInput}
              value={label}
              onChangeText={updateLabelText}
              onSubmitEditing={() => {
                noteRef.current?.focus();
              }}
            />

            <TextInput
              ref={noteRef}
              style={styles.noteInput}
              value={note}
              onKeyPress={noteKeyPress}
              onSelectionChange={noteSelectionChange}
              onChangeText={updateNoteText}
              multiline={true}
              scrollEnabled={false}
              editable={isEditable}
            />
          </View>

          <Pressable
            style={styles.bottomGap}
            onPress={() => {
              noteRef.current?.focus();
            }}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default MealNoteDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    backgroundColor: "#eef0ef",
    paddingTop: 45,
  },
  backBtnContainer: {
    paddingTop: 10,
    paddingRight: 10,
    alignSelf: "flex-start",
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  inputContainer: {
    width: "100%",
  },
  labelInput: {
    marginTop: 16,
    fontSize: 30,
    fontWeight: "bold",
    color: colors.darkGrey,
    paddingRight: 20,
  },
  noteInput: {
    flex: 1,
    textAlignVertical: "top",
    fontSize: 16,
    paddingRight: 20,
    lineHeight: 25,
  },
  bottomGap: {
    flex: 1,
    minHeight: 400,
  },
});
