import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProductOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import StartupScreen from "../screens/StartupScreen";
import AuthScreen from "../screens/user/AuthScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import CartScreen from "../screens/shop/CartScreen";
import Colors from "../constants/Colors";
import { Platform, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth.actions";

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: () => (Platform.OS === "IOS" ? Colors.primary : ""),
  },
  headerTintColor: Platform.OS === "IOS" ? "white" : Colors.primary,
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
};

const ProductStack = createStackNavigator();
const ProductStackScreen = () => (
  <ProductStack.Navigator>
    <ProductStack.Screen
      name="ProductOverview"
      component={ProductOverviewScreen}
      options={({ route }) => {
        return {
          ...defaultNavigationOptions,
          headerTitle: "All products",
          headerRight: route.params?.headerRight,
          headerLeft: route.params?.headerLeft,
        };
      }}
    />
    <ProductStack.Screen
      name="ProductDetail"
      component={ProductDetailScreen}
      options={({ route }) => {
        return {
          ...defaultNavigationOptions,
          headerTitle: route.params.headerTitle,
        };
      }}
    />
    <ProductStack.Screen
      name="Cart"
      component={CartScreen}
      options={({ route }) => {
        return {
          ...defaultNavigationOptions,
          headerTitle: "Your Cart",
        };
      }}
    />
  </ProductStack.Navigator>
);

const OrdersStack = createStackNavigator();
const OrdersStackScreen = () => (
  <OrdersStack.Navigator>
    <OrdersStack.Screen
      name="OrdersScreen"
      component={OrdersScreen}
      options={({ route }) => {
        return {
          ...defaultNavigationOptions,
          headerTitle: "Your Orders",
          headerLeft: route.params?.headerLeft,
        };
      }}
    />
  </OrdersStack.Navigator>
);

const UserProductsStack = createStackNavigator();
const UserProductsStackScreen = () => (
  <UserProductsStack.Navigator>
    <UserProductsStack.Screen
      name="UserProductsScreen"
      component={UserProductsScreen}
      options={({ route }) => {
        return {
          ...defaultNavigationOptions,
          headerTitle: "My products",
          headerLeft: route.params?.headerLeft,
          headerRight: route.params?.headerRight,
        };
      }}
    />
    <UserProductsStack.Screen
      name="EditProductScreen"
      component={EditProductScreen}
      options={({ route }) => {
        return {
          ...defaultNavigationOptions,
          headerTitle: route.params?.headerTitle,
          headerRight: route.params?.headerRight,
        };
      }}
    />
  </UserProductsStack.Navigator>
);

function CustomDrawerContent(props) {
  const dispatch = useDispatch();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <Button
        title="Logout "
        color={Colors.primary}
        onPress={() => {
          dispatch(authActions.logout());
        }}
      />
    </DrawerContentScrollView>
  );
}
/* drawerContent={(props) => <CustomDrawerContent {...props} />}
 */
const Drawer = createDrawerNavigator();
const DrawerScreen = () => (
  <Drawer.Navigator>
    <Drawer.Screen
      name="ProductsScreen"
      component={ProductStackScreen}
      options={({ route }) => {
        return {
          drawerIcon: (drawerConfig) => (
            <Ionicons
              name={Platform.OS === "IOS" ? "md-cart" : "ios-cart"}
              size={23}
              color={drawerConfig.headerTintColor}
            />
          ),
        };
      }}
    />
    <Drawer.Screen
      name="Orders"
      component={OrdersStackScreen}
      options={({ route }) => {
        return {
          drawerIcon: (drawerConfig) => (
            <Ionicons
              name={Platform.OS === "IOS" ? "md-list" : "ios-list"}
              size={23}
              color={drawerConfig.headerTintColor}
            />
          ),
        };
      }}
    />
    <Drawer.Screen
      name="Admin"
      component={UserProductsStackScreen}
      options={({ route }) => {
        return {
          drawerIcon: (drawerConfig) => (
            <Ionicons
              name={Platform.OS === "IOS" ? "md-create" : "ios-create"}
              size={23}
              color={drawerConfig.headerTintColor}
            />
          ),
        };
      }}
    />
  </Drawer.Navigator>
);


const RootStack = createStackNavigator();
const RootStackScreen = () => (
  <RootStack.Navigator headerMode="none">
    <RootStack.Screen name="StartupScreen" component={StartupScreen} />
    <RootStack.Screen name="DrawerScreen" component={DrawerScreen} />
    <RootStack.Screen name="AuthScreen" component={AuthScreen} />
  </RootStack.Navigator>
);

const ShopNavigation = () => {
  return (
    <NavigationContainer>
      <RootStackScreen />
    </NavigationContainer>
  );
};

export default ShopNavigation;
