import { MessageCircle, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { createSession, loadAll, loadChat } from "../services/Handler";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const ChatSidebar = ({ activeChat, onNewChat, isOpen, onToggle }) => {
  const [chats, setChats] = useState([]);
  const username = useSelector((state) => state.user.username);
  const navigate = useNavigate();
  useEffect(() => {
    async function f() {
      const res = await loadAll(username);
      if (res) setChats(res);
    }
    f();
  }, []);
  async function onSelectChat(session_id) {
    navigate(`/u/chat?session_id=${session_id}`);
  }
  async function onCreateNew() {
    const res = await createSession(username);
    console.log(res);
    navigate(`/u/chat?session_id=${res}`);
  }
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed lg:relative top-0 left-0 h-full w-80 bg-white border-r border-gray-200 z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <button
            onClick={onCreateNew}
            className="flex items-center justify-center w-full px-4 py-2 space-x-2 text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            <Plus className="w-4 h-4" />
            <span>New Chat</span>
          </button>
        </div>

        {/* Chat list */}
        <div className="flex-1 overflow-y-auto">
          {chats.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              <MessageCircle className="w-8 h-8 mx-auto mb-2 text-gray-300" />
              <p>No chats yet</p>
            </div>
          ) : (
            <div className="p-2">
              {chats &&
                chats?.map((chat) => (
                  <button
                    key={chat.session_id}
                    onClick={() => onSelectChat(chat.session_id)}
                    className={`w-full text-left p-3 rounded-lg mb-2 transition-colors ${
                      activeChat === chat?.id
                        ? "bg-blue-50 border border-blue-200"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="font-medium text-gray-900 truncate">
                      {chat?.title}
                    </div>
                    <div className="mt-1 text-sm text-gray-500 truncate">
                      {/* {chat.lastMessage} */}
                    </div>
                    <div className="mt-1 text-xs text-gray-400">
                      {/* {chat.timestamp.toLocaleDateString()} */}
                    </div>
                  </button>
                ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ChatSidebar;
