import React, { useState } from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import CartItem from "./CartItem";
import Card from "../UI/Card";

const getFormattedDate = (today) => {
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();
  var hour = today.getHours();
  var minu = today.getMinutes();
  var sec = today.getSeconds();

  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  if (minu < 10) {
    minu = "0" + minu;
  }
  if (sec < 10) {
    sec = "0" + sec;
  }
  return dd + "/" + mm + "/" + yyyy + " " + hour + ":" + minu + ":" + sec;
};

const OrderItem = ({ totalAmmount, date, items }) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <Card style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>{totalAmmount.toFixed(2)}€</Text>
        <Text style={styles.date}>{getFormattedDate(date)}</Text>
      </View>
      <Button
        color={Colors.primary}
        title={showDetails ? "Hide Details" : "Show Details"}
        onPress={() => setShowDetails((prevState) => !prevState)}
      />
      {showDetails && (
        <View style={styles.details}>
          {items.map((item) => (
            <CartItem key={item.productId} {...item} />
          ))}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    margin: 20,
    padding: 10,
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  totalAmount: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
  date: {
    fontFamily: "open-sans",
    fontSize: 16,
    color: "#888",
  },
  details: {
    width: "100%",
  },
});

export default OrderItem;
