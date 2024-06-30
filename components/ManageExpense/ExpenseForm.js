import { View, StyleSheet, Text } from "react-native";
import { useState } from "react";
import Input from "./Input";
import Button from "../UI/Button";

function ExpenseForm({ submitLabel, onCancel }) {
  // NOTE instead of using 3 useState, we can use useState with an object.
  // then using JS syntax to set the key [inputIdentifier]: enteredValue
  const [inputValues, setInputValues] = useState({
    amount: "",
    date: "",
    description: "",
  });

  // when using .bind this is passed in as a first, then the second param is the first param in the function signature ie. inputIdentifier
  // enteredValue is automatically pass in thru reactNative
  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputValues((curInputValues) => {
      return {
        ...curInputValues,
        [inputIdentifier]: enteredValue,
      };
    });
  }

  function submitHandler() {}
  return (
    <>
      <View style={styles.form}>
        <Text style={styles.title}>Your Expense</Text>
        <View style={styles.inputsRow}>
          <Input
            style={styles.rowInput}
            label="Amount"
            textInputConfig={{
              keyboardType: "decimal-pad",
              // reconfigure a function for future execution using .bind
              onChangeText: inputChangedHandler.bind(this, "amount"),
              value: inputValues.amount,
            }}
          />
          <Input
            style={styles.rowInput}
            label="Date"
            textInputConfig={{
              placeholder: "YYYY-MM-DD",
              maxLength: 10,
              onChangeText: inputChangedHandler.bind(this, "date"),
              value: inputValues.date,
            }}
          />
        </View>
        <Input
          label="Description"
          textInputConfig={{
            multiline: true,
            //autoCapitalize: "none",
            //autoCorrect: false
            onChangeText: inputChangedHandler.bind(this, "description"),
            value: inputValues.description,
          }}
        />
      </View>
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitLabel}
        </Button>
      </View>
    </>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginVertical: 24,
  },
  inputsRow: {
    flexDirection: "row",
    // NOTE when it doesn't take up all the space you can add flex: 1
    // but if it breaks the layout flow, you can just pass in the style instead of setting it in Input.js
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
