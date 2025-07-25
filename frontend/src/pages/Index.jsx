import { useEffect, useState } from "react";
import {
  Plus,
  Users,
  Receipt,
  DollarSign,
  TrendingUp,
  Sparkle,
} from "lucide-react";
import GroupCard from "../components/GroupCard.js";
import ExpenseForm from "../components/ExpenseForm.jsx";
import PersonalSummary from "../components/PersonalSummary.jsx";
import CreateGroupModal from "../components/CreateGroupModal.jsx";
import { getGroups } from "../services/Handler.jsx";
import { useSelector } from "react-redux";
import PayBack from "../components/PayBack.jsx";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("groups");
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);
  const [isExpenseFormOpen, setIsExpenseFormOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const username = useSelector((state) => state.user.username);
  const [groups, setGroups] = useState([]);
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

  return (
    <div className="flex">
      <div className="flex-1 max-w-full min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Header */}
        <div className="bg-white border-b shadow-sm">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">
                  ExpenseTracker
                </h1>
              </div>
              <button
                onClick={() => navigate("/u/chat")}
                className="flex items-center px-6 py-2 space-x-2 text-white transition-all duration-200 transform shadow-lg bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl hover:from-purple-600 hover:to-pink-600 hover:shadow-xl hover:scale-105"
              >
                <Sparkle className="w-5 h-5" />
                <span>Ask AI</span>
              </button>
              <button
                onClick={() => setIsCreateGroupOpen(true)}
                className="flex items-center px-6 py-2 space-x-2 text-white transition-all duration-200 transform shadow-lg bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl hover:from-purple-600 hover:to-pink-600 hover:shadow-xl hover:scale-105"
              >
                <Plus className="w-5 h-5" />
                <span>New Group</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-4 pt-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex p-1 space-x-1 bg-white border shadow-sm rounded-2xl">
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
        <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
          {activeTab === "groups" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Your Groups
                </h2>
                <span className="text-gray-500">{groups.length} groups</span>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                Personal Summary
              </h2>
              <PersonalSummary />
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
          />
        )}
      </div>
    </div>
  );
};

export default Index;
