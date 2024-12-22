import { BiBaseball } from "react-icons/bi";
import { Link } from "react-router-dom";
import { FiLogOut } from 'react-icons/fi';
import { IoNotificationsOutline, IoReorderThreeOutline } from "react-icons/io5";
import { useAuth } from "../../AuthContext";
import { useState } from "react";
export default function NavBar() {
    const pages = [
        { name: "Home", path: "/" },
        { name: "Schedule", path: "/schedule" },
        { name: "Teams", path: "/teams" },
        { name: "Players", path: "/players" },
        { name: "Tournaments", path: "tournaments" },
        { name: "Profile", path: "/profile/info" }
    ]
    const { logout, token } = useAuth();
    const [isExtendClicked, setIsExtendClicked] = useState(false);
    return (
        <header className={`w-full sticky z-10 top-0 ${isExtendClicked ? "h-screen" : "h-[10vh]"} bg-gradient-to-r from-primary_1 to-primary_3 drop-shadow-2xl`}>

            {!isExtendClicked && <nav className="w-full h-full flex flex-row justify-between justify-self-center items-center px-12">
                <Link class='flex flex-row gap-2 items-center' to="/">
                    <BiBaseball size={32} color="white" />
                    <div className="text-xl text-white font-semibold">
                        Baseball App
                    </div>
                </Link>
                <div className="flex flex-row gap-5 text-white ">
                    <div className="md:flex md:flex-row md:gap-2 hidden">
                        {
                            pages.map((page) => <Link className=" rounded cursor-pointer content-center px-4 py-2 hover:bg-white hover:text-primary_2 duration-200 ease-in-out font-semibold" to={page.path}>{page.name}</Link>)
                        }
                    </div>

                    {token && <><button className="hover:bg-white hover:text-primary_2 px-2 rounded  duration-200 ease-in-out">
                        <IoNotificationsOutline size={27} />
                    </button>
                        <button onClick={() => logout()} className="hover:bg-white hover:text-primary_2 p-2 rounded  duration-200 ease-in-out">
                            <FiLogOut size={27} />
                        </button></>}

                </div>
                <div className="md:hidden text-white">
                    <IoReorderThreeOutline size={30} onClick={() => setIsExtendClicked(!isExtendClicked)} />
                </div></nav>}

            {isExtendClicked && < nav className="w-full h-full flex flex-col gap-10 px-12 ">
                <div className="h-[10vh] flex flex-row justify-between items-center w-full">
                    <Link class='flex flex-row gap-2 items-center' to="/">
                        <BiBaseball size={32} color="white" />
                        <div className="text-xl text-white font-semibold">
                            Baseball App
                        </div>
                    </Link>
                    <div className="md:hidden text-white">
                        <IoReorderThreeOutline size={30} onClick={() => setIsExtendClicked(!isExtendClicked)} />
                    </div>
                </div>

                <div className=" flex flex-col gap-3 text-white ">
                    <div className="flex flex-col w-full mx-4 gap-2 md:hidden text-xl">
                        {
                            pages.map((page) => <Link onClick={() => setIsExtendClicked(false)} className=" rounded cursor-pointer content-center px-4 py-2 hover:bg-white hover:text-primary_2 duration-200 ease-in-out font-semibold" to={page.path}>{page.name}</Link>)
                        }
                    </div>

                    {token && <><button className="hover:bg-white hover:text-primary_2 px-2 rounded  duration-200 ease-in-out">
                        <IoNotificationsOutline size={27} />
                    </button>
                        <button onClick={() => logout()} className="hover:bg-white hover:text-primary_2 p-2 rounded  duration-200 ease-in-out">
                            <FiLogOut size={27} />
                        </button></>}

                </div>

            </nav>
            }

        </header>)
}