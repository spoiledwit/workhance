import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const invoices = [
    {
        invoice: "INV001",
        paymentStatus: "Paid",
        totalAmount: "$250.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV002",
        paymentStatus: "Pending",
        totalAmount: "$150.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV003",
        paymentStatus: "Unpaid",
        totalAmount: "$350.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV004",
        paymentStatus: "Paid",
        totalAmount: "$450.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV005",
        paymentStatus: "Paid",
        totalAmount: "$550.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV006",
        paymentStatus: "Pending",
        totalAmount: "$200.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV007",
        paymentStatus: "Unpaid",
        totalAmount: "$300.00",
        paymentMethod: "Credit Card",
    },
]

const testData = [
    {
        "applicant": {
            "_id": "65b11a350d95903f19815a63",
            "name": "Ahmad Ashfaq",
            "email": "spoiledwit@gmail.com",
            "hashedPassword": "$2a$10$pUoHgcv590RE2yx2cRBnsOw5Xy9oqI6YWhIaBgdx2Tubd.vMBb6Ai",
            "role": "user",
            "__v": 13,
            "bio": "Computer scientist, Founding President ITU MUN society, MERN | Three js | TensorflowaMUN society, MERN | Three js | TensorflowMUN society, MERN | Three js | TensorflowMUN society, MERN | Three js | TensorflowMUN society, MERN | Three js | TensorflowMUN society, MERN | Three js | Tensorflow",
            "conversations": [],
            "followers": [
                "65b153cba692ae4917ec5e78",
                "65b380e38ddc28f463a7f6f2",
                "65b15bba033d8d7ae8dc332d",
                "65bd015437fdf27d0eeb3c9d"
            ],
            "isBlocked": false,
            "posts": [],
            "profilePicture": "https://res.cloudinary.com/dlxtcvj93/image/upload/v1706119071/yvd8ogytp5a76ilnwyqj.jpg",
            "recommendations": [],
            "updatedAt": "2024-02-02T14:52:33.855Z",
            "employerId": "65b4e357745f501f2fec2252",
            "educations": [
                {
                    "school": "MIT",
                    "degree": "Software Engineering",
                    "fieldOfStudy": "",
                    "startYear": "2019",
                    "endYear": "2024",
                    "grade": "A",
                    "description": "Software house",
                    "isCurrent": true,
                    "_id": "65bb7d21b6e0bb137baa00e0"
                }
            ],
            "workExperiences": []
        },
        "job": {
            "salary": {
                "min": 700,
                "max": 2000
            },
            "_id": "65b4e3b9745f501f2fec2265",
            "companyInfo": {
                "name": "TBCGULF",
                "email": "spoiledwit@gmail.com",
                "website": "https://tbcgulf.com",
                "logo": "",
                "employeeCount": "51-200",
                "_id": "65b4e3b9745f501f2fec2266",
                "createdAt": "2024-01-27T11:06:33.832Z",
                "updatedAt": "2024-01-27T11:06:33.832Z"
            },
            "employerId": "65b4e357745f501f2fec2252",
            "jobTitle": "Senior Software Developer",
            "jobDescription": "Must have problem solving skills",
            "jobType": "part-time",
            "advertisingLocation": "Dubai - United Arab Emirates",
            "updatesEmail": "spoiledwit@gmail.com",
            "requireCv": true,
            "applications": [
                "65b4e3f466bb6d7af609714a"
            ],
            "status": "pending",
            "createdAt": "2024-01-27T11:06:33.832Z",
            "updatedAt": "2024-01-27T11:07:32.238Z",
            "__v": 0
        },
        "status": "pending",
        "cv": "https://res.cloudinary.com/dcdmvp7au/raw/upload/v1706353650/workhance/bgs8pxw8jmtypmcqkmph"
    },
];


const Candidates = () => {
    return (
        <>
            <div>
                <h1 className="text-xl font-semibold">Applicants</h1>
            </div>
            <Table className="mt-5">
                {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[200px]">Applicant</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Bio</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="">
                    {testData.map((app) => (
                        <TableRow key={app.applicant._id}>
                            <TableCell className="font-medium flex flex-row items-center gap-3">
                                <img src={app.applicant.profilePicture} className="w-[3rem] rounded-full" /><p>{app.applicant.name}</p>
                            </TableCell>
                            <TableCell>{app.applicant.email}</TableCell>
                            <TableCell className="max-w-[600px] text-nowrap overflow-clip">{app.applicant.bio}</TableCell>
                            <TableCell className="text-right ">
                                <button className="bg-[#2d2d2d] text-white px-3 py-1 rounded hover:bg-[#1a1a1a] transition-all">Applicant Details</button>
                                <button className="bg-[#2d2d2d] text-white px-3 py-1 rounded hover:bg-[#1a1a1a] transition-all ml-2">View Job</button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                {/* <TableFooter>
                    <TableRow>
                        <TableCell colSpan={3}>Total</TableCell>
                        <TableCell className="text-right">$2,500.00</TableCell>
                    </TableRow>
                </TableFooter> */}
            </Table>
        </>
    )
}

export default Candidates 