import FirstCategory from "../images/first-category.png";
import SecondCategory from "../images/second-category.png";
import ThirdCategory from "../images/third-category.png";
import { Circle } from "lucide-react";
import { CheckCircle2 } from "lucide-react";

export const Categorycard = ({ type, isSelected, title, description, onClick }) => {
    const borderClass = isSelected ? "border-pink-500" : "border-slate-200";
    return (
      <div className="relative h-fit w-[90%] lg:w-[25%]">
      <div className={`h-full flex flex-col items-center justify-center p-3 rounded-md border-2 ${borderClass} hover:cursor-pointer transition-all duration-300 overflow-y-hidden`} onClick={onClick}>
        <img
          src={type === "first" ? FirstCategory : type === "second" ? SecondCategory : ThirdCategory}
          alt="categories"
          width={250}
          height={250}
          className={`absolute -top-10 left-0 right-0 m-auto ${isSelected ? "-mt-16" : "mt-0"} transition-transform`}
        />
        <h1 className={`font-bold text-center whitespace-pre-line text-[20px] ${isSelected ? "mt-20": "mt-36"}`}>
          {title}
        </h1>
        {isSelected && <p className="text-center whitespace-pre-line text-slate-500 text-sm mt-5">{description}</p>}
        {isSelected ?
          <CheckCircle2 fill="#f43f5e" className="text-white mt-5" />
          : <Circle className="text-slate-300 mt-5" />}
      </div>
      </div>
    );
  };
  