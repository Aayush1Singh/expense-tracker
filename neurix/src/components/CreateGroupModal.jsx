import { useState } from "react";
import { X, Plus, Users, Trash2 } from "lucide-react";
import { createGroup } from "../services/loginHandler";
import { useSelector } from "react-redux";

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
        alert(`${res.members} not found`);
      } else {
        console.log("created");
      }
      onCreateGroup({
        name: groupName.trim(),
        members: validMembers,
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Create New Group</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-gray-100 rounded-xl  items-center justify-center hover:bg-gray-200 transition-colors duration-200"
          >
            <X className="w-5 h-5"></X>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Group Name */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-3">
              <Users className="w-4 h-4" />
              <span>Group Name</span>
            </label>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="e.g., Weekend Trip, Apartment Rent"
              className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              required
            />
          </div>

          {/* Members */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-3">
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
                    className="flex-1 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  />
                  {members.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeMember(index)}
                      className="w-10 h-10 bg-red-100 text-red-600 rounded-xl items-center justify-center hover:bg-red-200 transition-colors duration-200 "
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
              className="mt-3 w-full p-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Member</span>
            </button>
          </div>

          {/* Tips */}
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-2">💡 Tips</h4>
            <ul className="text-blue-700 text-sm space-y-1">
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
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            Create Group
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateGroupModal;
