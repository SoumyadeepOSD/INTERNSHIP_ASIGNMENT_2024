import React, { useState } from 'react'
import dribbleLogo from "../images/dribble-logo.png";
import { ChevronRightIcon, Camera } from 'lucide-react';
import UploadWidget from '../components/uploadWidget';
import { useLocation, useNavigate } from 'react-router-dom';
import { ReactComponent as LoadingImage } from "../images/progress.svg";

const UploadPhoto = () => {
    const [location, setLocation] = useState("");
    const [image, setImage] = useState(null);
    const [imageUploaded, setImageUploaded] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const history = useLocation();
    const userName = history.state.userName;
    const activeclass = "text-white bg-pink-500 rounded-md px-20 py-3 my-4";
    const inactiveclass = "text-white bg-pink-200 rounded-md px-20 py-3 my-4";
    const navigator = useNavigate();

    const handleUpload = (file) => {
        setImage(file);
    };

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

            const userUpdateResponse = await fetch("http://localhost:5000/auth/upload-photo", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    location,
                    avatar,
                    userName,
                }),
            });

            if (!userUpdateResponse.ok) {
                throw new Error('Failed to update user data');
            }

            // Redirect to the next page after successful update
            navigator('/signup/select-category');
        } catch (error) {
            console.error(error);
            // Handle error
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="h-screen w-screen flex items-center justify-center">
                <div>
                    <LoadingImage className="h-20 w-20" />
                </div>
            </div>);
    }

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
                    {image ? (
                        <div
                            className="rounded-full border-dotted border-4 border-slate-400 h-40 w-40 flex flex-col items-center justify-center"
                            style={{ backgroundImage: `url(${URL.createObjectURL(image)})`, backgroundSize: "cover" }}
                        />
                    ) : (
                        <div className="rounded-full border-dotted border-4 border-slate-400 h-40 w-40 flex flex-col items-center justify-center">
                            <Camera className=" text-slate-500" />
                        </div>
                    )}

                    <div className="flex flex-col items-start justify-start mx-20 gap-5">
                        <UploadWidget onUpload={handleUpload} />
                        <div className="flex flex-row items-center justify-start">
                            <ChevronRightIcon className="text-slate-500 font-sm" />
                            <p className="text-slate-500 font-sm">Or choose one of our defaults</p>
                        </div>
                    </div>
                </div>
                {!imageUploaded && <h2 className="text-red-600 text-xs font-medium">Upload an image first</h2>}
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

export default UploadPhoto;
