import React from 'react'
import {Link} from "react-router-dom";
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Landing = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-slate-100 h-screen w-screen">
      <h1 className="text-blue-500">Demo Home Page</h1>
      <Link to={"/signup"}>
        <h1 className="text-black font-extrabold text-2xl flex flex-row ga-2">
        Signup
        <FontAwesomeIcon icon={faArrowAltCircleRight} className="ml-2" size='lg' />
        </h1>
      </Link>
    </div>
  )
}

export default Landing