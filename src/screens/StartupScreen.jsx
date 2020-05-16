import React, { useEffect } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  AsyncStorage,
} from "react-native";
import Colors from "../constants/Colors";
import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth.actions";
import { useSelector } from "react-redux";

const StartupScreen = ({ navigation }) => {
  const isAuth = useSelector((state) => !!state.auth.token);

  const dispatch = useDispatch();
  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        navigation.navigate("AuthScreen", {});
        return;
      }

      const transformedData = JSON.parse(userData);
      const { token, userId, expirationDate } = transformedData;
      const expirationDateFormated = new Date(expirationDate);

      if (expirationDateFormated <= new Date() || !token || !userId) {
        navigation.navigate("AuthScreen");
        return;
      }
      const expirationTime =
        expirationDateFormated.getTime() - new Date().getTime();

      navigation.navigate("DrawerScreen");
      dispatch(authActions.authenticate(userId, token, expirationTime));
    };
    tryLogin();
  }, [dispatch]);

  /*   useEffect(() => {
    if (!isAuth) {
      navigation.navigate("AuthScreen");
    }
  }, [isAuth]); */

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StartupScreen;
