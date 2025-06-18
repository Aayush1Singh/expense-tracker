import { useState, useRef, useEffect } from "react";
import { Send, Menu, MessageSquare } from "lucide-react";
import ChatMessage from "./ChatMessage";
import ChatSidebar from "./ChatSidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { createSession, loadChat, queryResolve } from "../services/Handler";
import { useSelector } from "react-redux";

const ChatInterface = () => {
  const location = useLocation();
  const [isFirst, setFirst] = useState(false);
  const params = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  async function onCreateNew() {
    setFirst(true);
    const res = await createSession(username);

    navigate(`/u/chat?session_id=${res}`);
    return res;
  }
  const createNewChat = () => {
    const newChatId = Date.now().toString();
    const newChat = {
      id: newChatId,
      title: "New Chat",
      lastMessage: "",
      timestamp: new Date(),
      messages: [],
    };
    setChats((prev) => [newChat, ...prev]);
    setActiveChat(newChatId);
    setSidebarOpen(false);
  };

  async function onSubmit(data) {
    console.log(data);
    let session_id = params.get("session_id");
    if (!session_id) {
      session_id = await onCreateNew();
    }
    reset();
    setChats((chat) => [...chat, { query: data.query, response: "" }]);
    const res = await queryResolve(username, session_id, data.query);
    setChats((prevChats) => {
      const updatedChats = [...prevChats];
      const lastChat = {
        ...updatedChats[updatedChats.length - 1],
        response: res,
      };
      updatedChats[updatedChats.length - 1] = lastChat;
      return updatedChats;
    });

    console.log(res);
  }
  const [processing, setProcessing] = useState(false);
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState("");
  const [currentMessage, setCurrentMessage] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef < HTMLDivElement > null;
  const inputRef = useRef < HTMLInputElement > null;
  const username = useSelector((state) => state.user.username);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    async function f() {
      if (isFirst) {
        setFirst(false);
        return;
      }
      const session_id = params.get("session_id");
      const res = await loadChat(username, session_id);
      setChats(res[1]);
    }
    f();
  }, [location.search]);

  useEffect(() => {
    scrollToBottom();
  }, [chats, activeChat]);

  return (
    <div className="flex h-screen bg-gray-50">
      <ChatSidebar
        chats={chats}
        activeChat={activeChat}
        onSelectChat={setActiveChat}
        onNewChat={createNewChat}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Main chat area */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-center p-4 bg-white border-b border-gray-200">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 mr-4 bg-black rounded-lg lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-semibold text-gray-800">AI Assitant</h1>
        </div>

        {/* Messages area */}
        <div className="flex-1 p-4 overflow-y-auto">
          {chats?.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-gray-500">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full">
                  <Send className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="mb-2 text-lg font-medium">
                  Start a conversation
                </h3>
                <p>Send a message to begin chatting with the bot</p>
              </div>
            </div>
          ) : (
            <>
              {chats?.map((message) => {
                console.log(message);
                return (
                  <>
                    <ChatMessage
                      key={`${Math.random()}`}
                      isUser={true}
                      message={message.query}
                    ></ChatMessage>
                    <ChatMessage
                      key={`${Math.random()}`}
                      message={message.response}
                      isUser={false}
                    />
                  </>
                );
              })}
              {/* <div ref={messagesEndRef} /> */}
            </>
          )}
        </div>

        {/* Input area */}
        <div className="p-4 bg-white border-t border-gray-200">
          <form className="flex space-x-4 " onSubmit={handleSubmit(onSubmit)}>
            {/* <form onSubmit={handleSubmit(onSubmit)}> */}
            <input
              // ref={inputRef}
              type="text"
              // value={currentMessage}
              {...register("query")}
              // onChange={(e) => setCurrentMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              // onClick={sendMessage}
              type="submit"
              disabled={processing}
              className="flex items-center px-4 py-2 text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
            {/* </form> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
