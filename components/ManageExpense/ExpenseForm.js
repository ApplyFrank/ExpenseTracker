import { View, StyleSheet, Text, Alert } from "react-native";
import { useState } from "react";
import Input from "./Input";
import Button from "../UI/Button";
import { getFormatedDate } from "../../utils/date";

function ExpenseForm({ submitLabel, onCancel, onSubmit, defaultExpense }) {
  // NOTE instead of using 3 useState, we can use useState with an object.
  // then using JS syntax to set the key [inputIdentifier]: enteredValue
  const [input, setInput] = useState({
    amount: {
      value: defaultExpense ? defaultExpense.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultExpense ? getFormatedDate(defaultExpense.date) : "",
      isValid: true,
    },
    description: {
      value: defaultExpense ? defaultExpense.description : "",
      isValid: true,
    },
  });

  // when using .bind this is passed in as a first, then the second param is the first param in the function signature ie. inputIdentifier
  // enteredValue is automatically pass in thru reactNative
  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInput((curInput) => {
      return {
        ...curInput,
        [inputIdentifier]: enteredValue,
      };
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +input.amount.value,
      date: new Date(input.date.value),
      description: input.description.value,
    };

    const isAmountValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const isDateValid = expenseData.date.toString() !== "Invalid Date";
    const isDescriptionValid = expenseData.description.trim().length > 0;

    if (!isAmountValid || !isDateValid || !isDescriptionValid) {
      setInput({
        amount: { value: expenseData.amount, isValid: isAmountValid },
        date: { value: expenseData.date, isValid: isDateValid },
        description: {
          value: expenseData.description,
          isValid: isDescriptionValid,
        },
      });
      return;
    }

    onSubmit(expenseData);
  }
  const isFormValid =
    input.amount.isValid && input.date.isValid && input.description.isValid;
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
              value: input.amount.value,
            }}
          />
          <Input
            style={styles.rowInput}
            label="Date"
            textInputConfig={{
              placeholder: "YYYY-MM-DD",
              maxLength: 10,
              onChangeText: inputChangedHandler.bind(this, "date"),
              value: input.date.value,
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
            value: input.description.value,
          }}
        />
      </View>
      {!isFormValid && <Text>YOUR FORM HAS INVALID BRUH</Text>}
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
