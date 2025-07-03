import { useState } from "react";
import { X, Plus, Users, Trash2 } from "lucide-react";
import { createGroup } from "../services/Handler";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const CreateGroupModal = ({ onClose, onCreateGroup }) => {
  const username = useSelector((state) => state.user.username);

  const [groupName, setGroupName] = useState("");
  const [members, setMembers] = useState([username]);
  console.log(JSON.stringify(username));
  const addMember = () => {
    setMembers([...members, ""]);
  };

  const removeMember = (index) => {
    if (members.length > 1) {
      setMembers(members.filter((_, i) => i !== index));
    }
  };

  const updateMember = (index, value) => {
    const updatedMembers = [...members];
    updatedMembers[index] = value;
    setMembers(updatedMembers);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validMembers = members.filter((member) => member.trim() !== "");
    if (groupName.trim() && validMembers.length >= 2) {
      console.log(validMembers);
      const res = await createGroup(groupName.trim(), validMembers);
      console.log(res);
      if (res.status == "failed") {
        toast.error(`${res.members} not found`);
      } else {
        console.log("created");
        onCreateGroup({
          name: groupName.trim(),
          members: validMembers,
        });
        onClose();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Create New Group</h2>
          <button
            onClick={onClose}
            className="items-center justify-center transition-colors duration-200 bg-black rounded-xl hover:bg-gray-200 w-fit h-fit"
          >
            <X className="w-5 h-5"></X>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Group Name */}
          <div>
            <label className="flex items-center mb-3 space-x-2 text-sm font-medium text-gray-700">
              <Users className="w-4 h-4" />
              <span>Group Name</span>
            </label>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="e.g., Weekend Trip, Apartment Rent"
              className="w-full p-4 transition-all duration-200 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>

          {/* Members */}
          <div>
            <label className="flex items-center mb-3 space-x-2 text-sm font-medium text-gray-700">
              <Users className="w-4 h-4" />
              <span>Members</span>
            </label>
            <div className="space-y-3">
              {members.map((member, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <input
                    type="text"
                    value={member}
                    disabled={username === member}
                    onChange={(e) => updateMember(index, e.target.value)}
                    placeholder={`Member ${index + 1} name`}
                    className="flex-1 p-3 transition-all duration-200 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  {members.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeMember(index)}
                      className="items-center justify-center text-red-600 transition-colors duration-200 bg-red-100 w-fit h-fit rounded-xl hover:bg-red-200 "
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addMember}
              className="flex items-center justify-center w-full p-3 mt-3 space-x-2 text-gray-500 transition-all duration-200 border-2 border-gray-300 border-dashed rounded-xl hover:border-gray-400 hover:text-gray-600"
            >
              <Plus className="w-4 h-4" />
              <span>Add Member</span>
            </button>
          </div>

          {/* Tips */}
          <div className="p-4 border border-blue-200 bg-blue-50 rounded-xl">
            <h4 className="mb-2 font-medium text-blue-900">💡 Tips</h4>
            <ul className="space-y-1 text-sm text-blue-700">
              <li>• Add at least 2 members to create a group</li>
              <li>• You can add more members later</li>
              <li>• Choose a descriptive name for easy identification</li>
            </ul>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={
              !groupName.trim() || members.filter((m) => m.trim()).length < 2
            }
            className="w-full p-4 font-medium text-white transition-all duration-200 transform shadow-lg bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl hover:from-purple-600 hover:to-pink-600 hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            Create Group
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateGroupModal;
