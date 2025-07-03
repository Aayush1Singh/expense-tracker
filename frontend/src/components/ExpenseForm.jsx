import { useState } from "react";
import { X, DollarSign, Receipt, Users, Tag } from "lucide-react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { insertExpense } from "../services/Handler";

const ExpenseForm = ({
  defaultGroup,
  setDefaultGroup,
  groups,
  selectedGroup,
  onClose,
}) => {
  const username = useSelector((state) => state.user.username);
  const { register, handleSubmit } = useForm();
  const [isSelected, togglesSelect] = useState(false);
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
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md p-8 mx-4 bg-white shadow-2xl rounded-3xl">
        <form
          className="flex items-center justify-between mb-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="text-2xl font-bold text-gray-900">Add Expense</h2>
          <button
            onClick={onClose}
            className="flex items-center justify-center transition-colors duration-200 bg-black w-fit h-fit rounded-xl hover:bg-gray-200"
          >
            <X className="w-5 h-5" />
          </button>
        </form>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Group Selection */}
          <div>
            <label className="flex items-center mb-3 space-x-2 text-sm font-medium text-gray-700">
              <Users className="w-4 h-4" />
              <span>Group</span>
            </label>
            <select
              {...register("group_id")}
              onChange={(e) => setDefaultGroup(e.target.value)}
              className="w-full p-4 text-black transition-all duration-200 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
            <label className="flex items-center mb-3 space-x-2 text-sm font-medium text-gray-700">
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
              className="w-full p-4 transition-all duration-200 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>

          {/* Amount */}
          <div>
            <label className="flex items-center mb-3 space-x-2 text-sm font-medium text-gray-700">
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
              className="w-full p-4 transition-all duration-200 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="flex items-center mb-3 space-x-2 text-sm font-medium text-gray-700">
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
                          <label className="justify-center text-black text-1xl">
                            {name}
                          </label>
                          <input
                            type="number"
                            step="1"
                            value={isSelected ? 50 : null}
                            {...register(`percentage-${name}`, {})}
                            placeholder="0.00"
                            className="w-full p-4 transition-all duration-200 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            required
                          />
                        </>
                      );

                    return (
                      <>
                        <label className="flex justify-center text-black text-1xl ">
                          {name}
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={isSelected ? 50 : null}
                          {...register(`percentage-${name}`)}
                          placeholder="0.00"
                          className="w-full p-4 transition-all duration-200 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          required
                        />
                      </>
                    );
                  })}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-4 font-medium text-white transition-all duration-200 transform shadow-lg bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl hover:from-purple-600 hover:to-pink-600 hover:shadow-xl hover:scale-105"
          >
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
};

export default ExpenseForm;
