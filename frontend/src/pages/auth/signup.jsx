import React, { useState } from 'react'
import { InputField } from '../../components/input-field';
import { useNavigate } from 'react-router-dom';
import LoadingPage from '../loading-page';

const Signup = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [userData, setUserData] = useState({
        name: '',
        userName: '',
        email: '',
        password: '',
    });
    const [isEmpty, setIsEmpty] = useState(false);
    const [showCheckboxError, setShowCheckboxError] = useState(false);
    const [isDuplicate, setIsDuplicate] = useState(false);
    const [duplicateField, setDuplicateField] = useState('');
    const [ProperPasswordLength, setProperPasswordLength] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();


    const handleAlu = () => {
        navigate('/signup/alu');
    }

    const handleSignup = async () => {
        if (userData.name !== '' && userData.userName !== '' && userData.email !== '' && userData.password !== '' && isChecked) {
            if (userData.password.length >= 6) {
                setProperPasswordLength(true);
                setIsLoading(true);
                try {
                    const userDataObject = {
                        name: userData.name,
                        userName: userData.userName,
                        email: userData.email,
                        password: userData.password,
                        location: " ",
                        avatar: " ",
                    }
                    const response = await fetch('https://internship-asignment-2024.onrender.com/auth/signup',
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            mode: 'cors',
                            body: JSON.stringify(userDataObject),
                        });
                    navigate('/signup/upload-photo');
                    setIsLoading(false);
                    window.localStorage.setItem("email", userData.email.toString());
                    if (response.status === 400) {
                        const data = await response.json();
                        if (data.error === 'DuplicateEntry') {
                            setIsDuplicate(true);
                            setDuplicateField(data.message.split(' ')[0]); // Extract the field from the message
                            return; // Exit early if duplicate entry detected
                        }
                    }
                } catch (error) {
                    console.log(error);
                }finally{
                    setIsLoading(false);
                }
            } else {
                setProperPasswordLength(false);
            }
        } else {
            setIsEmpty(true);
            setShowCheckboxError(true);
        }
    };

    if(isLoading){
        return(
            <LoadingPage/>
        );
    }



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

                        {isEmpty && <div className="flex flex-row items-center">
                            <div className="bg-red-600 rounded-full h-2 w-2 mr-2" ></div>
                            <span className="text-red-600 text-xs font-medium ">Please fill all the fields</span>
                        </div>
                        }

                        {isDuplicate && <div className="flex flex-row items-center">
                            <div className="bg-red-600 rounded-full h-2 w-2 mr-2" ></div>
                            <span className="text-red-600 text-xs font-medium ">{duplicateField} has already been taken</span>
                        </div>
                        }

                        <div className="lg:flex lg:gap-5">
                            <InputField label="Name" type="text" placeholder="Enter your First Name" duplicateField={duplicateField} onChange={(e) => setUserData({ ...userData, name: e.target.value })} />
                            <InputField label="Username" type="text" placeholder="Enter your Username" duplicateField={duplicateField} onChange={(e) => setUserData({ ...userData, userName: e.target.value })} />
                        </div>

                        <InputField label="Email" type="email" placeholder="Enter your Email" duplicateField={duplicateField} onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
                        <InputField label="Password" type="password" placeholder="6+ characters" duplicateField={duplicateField} onChange={(e) => setUserData({ ...userData, password: e.target.value })} />

                        {ProperPasswordLength ? null : <h2 className="text-red-600 text-xs font-medium">Password must be 6+ characters</h2>}

                        {showCheckboxError && <h2 className="text-red-600 text-xs font-medium">Please fill the checkbox!</h2>}
                        {/* checkbox */}
                        <div className="flex flex-row items-start justify-justify">
                            <div className="flex flex-row items-start justify-center">
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    className="mt-1 mr-2 h-5 w-5"
                                    onChange={(e) => {
                                        setIsChecked(e.target.checked);
                                        setShowCheckboxError(false);
                                    }}
                                />
                                <div className="flex flex-col text-slate-500 font-medium">
                                    <p>Creating an account means you're okay with our <span className="text-purple-800">Terms of</span></p>
                                    <p><span className="text-purple-800">Service, Privacy Policy</span> and our default <span className="text-purple-600">Notification</span></p>
                                    <p><span>Settings.</span></p>
                                </div>
                            </div>
                        </div>
                        {/* checkbox */}

                        {/* Button */}
                        <button className="bg-pink-600 p-5 rounded-md" onClick={handleSignup}>
                            <h1 className="text-white font-medium">Create Account</h1>
                        </button>

                        <div className="flex flex-col items-start justify-start text-slate-500 font-medium">
                            <p>This site is protected by reCAPTCHA and the Google</p>
                            <p><span className="text-purple-800">Privacy Policy</span> and <span className="text-purple-800">Terms of Service</span> apply.</p>
                        </div>
                        <button onClick={handleAlu}>
                            Allu
                        </button>
                    </div>
                </section>
            </section>
            {/* ----------------------------------------------------------------------------------------------------- */}
        </div>
    )
}

export default Signup;
