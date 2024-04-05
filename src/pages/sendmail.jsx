import { sendEmailHelperFunction } from "../services/sendEmail";
import { footerdata } from "../components/static/footerData";
import { menudata } from "../components/static/menuData";
import dribbleLogo from "../images/dribble-logo.png";
import React, { useState, useEffect } from "react";
import MenuBar from "../components/menubar";
import LoadingPage from "./loading-page";
import {
    BriefcaseBusiness,
    CircleCheckIcon,
    AlignJustify,
    CircleXIcon,
    Search,
    Mail,
    X,
    Earth,
    Twitter,
    Facebook,
    Instagram,
} from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPinterest, faInstagram, faFacebook, faTwitter, } from "@fortawesome/free-brands-svg-icons"
import { faFirefoxBrowser } from "@fortawesome/free-brands-svg-icons";
import {  faEarthAmerica } from "@fortawesome/free-solid-svg-icons"
const tagline = "Dribble is the world's leading \ncommunity for creatives to share, grow, \nand get hired.";

const EmailVerification = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [params, setParams] = useState({
        email: "",
        avatar: ""
    });

    // useEffect(() => {
    //     const email = window.localStorage.getItem("email");
    //     const avatar = window.localStorage.getItem("avatar");
    //     console.log(email);
    //     setParams({ email, avatar: avatar });
    //     if (email && avatar) {
    //         handleSubmit();
    //     }
    // }, []);

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
        <div className="flex flex-col h-screen items-center w-full">
            <section className="w-[90%] flex flex-col lg:flex-row items-center justify-between z-0">
                {/*----------------------------- DRIBBLE LOGO----------------------------- */}
                <div className="flex flex-row items-center justify-between w-full lg:w-fit">
                    <img
                        src={dribbleLogo}
                        className="w-24 h-24"
                        alt="dribble logo"
                    />
                    {/* -------------MENU ICON FOR SMALL DEVICES------------------------------ */}
                    <div className="rounded-full  border-2 border-slate-300 h-10 w-10 bg-red-400 bg-contain lg:hidden"
                    // style={{ backgroundImage: `url(${params.avatar})` }} 
                    />
                    <div className="rounded-md bg-pink-500 px-5 py-3 lg:hidden">
                        <h2 className="text-white">Upload</h2>
                    </div>
                    {isOpen ? <X onClick={() => setIsOpen(!isOpen)} /> : <AlignJustify className="lg:hidden" onClick={() => setIsOpen(!isOpen)} />}
                </div>
                {/* -------------LEFT SECTION-------------- */}
                <div className="hidden lg:flex flex-row items-center gap-10 w-[90%] mx-8">
                    {
                        menudata.map((item, index) => (
                            <p key={index} className="text-slate-500 text-sm">{item.name}</p>
                        ))
                    }
                </div>
                {/* -------------RIGHT SECTION------------- */}
                <ul className="flex flex-row items-center justify-between w-full lg:w-fit gap-5">
                    {/* -------------SEAARCH BAR WITH ICON------------- */}

                    <div className="rounded-md bg-slate-200 pl-3 py-3 flex flex-row gap-3 w-[80%]">
                        <Search color="#A4A4A4" />
                        <h2 className="text-slate-400 pr-8">Search</h2>
                    </div>
                    {/* -------------WORK ICON------------------------- */}
                    <li>
                        <div className="relative">
                            <BriefcaseBusiness fill="#BEBDBD" color="white" />
                            <CircleXIcon className="absolute top-3 left-3" height={15} width={15} fill="#828282" color="white" />
                        </div>
                    </li>
                    {/* -------------PROFILE ICON WITH AVATAR---------- */}
                    <div className="hidden lg:flex flex-row items-center justify-center gap-5">
                        <li>
                            <div className="rounded-full  border-2 border-slate-300 h-10 w-10 bg-red-400 bg-contain"
                            // style={{ backgroundImage: `url(${params.avatar})` }} 
                            />
                        </li>
                        {/* -------------UPLOAD BUTTON--------------------- */}
                        <li>
                            <div className="rounded-md bg-pink-500 px-5 py-3">
                                <h2 className="text-white">Upload</h2>
                            </div>
                        </li>
                    </div>
                    {/* ================ENDING OF RIGHT SECTION============== */}
                </ul>
            </section>
            {/* ==============FOR SMALL SCREEN DEVICES : MENUBAR================ */}
            {isOpen && <MenuBar />}
            {/* ==============HERO SECTION====================================== */}
            <section className="flex flex-col items-center justify-center mt-10">
                <h1 className="font-bold text-3xl text-center">Please verify your email...</h1>
                <div className="relative">
                    <Mail fill="#A4A4A4" color="#FFFFFF" className="mt-3" height={150} width={150} />
                    <CircleCheckIcon color="white" fill="#FF0093" height={50} width={50} className="absolute top-5 right-0" />
                </div>
                <h2 className="text-center text-slate-500 my-2">Please verify your email address. We've sent a confirmation email to:</h2>
                {/* ============================================================email.toSting()============================================ */}
                {/* <h2 className="text-center font-bold my-2">{params.email.toString()}</h2> */}
                <h2 className="text-center font-bold my-2">email</h2>
                <h2 className="text-sm lg:text-base text-center text-slate-500 my-2">Click the confirmation link in that email to begin using Dribble.</h2>
                <h2 className="text-sm lg:text-base text-center text-slate-500 my-2">Didn't receive the email? Check your spam folder,it may have been caught by a filter. If</h2>
                <h2 className="text-sm lg:text-base text-center text-slate-500">you still don't see it,you can send <span className="font-bold text-pink-500 hover:cursor-pointer" onClick={handleSubmit}>resend the confirmation email.</span></h2>
                <h2 className="text-sm lg:text-base text-center text-slate-500 my-5">Wrong email address? <span className="font-bold text-pink-500">Change it</span></h2>
            </section>
            {/* ==============FOOTER SECTION====================================== */}
            <footer className="grid grid-cols-1 lg:grid-cols-6 items-center lg:items-start justify-center w-full px-10 mt-40 pt-20 pb-32 bg-slate-100">
                {/* ===========FOOTER DRIBBLE LOGO AND TAGLINE============= */}
                <div>
                    <img
                        src={dribbleLogo}
                        className="w-24 h-24"
                        alt="dribble logo"
                    />
                    <p className="text-slate-500 text-sm whitespace-pre-line">{tagline}</p>
                    <div className="flex flex-row items-start justify-between mt-5">
                        <FontAwesomeIcon icon={faEarthAmerica} size="lg"/>
                        <FontAwesomeIcon icon={faTwitter} size="lg"/>
                        <FontAwesomeIcon icon={faFacebook} size="lg"/>
                        <FontAwesomeIcon icon={faInstagram} size="lg"/>
                        <FontAwesomeIcon icon={faPinterest} size="lg"/>
                    </div>
                </div>
                {/* -------------FOOTER LINKS------------- */}
                <div className="grid grid-cols-2 mt-10">
                {footerdata.map((column) => (
                    <ul key={column.id} className="flex flex-col items-start justify-start">
                        <li className="font-bold text-sm">{column.title}</li>
                        {column.links.map((link) => (
                            <li key={link} className="text-slate-500 text-sm my-2">{link}</li>
                        ))}
                    </ul>
                ))}
                </div>
                
            </footer>
        </div>
    );
};

export default EmailVerification;
