import { useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import colors from "../../constants/colors";
import groceryCategories from "../../constants/groceryCategories";
import { Grocery } from "../../types/grocery";
import { useGlobalContext } from "../../store/GlobalContext";

// Custom Components
import PageContainer from "../../components/PageContainer";
import Category from "../../components/Category";
import GroceryModal from "../../components/GroceryModal";
import ClearAll from "../../components/ClearAll";

const GroceryListScreen = () => {
  const { groceryList, updateGroceryList } = useGlobalContext();
  const { crossedGroceryUUIDs, updateCrossedGroceryUUIDs } = useGlobalContext();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedGrocery, setSelectedGrocery] = useState<Grocery | undefined>(undefined);

  const modalKey = useRef(0);

  const backgroundColor = (cat: string) => {
    switch (cat) {
      case groceryCategories.produce: {
        return "green";
      }
      case groceryCategories.fruit: {
        return "#FF00FF";
      }
      case groceryCategories.fish: {
        return colors.primaryBlue;
      }
      case groceryCategories.meat: {
        return "red";
      }
      case groceryCategories.grain:
      case "Grains": {
        return "tan";
      }
      case groceryCategories.dairy: {
        return "teal";
      }
      case groceryCategories.condiment:
      case "Condiments": {
        return "#f5ce42";
      }
      case groceryCategories.snack:
      case "Snacks": {
        return "#f27e1f";
      }
      case groceryCategories.frozen: {
        return "#3b5b73";
      }
      case groceryCategories.drink:
      case "Drinks": {
        return "#6D4C41";
      }
      case groceryCategories.nonFood: {
        return "grey";
      }
      default: {
        return "#EFEFEF";
      }
    }
  };

  const crossGrocery = (passedGrocery: Grocery) => {
    updateCrossedGroceryUUIDs((prev) => {
      if (!prev.includes(passedGrocery.id)) {
        return [...prev, passedGrocery.id];
      } else {
        return prev.filter((currId) => passedGrocery.id !== currId);
      }
    });
  };

  const editGrocery = (passedGrocery: Grocery) => {
    setSelectedGrocery(passedGrocery);
    modalKey.current = modalKey.current + 1;
    setModalVisible(true);
  };

  const removeGrocery = (passedGrocery: Grocery) => {
    updateGroceryList((prev) => prev.filter((curr) => curr.id !== passedGrocery.id));
    updateCrossedGroceryUUIDs((prev) => {
      if (prev.includes(passedGrocery.id)) {
        return prev.filter((currId) => passedGrocery.id !== currId);
      }

      return prev;
    });
  };

  const clear = () => {
    updateGroceryList([]);
    updateCrossedGroceryUUIDs([]);
  };

  const produceList = groceryList.filter((currGrocery) => currGrocery.category === groceryCategories.produce);
  const fruitList = groceryList.filter((currGrocery) => currGrocery.category === groceryCategories.fruit);
  const fishList = groceryList.filter((currGrocery) => currGrocery.category === groceryCategories.fish);
  const meatList = groceryList.filter((currGrocery) => currGrocery.category === groceryCategories.meat);
  const grainsList = groceryList.filter((currGrocery) => currGrocery.category === groceryCategories.grain);
  const dairyList = groceryList.filter((currGrocery) => currGrocery.category === groceryCategories.dairy);
  const condimentsList = groceryList.filter((currGrocery) => currGrocery.category === groceryCategories.condiment);
  const snacksList = groceryList.filter((currGrocery) => currGrocery.category === groceryCategories.snack);
  const frozenList = groceryList.filter((currGrocery) => currGrocery.category === groceryCategories.frozen);
  const drinksList = groceryList.filter((currGrocery) => currGrocery.category === groceryCategories.drink);
  const nonFoodList = groceryList.filter((currGrocery) => currGrocery.category === groceryCategories.nonFood);

  const categoryLists = [
    { name: "Produce", list: produceList },
    { name: "Fruit", list: fruitList },
    { name: "Fish", list: fishList },
    { name: "Meat", list: meatList },
    { name: "Grains", list: grainsList },
    { name: "Dairy", list: dairyList },
    { name: "Condiments", list: condimentsList },
    { name: "Snacks", list: snacksList },
    { name: "Frozen", list: frozenList },
    { name: "Drinks", list: drinksList },
    { name: "Non Food", list: nonFoodList },
  ];

  return (
    <View style={styles.container}>
      <GroceryModal
        key={modalKey.current}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        selectedGrocery={selectedGrocery}
        backgroundColor={backgroundColor}
      />

      <PageContainer
        headerText="List"
        listLength={groceryList.length}
        headerActionPress={() => {
          modalKey.current = modalKey.current + 1;
          setSelectedGrocery(undefined);
          setModalVisible(true);
        }}
        scrollDisabled={groceryList.length === 0}
      >
        <ClearAll onPress={clear} disabled={groceryList.length === 0} />

        {categoryLists
          .filter((curr) => curr.list.length > 0)
          .map((curr) => {
            return (
              <Category
                key={curr.name}
                catName={curr.name}
                data={curr.list}
                onRemove={removeGrocery}
                onEdit={editGrocery}
                onCross={crossGrocery}
                crossedUUIDs={crossedGroceryUUIDs}
                backgroundColor={backgroundColor(curr.name)}
              />
            );
          })}
      </PageContainer>
    </View>
  );
};

export default GroceryListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
