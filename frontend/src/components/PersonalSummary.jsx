import { TrendingUp, TrendingDown, DollarSign, PieChart } from "lucide-react";
import { useEffect, useState } from "react";
import { getUserSummary } from "../services/Handler";
import { useSelector } from "react-redux";
import { Plus, Users, Receipt } from "lucide-react";
const PersonalSummary = () => {
  const [balance, setBalance] = useState({
    totalOwed: 0,
    totalOwing: 0,
    netBalance: 0,
  });
  const [groupsBrief, setGroupBrief] = useState([]);
  const username = useSelector((state) => state.user.username);

  useEffect(() => {
    let data = { totalOwing: 0, totalOwed: 0 };
    async function f() {
      const res = await getUserSummary(username);
      res.map((statement) => {
        if (statement.amount_to_be_paid > 0) {
          data.totalOwing += Math.abs(statement.amount_to_be_paid);
        } else {
          data.totalOwed += Math.abs(statement.amount_to_be_paid);
        }
      });
      setGroupBrief(res);
      data.netBalance = data.totalOwed - data.totalOwing;
      console.log(res);
      setBalance(data);
    }
    f();
  }, []);
  const isPositive = balance.netBalance >= 0;

  return (
    <div className="space-y-6">
      {/* Net Balance Card */}
      <div
        className={`rounded-2xl p-8 text-white shadow-lg ${
          isPositive
            ? "bg-gradient-to-br from-green-500 to-emerald-600"
            : "bg-gradient-to-br from-red-500 to-pink-600"
        }`}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="mb-2 text-sm font-medium text-white/80">
              Net Balance
            </h3>
            <div className="flex items-center space-x-3">
              <DollarSign className="w-8 h-8" />
              <span className="text-4xl font-bold">
                ${Math.abs(balance.netBalance).toFixed(2)}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl backdrop-blur-sm">
            {isPositive ? (
              <TrendingUp className="w-8 h-8" />
            ) : (
              <TrendingDown className="w-8 h-8" />
            )}
          </div>
        </div>
        <p className="text-white/90">
          {isPositive
            ? "You're owed money overall! 💰"
            : "You owe money overall 💸"}
        </p>
      </div>

      {/* Breakdown Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Amount Owed to You */}
        <div className="p-6 transition-all duration-200 bg-white border shadow-sm rounded-2xl hover:shadow-md">
          <div className="flex items-center mb-4 space-x-4">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">You're Owed</h4>
              <p className="text-2xl font-bold text-green-600">
                ${balance.totalOwed.toFixed(2)}
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-500">Money others owe you</p>
          <div className="p-3 mt-4 bg-green-50 rounded-xl">
            <p className="text-sm font-medium text-green-700">
              💡 Send reminders to settle up faster
            </p>
          </div>
        </div>

        {/* Amount You Owe */}
        <div className="p-6 transition-all duration-200 bg-white border shadow-sm rounded-2xl hover:shadow-md">
          <div className="flex items-center mb-4 space-x-4">
            <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-xl">
              <TrendingDown className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">You Owe</h4>
              <p className="text-2xl font-bold text-red-600">
                ${balance.totalOwing.toFixed(2)}
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-500">Money you owe others</p>
          <div className="p-3 mt-4 bg-red-50 rounded-xl">
            <p className="text-sm font-medium text-red-700">
              💳 Pay now to keep your balance healthy
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      {
        <div>
          <h4 className="mb-4 text-lg font-semibold text-gray-900">
            Recent Activity
          </h4>
          <div className="space-y-4">
            {groupsBrief.map((expense) => {
              const group = expense.group;
              return (
                <div
                  key={expense?.id}
                  className={` rounded-2xl p-6 shadow-sm border hover:shadow-md transition-all duration-200 ${
                    expense.amount_to_be_paid > 0
                      ? "bg-red-500 border-2 border-red-300"
                      : "bg-green-500 border-2 border-green-300"
                  }`}
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
                        ${Math.abs(expense?.amount_to_be_paid)?.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500 capitalize">
                        {expense.category}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      }
    </div>
  );
};

export default PersonalSummary;
