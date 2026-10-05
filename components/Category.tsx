import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CategoryProps {
  catName: string;
  backgroundColor: string;
  data: any[];
  onRemove: (item: any) => void;
  onEdit?: (item: any) => void;
  onCross: (item: any) => void;
  crossedUUIDs: string[];
}

const Category = ({ catName, backgroundColor, data, onRemove, onEdit, onCross, crossedUUIDs }: CategoryProps) => {
  return (
    <View style={styles.container}>
      <View style={[styles.nameContainer, { backgroundColor: backgroundColor }]}>
        <Text style={styles.nameText}>{catName}</Text>
      </View>
      <View style={styles.dataContainer}>
        <View style={styles.dataTextContainer}>
          {data.map((item, index) => {
            return (
              <View key={index}>
                <View style={styles.dataItemContainer}>
                  <TouchableOpacity
                    onLongPress={() => {
                      if (onEdit) {
                        onEdit(item);
                      }
                    }}
                    onPress={() => {
                      onCross(item);
                    }}
                    style={styles.dataItem}
                  >
                    <Text
                      style={[
                        styles.dataText,
                        {
                          textDecorationLine: crossedUUIDs.includes(item.id) ? "line-through" : "none",
                          opacity: crossedUUIDs.includes(item.id) ? 0.2 : 1,
                        },
                      ]}
                    >
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.dataBtnContainer}>
                    <TouchableOpacity
                      onPress={() => {
                        onRemove(item);
                      }}
                      style={styles.dataBtn}
                    >
                      <AntDesign name="minus-circle" size={20} color="red" />
                    </TouchableOpacity>
                  </View>
                </View>
                {data.length === index + 1 ? undefined : <View style={styles.divider} />}
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: "center",
  },
  nameContainer: {
    width: "60%",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: -10,
  },
  nameText: {
    fontSize: 20,
    marginBottom: 10,
    color: "white",
  },
  dataContainer: {
    alignItems: "flex-start",
    width: "90%",
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 20,
  },
  dataTextContainer: {
    width: "94%",
    marginLeft: 20,
  },
  dataItemContainer: {
    flexDirection: "row",
    width: "100%",
  },
  dataItem: {
    flex: 1,
    width: "100%",
  },
  dataText: {
    fontSize: 25,
    marginTop: 10,
    marginBottom: 10,
  },
  dataBtnContainer: {
    justifyContent: "center",
    alignItems: "flex-end",
  },
  dataBtn: {
    marginRight: 10,
  },
  divider: {
    backgroundColor: "#808080",
    height: StyleSheet.hairlineWidth,
    width: "100%",
    alignSelf: "flex-start",
  },
});
