import { RiLiveLine, RiCalendarScheduleLine, RiCheckDoubleLine, RiArrowRightCircleLine, RiStarLine, RiStarFill } from 'react-icons/ri';
import { useState } from 'react';
import { Link } from 'react-router-dom';
export default function Game(props) {
    const statusIcons = {
        live: <RiLiveLine size={25} />,
        scheduled: <RiCalendarScheduleLine size={25} />,
        ended: <RiCheckDoubleLine size={25} />
    };
    const [favorite, setFavorite] = useState(false);
    return (
        <div className="w-full flex flex-row justify-around px-8 py-2 rounded items-center text-gray-500 bg-white  font-semibold  drop-shadow-xl">
            <button className='text-yellow-500' onClick={() => setFavorite(!favorite)}>{!favorite && <RiStarLine size={30} />}{favorite && <RiStarFill size={30} />}</button>
            <div className="w-[20%] flex flex-col gap-2 items-center"><div className={`flex flex-row gap-2 items-center ${props.size == "normal" ? "text-normal" : "text-xs"}`}>{statusIcons[props.status]}{props.status}</div><div className=" font-semibold text-2xs" >{new Date(props.datetime).toLocaleString()}</div></div>
            <div className="flex flex-row justify-around items-center w-1/2">
                <div className={`w-[20%] ${props.size == "normal" ? "text-xs" : "text-3xs"} flex flex-row gap-4 items-center`}><img src={props.home.logo}></img><div className='w-1/2 text-center'>{props.home.teamName}</div></div>
                <div className={`${props.size == "normal" ? "text-xl" : "text-lg"} font-bold w-[10%]`}>{props.home.result} - {props.away.result}</div>
                <div className={`w-[20%] ${props.size == "normal" ? "text-xs" : "text-3xs"} flex flex-row gap-4 items-center`}><img src={props.away.logo}></img><div className='w-1/2 text-center'>{props.away.teamName}</div></div>
            </div>
            <Link className={`w-[10%] ${props.size == "normal" ? "text-xs" : "text-3xs"} py-2 rounded bg-blue-500 hover:bg-blue-400 text-white  ease-in-out text-center duration-150`} to={`/games/${props.id}`}>More Info</Link>
            <Link to={`/score/${props.id}`} className={`w-[10%] px-1 py-2 bg-orange-400 rounded text-white ${props.size == "normal" ? "text-xs" : "text-3xs"} hover:bg-orange-300 flex flex-row items-center gap-1 justify-center ${props.isAdmin ? "invisible" : ""}`}><div>Score game</div><RiArrowRightCircleLine size={15} /></Link>
        </div>
    )
}