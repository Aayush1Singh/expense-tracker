import { useEffect, useState } from "react";
import { Plus, Users, Receipt, DollarSign, TrendingUp } from "lucide-react";
import GroupCard from "../components/GroupCard";
import ExpenseForm from "../components/ExpenseForm";
import BalanceCard from "../components/BalanceCard";
import PersonalSummary from "../components/PersonalSummary.jsx";
import CreateGroupModal from "../components/CreateGroupModal";
import { getGroups } from "../services/loginHandler";
import { useSelector } from "react-redux";
import PayBack from "../components/PayBack.jsx";

const Index = () => {
  const [activeTab, setActiveTab] = useState("groups");
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);
  const [isExpenseFormOpen, setIsExpenseFormOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const username = useSelector((state) => state.user.username);
  //   Mock data - in real app this would come from your API
  const [groups, setGroups] = useState([
    {
      id: 1,
      name: "Weekend Trip",
      members: ["Alice", "Bob", "Charlie"],
      totalExpenses: 450.75,
      color: "bg-gradient-to-br from-purple-500 to-pink-500",
    },
    {
      id: 2,
      name: "Apartment Rent",
      members: ["Alice", "David", "Eve"],
      totalExpenses: 1200.0,
      color: "bg-gradient-to-br from-blue-500 to-cyan-500",
    },
  ]);
  const [defaultGroup, setDefaultGroup] = useState(null);

  useEffect(() => {
    const colors = [
      "bg-gradient-to-br from-purple-500 to-pink-500",
      "bg-gradient-to-br from-blue-500 to-cyan-500",
      "bg-gradient-to-br from-green-500 to-emerald-500",
      "bg-gradient-to-br from-orange-500 to-red-500",
      "bg-gradient-to-br from-indigo-500 to-purple-500",
    ];
    async function f() {
      const res = await getGroups(username);
      setGroups(
        res.response.map((re) => {
          re.color = colors[groups.length % colors.length];
          return re;
        })
      );
      console.log(res);
    }
    f();
  }, []);
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      groupId: 1,
      description: "Hotel booking",
      amount: 200.0,
      paidBy: "Alice",
      category: "accommodation",
    },
    {
      id: 2,
      groupId: 1,
      description: "Dinner",
      amount: 85.5,
      paidBy: "Bob",
      category: "food",
    },
    {
      id: 3,
      groupId: 2,
      description: "Monthly rent",
      amount: 1200.0,
      paidBy: "Alice",
      category: "housing",
    },
  ]);

  const personalBalance = {
    totalOwed: 145.25,
    totalOwing: 67.5,
    netBalance: 77.75,
  };

  const tabs = [
    { id: "groups", label: "Groups", icon: Users, color: "text-purple-600" },
    {
      id: "payBack",
      label: "Pay Back",
      icon: Receipt,
      color: "text-blue-600",
    },
    {
      id: "summary",
      label: "Summary",
      icon: TrendingUp,
      color: "text-orange-600",
    },
  ];

  const addGroup = (newGroup) => {
    const colors = [
      "bg-gradient-to-br from-purple-500 to-pink-500",
      "bg-gradient-to-br from-blue-500 to-cyan-500",
      "bg-gradient-to-br from-green-500 to-emerald-500",
      "bg-gradient-to-br from-orange-500 to-red-500",
      "bg-gradient-to-br from-indigo-500 to-purple-500",
    ];

    setGroups([
      ...groups,
      {
        ...newGroup,
        id: Date.now(),
        totalExpenses: 0,
        color: colors[groups.length % colors.length],
      },
    ]);
  };

  const addExpense = (newExpense) => {
    setExpenses([...expenses, { ...newExpense, id: Date.now() }]);
    // Update group total expenses
    setGroups(
      groups.map((group) =>
        group.id === newExpense.groupId
          ? { ...group, totalExpenses: group.totalExpenses + newExpense.amount }
          : group
      )
    );
  };

  return (
    <div className="min-h-screen max-w-full bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">
                ExpenseTracker
              </h1>
            </div>
            <button
              onClick={() => setIsCreateGroupOpen(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Plus className="w-5 h-5" />
              <span>New Group</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex space-x-1 bg-white p-1 rounded-2xl shadow-sm border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-200 flex-1 justify-center ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "groups" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Your Groups</h2>
              <span className="text-gray-500">{groups.length} groups</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groups.map((group) => (
                <GroupCard
                  setDefaultGroup={setDefaultGroup}
                  key={group.id}
                  group={group}
                  onAddExpense={() => {
                    setSelectedGroup(group);
                    setIsExpenseFormOpen(true);
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === "payBack" && (
          <>
            <PayBack />
          </>
        )}

        {activeTab === "summary" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Personal Summary
            </h2>
            <PersonalSummary balance={personalBalance} />
          </div>
        )}
      </div>

      {/* Modals */}
      {isCreateGroupOpen && (
        <CreateGroupModal
          onClose={() => setIsCreateGroupOpen(false)}
          onCreateGroup={addGroup}
        />
      )}

      {isExpenseFormOpen && (
        <ExpenseForm
          defaultGroup={defaultGroup}
          groups={groups}
          setDefaultGroup={setDefaultGroup}
          selectedGroup={selectedGroup}
          onClose={() => {
            setIsExpenseFormOpen(false);
            setSelectedGroup(null);
          }}
          onAddExpense={addExpense}
        />
      )}
    </div>
  );
};

export default Index;
