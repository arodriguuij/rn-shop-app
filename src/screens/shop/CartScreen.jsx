import React from "react";
import { View, Text, FlatList, StyleSheet, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../constants/Colors";
import CartItem from "../../components/shop/CartItem";
import * as cartActions from "../../store/actions/cart.actions";
import * as orderActions from "../../store/actions/order.actions";
import Card from "../../components/UI/Card";

const CartScreen = () => {
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();

  const items = useSelector((state) => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{" "}
          <Text style={styles.ammount}>
            {Math.round(totalAmount.toFixed(2) * 100) / 100}€
          </Text>
        </Text>
        <Button
          color={Colors.accent}
          title="Order Now "
          onPress={() => dispatch(orderActions.addOrder(items, totalAmount))}
          disabled={items.length === 0}
        />
      </Card>
      <FlatList
        data={items}
        keyExtractor={(item) => item.productId}
        renderItem={({ item }) => {
          return (
            <CartItem
              {...item}
              deletable
              onRemove={() =>
                dispatch(cartActions.removeFromCart(item.productId))
              }
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 20,
    padding: 10
  },
  summaryText: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  ammount: {
    color: Colors.primary,
  },
});

export default CartScreen;
