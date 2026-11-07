import { LayoutAnimation, StyleSheet, View } from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { useGlobalContext } from "../../store/GlobalContext";
import { useCallback } from "react";
import uuid from "react-native-uuid";
import { MealNote } from "../../types/mealNote";

// Custom Components
import PageContainer from "../../components/PageContainer";
import ClearAll from "../../components/ClearAll";
import Note from "../../components/Note";

const MealNotesScreen = () => {
  const { mealNotes, updateMealNotes } = useGlobalContext();

  const router = useRouter();

  const sortedMealNotes = [...mealNotes].sort((a, b) => (Date.parse(b.editedAt ?? "") || 0) - (Date.parse(a.editedAt ?? "") || 0));

  const newNote = () => {
    const newId = uuid.v4() as string;

    const newMealNote: MealNote = {
      id: newId,
      label: "",
      note: "",
      editedAt: new Date().toISOString(),
    };

    LayoutAnimation.configureNext(LayoutAnimation.create(100, LayoutAnimation.Types.linear, LayoutAnimation.Properties.opacity));
    updateMealNotes((prev) => [...prev, newMealNote]);

    router.push({
      pathname: "/note-detail",
      params: {
        id: newMealNote.id,
        label: newMealNote.label,
        note: newMealNote.note,
      },
    });
  };

  const clear = () => {
    LayoutAnimation.configureNext(LayoutAnimation.create(200, LayoutAnimation.Types.linear, LayoutAnimation.Properties.opacity));
    updateMealNotes([]);
  };

  useFocusEffect(
    useCallback(() => {
      updateMealNotes((prev) => {
        const filtered = prev.filter((note) => note.note.trim() !== "" || note.label.trim() !== "");
        const needsChange = filtered.length !== prev.length;
        if (needsChange) {
          LayoutAnimation.configureNext(LayoutAnimation.create(100, LayoutAnimation.Types.linear, LayoutAnimation.Properties.opacity));
          return filtered;
        }

        return prev;
      });
    }, []),
  );

  return (
    <View style={styles.container}>
      <PageContainer
        headerText="Notes"
        listLength={mealNotes.length}
        headerActionPress={newNote}
        viewStyle={styles.pageContainer}
        scrollDisabled={mealNotes.length === 0}
      >
        <ClearAll onPress={clear} disabled={mealNotes.length === 0} />

        <View style={styles.noteContainer}>
          {sortedMealNotes.map((curr) => {
            return <Note key={curr.id} note={curr} />;
          })}
        </View>
      </PageContainer>
    </View>
  );
};

export default MealNotesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pageContainer: {
    paddingHorizontal: 20,
  },
  noteContainer: {
    gap: 20,
    marginTop: 20,
  },
});
