import { useState } from "react";
import { FaFacebook, FaInstagram, FaLink, FaYoutube } from "react-icons/fa";
import { RiStarLine, RiStarFill } from "react-icons/ri";

export default function Team(props) {
    const icons = {
        facebook: <FaFacebook size={20} />,
        instagram: <FaInstagram size={20} />,
        website: <FaLink size={20} />,
        youtube: <FaYoutube size={20} />
    }
    const [favorite, setFavorite] = useState(false);
    return (
        <div className="h-[300px] px-4 flex flex-col justify-around items-center bg-white drop-shadow-xl">
            <button className='absolute top-1 left-1 text-yellow-500' onClick={() => setFavorite(!favorite)}>{!favorite && <RiStarLine size={25} />}{favorite && <RiStarFill size={25} />}</button>
            <div className="w-full flex flex-col items-center gap-4">
                <img src={props.logo}></img>
                <h3 className="text-xl font-semibold">{props.name}</h3>
            </div>
            <hr className="border-t-2 w-full"></hr>
            <div className="w-full flex flex-col text-gray-500 items-center gap-2 text-xs">
                <div>{props.homeStadium}</div>
                <div>{props.contacts}</div>

                <div className="w-3/5 flex flex-row justify-around mt-2">
                    {Object.entries(props.socialMedia).map(([media, page]) => <a href={page} target="_blank">{icons[media]}</a>)}
                </div>
            </div>
            <button className="p-2 bg-accent_2 hover:bg-accent_3 rounded text-white font-semibold text-xs">Team Stats</button>

        </div>)
}