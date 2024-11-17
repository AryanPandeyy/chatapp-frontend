import { useEffect, useState } from "react";
import "./App.css";
import { socket } from "./socket";

function App() {
  const [message, setMessage] = useState<string>("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    socket.emit("message", message);
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id);
    });
    console.log("FIRED");
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input onChange={(e) => setMessage(e.target.value)} value={message} />
        <button type="submit">Send</button>
      </form>
    </>
  );
}

export default App;
