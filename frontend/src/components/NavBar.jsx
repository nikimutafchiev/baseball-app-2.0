import { BiBaseball } from "react-icons/bi";
export default function NavBar() {
    const pages = [
        "Начало",
        "Първенства",
        "Отбори",
        "Играчи",
        "Моят профил"
    ]
    return (
        <header className="w-full sticky z-10 top-0  h-[10vh] bg-gradient-to-r from-primary_1 to-primary_3 drop-shadow-2xl">

            <nav className="w-full h-full flex flex-row justify-between justify-self-center items-center px-12">
                <div class='flex flex-row gap-2'>
                    <BiBaseball size={32} color="white" />
                    <div className="text-2xl text-white font-semibold">
                        Baseball App
                    </div>
                </div>
                <div className="flex flex-row gap-8">
                    {
                        pages.map((page) => <div className="text-white text-xl rounded cursor-pointer p-4 hover:bg-white hover:text-primary_2 duration-200 ease-in-out font-semibold">{page}</div>)
                    }
                </div>
            </nav>
        </header>)
}