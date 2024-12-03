import Team from "./Team"

export default function TeamList(props) {

    return (<div className={` grid grid-cols-4 gap-12`} >
        {props.teams.data && props.teams.data.map((team) => <Team {...team} />)}
    </div>)
}