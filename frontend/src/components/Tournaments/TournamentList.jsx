import Tournament from "./Tournament";
import { CircularProgress, Alert } from "@mui/material";
export default function TournamentList(props) {
    return (<>
        {props.tournaments.isLoading && <div className="flex flex-row justify-center w-full "><CircularProgress color='success' size={60} /></div>}
        {(props.tournaments.error && !props.tournaments.isLoading) && <Alert className="flex flex-row justify-center w-1/2 mx-auto" severity="error">Error occured, while fetching tournaments!</Alert>}
        {props.tournaments.data && props.tournaments.data.length != 0 &&
            <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-x-6 gap-y-8">
                {props.tournaments.data.filter((tournament) => tournament.name.toLowerCase().includes(props.searchInput.toLowerCase())).sort((a, b) => a.name.localeCompare(b.name)).map((tournament) => <Tournament {...tournament} />)}
            </div>
        }
        {props.tournaments.data && props.tournaments.data.length == 0 && <div className="text-3xl ">Oops, no data here yet!</div>}
    </>)
}