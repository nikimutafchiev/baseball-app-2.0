import { BiBaseball } from "react-icons/bi";
import { Link } from "react-router-dom";
import { FiLogOut } from 'react-icons/fi';
export default function NavBar() {
    const pages = [
        { name: "Home", path: "/" },
        { name: "Schedule", path: "/schedule" },
        { name: "Teams", path: "/teams" },
        { name: "Players", path: "/players" },
        { name: "Profile", path: "/profile" }
    ]
    return (
        <header className="w-full sticky z-10 top-0 h-[10vh] bg-gradient-to-r from-primary_1 to-primary_3 drop-shadow-2xl">
            <nav className="w-full h-full flex flex-row justify-between justify-self-center items-center px-12">
                <Link class='flex flex-row gap-2' to="/">
                    <BiBaseball size={32} color="white" />
                    <div className="text-xl text-white font-semibold">
                        Baseball App
                    </div>
                </Link>
                <div className="flex flex-row gap-8 text-white ">
                    {
                        pages.map((page) => <Link className=" rounded cursor-pointer p-4 hover:bg-white hover:text-primary_2 duration-200 ease-in-out font-semibold" to={page.path}>{page.name}</Link>)
                    }
                    <button className="hover:bg-white hover:text-primary_2 p-2 rounded  duration-200 ease-in-out">
                        <FiLogOut size={27} />
                    </button>
                </div>
            </nav>
        </header>)
}