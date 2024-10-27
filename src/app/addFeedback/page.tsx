'use client'


import React, { useState } from 'react'
import toast from 'react-hot-toast'
import Image from 'next/image'
import manSitting from '@/public/manSitting.svg'
import Link from 'next/link'
import { FaArrowRightLong } from 'react-icons/fa6'
import axios from 'axios'

const Page = () => {
    const feedbackValue = "for the following feedback give the response as only positive or negative: "

    const [feedbackType, setFeedbackType] = useState("Please give your valuable feedback !")
    const [feedback, setFeedback] = useState("")
    const [displayLine, setDisplayLine] = useState(feedbackType)

    const generateFeedback = async () => {
        try {
            const prompt = feedbackValue + feedback
            const feedbackResponse = await axios.post("/api/gemini", { prompt })

            const thought = feedbackResponse.data.output
            console.log(thought)
            setFeedbackType(thought)
            const feedbackData = {
                feedback: feedback,
                feedbackType: thought
            }

            const feedbackAdded = await axios.post("/api/feedback", feedbackData)

            console.log(feedbackAdded)
            if (thought === "Positive" || feedbackType === "positive") {
                setDisplayLine("Thank You for appreciating our efforts.")
            } else {
                setDisplayLine("Sorry, we will rectify our mistake at earliest")
            }

            setFeedback("")
            toast.success('Feedback Added')

        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.log("Axios error message:", error.message);
            } else if (error instanceof Error) {
                console.log("General error message:", error.message);
            } else {
                console.log("An unexpected error occurred:", error);
            }
        }
    }

    return (
        <>
            <header className="mx-auto py-4 sticky top-0 bg-gray-100 bg-opacity-80 z-20 border-b">
                <div className="flex items-center justify-between text-sm container ">
                    <nav className="flex items-center justify-center">
                        <span className="pr-5"></span>
                        {/* Desktop Menu */}
                        <ul className="hidden lg:flex items-center justify-center gap-6">
                            <Link
                                href="http://localhost:5173/"
                                target="_blank"
                                className="text-neutral-600 hover:text-neutral-900 cursor-pointer transition-all ease-linear duration-200"
                            >
                                Image Analyser
                            </Link>
                        </ul>
                    </nav>
                    <div className="max-sm:hidden max-lg:hidden flex ">
                        <ul className="flex justify-start mr-16"></ul>
                        <div className="justify-end">
                            <Link
                                href="/login"
                                type="button"
                                className="hover:bg-gray-100 ring-1 ring-black text-black duration-200 transition-all px-2 py-1 rounded text-sm flex items-center justify-center gap-2 max-sm:text-lg"
                            >
                                Log in{" "}
                                <span>
                                    <FaArrowRightLong className="h-3 w-3" />
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            <div className='flex '>
                <div className='ml-56 mt-20'>
                    <Image
                        priority
                        src={manSitting}
                        alt="Follow us on Twitter"
                    />
                </div>
                <div className='pl-10 mt-60 text-center'>
                    <h1 className='text-4xl'>Feedback</h1>
                    <p className='mt-7 text-xl'>{displayLine}</p>

                    <input
                        className='text-black text-xl rounded-2xl pl-5 mr-10 mt-20'
                        value={feedback}
                        style={{ width: "400px", height: "50px" }}
                        type="text"
                        placeholder='Enter Feedback'
                        onChange={(e) => setFeedback(e.target.value)}
                    />
                    <button
                        onClick={generateFeedback}
                        className='bg-red-400 border-white text-2xl text-white rounded-xl px-3 h-14'
                    >
                        Click Me
                    </button>
                </div>
            </div>

            <div className='flex flex-col'>
                <Link href="/products?showDialog=y" className='text-3xl underline mr-20'>With Modal</Link>
                <Link href="/products" className='text-3xl underline'>Without Modal</Link>
            </div>
        </>
    )
}

export default Page