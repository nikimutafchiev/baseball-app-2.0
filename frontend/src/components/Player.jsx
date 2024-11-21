import { Link } from "react-router-dom";

export default function Player(props) {
    return (
        <div className="h-[270px]">
            <div className="group h-full w-full ease-in-out duration-1000 [transform-style:preserve-3d] hover:[transform:rotateY(180deg)]">
                <div className='max-h-full absolute inset-0 h-full w-full text-white flex flex-col justify-center items-center gap-4 bg-gradient-to-br from-accent_3 via-accent_2 to-accent_1 border-gray-400 border-2  drop-shadow-xl '>
                    <h3 className="text-xl font-semibold">
                        {props.firstName} {props.lastName}
                    </h3>
                    <img src={props.image} />
                </div >
                <div className='max-h-full absolute inset-0 h-full w-full px-1 text-white [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-around bg-gradient-to-br from-accent_3 via-accent_2 to-accent_1 items-center border-gray-400 border-2  drop-shadow-xl'>
                    <h3 className="text-xl font-semibold">
                        {props.firstName} {props.lastName}
                    </h3>
                    <div className="w-full py-2 grid grid-cols-2 font-semibold text-3xs place-items-center">
                        <div >Height: {props.height}cm</div>
                        <div >Weigth: {props.weight}kg</div>
                        <div >Birthday: {props.dateOfBirth}</div>
                        <div >Birthplace: {props.placeOfBirth}</div>
                        <div className="text-center col-span-2">Batting/Throwing: {props.battingSide}/{props.throwingArm}</div>
                    </div>
                    <div>
                        <div className="text-center text-xs ">All time stats</div>
                        <div className="rounded grid grid-cols-3 gap-y-2 gap-x-1 border-gray-300 border-2 text-3xs font-semibold p-2 place-items-center">
                            <div>AVG: {props.stats.AVG}</div>
                            <div>BB: {props.stats.BB}</div>
                            <div>ERA: {props.stats.ERA}</div>
                            <div>H: {props.stats.H}</div>
                            <div>OBP: {props.stats.OBP}</div>
                            <div>SO: {props.stats.SO}</div>
                        </div>
                    </div>
                    <div className="text-gray-200 text-2xs italic text-center ">{props.quote}</div>
                    <Link className="px-3 py-2 bg-primary_2 hover:bg-white hover:text-primary_2 rounded  font-semibold text-sm" to={`${props.id}`}>View more</Link>

                </div >
            </div>
        </div>)
}