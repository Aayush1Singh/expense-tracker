import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const BalanceCard = ({ group }) => {
  // Mock balance data - in real app this would be calculated from your API
  const balances = [
    { name: "Alice", amount: 45.25, type: "owes" },
    { name: "Bob", amount: -20.5, type: "owed" },
    { name: "Charlie", amount: 0, type: "settled" },
  ];

  const getBalanceColor = (type, amount) => {
    if (amount === 0) return "text-gray-600";
    if (type === "owes") return "text-red-600";
    return "text-green-600";
  };

  const getBalanceIcon = (type, amount) => {
    if (amount === 0) return <Minus className="w-4 h-4" />;
    if (type === "owes") return <TrendingDown className="w-4 h-4" />;
    return <TrendingUp className="w-4 h-4" />;
  };

  const getBalanceBg = (type, amount) => {
    if (amount === 0) return "bg-gray-50 border-gray-200";
    if (type === "owes") return "bg-red-50 border-red-200";
    return "bg-green-50 border-green-200";
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border hover:shadow-md transition-all duration-200">
      <div className="flex items-center space-x-3 mb-6">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${group.color.replace(
            "bg-gradient-to-br",
            "bg-gradient-to-br"
          )}`}
        >
          <span className="text-white font-bold text-lg">
            {group.name.charAt(0)}
          </span>
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">{group.name}</h3>
          <p className="text-gray-500 text-sm">
            {group.members.length} members
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
          Balances
        </h4>
        {balances.map((balance, index) => (
          <div
            key={index}
            className={`p-4 rounded-xl border transition-all duration-200 hover:shadow-sm ${getBalanceBg(
              balance.type,
              balance.amount
            )}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <span className="text-sm font-medium text-gray-700">
                    {balance.name.charAt(0)}
                  </span>
                </div>
                <span className="font-medium text-gray-900">
                  {balance.name}
                </span>
              </div>
              <div
                className={`flex items-center space-x-2 ${getBalanceColor(
                  balance.type,
                  balance.amount
                )}`}
              >
                {getBalanceIcon(balance.type, balance.amount)}
                <span className="font-bold">
                  {balance.amount === 0
                    ? "Settled"
                    : `$${Math.abs(balance.amount).toFixed(2)}`}
                </span>
              </div>
            </div>
            {balance.amount !== 0 && (
              <p className="text-xs text-gray-500 mt-2">
                {balance.type === "owes"
                  ? "Owes to group"
                  : "Should receive from group"}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Total group expenses</span>
          <span className="font-bold text-gray-900">
            ${group?.totalExpenses?.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;
