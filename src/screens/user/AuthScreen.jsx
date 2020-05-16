import React, { useEffect, useReducer, useCallback, useState } from "react";
import {
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  ActivityIndicator,
  View,
  Alert,
} from "react-native";
import Input from "../../components/UI/Input";
import Card from "../../components/UI/Card";
import Colors from "../../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import * as authActions from "../../store/actions/auth.actions";
import { useDispatch } from "react-redux";

const FORM_INPUT_UPDATE = "UPDATE";
const formReducer = (state, action) => {
  switch (action.type) {
    case FORM_INPUT_UPDATE:
      const updatedValues = {
        ...state.inputValues,
        [action.inputName]: action.value,
      };
      const updatedValidities = {
        ...state.inputValidities,
        [action.inputName]: action.isValid,
      };
      let updatedFormIsValid = true;
      for (const key in updatedValidities) {
        updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
      }
      return {
        inputValues: updatedValues,
        inputValidities: updatedValidities,
        formIsValid: updatedFormIsValid,
      };
    default:
      return state;
  }
};

const AuthScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState();
  const initialState = {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  };
  const [formState, dispatchFormState] = useReducer(formReducer, initialState);

  const dispatch = useDispatch();

  const authHandler = async () => {
    let action;
    if (isSignup) {
      action = authActions.signup(
        formState.inputValues.email,
        formState.inputValues.password
      );
    } else {
      action = authActions.login(
        formState.inputValues.email,
        formState.inputValues.password
      );
    }
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      navigation.navigate("DrawerScreen");
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  const inputChangeHandler = useCallback(
    (inputName, value, isValid) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value,
        isValid,
        inputName,
      });
    },
    [dispatchFormState]
  );

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior="padding"
      keyboardVerticalOffset={50}
    >
      <LinearGradient colors={["#ffedff", "#ffe3ff"]} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id="email"
              label="E-Mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Please enter a valid email address."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorText="Please enter a valid password."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
          </ScrollView>
          <View style={styles.buttonsCointainer}>
            {isLoading ? (
              <ActivityIndicator size="small" color={Colors.primary} />
            ) : (
              <Button
                title={isSignup ? "Sign up " : "Login "}
                color={Colors.primary}
                onPress={authHandler}
              />
            )}
          </View>
          <View style={styles.buttonsCointainer}>
            <Button
              title={`Switch to ${isSignup ? "Login" : "Sign Up"}`}
              color={Colors.accent}
              onPress={() => setIsSignup((prevState) => !prevState)}
            />
          </View>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonsCointainer: {
    marginTop: 10,
  },
});

export default AuthScreen;
