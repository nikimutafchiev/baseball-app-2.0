import { RiCloseCircleLine } from "react-icons/ri";
export default function RosterPositionPicker(props) {

    return (<div className="fixed inset-0 z-10 bg-black bg-opacity-50">
        <div className="fixed z-20 inset-0 grid grid-cols-10 gap-y-4 px-6 py-10 text-white font-semibold text-4xl cursor-default bg-white w-1/2 h-4/5 self-center justify-self-center rounded">
            <button className="absolute end-4" onClick={() => props.close()}><RiCloseCircleLine size={40} color="gray" /></button>
            <div className="col-span-4"></div>
            <button className={`${props.takenPositions.includes("CF") ? "bg-primary_1 text-gray-400 pointer-events-none" : "bg-primary_2 hover:bg-primary_2_hover"} rounded text-center  p-2 content-center col-span-2`} onClick={() => { props.setter("CF"); props.nextPage() }}>CF</button>
            <div className="col-span-4"></div>
            <button className={`${props.takenPositions.includes("LF") ? "bg-primary_1 text-gray-400 pointer-events-none" : "bg-primary_2 hover:bg-primary_2_hover"} rounded text-center  p-2 content-center col-span-2`} onClick={() => { props.setter("LF"); props.nextPage() }}>LF</button>
            <div className="col-span-6"></div>
            <button className={`${props.takenPositions.includes("RF") ? "bg-primary_1 text-gray-400 pointer-events-none" : "bg-primary_2 hover:bg-primary_2_hover"} rounded text-center  p-2 content-center col-span-2`} onClick={() => { props.setter("RF"); props.nextPage() }}>RF</button>
            <div className="col-span-2"></div>
            <button className={`${props.takenPositions.includes("SS") ? "bg-primary_1 text-gray-400 pointer-events-none" : "bg-primary_2 hover:bg-primary_2_hover"} rounded text-center  p-2 content-center col-span-2`} onClick={() => { props.setter("SS"); props.nextPage() }}>SS</button>
            <div className="col-span-2"></div>
            <button className={`${props.takenPositions.includes("2B") ? "bg-primary_1 text-gray-400 pointer-events-none" : "bg-primary_2 hover:bg-primary_2_hover"} rounded text-center  p-2 content-center col-span-2`} onClick={() => { props.setter("2B"); props.nextPage() }} >2B</button>
            <div className="col-span-2"></div>
            <div className="col-span-1"></div>
            <button className={`${props.takenPositions.includes("3B") ? "bg-primary_1 text-gray-400 pointer-events-none" : "bg-primary_2 hover:bg-primary_2_hover"} rounded text-center  p-2 content-center col-span-2`} onClick={() => { props.setter("3B"); props.nextPage() }}>3B</button>
            <div className="col-span-1"></div>
            <button className={`${props.takenPositions.includes("P") ? "bg-primary_1 text-gray-400 pointer-events-none" : "bg-primary_2 hover:bg-primary_2_hover"} rounded text-center  p-2 content-center col-span-2`} onClick={() => { props.setter("P"); props.nextPage() }}>P</button>
            <div className="col-span-1"></div>
            <button className={`${props.takenPositions.includes("1B") ? "bg-primary_1 text-gray-400 pointer-events-none" : "bg-primary_2 hover:bg-primary_2_hover"} rounded text-center  p-2 content-center col-span-2`} onClick={() => { props.setter("1B"); props.nextPage() }}>1B</button>
            <div className="col-span-1"></div>
            <button className="bg-primary_2 hover:bg-primary_2_hover rounded text-center p-2 content-center col-span-2" onClick={() => { props.setter("--"); props.nextPage() }}>--</button>
            <div className="col-span-2"></div>
            <button className={`${props.takenPositions.includes("C") ? "bg-primary_1 text-gray-400 pointer-events-none" : "bg-primary_2 hover:bg-primary_2_hover"} rounded text-center  p-2 content-center col-span-2`} onClick={() => { props.setter("C"); props.nextPage() }}>C</button>
            <div className="col-span-2"></div>
            <button className={`${props.takenPositions.includes("DH") ? "bg-primary_1 text-gray-400 pointer-events-none" : "bg-primary_2 hover:bg-primary_2_hover"} rounded text-center  p-2 content-center col-span-2`} onClick={() => { props.setter("DH"); props.nextPage() }}>DH</button>
        </div >
    </div >)
}