import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserSummary, PayBackExpenseById } from "../services/Handler";
import { Plus, Receipt } from "lucide-react";
function PayBack() {
  const username = useSelector((state) => state.user.username);
  const [expenses, setExpenses] = useState([]);
  console.log(username);
  useEffect(() => {
    async function f() {
      const res = await getUserSummary(username);
      setExpenses(res);
    }
    f();
  }, []);
  async function PayBackExpense(id) {
    const res = await PayBackExpenseById(id, username);
    if (res.status == "success") {
      console.log("ok");
      setExpenses((expenses) =>
        expenses.filter((expense) => !(expense.expense_id === id))
      );
    } else {
      console.log("not ok");
    }
  }
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Pay</h2>
        <button className="flex items-center px-4 py-2 space-x-2 text-white transition-all duration-200 transform shadow-lg bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl hover:from-blue-600 hover:to-cyan-600 hover:shadow-xl hover:scale-105">
          <Plus className="w-4 h-4" />
          <span>Add Expense</span>
        </button>
      </div>
      <div className="space-y-4">
        {expenses.map((expense) => {
          if (expense.amount_to_be_paid <= 0) return;
          return (
            <div
              key={expense.id}
              className="p-6 transition-all duration-200 bg-white border shadow-sm rounded-2xl hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      expense.category === "food"
                        ? "bg-orange-100 text-orange-600"
                        : expense.category === "accommodation"
                        ? "bg-purple-100 text-purple-600"
                        : expense.category === "housing"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <Receipt className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {expense.description}
                    </h3>
                    <p className="text-sm text-gray-500"></p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">
                    ${Math.abs(expense.amount_to_be_paid).toFixed(2)}
                  </p>
                  <button
                    className="flex items-center text-white transition-all duration-200 transform bg-gradient-to-r from-red-500 to-orange-500 rounded-bl-2xl rounded-tl-2xl hover:from-green-600 hover:to-cyan-600 hover:shadow-xl hover:scale-101"
                    onClick={() => {
                      // console.log(expense);
                      PayBackExpense(expense.expense_id);
                    }}
                  >
                    {" "}
                    PAY BACK
                  </button>
                  <p className="text-sm text-gray-500 capitalize">
                    {/* {expense.category} */}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PayBack;
