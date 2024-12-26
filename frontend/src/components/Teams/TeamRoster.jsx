import { useState } from "react";
import { Link } from "react-router-dom";
export default function TeamRoster() {
    const [roster, setRoster] = useState([

        {
            "id": 121,
            "uniformNumber": 55,
            "firstName": "Nikolay",
            "lastName": "Mutafchiev",
            "dateOfBirth": "1990-02-15",
            "country": "Bulgaria"
        },
        {
            "id": 122,
            "uniformNumber": 12,
            "firstName": "Ivan",
            "lastName": "Petrov",
            "dateOfBirth": "1985-06-10",
            "country": "Bulgaria"
        },
        {
            "id": 123,
            "uniformNumber": 34,
            "firstName": "Maria",
            "lastName": "Ivanova",
            "dateOfBirth": "1992-08-22",
            "country": "Bulgaria"
        },
        {
            "id": 124,
            "uniformNumber": 7,
            "firstName": "Georgi",
            "lastName": "Dimitrov",
            "dateOfBirth": "1988-01-30",
            "country": "Bulgaria"
        },
        {
            "id": 125,
            "uniformNumber": 22,
            "firstName": "Anna",
            "lastName": "Kirilova",
            "dateOfBirth": "1995-04-18",
            "country": "Bulgaria"
        },
        {
            "id": 126,
            "uniformNumber": 10,
            "firstName": "Peter",
            "lastName": "Stoyanov",
            "dateOfBirth": "1989-11-09",
            "country": "Bulgaria"
        },
        {
            "id": 127,
            "uniformNumber": 3,
            "firstName": "Elena",
            "lastName": "Todorova",
            "dateOfBirth": "1993-07-25",
            "country": "Bulgaria"
        },
        {
            "id": 128,
            "uniformNumber": 45,
            "firstName": "Viktor",
            "lastName": "Georgiev",
            "dateOfBirth": "1991-09-14",
            "country": "Bulgaria"
        },
        {
            "id": 129,
            "uniformNumber": 88,
            "firstName": "Sofia",
            "lastName": "Mladenova",
            "dateOfBirth": "1994-12-03",
            "country": "Bulgaria"
        },
        {
            "id": 130,
            "uniformNumber": 99,
            "firstName": "Dimitar",
            "lastName": "Kolev",
            "dateOfBirth": "1990-05-16",
            "country": "Bulgaria"
        }
    ]

    );
    return (
        <div className=" p-4 rounded-lg shadow-md">
            {roster.sort((a, b) => a.uniformNumber - b.uniformNumber).map((player) => (
                <div
                    className="bg-white rounded-lg shadow-sm p-4 mb-4 flex flex-row items-center justify-between gap-4"
                >
                    <div className="flex flex-row gap-4">
                        <div className="flex items-center justify-center size-12 bg-primary_1 text-white text-xl font-semibold rounded-full">
                            {player.uniformNumber}
                        </div>

                        {/* Player Details */}
                        <div className="flex flex-col">
                            <div className="text-xl font-semibold">
                                {player.firstName} {player.lastName}
                            </div>
                            <div className="text-gray-600 text-sm">
                                {player.dateOfBirth}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row gap-8">
                        <div className="text-sm font-medium content-center text-gray-800 bg-gray-200 py-1 px-3 rounded-full">
                            {player.country}
                        </div>
                        <Link className="px-3 py-2 bg-red-500 text-white hover:bg-red-600 rounded  font-semibold text-sm" to={``}>View more</Link>
                    </div>
                </div>

            ))}
        </div>
    );

}