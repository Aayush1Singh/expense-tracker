import { Users, Plus, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";

const GroupCard = ({ group, onAddExpense, setDefaultGroup }) => {
  const navigate = useNavigate();
  return (
    <div
      className="relative group"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("hola");
        navigate(`/u/details/${group.id}`);
      }}
    >
      <div
        className={`${group.color} rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform  border border-white/20`}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl backdrop-blur-sm">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold">{group.name}</h3>
              <p className="text-sm text-white/80">
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
            className="z-50 justify-center transition-all duration-200 transform bg-white/20 rounded-xl backdrop-blur-sm hover:bg-white/30 hover:scale-110 h-fit w-fit"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          <div className="pt-3 border-t border-white/20">
            <p className="mb-2 text-sm text-white/80">
              Click to Load more details
            </p>
            <p className="mb-2 text-sm text-white/80">Members</p>
            <div className="flex -space-x-2">
              {group.members.map((member, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center w-8 h-8 border-2 rounded-full bg-white/20 backdrop-blur-sm border-white/30"
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
        <div className="absolute inset-0 z-0 transition-opacity duration-300 opacity-0 bg-white/20 group-hover:opacity-100 rounded-2xl"></div>
      </div>
    </div>
  );
};

export default GroupCard;
