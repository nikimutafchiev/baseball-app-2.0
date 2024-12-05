import { useState } from "react";
import RosterPositionPicker from "./RosterPositionPicker";
import RosterPlayerPicker from "./RosterPlayerPicker";
import { IoClose } from "react-icons/io5";
export default function RosterCell(props) {

    const [clicked, setClicked] = useState(0);
    const [position, setPosition] = useState(props.player.position);
    const [hovered, setHovered] = useState(false);
    const [player, setPlayer] = useState({
        id: props.player.id,
        uniformNumber: props.player.uniformNumber,
        firstName: props.player.firstName,
        lastName: props.player.lastName
    })
    const nextPage = () => setClicked((clicked + 1) % 3);
    const clearPlayer = () => {
        props.setPlayer(player.id, -1);
        setPlayer({
            id: -1,
            uniformNumber: "",
            firstName: "",
            lastName: ""
        })
    };
    return (<>
        <div className="flex flex-row flex-1 px-2 justify-between items-center" onClick={nextPage} onMouseOver={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
            <div className="flex flex-row text-sm">
                <div className="font-bold w-12">{player.uniformNumber == "" ? "" : `#${player.uniformNumber}`}</div>
                <div>{player.firstName} {player.lastName}</div>
            </div>
            <div className="flex flex-row w-[30%] gap-3 items-center">
                <button className={`${hovered && player.firstName !== "" ? "" : "invisible"} rounded bg-accent_2 w-1/4 p-0.5 content-center text-white text-sm font-semibold place-items-center`} onClick={(e) => { e.stopPropagation(); clearPlayer() }}>
                    <IoClose size={20} />
                </button>
                <div className="font-semibold bg-primary_3 p-0.5 w-2/5 text-center text-sm rounded" onClick={(e) => { e.stopPropagation(); setClicked(2) }}>
                    {position}
                </div>
            </div>
        </div>
        {clicked === 1 && <RosterPlayerPicker close={() => setClicked(0)} setter={(newValue) => { props.setPlayer(player.id, newValue.id); setPlayer(newValue) }} nextPage={position === "--" ? nextPage : () => setClicked(0)} takenPlayers={props.takenPlayers} />}
        {clicked === 2 && <RosterPositionPicker close={() => setClicked(0)} setter={(newValue) => { props.setPosition(position, newValue); setPosition(newValue) }} nextPage={nextPage} takenPositions={props.takenPositions} />}
    </>
    );
}