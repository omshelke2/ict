"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaFacebookF, FaLinkedinIn, FaGoogle, FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import axios, { AxiosError } from "axios"; // Import AxiosError
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const Signup = () => { // Ensure component name starts with uppercase letter
    const router = useRouter();

    const [user, setUser] = useState({
        email: "",
        username: "",
        password: ""
    });

    const [buttonDisabled, setButtonDisabled] = useState(true); // Initialize to true
    const [loading, setLoading] = useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);

            console.log("Signup Successful", response.data);
            toast.success("Signup Successful");

            router.push("/login");
        } catch (error) {
            const axiosError = error as AxiosError; // Cast the error to AxiosError
            console.log("Signup Failed!");
            // Check if the error has a response and display the message if available
            toast.error( axiosError.message);
        } finally {
            setLoading(false); // Ensure loading is set to false after the process
        }
    };

    useEffect(() => {
        // Check if all fields are filled to enable the button
        setButtonDisabled(!(user.email && user.username && user.password));
    }, [user]);

    return (
        <>
            <main className="py-20 flex flex-col items-center justify-center h-screen w-full flex-1 px-20 text-center bg-gray-100">
                <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
                    <div className="w-2/5 bg-orange-400 text-white rounded-tl-2xl rounded-bl-2xl py-36 px-12">
                        <h2 className="text-3xl font-bold mb-2">Already have Account!</h2>
                        <div className="border-2 w-10 border-white inline-block mb-2"></div>
                        <p className="mb-2">Fill up login information and continue with us.</p>
                        <Link href="/login" className="border-2 rounded-full px-12 py-2 inline-block font-semibold hover:text-orange-400 hover:bg-white duration-200">Login</Link>
                    </div>

                    <div className="w-3/5 p-5">
                        <div className="text-left font-bold">
                            <span className="text-black">Indian</span>
                            <span className="text-orange-500">E</span>
                            <span className="text-blue-400">R</span>
                            <span className="text-green-500">P</span>
                        </div>
                        <div className="py-10">
                            <h2 className="text-3xl font-bold text-orange-500 mb-2">
                                {loading ? "Processing" : "Sign Up"}
                            </h2>
                            <div className="border-2 w-10 border-orange-500 inline-block mb-2"></div>

                            <div className="flex justify-center my-2">
                                <a href="#" className="border border-gray-200 rounded-full p-3 mx-1">
                                    <FaFacebookF className="text-sm" />
                                </a>
                                <a href="#" className="border border-gray-200 rounded-full p-3 mx-1">
                                    <FaLinkedinIn className="text-sm" />
                                </a>
                                <a href="#" className="border border-gray-200 rounded-full p-3 mx-1">
                                    <FaGoogle className="text-sm" />
                                </a>
                            </div>
                            <p className="text-gray-400 mb-2">or use your email account</p>

                            <div className="flex flex-col items-center">
                                <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                                    <FaRegEnvelope className="text-gray-400 m-2" />
                                    <input
                                        type="text"
                                        id="username"
                                        value={user.username}
                                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                                        placeholder="Username"
                                        className="bg-gray-100 outline-none flex-1 text-black"
                                    />
                                </div>
                                <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                                    <FaRegEnvelope className="text-gray-400 m-2" />
                                    <input
                                        type="email"
                                        id="email"
                                        value={user.email}
                                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                                        placeholder="Email"
                                        className="bg-gray-100 outline-none flex-1 text-black"
                                    />
                                </div>
                                <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                                    <MdLockOutline className="text-gray-400 m-2" />
                                    <input
                                        type="password"
                                        id="password"
                                        value={user.password}
                                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                                        placeholder="Password"
                                        className="bg-gray-100 outline-none flex-1 text-black"
                                    />
                                </div>

                                <div className="flex w-64 mb-5 justify-between">
                                    <label className="flex items-center text-xs">
                                        <input type="checkbox" name="remember" className="mr-1" />
                                        Remember
                                    </label>
                                    <a href="" className="text-xs">Forgot Password?</a>
                                </div>

                                <button
                                    onClick={onSignup}
                                    className="bg-orange-500 font-semibold text-white border-2 rounded-full py-2 px-12 hover:text-orange-400 hover:bg-white duration-200"
                                    disabled={buttonDisabled}
                                >
                                    {buttonDisabled ? "Enter Details" : "Signup"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Signup; // Exporting the component as Signup
