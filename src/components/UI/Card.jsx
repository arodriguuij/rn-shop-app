import React from "react";
import { View, StyleSheet } from "react-native";

const Card = ({ children, style }) => (
  <View style={{ ...styles.card, ...style }}>{children}</View>
);

const styles = StyleSheet.create({
  card: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { wid: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
  },
});

export default Card;
