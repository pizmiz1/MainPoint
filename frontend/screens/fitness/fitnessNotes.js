import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  Text,
  ActivityIndicator,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FitnessNotes = (props) => {
  const colors = useSelector((state) => state.colors);
  const [loading, setLoading] = useState(true);
  const [allNotes, setAllNotes] = useState([
    {
      text: "",
    },
  ]);
  const [removed, setRemoved] = useState(false);
  const [added, setAdded] = useState(false);

  const dispatch = useDispatch();

  const lastRef = useRef(null);

  useEffect(() => {
    if (!removed && added) {
      if (lastRef.current) lastRef.current.focus();
      setAdded(false);
    } else {
      setRemoved(false);
    }
  }, [allNotes]);

  useEffect(() => {
    const loadData = async () => {
      const NotesData = await AsyncStorage.getItem("Notes Data");
      if (NotesData) {
        const transformedNotesData = await JSON.parse(NotesData).data;
        setAllNotes(transformedNotesData);
      }
      setLoading(false);
    };
    loadData();
  }, []);

  const handleNoteTextChange = (index, val) => {
    let data = [...allNotes];
    data[index].text = val;
    setAllNotes(data);
  };

  const addNote = () => {
    setAdded(true);
    let newNote = {
      text: "",
    };
    setAllNotes([...allNotes, newNote]);
  };

  const removeNote = async (index) => {
    setRemoved(true);
    if (allNotes.length === 1) {
      return;
    }
    let data = [...allNotes];
    data.splice(index, 1);
    setAllNotes(data);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
      accessible={false}
    >
      <View style={{ flex: 1, backgroundColor: colors.secondary }}>
        {loading ? (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 100,
            }}
          >
            <ActivityIndicator size={"large"} />
          </View>
        ) : (
          allNotes.map((item, index) => {
            return (
              <View
                style={{
                  backgroundColor: colors.secondary,
                  width: "90%",
                  alignSelf: "center",
                  //flex: 1,
                  flexDirection: "row",
                }}
                key={index}
              >
                <Text style={{ color: "white", fontSize: 50 }}>• </Text>
                <TextInput
                  style={{
                    borderColor: "white",
                    color: "white",
                    fontSize: 23,
                    borderBottomColor: "grey",
                    width: "92%",
                    alignSelf: "center",
                  }}
                  onChangeText={(val) => {
                    let checkLineBreak = /\r|\n/.exec(val[val.length - 1]);
                    if (checkLineBreak) {
                      addNote();
                    } else {
                      handleNoteTextChange(index, val);
                    }
                  }}
                  onEndEditing={async () => {
                    await AsyncStorage.setItem(
                      "Notes Data",
                      JSON.stringify({
                        data: allNotes,
                      })
                    );
                  }}
                  value={item.text}
                  placeholder="Enter Notes Here..."
                  multiline={true}
                  placeholderTextColor="grey"
                  onKeyPress={async (e) => {
                    if (e.nativeEvent.key === "Backspace" && item.text === "") {
                      removeNote(index);
                      await AsyncStorage.setItem(
                        "Notes Data",
                        JSON.stringify({
                          data: allNotes,
                        })
                      );
                    }
                  }}
                  ref={index === allNotes.length - 1 ? lastRef : undefined}
                  blurOnSubmit={false}
                  numberOfLines={1}
                />
              </View>
            );
          })
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default FitnessNotes;
