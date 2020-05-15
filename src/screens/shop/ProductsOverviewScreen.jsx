import React, { useEffect, useState, useCallback } from "react";
import {
  FlatList,
  Platform,
  Button,
  ActivityIndicator,
  View,
  StyleSheet,
  Text,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from "../../store/actions/cart.actions";
import * as productsActions from "../../store/actions/products.actions";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import Colors from "../../constants/Colors";

const ProductOverviewScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  const loadProducts = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(productsActions.fetchProducts());
    } catch (error) {
      setError(error.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setIsLoading]);

  //Firts Time
  useEffect(() => {
    setIsLoading(true);
    loadProducts().then(() => setIsLoading(false));
  }, [loadProducts]);

  //Seconcd Time and following
  useEffect(() => {
    const willFocusSub = navigation.addListener("willFocus", loadProducts);
    return () => {
      if (willFocusSub) willFocusSub.remove();
    };
  }, [loadProducts, navigation]);

  useEffect(() => {
    navigation.setParams({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Cart"
            iconName={Platform.OS === "IOS" ? "md-cart" : "ios-cart"}
            onPress={() => navigation.navigate("Cart", {})}
          />
        </HeaderButtons>
      ),
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Menu"
            iconName={Platform.OS === "IOS" ? "md-menu" : "ios-menu"}
            onPress={() => navigation.toggleDrawer()}
          />
        </HeaderButtons>
      ),
    });
  }, [Platform, navigation]);

  const selectItemHandler = (id) => {
    navigation.navigate("ProductDetail", { productId: id });
  };

  if (error)
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button
          title="Try again "
          onPress={loadProducts}
          color={Colors.primary}
        />
      </View>
    );

  if (isLoading)
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );

  if (!isLoading && products.length === 0)
    return (
      <View style={styles.centered}>
        <Text>No products found. Maybe start adding some!</Text>
      </View>
    );

  return (
    <FlatList
      onRefresh={loadProducts}
      refreshing={isRefreshing}
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ProductItem {...item} onSelect={() => selectItemHandler(item.id)}>
          <Button
            color={Colors.primary}
            title="View Details "
            onPress={() => selectItemHandler(item.id)}
          />
          <Button
            color={Colors.primary}
            title="Add To Cart "
            onPress={() => dispatch(cartActions.addToCart(item))}
          />
        </ProductItem>
      )}
    />
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProductOverviewScreen;
