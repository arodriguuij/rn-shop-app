import React, { useEffect } from "react";
import { FlatList, Text, Platform } from "react-native";
import { useSelector } from "react-redux";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import OrderItem from "../../components/shop/OrderItem";

const OrdersScreen = ({ navigation }) => {
  const orders = useSelector((state) => state.orders.orders);

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

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <OrderItem {...item} />}
    />
  );
};

export default OrdersScreen;
