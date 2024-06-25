import { FlatList, Text } from "react-native";
import ExpenseItem from "./ExpenseItem";

// Adjusted to directly receive the item
function renderExpenseItem(item) {
  return <ExpenseItem {...item} />;
}

function ExpensesList({ expenses }) {
  return (
    <FlatList
      data={expenses}
      renderItem={({ item }) => renderExpenseItem(item)}
      keyExtractor={(item) => item.id}
    />
  );
}

export default ExpensesList;
