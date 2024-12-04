import { useState } from "react";
import RosterPositionPicker from "./RosterPositionPicker";
export default function RosterCell(props) {

    const [playerClicked, setPlayerClicked] = useState(false);
    const [position, setPosition] = useState(props.player.position);
    return (<>
        <div className="flex flex-row flex-1 px-2 justify-between items-center" onClick={() => setPlayerClicked(true)}>
            <div className="flex flex-row ">
                <div className="font-bold w-12">#{props.player.uniformNumber}</div>
                <div>{props.player.firstName} {props.player.lastName}</div>
            </div>
            <div className="font-semibold">
                {position}
            </div>
        </div>
        {playerClicked && <RosterPositionPicker close={() => setPlayerClicked(false)} setter={(newValue) => setPosition(newValue)} />}
    </>
    );
}