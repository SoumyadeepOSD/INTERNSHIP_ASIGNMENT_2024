import { useRef, useEffect } from "react"

const UploadWidget = () => {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: "open-container",
            uploadPreset: "",
        }, function (error, result) {

        });
    }, []);
    return (
        <div className="p-2 border-2 border-slate-200 rounded-md font-bold"
            onClick={() => widgetRef.current.open()}
        >
            Upload Photo
        </div>
    );
}

export default UploadWidget