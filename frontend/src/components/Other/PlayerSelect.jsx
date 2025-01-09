export default function PlayerSelect(props) {
    return (<>
        <button className={`bg-gray-200 hover:bg-gray-300 flex flex-row  justify-between py-2 px-4 my-2 rounded items-center gap-6 `}
            onClick={() => {
                props.close();
            }}>

            <div className="flex flex-row items-center gap-6">
                <img className="size-[100px]" src={props.player.image ? props.player.image : "https://placehold.co/100x100"} />

                <div className="text-2xl font-semibold">{props.player.firstName} {props.player.lastName}</div>
            </div>
            <div className="text-lg gap-4 flex flex-row items-center">
                <div>
                    {new Date(props.player.dateOfBirth).toLocaleDateString()}
                </div>
                <div>
                    {props.player.country}
                </div>
            </div>
        </button></>)
}