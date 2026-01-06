import { useState } from "react";
import { IoSettings } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { settings } from "./Local";

const Navigation = () => {
  const [ openSetting, setOpenSetting ] = useState(false)

  const handleSettings = () => {
    setOpenSetting( prev => !prev );
  }
  return (
    <div className='relative bg-white h-30 md:h-20 text-black p-3 '>
      <div className='w-11/12 m-auto grid grid-cols-2  md:grid-cols-3 border-b-2 md:border-none'>
        <div className="font-bold nowrap">
           <span className="text-green-500 italic text-2xl md:text-4xl lg:text-5xl">XO</span><span className="text-xl md:text-3xl"> Arena</span>
        </div>
        <div className="hidden md:block">
        <div className="flex justify-center items-center text-2xl">
            <CgProfile size={40} /> &nbsp;
            <span> 0</span>
            <span>&nbsp;-&nbsp;</span>
            <span>0 </span>&nbsp;
            <CgProfile size={40}/>
        </div>
        </div>
        <div className="flex justify-end text-gray-700"> 
          <IoSettings size={40} onClick={handleSettings}/>

          {openSetting && ( 
            <div className="z-10 absolute mt-10 bg-white text-black p-6">
              <h1 className="font-extrabold text-3xl text-center my-4"> Settings </h1>
               {settings.map((setting) =>
                <ul key={setting.id} className="text-2xl font-bold">
                 <li className="flex border-b-2 p-4 hover:uppercase">{setting.name} &nbsp; {setting.icon}</li>
                </ul>
               )}
            </div>
            )}
        </div>
        </div>
        <div className="block md:hidden mt-4">
         <div className="flex justify-center items-center text-2xl">
            <CgProfile size={40} /> &nbsp;
            <span> 0</span>
            <span>&nbsp;-&nbsp;</span>
            <span>0 </span>&nbsp;
            <CgProfile size={40}/>
        </div>
        </div>
    </div>
  )
}

export default Navigation
