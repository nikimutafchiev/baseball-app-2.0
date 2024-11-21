import Team from "./Team"

export default function TeamList() {
    const teams = [
        {
            "name": "Colorado Rockies",
            "logo": "https://placehold.co/100x100",
            "homeStadium": "Colorado, Avenue St. 23",
            "contacts": "+012023131",
            "socialMedia": {
                "facebook": "https://google.com",
                "instagram": "https://google.com",
                "youtube": "https://google.com"
            }
        },
        {
            "name": "Los Angeles Stars",
            "logo": "https://placehold.co/100x100",
            "homeStadium": "Los Angeles, Sunset Blvd. 45",
            "contacts": "+012056789",
            "socialMedia": {
                "facebook": "https://google.com",
                "instagram": "https://google.com",
                "website": "https://google.com"
            }
        },
        {
            "name": "New York Knights",
            "logo": "https://placehold.co/100x100",
            "homeStadium": "New York, Fifth Ave. 99",
            "contacts": "+012034567",
            "socialMedia": {
                "facebook": "https://google.com",
                "website": "https://google.com"
            }
        },
        {
            "name": "Texas Rangers",
            "logo": "https://placehold.co/100x100",
            "homeStadium": "Dallas, Main St. 12",
            "contacts": "+012098765",
            "socialMedia": {
                "facebook": "https://google.com",
                "instagram": "https://google.com",
            }
        },
        {
            "name": "Chicago Bears",
            "logo": "https://placehold.co/100x100",
            "homeStadium": "Chicago, Lake Shore Dr. 50",
            "contacts": "+012067890",
            "socialMedia": {
                "facebook": "https://google.com",
                "website": "https://google.com"
            }
        },
        {
            "name": "Miami Sharks",
            "logo": "https://placehold.co/100x100",
            "homeStadium": "Miami, Ocean Dr. 101",
            "contacts": "+012078901",
            "socialMedia": {
                "facebook": "https://google.com",
                "instagram": "https://google.com",
                "website": "https://google.com",
                "youtube": "https://google.com"
            }
        },
        {
            "name": "Phoenix Suns",
            "logo": "https://placehold.co/100x100",
            "homeStadium": "Phoenix, Central Ave. 77",
            "contacts": "+012034512",
            "socialMedia": {
                "instagram": "https://google.com",
                "website": "https://google.com"
            }
        },
        {
            "name": "San Francisco Hawks",
            "logo": "https://placehold.co/100x100",
            "homeStadium": "San Francisco, Market St. 200",
            "contacts": "+012098123",
            "socialMedia": {
                "facebook": "https://google.com",
                "instagram": "https://google.com",
                "website": "https://google.com"
            }
        },
        {
            "name": "Seattle Thunder",
            "logo": "https://placehold.co/100x100",
            "homeStadium": "Seattle, Pine St. 30",
            "contacts": "+012043256",
            "socialMedia": {
                "facebook": "https://google.com",
                "instagram": "https://google.com"
            }
        },
        {
            "name": "Atlanta Falcons",
            "logo": "https://placehold.co/100x100",
            "homeStadium": "Atlanta, Peachtree St. 11",
            "contacts": "+012087654",
            "socialMedia": {
                "facebook": "https://google.com",
                "website": "https://google.com"
            }
        }
    ]

    return (<div className="p-10 grid grid-cols-4 gap-12">
        {teams.map((team) => <Team {...team} />)}
    </div>)
}