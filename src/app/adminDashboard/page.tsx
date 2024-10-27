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
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const getUsernameResponse = await axios.post("/api/users/me");
                const username = getUsernameResponse.data.data.username;

                setUsernameHeading(username);
                const req = await axios.post("/api/queries/getAllissues");
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

    

    return (
        <div>
            <Header pageName="admin" usernameHeading={usernameHeading} />
            <main className="py-20 flex flex-col items-center justify-center h-full w-full flex-1 px-20 text-center bg-gray-100">
                



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
                            
                        </div>
                    </div>
                </div>







                
            </main>
        </div>
    );
};

export default Page;
