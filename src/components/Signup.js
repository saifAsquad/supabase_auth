import { useState } from "react";
import { useNavigate } from "react-router-dom";

import supabase from "../utils/supabaseClient";

const Signup = () => {
	const [success, setSuccess] = useState(null);
	const [error, setError] = useState(null);
	// Controlled input fields
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");

	// Navigate Hook
	const navigate = useNavigate();

	// Signup Submit Handler
	const submitHandler = async (e) => {
		e.preventDefault();
		// Create a new user
		const { user, session, error } = await supabase.auth.signUp(
			{
				email: email,
				password: password,
			},
			{
				data: {
					first_name: username.split(" ")[0],
					last_name: username.split(" ")[1],
				},
			}
		);
		if (error) {
			setSuccess(false);
			setError(error.message);
			return console.log(error, "An error occured");
		}
		console.log(user, session);
		setSuccess(true);
		setError(null);
	};

	return (
		<div>
			<div className="flex justify-center items-center w-full py-12 px-4">
				<button
					id="menuBtn"
					className="rounded hidden px-6 py-2 leading-4 text-base text-white bg-blue-700 hover:bg-blue-600 focus:bg-blue-800"
				>
					Open
				</button>
				<div
					id="menu"
					className="relative py-6 px-4 md:p-14 w-full md:w-8/12 lg:w-7/12 xl:w-5/12  bg-white rounded shadow flex flex-col justify-start items-start space-y-6"
				>
					<div className="flex justify-start items-start flex-col space-y-4">
						<p className="text-2xl md:text-3xl font-bold leading-7 text-gray-800">
							Welcome Back
						</p>
						<p className="text-sm leading-4 text-gray-500">
							Already have an account?
							<a
								className="hover:underline font-bold cursor-pointer text-gray-800"
								onClick={() => navigate("/")}
							>
								Log In
							</a>
						</p>
					</div>
					<div className="w-full flex sm:flex-row flex-col justify-start items-start space-y-4 sm:space-y-0 sm:space-x-4">
						<button className="px-2 hover:text-gray-800 text-sm leading-4 text-gray-500 flex justify-center items-center space-x-2 py-4 w-full rounded-lg border border-gray-500">
							<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
								<g clipPath="url(#clip0)">
									<path
										d="M19.999 10.2221C20.0111 9.53464 19.9387 8.84825 19.7834 8.17773H10.2031V11.8888H15.8266C15.7201 12.5395 15.4804 13.1623 15.1219 13.7199C14.7634 14.2774 14.2935 14.7582 13.7405 15.1332L13.7209 15.2575L16.7502 17.5572L16.96 17.5777C18.8873 15.8333 19.9986 13.2665 19.9986 10.2221"
										fill="#4285F4"
									/>
									<path
										d="M10.2055 20.0008C12.9605 20.0008 15.2734 19.1118 16.9629 17.5785L13.7429 15.1339C12.8813 15.723 11.7248 16.1341 10.2055 16.1341C8.91513 16.1267 7.65991 15.7213 6.61791 14.9754C5.57592 14.2295 4.80007 13.1809 4.40044 11.9785L4.28085 11.9885L1.13101 14.3774L1.08984 14.4896C1.93817 16.1464 3.24007 17.5394 4.84997 18.5127C6.45987 19.486 8.31429 20.0012 10.2059 20.0008"
										fill="#34A853"
									/>
									<path
										d="M4.39899 11.9782C4.1758 11.3416 4.06063 10.6735 4.05807 10.0005C4.06218 9.32848 4.1731 8.66124 4.38684 8.02274L4.38115 7.89017L1.19269 5.46289L1.0884 5.5115C0.372762 6.90392 0 8.44129 0 10.0004C0 11.5594 0.372762 13.0968 1.0884 14.4892L4.39899 11.9782Z"
										fill="#FBBC05"
									/>
									<path
										d="M10.2059 3.86736C11.668 3.84511 13.0822 4.37876 14.1515 5.35631L17.0313 2.6007C15.1843 0.90258 12.7383 -0.0291531 10.2059 0.000695638C8.31431 0.000254588 6.4599 0.515465 4.85001 1.48872C3.24011 2.46197 1.9382 3.8549 1.08984 5.51174L4.38946 8.02298C4.79303 6.82078 5.57145 5.77304 6.61498 5.02748C7.65851 4.28192 8.91451 3.87614 10.2059 3.86736Z"
										fill="#EB4335"
									/>
								</g>
								<defs>
									<clipPath id="clip0">
										<rect width="20" height="20" fill="white" />
									</clipPath>
								</defs>
							</svg>
							<p>Login with Google</p>
						</button>
						<button className="px-2 hover:text-gray-800 text-sm leading-4 text-gray-500 flex justify-center items-center space-x-2 py-4 w-full rounded-lg border border-gray-500">
							<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
								<path
									d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z"
									fill="#1D4ED8"
								/>
								<path
									d="M12.5158 10.3909H10.7315V16.928H8.02797V10.3909H6.74219V8.09349H8.02797V6.60681C8.02797 5.54367 8.53298 3.87891 10.7555 3.87891L12.7581 3.88728V6.11731H11.3051C11.0668 6.11731 10.7316 6.23639 10.7316 6.74354V8.09563H12.752L12.5158 10.3909Z"
									fill="white"
								/>
							</svg>
							<p>Login with Facebook</p>
						</button>
					</div>
					<div className="flex justify-start items-center space-x-4 w-full">
						<hr className="border-gray-400 w-full" />
						<p className="text-base leading-4 text-gray-400">or</p>
						<hr className="border-gray-400 w-full" />
					</div>
					{/* Username */}
					<form
						onSubmit={(e) => submitHandler(e)}
						className="w-full flex flex-col gap-5"
					>
						<div className="w-full flex flex-col justify-start items-start space-y-4">
							<p className="text-base leading-4 text-gray-800">Name</p>
							<div className="relative w-full flex justify-center items-center">
								<input
									className="pl-7 pr-6 w-full py-4 border rounded focus:outline border-gray-400 text-sm leading-4 text-gray-800 placeholder-gray-800"
									type="text"
									onChange={(e) => setUsername(e.target.value)}
									value={username}
									placeholder="Enter full name"
									name="username"
									required
								/>
							</div>
						</div>
						{/* Email Address */}
						<div className="w-full flex flex-col justify-start items-start space-y-4">
							<p className="text-base leading-4 text-gray-800">Email address</p>
							<div className="relative w-full flex justify-center items-center">
								<input
									className="pl-14 pr-6 w-full py-4 border rounded focus:outline border-gray-400 text-sm leading-4 text-gray-800 placeholder-gray-800"
									type="text"
									onChange={(e) => setEmail(e.target.value)}
									value={email}
									placeholder="Enter email here"
									name=""
									required
								/>
								<svg
									className="absolute left-6"
									width="20"
									height="20"
									viewBox="0 0 20 20"
									fill="none"
								>
									<path
										d="M3.33464 3.33398H16.668C17.5846 3.33398 18.3346 4.08398 18.3346 5.00065V15.0006C18.3346 15.9173 17.5846 16.6673 16.668 16.6673H3.33464C2.41797 16.6673 1.66797 15.9173 1.66797 15.0006V5.00065C1.66797 4.08398 2.41797 3.33398 3.33464 3.33398Z"
										stroke="#1F2937"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M18.3346 5L10.0013 10.8333L1.66797 5"
										stroke="#1F2937"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</div>
						</div>
						<div className="w-full flex flex-col justify-start items-start space-y-4">
							<p className="text-base leading-4 text-gray-800">Password</p>
							<div className="relative w-full flex justify-center items-center">
								<input
									className="pl-14 pr-6 w-full py-4 border rounded focus:outline border-gray-400 text-sm leading-4 text-gray-500 placeholder-gray-500"
									type="password"
									onChange={(e) => setPassword(e.target.value)}
									value={password}
									placeholder="Enter password here"
									name=""
									required
								/>
								<svg
									className="absolute left-6"
									width="20"
									height="20"
									viewBox="0 0 20 20"
									fill="none"
								>
									<path
										d="M15.8333 9.16602H4.16667C3.24619 9.16602 2.5 9.91221 2.5 10.8327V16.666C2.5 17.5865 3.24619 18.3327 4.16667 18.3327H15.8333C16.7538 18.3327 17.5 17.5865 17.5 16.666V10.8327C17.5 9.91221 16.7538 9.16602 15.8333 9.16602Z"
										stroke="#6B7280"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M5.83203 9.16602V5.83268C5.83203 4.72761 6.27102 3.66781 7.05242 2.8864C7.83382 2.105 8.89363 1.66602 9.9987 1.66602C11.1038 1.66602 12.1636 2.105 12.945 2.8864C13.7264 3.66781 14.1654 4.72761 14.1654 5.83268V9.16602"
										stroke="#6B7280"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</div>
						</div>
						<div
							className={`${
								success === false || success === true ? "block" : "hidden"
							} text-center`}
						>
							<h1
								className={`${
									success ? "block" : "hidden"
								} text-sm text-green-500`}
							>
								Successfully Signed Up
							</h1>
							<h1
								className={`${success === false ? "block" : "hidden"}`}
								className="text-sm text-red-500"
							>
								{error}
							</h1>
						</div>
						<div className="flex justify-start items-start space-x-2">
							<div className="cursor-pointer relative flex justify-center items-center">
								<input
									id="main"
									placeholder="check box"
									type="checkbox"
									className="bg-white cursor-pointer relative appearance-none w-4 h-4 border-gray-500 border bg-transparent rounded"
								/>
								<svg
									className=" absolute"
									width="11"
									height="8"
									viewBox="0 0 11 8"
									fill="none"
								>
									<path
										d="M9.73661 1.07227L3.45089 7.35798L0.59375 4.50084"
										stroke="#F9FAFB"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</div>
							<p className="text-gray-500 text-xs leading-3">
								I agree to{" "}
								<span className="text-gray-800">Terms of Service</span> &
								<span className="text-gray-800">Privacy Policy</span>
							</p>
						</div>
						<button
							disabled={success ? true : false}
							className="py-4 w-full disabled:bg-slate-500 rounded bg-blue-700 hover:bg-blue-600 focus:bg-blue-800 text-base font-medium leading-none text-white"
						>
							Register
						</button>
					</form>

					<button className="absolute top-0 right-6">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
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
		</div>
	);
};

export default Signup;
