import React, { useEffect, useState, useCallback, useReducer } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Platform,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import * as productsAction from "../../store/actions/products.actions";
import Input from "../../components/UI/Input";
import Colors from "../../constants/Colors";

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

const EditProductScreen = ({ navigation, route }) => {
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState();

  const dispatch = useDispatch();
  const id = route.params?.id;
  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((product) => product.id === id)
  );

  const initialState = {
    inputValues: {
      title: editedProduct ? editedProduct.title : "",
      imageUrl: editedProduct ? editedProduct.imageUrl : "",
      description: editedProduct ? editedProduct.description : "",
      price: "",
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false,
  };
  const [formState, dispatchFormState] = useReducer(formReducer, initialState);

  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert("Wrong input!", "Please check the errors in the form.", [
        { text: "Okay" },
      ]);
      return;
    }
    setError(null);
    setIsloading(true);
    try {
      if (editedProduct) {
        await dispatch(
          productsAction.updateProduct(
            id,
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.imageUrl
          )
        );
      } else {
        await dispatch(
          productsAction.createProduct(
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.imageUrl,
            parseFloat(formState.inputValues.price)
          )
        );
      }
      navigation.goBack();
    } catch (error) {
      setError(error.message);
    }

    setIsloading(false);
  }, [navigation, dispatch, id, formState]);

  useEffect(() => {
    if (error) Alert.alert("An error occurrend!", error, [{ text: "Oaky" }]);
  }, [error]);

  useEffect(() => {
    navigation.setParams({
      headerTitle: id ? "Edit Product" : "Add Product",
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Save"
            iconName={Platform.OS === "IOS" ? "md-checkmark" : "ios-checkmark"}
            iconSize={23}
            onPress={submitHandler}
          />
        </HeaderButtons>
      ),
    });
  }, [id, submitHandler, navigation]);

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

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input
            id="title"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            label="Title"
            returnKeyType="next"
            errorText="Please enter a valid title!"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.title : ""}
            initialValid={!!editedProduct}
            required
          />
          <Input
            id="imageUrl"
            label="Image Url"
            errorText="Please enter a valid image url!"
            keyboardType="default"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.imageUrl : ""}
            initialValid={!!editedProduct}
            required
          />
          {editedProduct ? null : (
            <Input
              id="price"
              label="Price"
              errorText="Please enter a valid price!"
              onInputChange={inputChangeHandler}
              keyboardType="decimal-pad"
              returnKeyType="next"
              required
              min={0.1}
            />
          )}
          <Input
            id="description"
            label="Description"
            errorText="Please enter a valid description!"
            onInputChange={inputChangeHandler}
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            multiline
            numberOfLines={3}
            initialValue={editedProduct ? editedProduct.description : ""}
            initialValid={!!editedProduct}
            required
            minLength={5}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default EditProductScreen;
