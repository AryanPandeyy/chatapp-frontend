import axios from "axios";
import { useState } from "react";

function SignUp() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errMsg, setErrMsg] = useState<string>("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await axios
      .post("http://localhost:3000/signup", {
        username: username,
        password: password,
      })
      .catch((err) => {
        setErrMsg(err.response.data);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input
          type="text"
          required
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <br />
        <label>Password:</label>
        <input
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <br />
        <button type="submit">SignUp</button>
      </form>
      <p>{errMsg}</p>
      <p>
        Already registered?
        <br />
        <a href="/login">Login</a>
      </p>
    </>
  );
}

export default SignUp;
