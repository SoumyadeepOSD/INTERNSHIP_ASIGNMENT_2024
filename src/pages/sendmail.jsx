import { useState, useEffect } from "react";
import LoadingPage from "./loading-page";
import { sendEmailHelperFunction } from "../services/sendEmail";
import dribbleLogo from "../images/dribble-logo.png";
import { Mail, CircleCheckIcon, Search, BriefcaseBusiness, CircleXIcon } from "lucide-react";

const EmailVerification = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [params, setParams] = useState({
        email: "",
        avatar: ""
    });

    useEffect(() => {
        const email = window.localStorage.getItem("email");
        const avatar = window.localStorage.getItem("avatar");
        console.log(email);
        setParams({ email, avatar: avatar });
        if (email && avatar) {
            handleSubmit();
        }
    }, []);

    async function handleSubmit() {
        try {
            // setIsLoading(true);
            // await sendEmailHelperFunction({ email: params.email });
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    if (isLoading) {
        return <LoadingPage />
    }

    return (
        <div className="flex flex-col h-screen items-center">
            <section className="mx-5 w-[90%] flex flex-row items-center justify-between">
                <ul className="flex flex-row items-center justify-evenly w-[60%]">
                    <img
                        src={dribbleLogo}
                        className="w-24 h-24"
                        alt="dribble logo"
                    />
                    <li className="text-slate-500">Inspiration</li>
                    <li className="text-slate-500">Find Work</li>
                    <li className="text-slate-500">Learn Design</li>
                    <li className="text-slate-500">Go Pro</li>
                    <li className="text-slate-500">Hire Designers</li>
                </ul>

                <ul className="flex flex-row items-center justify-evenly w-fit gap-5">
                    <li>
                        <div className="rounded-md bg-slate-200 pl-3 py-3 flex flex-row gap-3">
                            <Search color="#A4A4A4" />
                            <h2 className="text-slate-400 pr-8">Search</h2>
                        </div>
                    </li>
                    <li>
                        <div className="relative">
                            <BriefcaseBusiness fill="#BEBDBD" color="white" />
                            <CircleXIcon className="absolute top-3 left-3" height={15} width={15} fill="#828282" color="white" />
                        </div>
                    </li>
                    <li>
                        <div className="rounded-full  border-2 border-slate-300 h-10 w-10 bg-red-400 bg-contain" style={{ backgroundImage: `url(${params.avatar})` }}/>
                    </li>
                    <li>
                        <div className="rounded-md bg-pink-500 px-5 py-3">
                            <h2 className="text-white">Upload</h2>
                        </div>
                    </li>
                </ul>
            </section>
            <section className="flex flex-col items-center justify-center mt-10">
                <h1 className="font-bold text-3xl text-center">Please verify your email...</h1>
                <div className="relative">
                    <Mail fill="#A4A4A4" color="#FFFFFF" className="mt-3" height={150} width={150} />
                    <CircleCheckIcon color="white" fill="#FF0093" height={50} width={50} className="absolute top-5 right-0" />
                </div>
                <h2 className="text-center text-slate-500 my-2">Please verify your email address. We've sent a confirmation email to:</h2>

                <h2 className="text-center font-bold my-2">{params.email.toString()}</h2>
                <h2 className="text-center text-slate-500 my-2">Click the confirmation link in that email to begin using Dribble.</h2>
                <h2 className="text-center text-slate-500 my-2">Didn't receive the email? Check your spam folder,it may have been caught by a filter. If</h2>
                <h2 className="text-center text-slate-500">you still don't see it,you can send <span className="font-bold text-pink-500 hover:cursor-pointer" onClick={handleSubmit}>resend the confirmation email.</span></h2>
                <h2 className="text-center text-slate-500 my-5">Wrong email address? <span className="font-bold text-pink-500">Change it</span></h2>
            </section>
        </div>
    );
};

export default EmailVerification;
