import { Users, DollarSign, Calendar, User, Plus, Minus } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSummary } from "../services/Handler";

const GroupDetails = ({ className = "" }) => {
  const { groupID } = useParams();
  const [data, setData] = useState({});
  const [expense, setExpense] = useState([]);
  useEffect(() => {
    async function f() {
      const res = await getSummary({ groupID });
      console.log(res);
      const finalExpenseList = [];
      for (let i = 0; i < res.members.length; i++) {
        const { id, name } = res.members[i];
        let amount = 0;
        for (let j = 0; j < res.expenses.length; j++) {
          const { id: paid_by_id } = res.expenses[j].paid_by;
          console.log(paid_by_id, " ", id, name);
          if (paid_by_id == id) {
            amount =
              amount +
              (res.expenses[j].amount * (100 - res.expenses[j].split[i])) / 100;
          } else {
            if (!res.expenses[j].isPaid[i]) {
              amount -=
                (res.expenses[j].amount * res.expenses[j].split[i]) / 100;
            }
          }
        }
        finalExpenseList.push(amount);
      }
      console.log(finalExpenseList);
      setData(res);
      setExpense(finalExpenseList);
    }
    f();
  }, []);

  const totalExpenses = data?.expenses?.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const formatDate = (dateString) => {
    if (!dateString) return "No date";
    return new Date(dateString)?.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getMemberInitial = (name) => {
    return name?.charAt(0)?.toUpperCase();
  };

  const getExpenseColor = (amount) => {
    if (amount > 100) return "text-red-600 bg-red-50 border-red-200";
    if (amount > 50) return "text-orange-600 bg-orange-50 border-orange-200";
    return "text-green-600 bg-green-50 border-green-200";
  };
  if (!data) return null;
  else
    return (
      <div className="flex justify-around">
        <div
          className={`bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden ${className}`}
        >
          {/* Header */}
          <div className="p-6 text-white bg-gradient-to-r from-blue-500 to-purple-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{data?.name}</h2>
                  <p className="text-white/80">
                    {data?.members?.length} members • {data?.expenses?.length}{" "}
                    expenses
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-white/80">Total Expenses</p>
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5" />
                  <span className="text-2xl font-bold">
                    ${totalExpenses?.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Members Section */}
            <div>
              <h3 className="flex items-center mb-4 text-lg font-semibold text-gray-900">
                <Users className="w-5 h-5 mr-2 text-blue-500" />
                Members
              </h3>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
                {data?.members?.map((member, index) => (
                  <div
                    key={member?.id}
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                      expense[index] >= 0
                        ? " border-green-500 bg-green-300 border-2"
                        : "bg-red-300 border-red-500 border-2"
                    }`}
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
                      <span className="text-sm font-medium text-white">
                        {getMemberInitial(member?.name)}
                      </span>
                    </div>
                    <span className="font-medium text-gray-900 truncate">
                      {member?.name}
                    </span>
                    <span className="justify-between grid-rows-1 font-medium text-gray-900 truncate align-middle">
                      {expense[index] >= 0 ? (
                        <Plus className="inline h-5 align-middle justify-self-center" />
                      ) : (
                        <Minus className="inline h-5 align-middle justify-self-center" />
                      )}{" "}
                      ${Math.abs(expense[index])}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {/* Expenses Section */}
            <div>
              <h3 className="flex items-center mb-4 text-lg font-semibold text-gray-900 overflow-y">
                <DollarSign className="w-5 h-5 mr-2 text-green-500" />
                Expenses
              </h3>
              <div className="overflow-auto max-h-40">
                {data?.expenses?.length === 0 ? (
                  <div className="py-8 text-center text-gray-500">
                    <DollarSign className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No expenses yet</p>
                    <p className="text-sm">
                      Add your first expense to get started
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {data?.expenses?.map((expense) => (
                      <div
                        key={expense?.id}
                        className={`p-4 rounded-xl border transition-all duration-200 hover:shadow-sm ${getExpenseColor(
                          expense.amount
                        )}`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-gray-900">
                                {expense?.description}
                              </h4>
                              <span className="text-2xl font-bold">
                                ${expense?.amount?.toFixed(2)}
                              </span>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <div className="flex items-center space-x-2">
                                <User className="w-4 h-4" />
                                <span>Paid by {expense?.paid_by?.name}</span>
                              </div>
                              {expense.date && (
                                <div className="flex items-center space-x-2">
                                  <Calendar className="w-4 h-4" />
                                  <span>{formatDate(expense?.date)}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Summary */}
            <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-sm text-gray-600">Total Members</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {data?.members?.length}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Average per Person</p>
                  <p className="text-2xl font-bold text-gray-900">
                    $
                    {data?.members?.length > 0
                      ? (totalExpenses / data.members.length).toFixed(2)
                      : "0.00"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default GroupDetails;
