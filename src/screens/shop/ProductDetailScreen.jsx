import React, { useEffect } from "react";
import {
  Button,
  ScrollView,
  Text,
  View,
  Image,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../constants/Colors";
import * as cartActions from "../../store/actions/cart.actions";

const ProductDetailScreen = ({ navigation, route }) => {
  const productId = route.params.productId;
  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((product) => product.id === productId)
  );
  const { title } = selectedProduct;

  const dispatch = useDispatch();

  useEffect(() => {
    navigation.setParams({
      headerTitle: title,
    });
  }, [title]);

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
      <View style={styles.actions}>
        <Button
          color={Colors.primary}
          title="Add to Cart "
          onPress={() => dispatch(cartActions.addToCart(selectedProduct))}
        />
      </View>
      <Text style={styles.price}>{selectedProduct.price.toFixed(2)}€</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  price: {
    fontSize: 20,
    color: "#888",
    marginVertical: 20,
    textAlign: "center",
    fontFamily: "open-sans-bold",
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 20,
    fontFamily: "open-sans",
  },
  actions: {
    marginVertical: 10,
    alignItems: "center",
  },
});

export default ProductDetailScreen;
