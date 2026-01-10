import { useState } from "react";
import { FaPause } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { settings } from "./Local";

const Navigation = ({ scoreX, scoreO, gameMode, setGameMode }) => {
  const [ openSetting, setOpenSetting ] = useState(false)

  const handleSettings = () => {
    setOpenSetting( prev => !prev );
  }

  const nav = () => {
    return (
      <div className="flex justify-center items-center text-sm mt-2">
        <div><CgProfile size={40}  className="ml-2"/> Player 1</div> &nbsp;&nbsp;
        <span className="text-2xl font-bold">{scoreX}</span>
        <span className="text-2xl font-bold">&nbsp;-&nbsp;</span>
        <span className="text-2xl font-bold">{scoreO}</span>&nbsp;
        <div><CgProfile size={40}  className="ml-2"/> Player 2</div> &nbsp;
      </div>
    )
  }
  return (
    <div className='relative bg-white h-35 md:h-23 text-black p-3 '>
      <div className='w-11/12 m-auto grid grid-cols-2  md:grid-cols-3 border-b-2 md:border-none'>
        <div className="font-bold nowrap">
           <span className="text-green-500 italic text-2xl md:text-4xl lg:text-5xl">XO</span><span className="text-xl md:text-3xl"> Arena</span>
        </div>
        <div className="hidden md:block">
         {nav()}
        </div>
        <div className="flex justify-end text-gray-700"> 
          <FaPause size={35} onClick={handleSettings} className="mt-2"/>

          {openSetting && ( 
            <div className="z-10 absolute top-40 left-10 right-10 md:left-70 md:right-70 mt-10 bg-white text-black p-4 md:p-20">
              {/* Game Mode Selection */}
              <div className="mb-6 pb-4 border-b-2">
                <h2 className="text-2xl font-bold mb-4">Game Mode</h2>
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      setGameMode('friend');
                      setOpenSetting(false);
                    }}
                    className={`px-6 py-3 rounded font-bold ${
                      gameMode === 'friend' 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-200 text-black'
                    }`}
                  >
                    Play with Friend
                  </button>
                  <button
                    onClick={() => {
                      setGameMode('ai');
                      setOpenSetting(false);
                    }}
                    className={`px-6 py-3 rounded font-bold ${
                      gameMode === 'ai' 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-200 text-black'
                    }`}
                  >
                    Play with AI
                  </button>
                </div>
              </div>

              {/* Other Settings */}
              {settings.map((setting) =>
                <ul key={setting.id} className="md:text-2xl text-sm font-bold">
                  <li 
                    onClick={() => {
                      if (setting.name === "Play") {
                        setOpenSetting(false);
                      } else if (setting.url) {
                        setting.url();
                      }
                    }} 
                    className="flex border-b-2 p-4 hover:uppercase cursor-pointer"
                  >
                    {setting.name} &nbsp; {setting.icon}
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>
        </div>
        <div className="block md:hidden mt-4">
         {nav()}
        </div>
    </div>
  )
}

export default Navigation
