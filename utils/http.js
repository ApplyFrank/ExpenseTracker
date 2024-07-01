import axios from "axios";

export function storeExpense(expenseData) {
  axios.post(
    "https://udemy-rn-2522a-default-rtdb.firebaseio.com/expenses.json",
    expenseData
  );
}
