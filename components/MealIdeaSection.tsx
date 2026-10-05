import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

interface MealIdeaSectionProps {
  children: ReactNode;
  sectionLabel: string;
}

const MealIdeaSection = ({ children, sectionLabel }: MealIdeaSectionProps) => {
  return (
    <View style={styles.sectionContainer}>
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>{sectionLabel}</Text>
      </View>
      {children}
    </View>
  );
};

export default MealIdeaSection;

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 20,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
    justifyContent: "space-between",
  },
  labelText: {
    fontWeight: "500",
    fontSize: 20,
  },
});
