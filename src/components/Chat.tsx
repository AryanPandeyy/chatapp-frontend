import { useState, useEffect } from "react";
import { socket } from "../socket";
import axios from "axios";

interface users {
	username: string;
}

function Chat() {
	const [message, setMessage] = useState<string>("");
	const [users, setUsers] = useState<users[]>([]);
	const [currentUser, setCurrentUser] = useState<users>();

	const getCookie = (name: string) => {
		const cookies = document.cookie
			.split("; ")
			.find((row) => row.startsWith(`${name}=`));
		return cookies ? cookies.split("=")[1] : null;
	};

	useEffect(() => {
		socket.on("smessage", (content: string) => {
			console.log(content);
		});
		socket.on("test", () => {
			console.log("TEST FIRED");
		});

		socket.emit("join_room", getCookie("username"));
	}, []);

	useEffect(() => {
		axios
			.get("http://localhost:3000/getUsers")
			.then((result) => {
				console.log(result);
				setUsers(result.data);
			});
	}, []);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (currentUser) {
			socket.emit("message", message, currentUser.username[0]);
		}
	};

	const handleCurrentUser = (e) => {
		console.log(e);
		setCurrentUser(e);
	};

	return (
		<>
			<ul>
				{users.map((e) => (
					<li onClick={() => handleCurrentUser(e)}>{e.username}</li>
				))}
			</ul>
			<form onSubmit={handleSubmit}>
				<input onChange={(e) => setMessage(e.target.value)} value={message} />
				<button type="submit">Send</button>
			</form>
		</>
	);
}

export default Chat;
