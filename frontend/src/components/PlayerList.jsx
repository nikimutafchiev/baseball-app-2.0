import Player from "./Player"
export default function PlayerList() {
    const players = [
        {
            "firstName": "Ivan",
            "lastName": "Ivanov",
            "dateOfBirth": "2002-12-12",
            "height": "194",
            "weight": "106",
            "placeOfBirth": "Bulgaria",
            "image": "https://placehold.co/200x260",
            "quote": "You're only one step away from the win.",
            "stats": {
                "AVG": "0.707",
                "OBP": "1.111",
                "SO": "453",
                "BB": "231",
                "ERA": "1.36",
                "H": "8482"
            }
        },
        {
            "firstName": "Petar",
            "lastName": "Petrov",
            "dateOfBirth": "1995-03-15",
            "height": "180",
            "weight": "90",
            "placeOfBirth": "Bulgaria",
            "image": "https://placehold.co/200x260",
            "quote": "Hard work beats talent when talent doesn’t work hard.",
            "stats": {
                "AVG": "0.693",
                "OBP": "1.043",
                "SO": "401",
                "BB": "198",
                "ERA": "1.57",
                "H": "7950"
            }
        },
        {
            "firstName": "Georgi",
            "lastName": "Dimitrov",
            "dateOfBirth": "1988-07-22",
            "height": "186",
            "weight": "85",
            "placeOfBirth": "Bulgaria",
            "image": "https://placehold.co/200x260",
            "quote": "Success is the sum of small efforts repeated daily.",
            "stats": {
                "AVG": "0.714",
                "OBP": "1.112",
                "SO": "475",
                "BB": "212",
                "ERA": "1.42",
                "H": "8256"
            }
        },
        {
            "firstName": "Maria",
            "lastName": "Nikolova",
            "dateOfBirth": "2001-09-30",
            "height": "172",
            "weight": "63",
            "placeOfBirth": "Bulgaria",
            "image": "https://placehold.co/200x260",
            "quote": "Dream big and dare to fail.",
            "stats": {
                "AVG": "0.725",
                "OBP": "1.099",
                "SO": "421",
                "BB": "225",
                "ERA": "1.48",
                "H": "8024"
            }
        },
        {
            "firstName": "Dimitar",
            "lastName": "Popov",
            "dateOfBirth": "1990-06-10",
            "height": "188",
            "weight": "92",
            "placeOfBirth": "Bulgaria",
            "image": "https://placehold.co/200x260",
            "quote": "Perseverance is the key to unlocking potential.",
            "stats": {
                "AVG": "0.699",
                "OBP": "1.102",
                "SO": "440",
                "BB": "210",
                "ERA": "1.54",
                "H": "7987"
            }
        },
        {
            "firstName": "Kalina",
            "lastName": "Vasileva",
            "dateOfBirth": "1998-01-18",
            "height": "170",
            "weight": "58",
            "placeOfBirth": "Bulgaria",
            "image": "https://placehold.co/200x260",
            "quote": "Your attitude determines your altitude.",
            "stats": {
                "AVG": "0.713",
                "OBP": "1.108",
                "SO": "410",
                "BB": "215",
                "ERA": "1.51",
                "H": "7923"
            }
        },
        {
            "firstName": "Simeon",
            "lastName": "Yanev",
            "dateOfBirth": "1992-11-05",
            "height": "182",
            "weight": "88",
            "placeOfBirth": "Bulgaria",
            "image": "https://placehold.co/200x260",
            "quote": "Strive for progress, not perfection.",
            "stats": {
                "AVG": "0.702",
                "OBP": "1.103",
                "SO": "460",
                "BB": "220",
                "ERA": "1.49",
                "H": "8204"
            }
        },
        {
            "firstName": "Ivana",
            "lastName": "Georgieva",
            "dateOfBirth": "2000-02-14",
            "height": "168",
            "weight": "60",
            "placeOfBirth": "Bulgaria",
            "image": "https://placehold.co/200x260",
            "quote": "Nothing worth having comes easy.",
            "stats": {
                "AVG": "0.718",
                "OBP": "1.110",
                "SO": "430",
                "BB": "210",
                "ERA": "1.47",
                "H": "8111"
            }
        },
        {
            "firstName": "Todor",
            "lastName": "Iliev",
            "dateOfBirth": "1996-05-25",
            "height": "192",
            "weight": "98",
            "placeOfBirth": "Bulgaria",
            "image": "https://placehold.co/200x260",
            "quote": "Champions keep playing until they get it right.",
            "stats": {
                "AVG": "0.692",
                "OBP": "1.100",
                "SO": "500",
                "BB": "230",
                "ERA": "1.40",
                "H": "8350"
            }
        },
        {
            "firstName": "Vasil",
            "lastName": "Todorov",
            "dateOfBirth": "1994-08-19",
            "height": "190",
            "weight": "94",
            "placeOfBirth": "Bulgaria",
            "image": "https://placehold.co/200x260",
            "quote": "Victory is in the effort, not just the result.",
            "stats": {
                "AVG": "0.705",
                "OBP": "1.105",
                "SO": "490",
                "BB": "218",
                "ERA": "1.45",
                "H": "8082"
            }
        },
    ]

    return (
        <div className="p-10 grid grid-cols-5 gap-12">
            {players.map((player) =>
                <Player {...player} />)
            }
        </div>)
}