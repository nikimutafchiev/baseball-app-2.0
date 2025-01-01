import { useState } from "react";
import { FaFacebook, FaInstagram, FaLink, FaYoutube } from "react-icons/fa";
import { RiStarLine, RiStarFill } from "react-icons/ri";
import { Link } from "react-router-dom";
export default function Team(props) {
    const icons = {
        facebook: <FaFacebook size={20} />,
        instagram: <FaInstagram size={20} />,
        website: <FaLink size={20} />,
        youtube: <FaYoutube size={20} />
    }
    const [favorite, setFavorite] = useState(false);
    return (
        <div className="max-h-[350px] px-4 flex flex-col gap-2 items-center bg-white drop-shadow-xl py-2">
            <button className='absolute top-1 left-1 text-yellow-500' onClick={() => setFavorite(!favorite)}>{!favorite && <RiStarLine size={25} />}{favorite && <RiStarFill size={25} />}</button>
            <div className="w-full flex flex-col items-center gap-4">
                {props.logo !== "" && <img src={props.logo}></img>}
                {!props.logo && <img src="https://placehold.co/100x100"></img>}
                <h3 className="text-xl font-semibold">{props.name}</h3>
            </div>
            <hr className="border-t-2 w-full"></hr>
            <div className="w-full flex flex-col text-gray-500 items-center gap-2 text-xs">
                <div>Address: {props.address}</div>
                <div>Contact: {props.contact}</div>
                {props.socialMedia &&
                    <div className="w-3/5 flex flex-row justify-around mt-2">
                        {Object.entries(props.socialMedia).filter(([media, page]) => page !== "").map(([media, page]) => <a href={page} target="_blank">{icons[media]}</a>)}
                    </div>
                }
            </div>
            <Link className="p-2 bg-accent_2 hover:bg-accent_3 rounded text-white font-semibold text-xs" to={`${props.team_id ? props.team_id : props.id}`}>More Info</Link>

        </div>)
}