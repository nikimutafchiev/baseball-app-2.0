export default function Player(props) {
    return (
        <div className="h-[350px]">
            <div className="group h-full w-full ease-in-out duration-1000 [transform-style:preserve-3d] hover:[transform:rotateY(180deg)]">
                <div className='absolute inset-0 h-full- wfull text-white flex flex-col justify-center items-center gap-4 bg-gradient-to-br from-accent_3 via-accent_2 to-accent_1 border-gray-400 border-[3px]  drop-shadow-xl '>
                    <h3 className="text-2xl font-semibold">
                        {props.firstName} {props.lastName}
                    </h3>
                    <img src={props.image} />
                </div >
                <div className='absolute inset-0 h-full w-full text-white [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-around bg-gradient-to-br from-accent_3 via-accent_2 to-accent_1 items-center border-gray-400 border-[3px]  drop-shadow-xl'>
                    <h3 className="text-2xl font-semibold">
                        {props.firstName} {props.lastName}
                    </h3>
                    <div className="w-full px-1 py-2 grid grid-cols-2  font-semibold text-xs place-items-center">
                        <div >Height: {props.height}cm</div>
                        <div >Weigth: {props.weight}kg</div>
                        <div >Birthday: {props.dateOfBirth}</div>
                        <div >Birthplace: {props.placeOfBirth}</div>
                    </div>
                    <div>
                        <div className="text-center  ">All time stats</div>
                        <div className="rounded grid grid-cols-3 gap-y-4 gap-x-2 border-gray-300 border-2 text-sm font-semibold p-2 place-items-center">
                            <div>AVG: {props.stats.AVG}</div>
                            <div>BB: {props.stats.BB}</div>
                            <div>ERA: {props.stats.ERA}</div>
                            <div>H: {props.stats.H}</div>
                            <div>OBP: {props.stats.OBP}</div>
                            <div>SO: {props.stats.SO}</div>
                        </div>
                    </div>
                    <div className="text-gray-200 text-sm italic text-center">{props.quote}</div>
                    <button className="px-4 py-2 bg-primary_2 hover:bg-white hover:text-primary_2 rounded  font-semibold">View more</button>

                </div >
            </div>
        </div>)
}