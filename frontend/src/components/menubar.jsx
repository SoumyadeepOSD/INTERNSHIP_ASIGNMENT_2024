import React from 'react'
import {menudata} from "../components/static/menuData.js";

const MenuBar = () => {
    return (
        <div className="w-[80%] pb-10 z-10 rounded-lg shadow-lg bg-slate-800">
            {
                            menudata.map((item, index) => {
                    return (
                        <div key={index} className="w-full flex items-center justify-center">
                            <h1 className="text-white text-sm font-bold my-3">{item.name}</h1>
                        </div>);
                })
            }
        </div>
    )
}

export default MenuBar