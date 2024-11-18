import axios from "axios";
import { useState, useEffect } from "react";
import { socket } from "../socket";
import { useNavigate } from "react-router-dom";
import { isUser } from "../user";

function Login() {
  const navigate = useNavigate();
  const currUser = isUser();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errMsg, setErrMsg] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await axios
      .post(
        "https://chatapp-backend-mu.vercel.app/login",
        { username: username, password: password, socketId: socket.id },
        { withCredentials: true },
      )
      .then((res) => {
        console.log(res);
        navigate("/Chat")})
      .catch((err) => setErrMsg(err.response.data));
  };

  useEffect(() => {
    if (currUser) {
      navigate("/chat");
    }
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input onChange={(e) => setUsername(e.target.value)} value={username} />
        <br />
        <label>Password:</label>
        <input onChange={(e) => setPassword(e.target.value)} value={password} />
        <br />
        <button type="submit">Login</button>
      </form>
      <p>{errMsg}</p>
      <p>
        Dont have an account?
        <br />
        <a href="/signup">SignUp</a>
      </p>
    </>
  );
}

export default Login;
