'use client';

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';

interface Issue {
    issue: string;
    status: string;
}

const Page = () => {
    const [usernameHeading, setUsernameHeading] = useState<string>("");
    const [data, setData] = useState<Issue[]>([]);
    const [issue, setIssue] = useState<string>("");
    const [status, setStatus] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const getUsernameResponse = await axios.post("/api/users/me");
                const username = getUsernameResponse.data.data.username;

                setUsernameHeading(username);
                const req = await axios.post("/api/queries/getIssues", { username });
                setData(req.data.issues);
            } catch (error: unknown) {
                if (axios.isAxiosError(error)) {
                    console.error(error.message);
                } else {
                    console.error("An unexpected error occurred:", error);
                }
            }
        };
        fetchData();
    }, []);

    const onSubmit = async () => {
        try {
            const getUsernameResponse = await axios.post("/api/users/me");
            const username = getUsernameResponse.data.data.username;
            const issueDetails = { issue, status, username };
            await axios.post("/api/queries/issues", issueDetails);

            // Update local state with new issue
            setData((prevData) => [...prevData, issueDetails]);
            setIssue("");
            setStatus("");
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error(error.message);
            } else {
                console.error("An unexpected error occurred:", error);
            }
        }
    };

    return (
        <div>
            <Header pageName="user" usernameHeading={usernameHeading} />
            <main className="py-20 flex flex-col items-center justify-center h-screen w-full flex-1 px-20 text-center bg-gray-100">
                <div className='flex items-center w-full flex-1 px-20 text-center bg-gray-100'>
                    <label className='text-gray-800 pr-5' htmlFor="issue">Enter Issue</label>
                    <input 
                        className="mr-10 pl-10 bg-white border rounded-full border-gray-500 flex-1 text-black" 
                        type="text" 
                        onChange={(e) => setIssue(e.target.value)}  
                        id="issue" 
                    />
                    <label className='text-gray-800 pr-5' htmlFor="status">Enter Status</label>
                    <input 
                        className="mr-10 pl-10 bg-white border rounded-full border-gray-500 flex-1 text-black" 
                        type="text" 
                        onChange={(e) => setStatus(e.target.value)}  
                        id="status" 
                    />
                    <button 
                        onClick={onSubmit} 
                        className="bg-orange-500 font-semibold text-white border-2 rounded-full py-2 px-12 hover:text-orange-400 hover:bg-white duration-200"
                    >
                        Add Issue Ticket
                    </button>
                </div>



                <div className='py-20 h-full flex flex-col items-center w-screen flex-1 px-20 text-center bg-gray-100'>
                    <div className='flex bg-white rounded-2xl shadow-2xl p-5'>
                        <div className='flex flex-row'>
                            <div className='mr-0 item rounded-2xl flex flex-col'>
                            <div className='flex '>
                                        <p  className='text-xl w-20 text-black pb-2'>Sr. No.</p>
                                        <p  className='text-xl w-64 text-black pb-2 ml-5'>Issue</p>
                                        <p  className='text-xl w-44 pl-7 text-black pb-2 ml-5'>Status</p>
                                    </div>
                                {/* <p className='text-2xl text-black px-7 pb-5'>Sr No.</p> */}
                                {data.map((item, index) => (
                                    <div key={index} className='flex '>
                                        <p  className='text-xl w-20 text-gray-600 pb-2'>{index + 1}</p>
                                        <p  className='text-xl w-72 flex justify-start text-gray-600 pb-2 ml-5'>{item.issue}</p>
                                        <p  className={`text-center w-44 text-xl text-gray-600 px-7 ${item.status === "Active" ? "bg-green-200" : "bg-red-400"}`}>{item.status}</p>
                                    </div>
                                    
                                ))}
                            </div>
                            {/* <div className='ml-0 item rounded-2xl flex flex-col'>
                                <p className='text-2xl text-black pl-11 pb-5 flex flex-row'>
                                    Name <MdOutlineReportGmailerrorred className='pt-2' />
                                </p>
                                {data.map((item, index) => (
                                    <p key={index} className='text-xl text-gray-600 pb-2 ml-5'>{item.name}</p>
                                ))}
                            </div>
                            <div className='item box rounded-2xl'>
                                <p className='text-2xl pb-5 text-black ml-20'>Message</p>
                                {data.map((item, index) => (
                                    <p key={index} className='text-xl pl-7 text-gray-600 pb-2 ml-5'>{item.message}</p>
                                ))}
                            </div>
                            <div className='item box rounded-2xl'>
                                <p className='text-2xl pb-5 text-black ml-20'>Email ID</p>
                                {data.map((item, index) => (
                                    <p key={index} className='text-xl pl-7 text-gray-600 pb-2 ml-5'>{item.emailId}</p>
                                ))}
                            </div>
                            <div className='item box rounded-2xl'>
                                <p className='text-2xl pb-5 text-black ml-20'>Status</p>
                                {data.map((item, index) => (
                                    <p key={index} className='text-xl pl-7 text-gray-600 pb-2 ml-5'>{item.status}</p>
                                ))}
                            </div> */}
                        </div>
                    </div>
                </div>







                {/* <div className='py-20 h-full flex flex-col items-center w-full flex-1 px-20 text-center bg-gray-100'>
                    <div className='flex bg-white rounded-2xl shadow-2xl w-3/4 p-5'>
                        <div className='flex flex-row pl-0 container'>
                            <div className='mr-20 item box rounded-2xl flex flex-col'>
                                <p className='text-2xl text-black px-7'>Sr No.</p>
                                {data.map((item, index) => (
                                    <p key={index} className='text-xl text-gray-600 px-7'>{index + 1}</p>
                                ))}
                            </div>
                            <div className='item box rounded-2xl flex flex-col items-start'>
                                <p className='text-2xl text-black px-7 flex flex-row'>
                                    Issue 
                                    <MdOutlineReportGmailerrorred className='pt-2' />
                                </p>
                                {data.map((item, index) => (
                                    <p key={index} className='text-xl text-gray-600 px-7'>{item.issue}</p>
                                ))}
                            </div>
                            <div className='item box rounded-2xl'>
                                <p className='text-2xl text-black px-7'>Status</p>
                                {data.map((item, index) => (
                                    <p key={index} className={`text-xl text-gray-600 px-7 ${item.status === "Active" ? "bg-green-200" : "bg-red-400"}`}>{item.status}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div> */}
            </main>
        </div>
    );
};

export default Page;
