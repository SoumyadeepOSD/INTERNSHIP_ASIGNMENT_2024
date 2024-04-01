import React, { useState } from 'react'
import { InputField } from '../../components/input-field';

const Signup = () => {
    const [isChecked, setIsChecked] = useState(false);
    return (
        <div className="flex flex-col lg:flex-row items-center justify-center h-screen w-screen">
            <div className="w-full lg:w-[30%] bg-yellow-200 h-0 lg:h-screen"></div>
            {/* ------------------right side or signup------------------------------------------------------------- */}
            <section className="w-[70%] flex flex-col h-screen">
                <div className="w-full flex items-end justify-end px-5 h-[10%]">
                    {/* Center text for mobile */}
                    <h1 className="text-center lg:text-right">Already a member? <span className="text-purple-400">Sign In</span></h1>
                </div>
                <section className="w-full h-96 lg:h-full flex flex-col items-center justify-center lg:gap-10">
                    <div className="h-[90%] flex flex-col justify-between w-full gap-5 lg:w-auto">
                        {/* Center text for mobile */}
                        <h1 className="font-bold text-2xl text-center lg:text-left">Sign up to Dribble</h1>

                        <div className="lg:flex lg:gap-5">
                            <InputField label="Name" type="text" placeholder="Enter your First Name" />
                            <InputField label="Username" type="text" placeholder="Enter your Username" />
                        </div>

                        <InputField label="Email" type="email" placeholder="Enter your Email" />
                        <InputField label="Password" type="password" placeholder="6+ characters" />


                        {/* checkbox */}
                        <div className="flex flex-row items-start justify-justify">
                            <div className="flex flex-row items-start justify-center">
                                <input type="checkbox" checked={isChecked} className="mt-1 mr-2 h-5 w-5" onClick={() => setIsChecked(!isChecked)} />
                                <div className="flex flex-col text-slate-500 font-medium">
                                    <p>Creating an account means you're okay with our <span className="text-purple-800">Terms of</span></p>
                                    <p><span className="text-purple-800">Service, Privacy Policy</span> and our default <span className="text-purple-600">Notification</span></p>
                                    <p><span>Settings.</span></p>
                                </div>
                            </div>
                        </div>
                        {/* checkbox */}

                        {/* Button */}
                        <button className="bg-pink-600 p-5 rounded-md">
                            <h1 className="text-white font-medium">Create Account</h1>
                        </button>

                        <div className="flex flex-col items-start justify-start text-slate-500 font-medium">
                            <p>This site is protected by reCAPTCHA and the Google</p> 
                            <p><span className="text-purple-800">Privacy Policy</span> and <span className="text-purple-800">Terms of Service</span> apply.</p>
                        </div>
                    </div>
                </section>
            </section>
            {/* ----------------------------------------------------------------------------------------------------- */}
        </div>
    )
}

export default Signup;
