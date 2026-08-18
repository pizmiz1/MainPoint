import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Category = ({ catName, backgroundColor, groceries, onRemove, onEdit, onCross, crossedGroceryUUIDs }) => {
  return (
    <View style={{ marginTop: 20, alignItems: "center" }}>
      <View
        style={{
          width: "60%",
          alignItems: "center",
          backgroundColor: backgroundColor,
          borderRadius: 10,
          marginBottom: -10,
        }}
      >
        <Text style={{ fontSize: 20, marginBottom: 10, color: "white" }}>{catName}</Text>
      </View>
      <View
        style={{
          alignItems: "flex-start",
          width: "90%",
          alignSelf: "center",
          backgroundColor: "white",
          borderRadius: 20,
        }}
      >
        <View style={{ width: "94%", marginLeft: 20 }}>
          {groceries.map((item, index) => {
            return (
              <View key={index}>
                <View style={{ flexDirection: "row", width: "100%" }}>
                  <TouchableOpacity
                    onLongPress={() => {
                      onEdit(item);
                    }}
                    onPress={() => {
                      onCross(item);
                    }}
                    style={{ flex: 1, width: "100%" }}
                  >
                    <Text
                      style={{
                        fontSize: 25,
                        marginTop: 10,
                        marginBottom: 10,
                        textDecorationLine: crossedGroceryUUIDs.includes(item.id) ? "line-through" : "none",
                        opacity: crossedGroceryUUIDs.includes(item.id) ? 0.2 : 1,
                      }}
                    >
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "flex-end",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        onRemove(item);
                      }}
                      style={{
                        marginRight: 10,
                      }}
                    >
                      <AntDesign name="minus-circle" size={20} color="red" />
                    </TouchableOpacity>
                  </View>
                </View>
                {groceries.length === index + 1 ? undefined : (
                  <View
                    style={{
                      backgroundColor: "#808080",
                      height: StyleSheet.hairlineWidth,
                      width: "100%",
                      alignSelf: "flex-start",
                    }}
                  />
                )}
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default Category;
