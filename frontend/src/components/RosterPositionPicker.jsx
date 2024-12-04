import { useState } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
export default function RosterPositionPicker(props) {

    return (<div className="fixed inset-0 z-10 bg-black bg-opacity-50">
        <div className="fixed z-20 inset-0 grid grid-cols-10 gap-y-4 px-6 py-10 text-white font-semibold text-4xl bg-white w-1/2 h-4/5 self-center justify-self-center rounded">
            <button className="absolute end-4" onClick={() => props.close()}><RiCloseCircleLine size={40} color="gray" /></button>
            <div className="col-span-4"></div>
            <button className="bg-sky-700 rounded text-center content-center p-2 cursor-pointer col-span-2" onClick={() => { props.setter("CF"); props.close() }}>CF</button>
            <div className="col-span-4"></div>
            <button className="bg-sky-700 rounded text-center content-center p-2 cursor-pointer col-span-2" onClick={() => { props.setter("LF"); props.close() }}>LF</button>
            <div className="col-span-6"></div>
            <button className="bg-sky-700 rounded text-center content-center p-2 cursor-pointer col-span-2" onClick={() => { props.setter("RF"); props.close() }}>RF</button>
            <div className="col-span-2"></div>
            <button className="bg-sky-700 rounded text-center content-center p-2 cursor-pointer col-span-2" onClick={() => { props.setter("2B"); props.close() }} >2B</button>
            <div className="col-span-2"></div>
            <button className="bg-sky-700 rounded text-center content-center p-2 cursor-pointer col-span-2" onClick={() => { props.setter("SS"); props.close() }}>SS</button>

            <div className="col-span-1"></div>
            <button className="bg-sky-700 rounded text-center content-center p-2 cursor-pointer col-span-2" onClick={() => { props.setter("3B"); props.close() }}>3B</button>
            <div className="col-span-2"></div>
            <button className="bg-sky-700 rounded text-center content-center p-2 cursor-pointer col-span-2" onClick={() => { props.setter("P"); props.close() }}>P</button>
            <div className="col-span-2"></div>
            <button className="bg-sky-700 rounded text-center content-center p-2 cursor-pointer col-span-2" onClick={() => { props.setter("1B"); props.close() }}>1B</button>
            <div className="col-span-1"></div>
            <div className="col-span-3"></div>
            <button className="bg-sky-800 rounded text-center text-gray-400 cursor-not-allowed p-2 content-center col-span-2" onClick={() => { props.setter("C"); props.close() }}>C</button>
            <div className="col-span-1"></div>
            <button className="bg-sky-700 rounded text-center content-center p-2 cursor-pointer col-span-2" onClick={() => { props.setter("DH"); props.close() }}>DH</button>
        </div >
    </div >)
}