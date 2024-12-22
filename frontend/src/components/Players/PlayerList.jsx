import Player from "./Player"
import useSWR from 'swr';
import CircularProgress from "@mui/material/CircularProgress";
import { Alert } from "@mui/material";

export default function PlayerList(props) {

    const letters = [
        "A", 'B', "C", "D", "E", "F", "G", "H", "I", "J", 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
    ]
    const filteredLetters = props.players.data ? letters.map((letter) => { return { label: letter, value: props.players.data.filter((player) => player.firstName.toLowerCase().includes(props.searchInput.toLowerCase()) || player.lastName.toLowerCase().includes(props.searchInput.toLowerCase())).filter((player) => player.firstName.charAt(0) === letter) } }).filter((letter) => letter.value.length > 0) : [];
    return (<>
        {props.players.isLoading && <div className="mt-10 flex flex-row justify-center w-full"><CircularProgress color='success' size={60} /></div>}
        {(props.players.error && !props.players.isLoading) && <Alert className="mt-10 flex flex-row justify-center w-1/2 mx-auto" severity="error">Error occured, while fetching players!</Alert>}
        {props.players.data && props.players.data.length != 0 &&
            <div className="w-full flex flex-row pt-10 gap-6">
                <div className="w-10">
                    {filteredLetters.length != 0 && <div className="w-6 sticky top-[20vh] rounded-lg p-2 bg-white text-primary_2 text-4xs flex flex-col justify-around items-center font-semibold">{filteredLetters.map((letter) => <a className="px-[4px] text-center rounded-full hover:bg-primary_2 hover:text-white cursor-pointer" href={`#section-${letter.label}`}>{letter.label}</a>)}</div>}
                </div>
                <div className="flex-1">
                    {filteredLetters.map((letter) => <section id={`section-${letter.label}`} className="w-full flex flex-col gap-8 scroll-mt-[10vh]">
                        <div>
                            <div className="text-3xl font-semibold">{letter.label}</div>
                            <hr className="w-full mt-2 border-t-2 border-gray-800"></hr>
                        </div>
                        <div className="grid grid-cols-5 gap-8 py-2">
                            {letter.value.map((player) =>
                                <Player {...player} />)
                            }
                        </div>
                    </section>)}

                </div>
            </div>
        }
        {props.players.data && props.players.data.length == 0 && <div className="text-3xl pt-10">Oops, no data here yet!</div>}
    </>
    )
}