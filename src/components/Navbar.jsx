import React from 'react'
import { useState ,useEffect} from "react";
const Navbar = ({darktheme}) => {
  
  
  return (
    <nav className={darktheme?"  bg-orange-700  w-screen flex justify-between py-2":"  bg-black  w-screen flex justify-between py-2"}>
         <div className={ darktheme? " text-black font-bold text-xl mx-8 ":"text-white font-bold text-xl mx-8"}>KaamKro</div>
        <ul className={ darktheme?"flex text-xl  text-white  bg-orange-700 w-screen gap-10 mx-9 ":"flex text-xl  text-white  bg-black w-screen gap-10 mx-9 "}>  
            <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all'>Add Tasks</li>
        </ul>
       
      
    </nav>
  )
}

export default Navbar