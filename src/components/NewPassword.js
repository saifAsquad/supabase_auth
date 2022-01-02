import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import supabase from "../utils/supabaseClient";
import parseHash from "../utils/parseHash"; // Converts Hash to Object

const NewPassword = () => {
	const [password, setPassword] = useState(""); // Password controlled Input
	const [Hash, setHash] = useState(null); // Hash from URL
	const [parsedHash, setParsedHash] = useState({}); // Parsed Hash
	const [errorMessage, setErrorMessage] = useState(null); // Error Message
	const [success, setSuccess] = useState(null); // Success Message

	//useLocation and useNavigate hook
	const location = useLocation();
	const navigate = useNavigate();

	// Save HashData from URL hash to state on component mount
	useEffect(() => {
		setHash(location.hash.slice(1));
	}, []);

	console.log(parsedHash);

	// set ParsedHash state to an object after  converting hash to object
	useEffect(() => {
		if (Hash) {
			setParsedHash(parseHash(Hash)); //parseHash() converts Hash to object
		}
	}, [Hash]);

	// Form Submit Handler
	const submitHandler = async (e) => {
		e.preventDefault();

		// Send Updated Password to server
		if (parsedHash.type === "recovery") {
			const { error, user, data } = await supabase.auth.api.updateUser(
				parsedHash.access_token,
				{
					password: password,
				}
			);
			if (error) {
				console.log(error);
				setErrorMessage(error.message);
				setPassword("");
				setSuccess(false);
				return;
			}
			// Success Case
			setSuccess(true);
			setPassword("");
			setErrorMessage(null);
			setTimeout(() => {
				navigate("/");
			}, 5000);
		}
	};

	// Error Handeling
	if (!Hash || parsedHash.error_code) {
		return (
			<h1 className="text-4xl text-center mt-12 font-bold text-slate-700">
				{parsedHash.error_code
					? parsedHash.error_description
					: " You are not authorized to access this page"}
			</h1>
		);
	}

	return (
		<div className="flex justify-center items-center w-full py-12 px-4">
			<button
				id="menuBtn"
				className="rounded hidden px-6 py-2 leading-4 text-base text-white bg-blue-700 hover:bg-blue-600 focus:bg-blue-800"
			>
				Open
			</button>
			<div
				id="menu"
				className="relative py-6 px-4 md:p-14 w-full md:w-8/12 lg:w-7/12  xl:w-4/12 bg-white rounded shadow flex flex-col justify-start items-start space-y-6"
			>
				<div className="flex justify-start items-start flex-col space-y-4">
					<p className="text-2xl md:text-3xl font-bold leading-7 text-gray-800">
						Welcome to password Reset screen
					</p>
					<p className="text-sm leading-4 text-gray-500">
						Type your new password
						<a className="hover:underline font-bold text-gray-800"></a>
					</p>
				</div>
				<form
					onSubmit={(e) => submitHandler(e)}
					className="w-full flex flex-col justify-start items-start space-y-4s gap-4"
				>
					<div className="w-full flex flex-col justify-start items-start space-y-4 gap-4">
						<p className="text-base leading-4 text-gray-800">New Password</p>
						<div className="relative w-full flex justify-center items-center">
							<input
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="pl-6 pr-6 w-full py-4 border rounded focus:outline border-gray-400 text-sm leading-4 text-gray-800 placeholder-gray-800"
								type="password"
								placeholder="Type your new password"
								name=""
							/>
						</div>
					</div>
					<div className="w-full">
						<h1 className="text-red-500 text-md text-center">
							{errorMessage ? errorMessage : null}
						</h1>
						<h1 className="text-green-500 text-md text-center">
							{success
								? "Password reset Successful!, redirecting to Login"
								: null}
						</h1>
					</div>
					<button className="py-4 w-full rounded bg-blue-700 hover:bg-blue-600 focus:bg-blue-800 text-base font-medium leading-none text-white">
						Reset Password
					</button>
				</form>
				<button className="absolute top-0 right-6">
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<g filter="url(#filter0_dd)">
							<path
								d="M18 6L6 18"
								stroke="black"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M6 6L18 18"
								stroke="black"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</g>
						<defs>
							<filter
								id="filter0_dd"
								x="-3"
								y="-2"
								width="30"
								height="30"
								filterUnits="userSpaceOnUse"
								colorInterpolationFilters="sRGB"
							>
								<feFlood floodOpacity="0" result="BackgroundImageFix" />
								<feColorMatrix
									in="SourceAlpha"
									type="matrix"
									values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
									result="hardAlpha"
								/>
								<feOffset dy="1" />
								<feGaussianBlur stdDeviation="1" />
								<feColorMatrix
									type="matrix"
									values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"
								/>
								<feBlend
									mode="normal"
									in2="BackgroundImageFix"
									result="effect1_dropShadow"
								/>
								<feColorMatrix
									in="SourceAlpha"
									type="matrix"
									values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
									result="hardAlpha"
								/>
								<feOffset dy="1" />
								<feGaussianBlur stdDeviation="1.5" />
								<feColorMatrix
									type="matrix"
									values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
								/>
								<feBlend
									mode="normal"
									in2="effect1_dropShadow"
									result="effect2_dropShadow"
								/>
								<feBlend
									mode="normal"
									in="SourceGraphic"
									in2="effect2_dropShadow"
									result="shape"
								/>
							</filter>
						</defs>
					</svg>
				</button>
			</div>
		</div>
	);
};

export default NewPassword;
