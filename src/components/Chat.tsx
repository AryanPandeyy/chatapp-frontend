import { useState, useEffect } from "react";
import { socket } from "../socket";
import axios from "axios";

interface users {
  username: string;
  socketId: string;
}

function Chat() {
  const [message, setMessage] = useState<string>("");
  const [users, setUsers] = useState<Array<users>>([]);


 const listUsers = users.map(e =>
  // to do online user
   <li>{e.username}</li>
 );

  useEffect(() => {
    axios
      .get("http://localhost:3000/getUsers")
      .then((result) => setUsers(result.data));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit("message", message, users[0].socketId);
  };
  return (
    <>
      <ul>{listUsers}</ul>
      <form onSubmit={handleSubmit}>
        <input onChange={(e) => setMessage(e.target.value)} value={message} />
        <button type="submit">Send</button>
      </form>
    </>
  );
}

export default Chat;
