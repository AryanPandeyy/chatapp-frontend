import axios from "axios";
import { useState } from "react";
import { socket } from "../socket";

function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await axios.post(
      "http://localhost:3000/login",
      { username: username, password: password , socketId: socket.id},
      { withCredentials: true },
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input onChange={(e) => setUsername(e.target.value)} value={username} />
        <label>Password:</label>
        <input onChange={(e) => setPassword(e.target.value)} value={password} />
        <button type="submit">Login</button>
      </form>
    </>
  );
}

export default Login;
