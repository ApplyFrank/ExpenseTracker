import { View } from "react-native";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";

const DUMMY_EXPENSES = [
  {
    id: "1",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date("2021-12-19"),
  },
  {
    id: "2",
    description: "A pair of trousers",
    amount: 59.99,
    date: new Date("2022-01-05"),
  },
  {
    id: "3",
    description: "Some bananas",
    amount: 5.99,
    date: new Date("2021-12-01"),
  },
  {
    id: "4",
    description: "A book",
    amount: 5.99,
    date: new Date("2022-02-19"),
  },
  {
    id: "5",
    description: "Another book",
    amount: 18.59,
    date: new Date("2022-02-18"),
  },
];

function ExpensesOutput({ expenses, expensesPeriod }) {
  return (
    <View>
      <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
  );
}

export default ExpensesOutput;
