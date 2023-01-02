import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
  useEffect,
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
import { updateExersizes } from "../../store/actions/updateExersizes";
import { Notifier, Easing, NotifierComponents } from "react-native-notifier";

//components
import ScrollViewContainer from "../../components/scrollViewContainer";

const FitnessEdit = (props) => {
  const colors = useSelector((state) => state.colors);
  const mondayExersizes = useSelector((state) => state.mondayExersizes);
  const tuesdayExersizes = useSelector((state) => state.tuesdayExersizes);
  const wednesdayExersizes = useSelector((state) => state.wednesdayExersizes);
  const thursdayExersizes = useSelector((state) => state.thursdayExersizes);
  const fridayExersizes = useSelector((state) => state.fridayExersizes);
  const saturdayExersizes = useSelector((state) => state.saturdayExersizes);
  const sundayExersizes = useSelector((state) => state.sundayExersizes);

  const [submitLoading, setSubmitLoading] = useState(false);

  const dispatch = useDispatch();

  const submitPress = async () => {
    setSubmitLoading(true);
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
    setSubmitLoading(false);
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
        let passedDay;
        if (props.day === "Monday") {
          passedDay = 0;
        } else if (props.day === "Tuesday") {
          passedDay = 1;
        } else if (props.day === "Wednesday") {
          passedDay = 2;
        } else if (props.day === "Thursday") {
          passedDay = 3;
        } else if (props.day === "Friday") {
          passedDay = 4;
        } else if (props.day === "Saturday") {
          passedDay = 5;
        } else if (props.day === "Sunday") {
          passedDay = 6;
        }

        const worked = await dispatch(updateExersizes(passedDay, exersizes));
        return worked;
      },
    }));

    const [selected, setSelected] = useState(false);
    const [exersizes, setExersizes] = useState([
      {
        id: uuid.v4(),
        exersize: "",
        sets: "",
        reps: "",
        weight: "",
      },
    ]);

    useEffect(() => {
      if (props.exersizes !== undefined) {
        setExersizes(props.exersizes);
      }
    }, []);

    const handleExersizeChange = (index, val) => {
      let data = [...exersizes];
      data[index].exersize = val;
      setExersizes(data);
    };

    const handleSetsChange = (index, val) => {
      let data = [...exersizes];
      data[index].sets = val;
      setExersizes(data);
    };

    const handleRepsChange = (index, val) => {
      let data = [...exersizes];
      data[index].reps = val;
      setExersizes(data);
    };

    const handleWeightChange = (index, val) => {
      let data = [...exersizes];
      data[index].weight = val;
      setExersizes(data);
    };

    const addExersize = () => {
      let newExersize = {
        id: uuid.v4(),
        exersize: "",
        sets: "",
        reps: "",
        weight: "",
      };
      setExersizes([...exersizes, newExersize]);
    };

    const removeExersize = (index) => {
      let data = [...exersizes];
      data.splice(index, 1);
      setExersizes(data);
    };

    return submitLoading ? (
      <View />
    ) : (
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
            {exersizes.map((item, index) => {
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
                    {" "}
                    {index + 1}.
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
                      value={item.exersize}
                      placeholder="exersize"
                      onChangeText={(val) => handleExersizeChange(index, val)}
                      style={{
                        //margin: 5,
                        borderWidth: 1,
                        padding: 5,
                        borderColor: "white",
                        borderRadius: 10,
                        color: "white",
                        fontSize: 15,
                        width: "40%",
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
                        width: "12%",
                      }}
                      textAlign="center"
                      keyboardType="number-pad"
                    />
                    <TextInput
                      value={item.reps}
                      placeholder="Reps"
                      onChangeText={(val) => handleRepsChange(index, val)}
                      style={{
                        //margin: 5,
                        borderWidth: 1,
                        padding: 5,
                        borderColor: "white",
                        borderRadius: 10,
                        color: "white",
                        fontSize: 15,
                        width: "13%",
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
                        width: "17%",
                        marginRight: 5,
                      }}
                      textAlign="center"
                      keyboardType="numbers-and-punctuation"
                    />
                    <TouchableOpacity
                      onPress={() => {
                        removeExersize(index);
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
              onPress={addExersize}
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
            <DayComponent
              day="Monday"
              ref={compRef0}
              exersizes={mondayExersizes}
            />
            <DayComponent
              day="Tuesday"
              ref={compRef1}
              exersizes={tuesdayExersizes}
            />
            <DayComponent
              day="Wednesday"
              ref={compRef2}
              exersizes={wednesdayExersizes}
            />
            <DayComponent
              day="Thursday"
              ref={compRef3}
              exersizes={thursdayExersizes}
            />
            <DayComponent
              day="Friday"
              ref={compRef4}
              exersizes={fridayExersizes}
            />
            <DayComponent
              day="Saturday"
              ref={compRef5}
              exersizes={saturdayExersizes}
            />
            <DayComponent
              day="Sunday"
              ref={compRef6}
              exersizes={sundayExersizes}
            />
            {submitLoading ? (
              <ActivityIndicator size="large" />
            ) : (
              <TouchableOpacity
                onPress={submitPress}
                style={{
                  borderWidth: 1,
                  borderColor: "grey",
                  padding: 5,
                  borderRadius: 20,
                  width: "50%",
                  alignSelf: "center",
                  backgroundColor: colors.primary,
                  marginBottom: 20,
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 30, textAlign: "center" }}
                >
                  Submit
                </Text>
              </TouchableOpacity>
            )}
          </View>
        }
        nav={props.navigation}
      />
    </View>
  );
};

export default FitnessEdit;
