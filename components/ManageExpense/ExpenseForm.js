import { View, StyleSheet, Text } from "react-native";
import Input from "./Input";

function ExpenseForm() {
  function amountChangedHandler() {}
  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: amountChangedHandler,
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onCHangeText: () => {},
          }}
        />
      </View>
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          //autoCapitalize: "none",
          //autoCorrect: false
        }}
      />
    </View>
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
});
