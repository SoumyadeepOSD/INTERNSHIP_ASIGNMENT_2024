import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const imgUrls = [
    "https://api.dicebear.com/8.x/adventurer/svg?seed=Cuddles",
    "https://api.dicebear.com/8.x/adventurer/svg?seed=Abby",
    "https://api.dicebear.com/8.x/adventurer/svg?seed=Bailey",
    "https://api.dicebear.com/8.x/adventurer/svg?seed=Bailey",
    "https://api.dicebear.com/8.x/adventurer/svg?seed=Charlie"
];

const PopupCard = ({ onSelect }) => (
    <Popup trigger={<button className="text-slate-500 font-sm"> Or choose one of our defaults</button>} position="bottom center">
        <div className="w-full h-4/5">
            <h1>Choose Image</h1>
            <div className="grid grid-cols-2 items-center justify-evenly gap-5">
            {
                imgUrls.map((url, index) => (
                    <img src={url} key={index} alt='avatar' className="border-2 border-black rounded-md hover:cursor-pointer" onClick={() => onSelect(url)}/>
                ))
            }
            </div>
        </div>
    </Popup>
);

export default PopupCard;