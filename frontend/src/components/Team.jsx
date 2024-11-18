import { FaFacebook, FaInstagram, FaLink } from "react-icons/fa";

export default function Team(props) {
    const icons = {
        facebook: <FaFacebook size={20} />,
        instagram: <FaInstagram size={20} />,
        website: <FaLink size={20} />
    }
    return (
        <div className="h-[300px] px-4 flex flex-col justify-around items-center bg-white drop-shadow-xl">
            <div className="w-full flex flex-col items-center gap-4">
                <img src={props.logo}></img>
                <h3 className="text-xl font-semibold">{props.name}</h3>
            </div>
            <hr className="border-t-2 w-full"></hr>
            <div className="w-full flex flex-col text-gray-500 items-center gap-2 text-xs">
                <div>{props.homeStadium}</div>
                <div>{props.contacts}</div>

                <div className="w-1/2 flex flex-row justify-around mt-2">
                    {Object.entries(props.socialMedia).map(([media, page]) => <a href={page} target="_blank">{icons[media]}</a>)}
                </div>
            </div>
            <button className="p-2 bg-accent_2 hover:bg-accent_3 rounded text-white font-semibold text-xs">Team Stats</button>

        </div>)
}