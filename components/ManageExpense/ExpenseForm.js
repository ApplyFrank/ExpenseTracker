import { View, StyleSheet, Text, Alert } from "react-native";
import { useState } from "react";
import Input from "./Input";
import Button from "../UI/Button";
import { getFormatedDate } from "../../utils/date";
import { GlobalStyles } from "../../constants/styles";

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
        [inputIdentifier]: { value: enteredValue, isValid: true },
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
      // NOTE keep in mind you have to use the existing data curInputs instead
      // of the data coming in 'expenseData'
      setInput((curInputs) => {
        return {
          amount: { value: curInputs.amount.value, isValid: isAmountValid },
          date: { value: curInputs.date.value, isValid: isDateValid },
          description: {
            value: curInputs.description.value,
            isValid: isDescriptionValid,
          },
        };
      });
      return;
    }

    onSubmit(expenseData);
  }
  const formIsInvalid =
    !input.amount.isValid || !input.date.isValid || !input.description.isValid;
  return (
    <>
      <View style={styles.form}>
        <Text style={styles.title}>Your Expense</Text>
        <View style={styles.inputsRow}>
          <Input
            style={styles.rowInput}
            label="Amount"
            invalid={!input.amount.isValid}
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
            invalid={!input.date.isValid}
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
          invalid={!input.description.isValid}
          textInputConfig={{
            multiline: true,
            //autoCapitalize: "none",
            //autoCorrect: false
            onChangeText: inputChangedHandler.bind(this, "description"),
            value: input.description.value,
          }}
        />
      </View>
      {formIsInvalid && (
        <Text style={styles.errorText}>YOUR FORM HAS INVALID BRUH</Text>
      )}
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
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
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
