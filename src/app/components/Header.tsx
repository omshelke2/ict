"use client";

import Link from "next/link";
import DemoBtn from "./DemoBtn"


import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";




interface HeaderProps {
  usernameHeading: string; // Define the type of usernameHeading as string
  pageName:string
}

const Header: React.FC<HeaderProps> = ({usernameHeading,pageName}) => {

  
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

 

  

  return (
    <>
      <header className="mx-auto py-4 sticky top-0 bg-gray-100 bg-opacity-80 z-20 border-b">
        <div className="flex items-center justify-between text-sm container ">
          <nav className="flex items-center justify-center">
            <span className="pr-5">
              
            </span>
            {/* Desktop Menu */}
            <ul className="hidden lg:flex items-center justify-center gap-6">
              <Link
                href="/adminDashboard"
                className="text-neutral-600 hover:text-neutral-900 cursor-pointer transition-all ease-linear duration-200"
              >
               {pageName=="admin" ?"New Tickets":""} 
              </Link>
              
              
              <Link
                href="/feedbacks"
                className="text-neutral-600 hover:text-neutral-900 cursor-pointer  transition-all ease-linear duration-200"
              >
                {pageName=="admin" ?"Feedbacks":""}
                
              </Link>


              <Link
                href="/allLeads"
                className="text-neutral-600 hover:text-neutral-900 cursor-pointer  transition-all ease-linear duration-200"
              >
                {pageName=="admin" ?"Leads":""}
                
              </Link>


              <Link
                href="http://localhost:5173/"
                target="_blank"
                className="text-neutral-600 hover:text-neutral-900 cursor-pointer  transition-all ease-linear duration-200"
              >
                {/* {pageName=="admin" ?"Image Analyser":""} */}
                {/* Image Analyser */}
                
              </Link>





              {/* <Link
                href="/Contact"
                className="text-neutral-600 hover:text-neutral-900 cursor-pointer  transition-all ease-linear duration-200"
              >
                Contact
              </Link> */}
            </ul>
          </nav>
          <div className="max-sm:hidden  max-lg:hidden flex ">
            <ul className="flex justify-start mr-16">
              
              
              <Link
                href="http://localhost:5173/"
                className="ml-16 flex text-xl hover:text-neutral-600 text-neutral-900 cursor-pointer  transition-all ease-linear duration-200"
              >
                <FaRegUserCircle className="mt-1 mr-2" />
                {usernameHeading}
              </Link>
              
            </ul>
            <div className="justify-end"><DemoBtn /></div>
            
          </div>

          {/* Mobile Menu Toggle Button */}
          <button className="lg:hidden text-3xl" onClick={toggleMobileMenu}>
            <IoMenu />
          </button>
          
        </div>

        

        
      </header>
    </>
  );
};

export default Header;
