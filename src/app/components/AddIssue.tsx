import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const AddIssue = () => {
    const [issue, setIssue] = useState("")
    const [status, setStatus] = useState("")
    

    const onSubmit =async ()=>{

        const issueAdded = await axios.post("/api/queries/issues",{
            issue:issue,
            status:status
        }) 

        //  data.push({
        //     "issue": issue,
        //     "status": status
        //  })
          
         setIssue("");
         console.log(issueAdded)

    }
  return (
    <>
    <div className='   flex  items-center w-full flex-1 px-20 text-center bg-gray-100'>
            
            <label className='text-gray-800 pr-5' htmlFor="issue">Enter Issue</label>
            <input className="mr-10 pl-10 bg-white border rounded-full  border-gray-500 flex-1 text-black" type="text" name="" onChange={(e)=>setIssue(e.target.value)}  id="issue" />

            <label className='text-gray-800 pr-5' htmlFor="status">Enter Status</label>
            <input className="mr-10 pl-10 bg-white border rounded-full border-gray-500 flex-1 text-black" type="text" name="" onChange={(e)=>setStatus(e.target.value)}  id="status" />

            <button onClick={onSubmit} className="bg-orange-500 font-semibold text-white border-2 rounded-full py-2 px-12 hover:text-orange-400 hover:bg-white duration-200">Add Issue Ticket</button>


        </div>
    </>
  )
}

export default AddIssue