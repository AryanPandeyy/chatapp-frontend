import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../socket";
import axios from "axios";
import { isUser } from "../user";

interface users {
  username: string;
}

interface messages {
  from: string;
  message: string;
}

function Chat() {
  const navigate = useNavigate();
  const currentUser = isUser();
  const [message, setMessage] = useState<string>("");
  const [histMessage, setHistMessage] = useState<messages[]>([]);
  const [users, setUsers] = useState<users[]>([]);
  const [selectUser, setSelectUser] = useState<users>();

  useEffect(() => {
    socket.on("smessage", ({ from, content }) => {
      setHistMessage((prevHistMessage) => [
        ...prevHistMessage,
        { from, message: content },
      ]);
    });
    socket.emit("join_room", currentUser);
    return () => {
      socket.off("smessage");
    };
  }, [currentUser]);

  useEffect(() => {
    axios.get("http://https://chatapp-backend-mu.vercel.app/getUsers").then((result) => {
      setUsers(result.data);
    });
  }, []);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectUser && currentUser) {
      socket.emit("message", message, selectUser.username, currentUser);
      setHistMessage([...histMessage, { from: currentUser, message }]);
    }
  };

  const handleLogout = () => {
    document.cookie = `username=;`;
    document.cookie = "token=;";
    navigate("/login");
  }

  const handleCurrentUser = (e: users) => {
    setSelectUser(e);
  };

return (
    <div className="flex h-screen">

      <div className="w-1/4 bg-gray-800 text-white p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Users</h2>
        <ul>
          {users.map((e, index) => (
            <li
              key={index}
              className={`cursor-pointer hover:bg-gray-700 px-4 py-2 rounded ${
                selectUser?.username === e.username
                  ? "bg-gray-600 border-l-4 border-blue-500" // Focused user style
                  : ""
              }`}
              onClick={() => handleCurrentUser(e)}
            >
              {e.username}
            </li>
          ))}
          </ul>
          <button
                 onClick={handleLogout}
                               className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
             LogOut
               </button>
      </div>


      <div className="w-3/4 bg-gray-100 p-6 flex flex-col">
        {selectUser && (
          <>
            <div className="flex-1 overflow-y-auto mb-4">
              <ul className="space-y-2">
                {histMessage.map((m, index) => (
                  <li key={index} className="p-2">
                    <strong>{m.from}:</strong> {m.message}
                  </li>
                ))}
              </ul>
            </div>


            <form onSubmit={handleSubmit} className="mt-auto flex space-x-2">
              <input
                type="text"
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                className="flex-1 p-2 border rounded"
                placeholder="Type a message..."
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Send
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );

}

export default Chat;
