import { Tooltip, Zoom } from "@mui/material"
import { useEffect, useState } from "react";
import RosterPlayerPicker from "../Roster/RosterPlayerPicker";

export default function FieldCell(props) {
    const [pickPlayer, setPickPlayer] = useState(false);
    const [player, setPlayer] = useState(props.player ? {
        id: props.player.id,
        uniformNumber: props.player.uniformNumber,
        firstName: props.player.player ? props.player.player.firstName : "",
        lastName: props.player.player ? props.player.player.lastName : ""
    } : {});
    const clearPlayer = () => {
        props.setPlayer(player.id, -1);
        setPlayer({
            id: -1,
            uniformNumber: "",
            firstName: "",
            lastName: ""
        })
    };
    useEffect(() => {
        setPlayer(props.player ? {
            id: props.player.id,
            uniformNumber: props.player.uniformNumber,
            firstName: props.player.player ? props.player.player.firstName : "",
            lastName: props.player.player ? props.player.player.lastName : ""
        } : {});
    }, [props.player]);
    return (<>
        <div onClick={() => setPickPlayer(true)} className="bg-primary_1 col-span-2 size-10 cursor-pointer content-center text-center rounded drop-shadow-md">
            <Tooltip
                title={<div className="text-xs"> {player.firstName} {player.lastName}</div>}
                arrow
                placement='top' slots={
                    {
                        transition: Zoom,
                    }}
            >
                {player.uniformNumber}
            </Tooltip>
        </div>
        {pickPlayer && <RosterPlayerPicker team={{ id: 1 }} tournament={{ id: 1 }} close={() => setPickPlayer(0)} clear={() => clearPlayer()} nextPage={() => setPickPlayer(0)} setter={(newValue) => { props.setPlayer(player.id, newValue.id); setPlayer(newValue) }} takenPlayers={props.takenPlayers} helperText={player.id !== -1 ? `Substitute for #${player.uniformNumber} ${player.lastName}` : "Select player"} />}

    </>)
}