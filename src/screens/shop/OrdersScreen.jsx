import React, { useEffect, useState } from "react";
import {
  FlatList,
  Platform,
  ActivityIndicator,
  View,
  StyleSheet,
} from "react-native";
import { useSelector } from "react-redux";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import * as orderActions from "../../store/actions/order.actions";
import OrderItem from "../../components/shop/OrderItem";
import { useDispatch } from "react-redux";
import Colors from "../../constants/Colors";

const OrdersScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const orders = useSelector((state) => state.orders.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(orderActions.fetchOrders()).then(setIsLoading(false));
  }, [dispatch]);

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
    });
  }, [Platform, navigation]);

  if (isLoading)
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <OrderItem {...item} />}
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
export default OrdersScreen;
