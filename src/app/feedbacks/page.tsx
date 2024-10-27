'use client';

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';

interface Feedback {
    feedback: string;
    feedbackType: string;
}

const Page = () => {
    const [usernameHeading, setUsernameHeading] = useState("");
    const [data, setData] = useState<Feedback[]>([]); // Specify the type of data

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await axios.post("/api/users/me");
                const username = userData.data.data.username;

                setUsernameHeading(username);
                const req = await axios.get("/api/showFeedbacks");
                setData(req.data.feedbacks); // Update data here
            } catch (error) {
                // Check if the error is an instance of Error
                if (axios.isAxiosError(error)) {
                    console.error(error.message); // Axios error message
                } else {
                    console.error("An unexpected error occurred"); // General error message
                }
            }
        };
        fetchData();
    }, []); // Run the effect only once, when the component mounts

    return (
        <div>
            <Header pageName="admin" usernameHeading={usernameHeading} />
            <main className="py-20 flex flex-col items-center justify-center h-full w-full flex-1 px-20 text-center bg-gray-100">
                <div className='py-20 h-full flex flex-col items-center w-full flex-1 px-20 text-center bg-gray-100'>


                <div className='flex flex-row'>
                            <div className='mr-0 item rounded-2xl flex flex-col'>
                            <div className='flex '>
                                        <p  className='text-xl w-20 text-black pb-2'>Sr. No.</p>
                                        <p  className='text-xl w-96 text-black pb-2 ml-5'>Feedback</p>
                                        <p  className='text-xl text-center w-44  text-black pb-2 '>Status</p>
                                    </div>
                                {/* <p className='text-2xl text-black px-7 pb-5'>Sr No.</p> */}
                                {data.map((item, index) => (
                                    <div key={index}  className='flex '>
                                        <p  className='text-xl w-20 text-gray-600 pb-2'>{index + 1}</p>
                                        <p  className='text-xl w-96  flex justify-start text-gray-600 pb-2 ml-5'>{item.feedback}</p>
                                        <p  className={`text-center w-44 text-xl text-gray-600 px-7 ${item.feedbackType === "Positive" ? "bg-green-200" : "bg-red-400"}`}>{item.feedbackType}</p>
                                        
                                    </div>
                                    
                                ))}
                            </div>
                            
                        </div>






                    
                </div>
            </main>
        </div>
    );
};

export default Page;
