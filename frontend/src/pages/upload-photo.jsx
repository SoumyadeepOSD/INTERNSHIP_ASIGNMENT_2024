import { ChevronRightIcon, Camera } from 'lucide-react';
import UploadWidget from '../components/uploadWidget';
import dribbleLogo from "../images/dribble-logo.png";
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import LoadingPage from './loading-page';
import PopupCard from '../components/popup-card';

const UploadPhoto = () => {
    const [imageUploaded, setImageUploaded] = useState(true);
    const [showPopup, setShowPopup] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [location, setLocation] = useState("");
    const [image, setImage] = useState(null);
    const [imageSelectionType, setImageSelectionType] = useState("upload");
    const [email, setEmail] = useState("");
    const navigator = useNavigate();
    const activeclass = "text-white bg-pink-500 rounded-md px-20 py-3 my-4";
    const inactiveclass = "text-white bg-pink-200 rounded-md px-20 py-3 my-4";



    const handleUpload = (file) => {
        if (imageSelectionType === "upload") { setImage(file); }
    };

    const handleImageSelect = (imageUrl) => {
        setImage(imageUrl);
        setImageSelectionType("avatar");
        setShowPopup(false); // Close the popup after selecting an image
    };

    useEffect(() => {
        const email = window.localStorage.getItem("email");
        setEmail(email);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!image) {
            setImageUploaded(false);
            return;
        }
        setIsLoading(true);
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', "zhvvpgkr"); // Replace 'your_upload_preset' with your Cloudinary upload preset

        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/open-container/image/upload`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to upload image to Cloudinary');
            }

            const { secure_url: avatar } = await response.json();

            const userUpdateResponse = await fetch("https://internship-asignment-2024.onrender.com/auth/upload-photo", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    location,
                    avatar,
                    email,
                }),
            });

            if (!userUpdateResponse.ok) {
                throw new Error('Failed to update user data');
            }

            // Redirect to the next page after successful update
            window.localStorage.setItem("avatar", avatar);
            navigator('/signup/select-category');
        } catch (error) {
            console.error(error);
            // Handle error
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) return (<LoadingPage />);

    return (
        <div className="flex flex-col items-center h-screen">
            <section className="mx-5 w-[90%]">
                <Link to="/">
                    <img
                        src={dribbleLogo}
                        className="w-24 h-24"
                        alt="dribble logo"
                    />
                </Link>
            </section>
            <div></div>
            <section className="flex flex-col items-start justify-start w-[90%] lg:w-1/2 mt-5 h-full">
                <h1 className="font-bold text-2xl lg:text-4xl my-3 text-center lg:text-start">Welcome!Let's create your profile</h1>
                <h5 className="text-slate-500 font-sm text-center lg:text-start">Lets others get to know you better! You can do these later</h5>

                <h2 className="font-bold mt-8 mb-4">Add an avatar</h2>

                <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-between mb-16 ">
                    {image ? (
                        <div
                            className="rounded-full border-dotted border-4 border-slate-400 h-40 w-40 flex flex-col items-center justify-center"
                            style={{
                                backgroundImage: imageSelectionType === "upload" ? `url(${URL.createObjectURL(image)})` : `url(${image})`,
                                backgroundSize: "contain"
                            }}
                        />
                    ) : (
                        <div className="rounded-full border-dotted border-4 border-slate-400 h-40 w-40 flex flex-col items-center justify-center">
                            <Camera className=" text-slate-500" />
                        </div>
                    )}

                    <div className="flex flex-col items-start justify-start mx-20 gap-5 my-5 lg:my-0">
                        <UploadWidget onUpload={handleUpload} />
                        <div className="flex flex-row items-center justify-start">
                            <ChevronRightIcon className="text-slate-500 font-sm" />
                            {/* <button className="text-slate-500 font-sm" onClick={() => setShowPopup(true)}>Or choose one of our defaults</button> */}
                            <PopupCard open={showPopup} onClose={() => setShowPopup(false)} onSelect={handleImageSelect} />
                        </div>
                    </div>
                </div>
                {!imageUploaded && <h2 className="text-red-600 text-xs font-medium">Upload an image first</h2>}
                <h2 className="font-bold mb-3">Add your location</h2>
                <input
                    type="text"
                    placeholder="Enter a location"
                    className="text-slate-500 font-sm mb-10 outline-none border-b-2 border-slate-200 w-full"
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

export default UploadPhoto;
