import React from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../utils/supabaseClient";

const UserProfile = ({ sessionData }) => {
	const navigate = useNavigate();

	// Logout handler
	const logoutHandler = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.log(error);
			return;
		}
		navigate("/");
	};

	// Session Data is passed from App.js
	if (sessionData) {
		const { user, data, session } = sessionData;
		console.log(data.access_token);

		return (
			<div className="  flex flex-col mx-auto mt-20 text-center text-blue-600 text-4xl gap-8 justify-center items-center">
				<h2>Email : {user.email}</h2>
				<h2>First Name : {user.user_metadata.first_name}</h2>
				<h2>Last Name : {user.user_metadata.last_name}</h2>
				<button
					onClick={() => logoutHandler()}
					role="button"
					className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-red-400 border rounded hover:bg-red-500 py-4 w-4/12"
				>
					Logout
				</button>
			</div>
		);
	}

	return (
		<h1 className="text-4xl text-center mt-12 font-bold text-slate-700">
			User not Authenticated!
		</h1>
	);
};

export default UserProfile;
