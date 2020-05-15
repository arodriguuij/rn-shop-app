import React from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import Card from "../UI/Card";

const ProductItem = ({ title, price, imageUrl, onSelect, children }) => {
  let TouchableCpm = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCpm = TouchableNativeFeedback;
  }
  return (
    <Card style={styles.product}>
      <View style={styles.touchable}>
        <TouchableCpm onPress={onSelect} useForeground>
          <View>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: imageUrl }} />
            </View>
            <View style={styles.details}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.price}>{price.toFixed(2)}€</Text>
            </View>
            <View style={styles.actions}>{children}</View>
          </View>
        </TouchableCpm>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  product: {
    backgroundColor: "white",
    height: 300,
    margin: 20,
    overflow: "hidden",
  },
  imageContainer: {
    width: "100%",
    height: "60%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 18,
    marginVertical: 2,
    fontFamily: "open-sans-bold",
  },
  price: {
    fontSize: 14,
    color: "#888",
    fontFamily: "open-sans",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "23%",
    paddingHorizontal: 20,
  },
  details: {
    alignItems: "center",
    height: "17%",
    padding: 10,
  },
  touchable: {
    overflow: "hidden",
    borderRadius: 10,
  },
});

export default ProductItem;
