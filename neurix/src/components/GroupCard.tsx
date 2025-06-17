import { Users, Plus, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";

const GroupCard = ({ group, onAddExpense, setDefaultGroup }) => {
  const navigate = useNavigate();
  console.log(group);
  return (
    <div
      className="group relative overflow-hidden"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("hola");
        navigate(`/u/${group.id}`);
      }}
    >
      <div
        className={`${group.color} rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform  border border-white/20`}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold">{group.name}</h3>
              <p className="text-white/80 text-sm">
                {group.members.length} members
              </p>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setDefaultGroup(group.id);
              onAddExpense();
            }}
            className="w-10 h-10 bg-white/20 rounded-xl  items-center justify-center backdrop-blur-sm hover:bg-white/30 transition-all duration-200 transform hover:scale-110 z-50"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          <div className="pt-3 border-t border-white/20">
            <p className="text-white/80 text-sm mb-2">
              Click to Load more details
            </p>
            <p className="text-white/80 text-sm mb-2">Members</p>
            <div className="flex -space-x-2">
              {group.members.map((member, index) => (
                <div
                  key={index}
                  className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-white/30"
                  title={member}
                >
                  <span className="text-xs font-medium">
                    {member.charAt(0)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl z-0"></div>
      </div>
    </div>
  );
};

export default GroupCard;
