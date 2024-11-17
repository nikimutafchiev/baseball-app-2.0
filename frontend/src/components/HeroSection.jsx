import { Link } from "react-router-dom";

export default function HeroSection() {
    return (
        <div className="w-full min-h-[90vh] py-10" style={{ "background-image": "url('baseball_hero.jpg')" }}>
            <div className="mx-auto max-w-4xl py-28 bg-opacity-60 rounded-2xl bg-zinc-400 backdrop-blur-sm px-4">
                <div className="text-center">
                    <h1 className="text-balance text-5xl font-semibold tracking-tight text-black sm:text-7xl">
                        Система за въвеждане и анализ на бейзболни мачове
                    </h1>
                    <p className="mt-8 text-pretty text-lg font-medium text-gray-700 sm:text-xl/8">
                        Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
                        fugiat veniam occaecat.
                    </p>
                    <div className="mt-20 ">
                        <Link
                            to={"/games"}
                            className="rounded-md bg-accent_1 px-5 py-2.5 font-semibold text-white text-lg shadow-sm hover:bg-accent_2 duration-150 ease-in-out"
                        >
                            Към игрите
                        </Link>
                    </div>
                </div>
            </div>

        </div>)
}