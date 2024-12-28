import PlayerSelect from "./PlayerSelect";
import { RiCloseCircleLine } from "react-icons/ri";
export default function PlayerSelectList(props) {

    return (<><div className="flex flex-col bg-white h-4/5 overflow-y-auto py-2 px-4 fixed self-center z-20 rounded w-2/3">
        <div className="h-[6%]">
            <button className="absolute end-4" onClick={() => props.close()}><RiCloseCircleLine size={30} color="gray" /></button>
        </div>
        {props.players.map((player) =>
            <PlayerSelect player={player} close={() => props.close()} />
        )}
    </div></>)
}