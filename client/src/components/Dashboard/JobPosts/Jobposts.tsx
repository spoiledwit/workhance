import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableCaption,
  TableRow,
} from "@/components/ui/table";
import { capitalizeFirstLetter } from "@/lib/utils";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const testData = [
  {
    employerProfile: {
      _id: "65b4e357745f501f2fec2252",
      userId: "65b11a350d95903f19815a63",
      isVerified: true,
      postedJobs: [
        "65b4e3b9745f501f2fec2265",
        "65b4ea1845ac229a31d125b6",
        "65b4ea6545ac229a31d125f0",
        "65b64a8c7c13a1c5fcf16853",
      ],
      companyName: "TBCGULF",
      businessEmail: "ahmad@tbcgulf.com",
      companyWebsite: "https://tbcgulf.com",
      companySize: "",
      isDisabled: false,
      createdAt: "2024-01-27T11:04:55.790Z",
      updatedAt: "2024-01-28T12:37:32.942Z",
      __v: 0,
    },
    jobs: [
      {
        salary: {
          min: 700,
          max: 2000,
        },
        _id: "65b4e3b9745f501f2fec2265",
        companyInfo: {
          name: "TBCGULF",
          email: "spoiledwit@gmail.com",
          website: "https://tbcgulf.com",
          logo: "",
          employeeCount: "51-200",
          _id: "65b4e3b9745f501f2fec2266",
          createdAt: "2024-01-27T11:06:33.832Z",
          updatedAt: "2024-01-27T11:06:33.832Z",
        },
        employerId: "65b4e357745f501f2fec2252",
        jobTitle: "Senior Software Developer",
        jobDescription: "Must have problem solving skills",
        jobType: "part-time",
        advertisingLocation: "Dubai - United Arab Emirates",
        updatesEmail: "spoiledwit@gmail.com",
        requireCv: true,
        applications: ["65b4e3f466bb6d7af609714a"],
        status: "pending",
        createdAt: "2024-01-27T11:06:33.832Z",
        updatedAt: "2024-01-27T11:07:32.238Z",
        __v: 0,
      },
      {
        salary: {
          min: 200,
          max: 4000,
        },
        _id: "65b4ea1845ac229a31d125b6",
        companyInfo: {
          name: "TBCGULF",
          email: "spoiledwit@gmail.com",
          website: "https://tbcgulf.com",
          logo: "",
          employeeCount: "201-500",
          _id: "65b4ea1845ac229a31d125b7",
          createdAt: "2024-01-27T11:33:44.300Z",
          updatedAt: "2024-01-27T11:33:44.300Z",
        },
        employerId: "65b4e357745f501f2fec2252",
        jobTitle: "Graphic Designer",
        jobDescription: "Proficient in Adobe Illustrator",
        jobType: "internship",
        advertisingLocation: "Dubai - United Arab Emirates",
        updatesEmail: "spoiledwit@gmail.com",
        requireCv: true,
        applications: [],
        status: "pending",
        createdAt: "2024-01-27T11:33:44.300Z",
        updatedAt: "2024-01-27T11:33:44.300Z",
        __v: 0,
      },
      {
        salary: {
          min: 200,
          max: 30000,
        },
        _id: "65b4ea6545ac229a31d125f0",
        companyInfo: {
          name: "TBCGULF",
          email: "spoiledwit@gmail.com",
          website: "https://tbcgulf.com",
          logo: "",
          employeeCount: "201-500",
          _id: "65b4ea6545ac229a31d125f1",
          createdAt: "2024-01-27T11:35:01.789Z",
          updatedAt: "2024-01-27T11:35:01.789Z",
        },
        employerId: "65b4e357745f501f2fec2252",
        jobTitle: "Content Writer",
        jobDescription: "Content Writer",
        jobType: "volunteer",
        advertisingLocation: "Dubai - United Arab Emirates",
        updatesEmail: "spoiledwit@gmail.com",
        requireCv: true,
        applications: [],
        status: "pending",
        createdAt: "2024-01-27T11:35:01.789Z",
        updatedAt: "2024-01-27T11:35:01.789Z",
        __v: 0,
      },
      {
        salary: {
          min: 2000,
          max: 7000,
        },
        _id: "65b64a8c7c13a1c5fcf16853",
        companyInfo: {
          name: "TBC GULF",
          email: "ahmad@tbcgulf.com",
          website: "https://tbcgulf.com",
          logo: "",
          employeeCount: "51-200",
          _id: "65b64a8c7c13a1c5fcf16854",
          createdAt: "2024-01-28T12:37:32.859Z",
          updatedAt: "2024-01-28T12:37:32.859Z",
        },
        employerId: "65b4e357745f501f2fec2252",
        jobTitle: "ML Engineer",
        jobDescription: "Senior ML engineer with 5 years of experience ",
        jobType: "part-time",
        advertisingLocation: "Dubai - United Arab Emirates",
        updatesEmail: "ahmad@tbcgulf.com",
        requireCv: true,
        applications: ["65b64aef7c13a1c5fcf16894"],
        status: "pending",
        createdAt: "2024-01-28T12:37:32.859Z",
        updatedAt: "2024-01-28T12:39:11.765Z",
        __v: 0,
      },
    ],
  },
];

const jobPosts = testData[0].jobs;

const Jobposts = () => {
  const [data, setData] = useState<any[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    handleFetchMyJobs();
  }, []);

  const handleFetchMyJobs = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URI}/job/myjobs`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <h1 className="text-xl font-semibold">Job Posts</h1>
      </div>
      <Table className="mt-5">
        <TableCaption>A list of all the jobs posted by you</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="pl-7">Type</TableHead>
            <TableHead className="">Salary</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.jobs?.map((job: any) => (
            <TableRow key={job._id}>
              <TableCell className="font-medium">{job.jobTitle}</TableCell>
              <TableCell className="max-w-[500px] text-nowrap overflow-clip ">
                {job.jobDescription}
                {job.jobDescription}
                {job.jobDescription}
                {job.jobDescription}
              </TableCell>
              <TableCell className="min-w-[100px] pl-7">
                {capitalizeFirstLetter(job.jobType)}
              </TableCell>
              <TableCell className="">
                {job.salary.min} - {job.salary.max} (AED)
              </TableCell>
              {/* @ts-ignore */}
              <TableCell className="text-right">
                <Button
                  onClick={() => navigate(`/dashboard/job-details`, { state: job })}
                >
                    view
                </Button>
              </TableCell>
              {/* <TableCell className="text-right"><Link to="/dashboard/job-details"><button className="bg-[#2d2d2d] text-white px-3 py-1 rounded hover:bg-[#1a1a1a] transition-all">View</button></Link></TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Jobposts;
