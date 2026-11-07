import { LayoutAnimation, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MealNote } from "../types/mealNote";
import colors from "../constants/colors";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useGlobalContext } from "../store/GlobalContext";

interface NoteProps {
  note: MealNote;
}

const Note = ({ note }: NoteProps) => {
  const { updateMealNotes } = useGlobalContext();

  const router = useRouter();

  const deleteNote = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    updateMealNotes((prev) => prev.filter((curr) => curr.id !== note.id));
  };

  const open = () => {
    router.push({
      pathname: "/note-detail",
      params: {
        id: note.id,
        label: note.label,
        note: note.note,
      },
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={open}>
      <View style={styles.textContainer}>
        <Text style={styles.labelText} numberOfLines={1} ellipsizeMode="tail">
          {note.label}
        </Text>
        <Text style={styles.noteText} numberOfLines={1} ellipsizeMode="tail">
          {note.note}
        </Text>
      </View>

      <TouchableOpacity onPress={deleteNote}>
        <AntDesign name="minus-circle" size={20} color="red" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default Note;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "white",
    paddingVertical: 11,
    paddingLeft: 25,
    paddingRight: 10,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textContainer: {
    width: "88%",
  },
  labelText: {
    fontSize: 19,
    fontWeight: "bold",
  },
  noteText: {
    fontSize: 15,
    color: colors.textGrey,
  },
});
