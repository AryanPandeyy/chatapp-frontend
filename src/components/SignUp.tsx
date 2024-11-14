import axios from "axios";
import { useState } from "react";

function SignUp() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post("http://localhost:3000/signup", {
      username: username,
      password: password,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input onChange={(e) => setUsername(e.target.value)} value={username} />
        <label>Password:</label>
        <input onChange={(e) => setPassword(e.target.value)} value={password} />
        <button type="submit">SignUp</button>
      </form>
    </>
  );
}

export default SignUp;
