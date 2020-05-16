import React, { useEffect } from "react";
import { FlatList, Platform, Button, Alert, Text, View } from "react-native";
import ProductItem from "../../components/shop/ProductItem";
import { useSelector, useDispatch } from "react-redux";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import Colors from "../../constants/Colors";
import * as productsActions from "../../store/actions/products.actions";

const UserProductsScreen = ({ navigation }) => {
  const userProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();

  const deleteHandler = (id) => {
    Alert.alert("Are you sure?", "Do you really want to delete this item?", [
      {
        text: "No",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => dispatch(productsActions.deleteProduct(id)),
        style: "destructive",
      },
    ]);
  };

  useEffect(() => {
    navigation.setParams({
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Menu"
            iconName={Platform.OS === "IOS" ? "md-menu" : "ios-menu"}
            onPress={() => navigation.toggleDrawer()}
          />
        </HeaderButtons>
      ),
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Add"
            iconName={Platform.OS === "IOS" ? "md-create" : "ios-create"}
            onPress={() => navigation.navigate("EditProductScreen")}
          />
        </HeaderButtons>
      ),
    });
  }, []);

  const editProductHandler = (id) => {
    navigation.navigate("EditProductScreen", { id });
  };

  if (userProducts.length === 0) {
    return (
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <Text>No ptoducts found, maybe start creating some!</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ProductItem {...item} onSelect={() => editProductHandler(item.id)}>
          <Button
            color={Colors.primary}
            title="Edit "
            onPress={() => editProductHandler(item.id)}
          />
          <Button
            color={Colors.primary}
            title="Delete "
            onPress={() => deleteHandler(item.id)}
          />
        </ProductItem>
      )}
    />
  );
};

export default UserProductsScreen;
