import { TrendingUp, TrendingDown, DollarSign, PieChart } from "lucide-react";
import { useEffect, useState } from "react";
import { getUserSummary } from "../services/loginHandler";
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
            <h3 className="text-white/80 text-sm font-medium mb-2">
              Net Balance
            </h3>
            <div className="flex items-center space-x-3">
              <DollarSign className="w-8 h-8" />
              <span className="text-4xl font-bold">
                ${Math.abs(balance.netBalance).toFixed(2)}
              </span>
            </div>
          </div>
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Amount Owed to You */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border hover:shadow-md transition-all duration-200">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">You're Owed</h4>
              <p className="text-2xl font-bold text-green-600">
                ${balance.totalOwed.toFixed(2)}
              </p>
            </div>
          </div>
          <p className="text-gray-500 text-sm">Money others owe you</p>
          <div className="mt-4 bg-green-50 p-3 rounded-xl">
            <p className="text-green-700 text-sm font-medium">
              💡 Send reminders to settle up faster
            </p>
          </div>
        </div>

        {/* Amount You Owe */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border hover:shadow-md transition-all duration-200">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">You Owe</h4>
              <p className="text-2xl font-bold text-red-600">
                ${balance.totalOwing.toFixed(2)}
              </p>
            </div>
          </div>
          <p className="text-gray-500 text-sm">Money you owe others</p>
          <div className="mt-4 bg-red-50 p-3 rounded-xl">
            <p className="text-red-700 text-sm font-medium">
              💳 Pay now to keep your balance healthy
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      {/* <div className="bg-white rounded-2xl p-6 shadow-sm border">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
            <PieChart className="w-5 h-5 text-blue-600" />
          </div>
          <h4 className="text-lg font-semibold text-gray-900">Quick Actions</h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button className="p-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 transform hover:scale-105 shadow-lg">
            <div className="text-2xl mb-2">📊</div>
            <div className="font-medium">View Details</div>
          </button>

          <button className="p-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-200 transform hover:scale-105 shadow-lg">
            <div className="text-2xl mb-2">💰</div>
            <div className="font-medium">Settle Up</div>
          </button>

          <button className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105 shadow-lg">
            <div className="text-2xl mb-2">📱</div>
            <div className="font-medium">Send Reminder</div>
          </button>
        </div>
      </div> */}
      {
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
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
      {/* Recent Activity */}
      {/* <div className="bg-white rounded-2xl p-6 shadow-sm border">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Activity
        </h4>
        <div className="space-y-3">
          {[
            {
              action: "You paid $85.50 for dinner",
              time: "2 hours ago",
              type: "payment",
            },
            {
              action: "Alice added hotel booking expense",
              time: "1 day ago",
              type: "expense",
            },
            {
              action: "Bob settled up with you",
              time: "3 days ago",
              type: "settle",
            },
          ].map((activity, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                  activity.type === "payment"
                    ? "bg-blue-100 text-blue-600"
                    : activity.type === "expense"
                    ? "bg-orange-100 text-orange-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {activity.type === "payment"
                  ? "💳"
                  : activity.type === "expense"
                  ? "📝"
                  : "✅"}
              </div>
              <div className="flex-1">
                <p className="text-gray-900 font-medium text-sm">
                  {activity.action}
                </p>
                <p className="text-gray-500 text-xs">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default PersonalSummary;
