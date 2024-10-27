'use client';

import axios, { AxiosError } from 'axios';
import React, { useState, useEffect } from 'react';
import { IoCloseCircle } from "react-icons/io5";

import Dialog from '../components/Dialog';
import Header from '../components/Header';

interface Issue {
    name: string;
    emailId: string;
    message: string;
    status: string;
}

const Page = () => {
    const [showDialog, setShowDialog] = useState(false);
    const [usernameHeading, setUsernameHeading] = useState("");
    const [data, setData] = useState<Issue[]>([]);
    const [name, setName] = useState("");
    const [emailId, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("New");

    const handleCloseDialog = () => setShowDialog(false);

    const handleError = (error: unknown) => {
        if (error instanceof AxiosError) {
            console.error(error.message);
        } else {
            console.error("An unexpected error occurred");
        }
    };

   useEffect(()=>{
    const fetchData = async () => {
        try {
            const getUsernameResponse = await axios.post("/api/users/me");
            setUsernameHeading(getUsernameResponse.data.data.username);

            const req = await axios.get("/api/leads");
            setData(req.data.leads);
        } catch (error) {
            handleError(error);
        }
    }
    fetchData();
},[])

    const onLeadStatusNew = async () => {
        try {
            const req = await axios.post("/api/leadByStatus", { status: "New" });
            setData(req.data.leads);
        } catch (error) {
            handleError(error);
        }
    };

    const onLeadStatusDemo = async () => {
        try {
            const req = await axios.post("/api/leadByStatus", { status: "Demo Scheduled" });
            setData(req.data.leads);
        } catch (error) {
            handleError(error);
        }
    };

    const onLeadStatusLast = async () => {
        try {
            const req = await axios.post("/api/leadByStatus", { status: "Demo Done" });
            setData(req.data.leads);
        } catch (error) {
            handleError(error);
        }
    };

    const onLeadStatusClosed = async () => {
        try {
            const req = await axios.post("/api/leadByStatus", { status: "Lead Closed" });
            setData(req.data.leads);
        } catch (error) {
            handleError(error);
        }
    };

     // Add fetchData as a dependency

    const onSubmit = async () => {
        try {
            const leadDetails: Issue = {
                name,
                emailId,
                message,
                status
            };

            await axios.post("/api/addLead", leadDetails);

            setData((prevData) => [...prevData, leadDetails]);

            setName("");
            setEmail("");
            setMessage("");
            setStatus("New");

            setShowDialog(false);
        } catch (error) {
            handleError(error);
        }
    };

    return (
        <div className='bg-gray-100 h-screen'>
            <div className='m'>
                <Header pageName="admin" usernameHeading={usernameHeading} />
            </div>

            <main className="flex flex-col items-center justify-center h-full w-full flex-1 px-20 text-center bg-gray-100">
                <div className='flex flex-col items-center w-full flex-1 px-20 text-center bg-gray-100'>
                    <button
                        onClick={() => setShowDialog(true)}
                        className="bg-orange-500 mt-10 mr-10 font-semibold text-white border-2 rounded-full py-2 px-12 hover:text-orange-400 hover:bg-white duration-200"
                    >
                        <span className='py-5 text-2xl'> + </span>Add Lead
                    </button>
                </div>

                <Dialog title="Add Lead" onClose={handleCloseDialog} onOk={onSubmit} showDialog={showDialog}>
                    <div className='flex flex-col rounded-xl items-center w-full flex-1 px-20 text-center bg-gray-100'>
                        <button className="flex" onClick={handleCloseDialog}>
                            <IoCloseCircle className='text-red-700 text-3xl flex my-3' />
                        </button>
                        <label className='text-gray-800 pr-5' htmlFor="name">Enter Name</label>
                        <input className="mr-10 pl-10 bg-white border rounded-full border-gray-500 flex-1 text-black" type="text" onChange={(e) => setName(e.target.value)} id="name" />

                        <label className='text-gray-800 pr-5' htmlFor="email">Enter Email ID</label>
                        <input className="mr-10 pl-10 bg-white border rounded-full border-gray-500 flex-1 text-black" type="text" onChange={(e) => setEmail(e.target.value)} id="email" />

                        <label className='text-gray-800 pr-5' htmlFor="message">Enter Message</label>
                        <input className="mr-10 pl-10 bg-white border rounded-full border-gray-500 flex-1 text-black" type="text" onChange={(e) => setMessage(e.target.value)} id="message" />

                        <label className='text-gray-800 pr-5' htmlFor="status">Select Status</label>
                        <select onChange={(e) => setStatus(e.target.value)} id='status' className="text-center text-lg mr-10 px-14 py-1 bg-white border rounded-full border-gray-500 flex-1 text-black">
                            <option value="New">New Lead</option>
                            <option value="Demo Scheduled">Demo Scheduled</option>
                            <option value="Demo Done">Demo Done</option>
                            <option value="Lead Closed">Lead Closed</option>
                        </select>

                        <button onClick={onSubmit} className="bg-orange-500 mt-10 mb-10 mr-10 font-semibold text-white border-2 rounded-full py-2 px-12 hover:text-orange-400 hover:bg-white duration-200">Add New Lead</button>
                    </div>
                </Dialog>

                <div>
                    <button onClick={onLeadStatusNew} className="bg-orange-500 mt-10 mr-10 font-semibold text-white border-2 rounded-full py-2 px-12 hover:text-orange-400 hover:bg-white duration-200">New Leads</button>
                    <button onClick={onLeadStatusDemo} className="bg-yellow-500 mt-10 mr-10 font-semibold text-white border-2 rounded-full py-2 px-12 hover:text-yellow-400 hover:bg-white duration-200">Demo Scheduled</button>
                    <button onClick={onLeadStatusLast} className="bg-violet-500 mt-10 mr-10 font-semibold text-white border-2 rounded-full py-2 px-12 hover:text-violet-400 hover:bg-white duration-200">Demo Done</button>
                    <button onClick={onLeadStatusClosed} className="bg-green-500 mt-10 mr-10 font-semibold text-white border-2 rounded-full py-2 px-12 hover:text-green-400 hover:bg-white duration-200">Lead Closed</button>
                </div>

                <div className='py-20 h-full flex flex-col items-center w-screen flex-1 px-20 text-center bg-gray-100'>
                    <div className='flex bg-white rounded-2xl shadow-2xl p-5'>
                        <div className='flex flex-row'>
                            <div className='mr-0 item rounded-2xl flex flex-col'>
                            <div className='flex '>
                                        <p  className='text-xl w-20 text-black pb-2'>Sr. No.</p>
                                        <p  className='text-xl w-64 text-black pb-2 ml-5'>Name</p>
                                        <p  className='text-xl w-44 pl-7 text-black pb-2 ml-5'>Message</p>
                                        <p  className='text-xl w-64 pl-7 text-black pb-2 ml-5'>E-mail</p>
                                        <p  className='text-xl w-48 pl-7 text-black pb-2 ml-5'>Status</p>
                                    </div>
                                {/* <p className='text-2xl text-black px-7 pb-5'>Sr No.</p> */}
                                {data.map((item, index) => (
                                    <div key={index} className='flex '>
                                        <p  className='text-xl w-20 text-gray-600 pb-2'>{index + 1}</p>
                                        <p  className='text-xl w-64 text-gray-600 pb-2 ml-5'>{item.name}</p>
                                        <p  className='text-xl w-44 pl-7 text-gray-600 pb-2 ml-5'>{item.message}</p>
                                        <p  className='text-xl w-64 pl-7 text-gray-600 pb-2 ml-5'>{item.emailId}</p>
                                        <p  className='text-xl w-48 pl-7 text-gray-600 pb-2 ml-5'>{item.status}</p>
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
            </main>
        </div>
    );
};

export default Page;
