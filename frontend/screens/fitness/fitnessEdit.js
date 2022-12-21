import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import uuid from "react-native-uuid";
import { updateExcersizes } from "../../store/actions/updateExcersizes";
import { Notifier, Easing, NotifierComponents } from "react-native-notifier";

//components
import ScrollViewContainer from "../../components/scrollViewContainer";

const FitnessEdit = (props) => {
  const colors = useSelector((state) => state.colors);

  const submitLoading = useRef();

  const [reloadTrigger, setReloadTrigger] = useState(false);

  const dispatch = useDispatch();

  const submitPress = async () => {
    submitLoading.current = true;
    const worked0 = await compRef0.current.submit();
    const worked1 = await compRef1.current.submit();
    const worked2 = await compRef2.current.submit();
    const worked3 = await compRef3.current.submit();
    const worked4 = await compRef4.current.submit();
    const worked5 = await compRef5.current.submit();
    const worked6 = await compRef6.current.submit();
    if (
      worked0 &&
      worked1 &&
      worked2 &&
      worked3 &&
      worked4 &&
      worked5 &&
      worked6
    ) {
      Notifier.showNotification({
        title: "Success!",
        description: "Your program was updated successfully.",
        Component: NotifierComponents.Alert,
        componentProps: {
          alertType: "success",
        },
      });
    } else {
      Notifier.showNotification({
        title: "Failure",
        description: "Your program failed to update.",
        Component: NotifierComponents.Alert,
        componentProps: {
          alertType: "error",
        },
      });
    }
    submitLoading.current = false;
    //setReloadTrigger(!reloadTrigger);
  };

  const compRef0 = useRef();
  const compRef1 = useRef();
  const compRef2 = useRef();
  const compRef3 = useRef();
  const compRef4 = useRef();
  const compRef5 = useRef();
  const compRef6 = useRef();

  const DayComponent = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
      async submit() {
        const worked = await dispatch(updateExcersizes(props.day, excersizes));
        return worked;
      },
    }));

    const [selected, setSelected] = useState(false);
    const [excersizes, setExcersizes] = useState([
      {
        id: uuid.v4(),
        excersize: "",
        sets: "",
        reps: "",
        weight: "",
      },
    ]);

    const handleExcersizeChange = (index, val) => {
      let data = [...excersizes];
      data[index].excersize = val;
      setExcersizes(data);
    };

    const handleSetsChange = (index, val) => {
      let data = [...excersizes];
      data[index].sets = val;
      setExcersizes(data);
    };

    const handleRepsChange = (index, val) => {
      let data = [...excersizes];
      data[index].reps = val;
      setExcersizes(data);
    };

    const handleWeightChange = (index, val) => {
      let data = [...excersizes];
      data[index].weight = val;
      setExcersizes(data);
    };

    const addExcersize = () => {
      let newExcersize = {
        id: uuid.v4(),
        excersize: "",
        sets: "",
        reps: "",
        weight: "",
      };
      setExcersizes([...excersizes, newExcersize]);
    };

    const removeExcersize = (index) => {
      let data = [...excersizes];
      data.splice(index, 1);
      setExcersizes(data);
    };

    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            setSelected(!selected);
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              flex: 1,
              width: "100%",
              marginTop: 5,
            }}
          >
            <Text
              style={{
                fontSize: 25,
                color: colors.textColors.headerText,
                fontWeight: selected ? "bold" : "normal",
                marginLeft: 10,
              }}
            >
              {props.day}
            </Text>
            <View
              style={{
                alignItems: "flex-end",
                alignSelf: "flex-end",
                marginBottom: 3,
                flex: 1,
              }}
            >
              <AntDesign
                name={selected ? "arrowup" : "arrowdown"}
                color={"white"}
                size={20}
              />
            </View>
          </View>
          <View
            style={{
              borderBottomColor: colors.lightGrey,
              borderBottomWidth: 1,
            }}
          />
        </TouchableOpacity>
        {selected ? (
          <View>
            {excersizes.map((item, index) => {
              return (
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    width: "100%",
                  }}
                  key={index}
                >
                  <Text style={{ color: "white", fontSize: 30 }}>
                    {index + 1}.{" "}
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "flex-end",
                      alignItems: "center",
                      flexDirection: "row",
                    }}
                  >
                    <TextInput
                      value={item.excersize}
                      placeholder="Excersize"
                      onChangeText={(val) => handleExcersizeChange(index, val)}
                      style={{
                        margin: 5,
                        borderWidth: 1,
                        padding: 5,
                        borderColor: "white",
                        borderRadius: 10,
                        color: "white",
                        fontSize: 15,
                        width: "40%",
                        marginRight: 5,
                      }}
                      textAlign="center"
                    />
                    <TextInput
                      value={item.sets}
                      placeholder="Sets"
                      onChangeText={(val) => handleSetsChange(index, val)}
                      style={{
                        margin: 5,
                        borderWidth: 1,
                        padding: 5,
                        borderColor: "white",
                        borderRadius: 10,
                        color: "white",
                        fontSize: 15,
                        width: "10%",
                        marginRight: 5,
                      }}
                      textAlign="center"
                      keyboardType="number-pad"
                    />
                    <TextInput
                      value={item.reps}
                      placeholder="Reps"
                      onChangeText={(val) => handleRepsChange(index, val)}
                      style={{
                        margin: 5,
                        borderWidth: 1,
                        padding: 5,
                        borderColor: "white",
                        borderRadius: 10,
                        color: "white",
                        fontSize: 15,
                        width: "10%",
                        marginRight: 5,
                      }}
                      textAlign="center"
                      keyboardType="number-pad"
                    />
                    <TextInput
                      value={item.weight}
                      placeholder="Weight"
                      onChangeText={(val) => handleWeightChange(index, val)}
                      style={{
                        margin: 5,
                        borderWidth: 1,
                        padding: 5,
                        borderColor: "white",
                        borderRadius: 10,
                        color: "white",
                        fontSize: 15,
                        width: "15%",
                        marginRight: 20,
                      }}
                      textAlign="center"
                      keyboardType="numbers-and-punctuation"
                    />
                    <TouchableOpacity
                      onPress={() => {
                        removeExcersize(index);
                      }}
                      style={{ marginRight: 10 }}
                    >
                      <AntDesign name="minuscircleo" size={20} color="red" />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
            <TouchableOpacity
              onPress={addExcersize}
              style={{ marginLeft: 5, marginTop: 10 }}
            >
              <AntDesign name="pluscircleo" size={30} color="green" />
            </TouchableOpacity>
          </View>
        ) : undefined}
        <View style={{ marginBottom: 30 }} />
      </View>
    );
  });

  return (
    <View style={{ flex: 1 }}>
      <ScrollViewContainer
        content={
          <View>
            <DayComponent day="Monday" ref={compRef0} />
            <DayComponent day="Tuesday" ref={compRef1} />
            <DayComponent day="Wednesday" ref={compRef2} />
            <DayComponent day="Thursday" ref={compRef3} />
            <DayComponent day="Friday" ref={compRef4} />
            <DayComponent day="Saturday" ref={compRef5} />
            <DayComponent day="Sunday" ref={compRef6} />
            <TouchableOpacity
              onPress={submitPress}
              style={{
                borderWidth: 1,
                borderColor: "grey",
                padding: 5,
                borderRadius: 20,
                width: "50%",
                alignSelf: "center",
                backgroundColor: "green",
              }}
              disabled={submitLoading.current}
            >
              <Text
                style={{ color: "white", fontSize: 30, textAlign: "center" }}
              >
                SUBMIT
              </Text>
            </TouchableOpacity>
          </View>
        }
        nav={props.navigation}
      />
    </View>
  );
};

export default FitnessEdit;
