import Game from "./Game";
export default function GameList(props) {

    return (<>{
        props.games &&
        <div className="w-full flex flex-col gap-6" >
            {
                props.games.map((game) =>
                    <Game {...game} size={props.size} />
                )
            }

        </div >
    }</>)
}