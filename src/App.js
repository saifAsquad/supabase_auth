import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import { useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Forget_pass from "./components/Forget_pass";
import UserProfile from "./components/UserProfile";
import NewPassword from "./components/NewPassword";

function App() {
	// Acts as a global State for Login Session Data
	const [sessionData, setSessionData] = useState(null);
	console.log(sessionData);

	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/" element={<Login setSessionData={setSessionData} />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/forget" element={<Forget_pass />} />
					<Route
						path="/profile" // Passing session data into profile Component
						element={<UserProfile sessionData={sessionData} />}
					/>{" "}
					<Route path="/newpassword" element={<NewPassword />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
