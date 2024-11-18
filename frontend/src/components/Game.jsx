import { RiLiveLine, RiCalendarScheduleLine, RiCheckDoubleLine, RiArrowRightCircleLine, RiStarLine, RiStarFill } from 'react-icons/ri';
import { useState } from 'react';
export default function Game(props) {
    const statusIcons = {
        live: <RiLiveLine color="red" size={30} />,
        scheduled: <RiCalendarScheduleLine size={30} />,
        ended: <RiCheckDoubleLine size={30} />
    };
    const [favorite, setFavorite] = useState(false);
    return (
        <div className="w-full flex flex-row justify-around px-10 py-4 rounded items-center text-gray-500 bg-white  font-semibold text-xl  drop-shadow-xl">
            <button className='text-yellow-500' onClick={() => setFavorite(!favorite)}>{!favorite && <RiStarLine size={30} />}{favorite && <RiStarFill size={30} />}</button>
            <div className="w-[20%] flex flex-col gap-2 items-center"><div className="flex flex-row gap-2">{statusIcons[props.status]}{props.status}</div><div className=" font-semibold text-sm" >{new Date(props.datetime).toLocaleString()}</div></div>
            <div className="flex flex-row justify-around items-center w-1/2">
                <div className='w-[20%] text-base flex flex-row gap-4 items-center'><div className='w-1/2 text-center'>{props.home.teamName}</div><img src={props.home.logo}></img></div>
                <div className="text-3xl font-bold w-[10%]">{props.home.result} - {props.away.result}</div>
                <div className='w-[20%] text-base flex flex-row gap-4 items-center'><img src={props.away.logo}></img><div className='w-1/2 text-center'>{props.away.teamName}</div></div>

            </div>
            <button className="w-[15%] px-2 py-3 bg-accent_2 rounded hover:bg-accent_3 text-white ease-in-out duration-150">More Info</button>
            {props.isAdmin && <button className="w-[10%] px-2 py-3 bg-orange-400 rounded text-white hover:bg-orange-300 flex flex-row items-center gap-1 justify-center"><div>Score game</div><RiArrowRightCircleLine size={25} /></button>}
            {!props.isAdmin && <div className='w-[10%]'></div>}
        </div>
    )
}