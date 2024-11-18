import { FaFacebook, FaInstagram, FaLink } from "react-icons/fa";

export default function Team(props) {
    const icons = {
        facebook: <FaFacebook size={30} />,
        instagram: <FaInstagram size={30} />,
        website: <FaLink size={30} />
    }
    return (
        <div className="h-[400px] px-4 flex flex-col justify-around items-center bg-white drop-shadow-xl">
            <div className="w-full flex flex-col items-center gap-4">
                <img src={props.logo}></img>
                <h3 className="text-3xl font-semibold">{props.name}</h3>
            </div>
            <hr className="border-t-2 w-full"></hr>
            <div className="w-full flex flex-col text-gray-500 items-center gap-2">
                <div>{props.homeStadium}</div>
                <div>{props.contacts}</div>

                <div className="w-1/2 flex flex-row justify-around mt-2">
                    {Object.entries(props.socialMedia).map(([media, page]) => <a href={page} target="_blank">{icons[media]}</a>)}
                </div>
            </div>
            <button className="px-3 py-2 bg-accent_2 hover:bg-accent_3 rounded text-white font-semibold">Team Stats</button>

        </div>)
}