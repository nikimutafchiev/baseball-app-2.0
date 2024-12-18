import { useState } from "react";
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
    return (<div className="bg-white drop-shadow-lg rounded flex flex-col gap-2 m-4 px-4 py-2 text-lg font-semibold ">
        {
            roster.map((player) => <div className=" justify-between grid grid-cols-5 border-b p-2">
                <div>
                    {player.uniformNumber}
                </div>
                <div className="col-span-2">
                    {player.firstName} {player.lastName}
                </div>
                <div>
                    {player.dateOfBirth}
                </div>
                <div>
                    {player.country}
                </div>

            </div>)
        }
    </div>)
}