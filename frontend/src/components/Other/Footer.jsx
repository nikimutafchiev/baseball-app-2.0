export default function Footer() {
    return (
        <footer className="flex flex-col w-full gap-8 items-center bg-dark_1 text-white py-8 mt-10 border-t border-white/10">

            <div className="flex flex-row w-full justify-center gap-6  transition-opacity px-4">
                <a href="#" className="hover:text-white opacity-80 hover:opacity-100">About</a>
                <a href="#" className="hover:text-white opacity-80 hover:opacity-100">Teams</a>
                <a href="#" className="hover:text-white opacity-80 hover:opacity-100">Schedule</a>
                <a href="#" className="hover:text-white opacity-80 hover:opacity-100">Contact</a>
            </div>
            <div className="w-full px-4">
                <hr className="bg-dark_2  border-b-[1px] rounded w-full"></hr>
                <div className="text-center mt-4 text-xs opacity-60">

                    © 2025 Baseball Ltd. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
