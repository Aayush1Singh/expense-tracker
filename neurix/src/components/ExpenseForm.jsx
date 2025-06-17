import { useState } from "react";
import { X, DollarSign, Receipt, Users, Tag } from "lucide-react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { insertExpense } from "../services/loginHandler";

const ExpenseForm = ({
  defaultGroup,
  setDefaultGroup,
  groups,
  selectedGroup,
  onClose,
  onAddExpense,
}) => {
  const username = useSelector((state) => state.user.username);

  const { register, handleSubmit } = useForm();
  const [isSelected, togglesSelect] = useState(false);
  // if (defaultGroup) {
  //   setDefaultGroup((state) => {
  //     const s = state;

  //     s.groupId = defaultGroup;
  //     return s;
  //   });
  // }
  const [formData, setFormData] = useState({
    groupId: selectedGroup?.id || "",
    description: "",
    amount: "",
    paidBy: "",
    category: "food",
  });
  function onSubmit(data) {
    data.paid_by = username;
    data.isSelected = isSelected;
    console.log(data);
    insertExpense(data);
  }
  const categories = [
    { id: "food", label: "Food & Drinks", color: "bg-orange-500", icon: "🍕" },
    {
      id: "accommodation",
      label: "Accommodation",
      color: "bg-purple-500",
      icon: "🏠",
    },
    { id: "transport", label: "Transport", color: "bg-blue-500", icon: "🚗" },
    {
      id: "entertainment",
      label: "Entertainment",
      color: "bg-pink-500",
      icon: "🎬",
    },
    { id: "shopping", label: "Shopping", color: "bg-green-500", icon: "🛍️" },
    { id: "other", label: "Other", color: "bg-gray-500", icon: "📝" },
  ];

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (
  //     formData.groupId &&
  //     formData.description &&
  //     formData.amount &&
  //     formData.paidBy
  //   ) {
  //     onAddExpense({
  //       ...formData,
  //       amount: parseFloat(formData.amount),
  //       groupId: parseInt(formData.groupId),
  //     });
  //     onClose();
  //   }
  // };

  const selectedGroupData = groups.find(
    (g) => g.id === parseInt(formData.groupId)
  );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl">
        <form
          className="flex items-center justify-between mb-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="text-2xl font-bold text-gray-900">Add Expense</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </form>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Group Selection */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-3">
              <Users className="w-4 h-4" />
              <span>Group</span>
            </label>
            <select
              // value={formData.groupId}
              {...register("group_id")}
              onChange={(e) => setDefaultGroup(e.target.value)}
              // onChange={(e) =>
              //   setFormData({
              //     ...formData,
              //     groupId: e.target.value,
              //     paidBy: "",
              //   })
              // }
              className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-black"
              required
            >
              <option value="">Select a group</option>
              {groups.map((group) => (
                <option
                  key={group.id}
                  value={group.id}
                  selected={defaultGroup == group.id}
                >
                  {group.name}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-3">
              <Receipt className="w-4 h-4" />
              <span>Description</span>
            </label>
            <input
              {...register("description")}
              type="text"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="What was this expense for?"
              className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              required
            />
          </div>

          {/* Amount */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-3">
              <DollarSign className="w-4 h-4" />
              <span>Amount</span>
            </label>
            <input
              {...register("amount")}
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
              placeholder="0.00"
              className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-3">
              <Tag className="w-4 h-4" />
              <span>Type</span>
              <button
                type="button"
                selected={isSelected}
                className={`hover:bg-orange-300 ${
                  isSelected ? "bg-orange-300" : ""
                }`}
                onClick={() => togglesSelect((state) => !state)}
              >
                Equal?
              </button>
            </label>
            <div className="grid grid-cols-2 gap-3">
              {defaultGroup &&
                groups
                  .filter((s) => s.id == defaultGroup)[0]
                  .members.map((name) => {
                    if (name == username)
                      return (
                        <>
                          <label className="text-black justify-center text-1xl">
                            {name}
                          </label>
                          <input
                            type="number"
                            step="1"
                            value={isSelected ? 50 : null}
                            {...register(`percentage-${name}`, {})}
                            placeholder="0.00"
                            className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                            required
                          />
                        </>
                      );

                    return (
                      <>
                        <label className="text-black justify-center flex text-1xl ">
                          {name}
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={isSelected ? 50 : null}
                          {...register(`percentage-${name}`)}
                          placeholder="0.00"
                          className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                          required
                        />
                      </>
                    );
                  })}
            </div>
          </div>

          {/* Paid By */}
          {/* {selectedGroupData && (
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-3">
                <Users className="w-4 h-4" />
                <span>Paid by</span>
              </label>
              <select
                value={formData.paidBy}
                onChange={(e) =>
                  setFormData({ ...formData, paidBy: e.target.value })
                }
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                required
              >
                <option value="">Select who paid</option>
                {selectedGroupData.members.map((member) => (
                  <option key={member} value={member}>
                    {member}
                  </option>
                ))}
              </select>
            </div>
          )} */}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
};

export default ExpenseForm;
