import React from 'react'
import { ReactComponent as LoadingImage } from "../images/progress.svg";

const LoadingPage = () => {

    return (
        <div className="h-screen w-screen flex items-center justify-center">
            <div>
                <LoadingImage className="h-20 w-20" />
            </div>
        </div>);

}

export default LoadingPage