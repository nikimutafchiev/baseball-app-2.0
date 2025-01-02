import { useEffect, useState } from "react";
import RosterPlayerPicker from "./RosterPlayerPicker";
import { IoClose } from "react-icons/io5";
export default function RosterPitcherCell(props) {
    const [clicked, setClicked] = useState(0);
    const [hovered, setHovered] = useState(false);
    const [player, setPlayer] = useState({
        id: -1,
        uniformNumber: "",
        firstName: "",
        lastName: ""
    })
    const clearPlayer = () => {
        props.setPlayer(player.id, -1);
        setPlayer({
            id: -1,
            uniformNumber: "",
            firstName: "",
            lastName: ""
        })
    };
    useEffect(() => setPlayer({
        id: props.player.id,
        uniformNumber: props.player.uniformNumber,
        position: props.player.position,
        firstName: props.player.player ? props.player.player.firstName : "",
        lastName: props.player.player ? props.player.player.lastName : "",

    }), [props.player]);
    return (<>
        <div className="flex flex-row flex-1 px-2 justify-between items-center" onClick={() => setClicked(1)} onMouseOver={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
            <div className="flex flex-row text-sm">
                <div className="font-bold w-12">{player.uniformNumber == "" ? "" : `#${player.uniformNumber}`}</div>
                <div>{player.firstName} {player.lastName}</div>
            </div>

            <button className={`${hovered && player.firstName !== "" ? "" : "invisible"} rounded bg-accent_2 w-1/12 p-0.5 content-center text-white text-sm font-semibold place-items-center`} onClick={(e) => { e.stopPropagation(); clearPlayer() }}>
                <IoClose size={20} />
            </button>
        </div>
        {clicked === 1 && <RosterPlayerPicker close={() => setClicked(0)} setter={(newValue) => { props.setPlayer(player.id, newValue.id); setPlayer(newValue) }} nextPage={() => setClicked(0)} takenPlayers={props.takenPlayers} />}
    </>)
}