import React from 'react'
import { BiTask } from "react-icons/bi";

const Navabar = () => {
  return (
     <nav className='flex justify-between bg-slate-600 text-white py-5'>
        <div className="mx-8 md:mx-20">
             <div className="logo flex items-center gap-1"><BiTask /> i Task
             </div>
        </div>
        <div className="">
             <ul className='flex gap-2 md:gap-8 mx-4 md:mx-20'>
               <li className='cursor-pointer hover:font-bold'>Home</li>
               <li className='cursor-pointer hover:font-bold'>About us</li>
               <li className='cursor-pointer hover:font-bold'>Contact us</li>
             </ul>
        </div>
     </nav>
  )
}

export default Navabar
