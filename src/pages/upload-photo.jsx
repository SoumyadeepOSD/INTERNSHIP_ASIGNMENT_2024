import React, { useState } from 'react'
import dribbleLogo from "../images/dribble-logo.png";
import { ChevronRightIcon, Camera } from 'lucide-react';


const UploadPhoto = () => {
    const [location, setLocation] = useState("");
    const activeclass = "text-white bg-pink-500 rounded-md px-20 py-3 my-4";
    const inactiveclass = "text-white bg-pink-200 rounded-md px-20 py-3 my-4";
    
    
    const handleSubmit = async (e) => {
    };
    
    return (
        <div className="flex flex-col items-center h-screen">
            <section className="mx-5 w-[90%]">
                <img
                    src={dribbleLogo}
                    className="w-24 h-24"
                    alt="dribble logo"
                />
            </section>
            <div></div>
            <section className="flex flex-col items-start justify-start w-1/2 mt-5 h-full">
                <h1 className="font-bold text-4xl my-3">Welcome!Let's create your profile</h1>
                <h5 className="text-slate-500 font-sm">Lets others get to know you better! You can do these later</h5>

                <h2 className="font-bold mt-8 mb-4">Add an avatar</h2>
                <div className="flex flex-row items-start justify-between mb-16">
                    <div className="rounded-full border-dotted border-4 border-slate-400 h-40 w-40 flex flex-col items-center justify-center">
                        <Camera className=" text-slate-500" />
                    </div>
                    <div className="flex flex-col items-start justify-start mx-20 gap-5">
                        <div className="p-2 border-2 border-slate-200 rounded-md font-bold">Choose image</div>
                        <div className="flex flex-row items-center justify-start">
                            <ChevronRightIcon className="text-slate-500 font-sm" />
                            <p className="text-slate-500 font-sm">Or choose one of our defaults</p>
                        </div>
                    </div>
                </div>
                <h2 className="font-bold mb-3">Add your location</h2>
                <input
                    type="text"
                    placeholder="Enter a location"
                    className="text-slate-500 font-sm mb-10"
                    onChange={(e) => setLocation(e.target.value)}
                />
                <div className="flex flex-col items-center justify-center">
                    <button className={location ? activeclass : inactiveclass} onClick={handleSubmit}>Next</button>
                    {location ? <h1 className="text-slate-400 font-medium">or Press RETURN</h1> : null}
                </div>
            </section>
        </div>
    )
}

export default UploadPhoto