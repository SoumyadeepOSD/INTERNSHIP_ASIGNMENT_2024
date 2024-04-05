import { sendEmailHelperFunction } from "../services/sendEmail";
import { categories } from '../components/static/categoryData';
import { Categorycard } from '../components/category-card';
import dribbleLogo from "../images/dribble-logo.png";
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import LoadingPage from './loading-page';

const activeclass = "text-white bg-pink-500 rounded-md px-20 py-3 my-4";
const inactiveclass = "text-white bg-pink-200 rounded-md px-20 py-3 my-4";

const SelectCategory = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [isSelected, setIsSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    const email = window.localStorage.getItem("email");
    setEmail(email);
  }, [])
  
  async function handleSubmit() {
    if (isSelected) {
      setIsLoading(true);
      try {
        await sendEmailHelperFunction({
          email: email
        });
        navigate("/signup/email-verification");
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setIsSelected(true);
  };

  if (isLoading) {
    return <LoadingPage />
  }

  return (
    <div className="flex flex-col h-screen items-center">
      <section className="mx-5 w-[90%]">
        <img
          src={dribbleLogo}
          className="w-24 h-24"
          alt="dribble logo"
        />
      </section>
      <section className="w-[80%]">
        <h1 className="font-bold text-3xl text-center">What brings you to Dribble?</h1>
        <h2 className="text-center text-slate-500 my-2">Select the options that best describe you. Don't worry, you can explore other options later.</h2>
        <div className="flex flex-col lg:flex-row flex-wrap items-center justify-evenly w-full mt-20 gap-20 lg:gap-5">
          {categories.map((category) => (
            <Categorycard
              key={category.id}
              type={category.id}
              isSelected={selectedCategoryId === category.id}
              title={category.title}
              description={category.description}
              onClick={() => handleCategorySelect(category.id)}
            />
          ))}
        </div>
        <div className="flex flex-col items-center justify-center mt-10">
          {isSelected ? <h1 className="font-bold text-center">Anything else? You can select multiple</h1> : null}
          <button className={isSelected ? activeclass : inactiveclass} onClick={handleSubmit}>Finish</button>
          {isSelected ? <h1 className="text-slate-400 font-medium">or Press RETURN</h1> : null}
        </div>
      </section>
    </div>
  )
}

export default SelectCategory
