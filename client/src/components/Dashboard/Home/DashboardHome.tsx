import { JobDetail } from '@/types';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';

const DashboardHome = () => {

  const [applicants, setApplicants] = useState<any[]>([]);

  useEffect(() => {
    handleGetAllCandidates();

  }, [])

  async function handleGetAllCandidates() {

    let apps: any[] = [];

    try {
      // get all of my jobs
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URI}/job/myjobs`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )

      // store all the jobs with application count in an empty array to avoid duplication
      await res.data.jobs.map((x: JobDetail) => {
        apps.push({ jobId: x._id, jobTitle: x.jobTitle, applicantCount: x.applications?.length })
      })

      // finally set the state to apps array
      setApplicants(apps);

    } catch (err) {
      console.log("Error while fetching applicants: ", err);
    }

  }

  const data = [
    {
      "name": "SWE",
      "uv": 4000,
      "pv": 18,
      "amt": 2400
    },
    {
      "name": "Designer",
      "uv": 3000,
      "pv": 1,
      "amt": 2210
    },
    {
      "name": "Developer",
      "uv": 2000,
      "pv": 4,
      "amt": 2290
    },
    {
      "name": "QA",
      "uv": 2780,
      "pv": 43,
      "amt": 2000
    },
    {
      "name": "Tester",
      "uv": 1890,
      "pv": 22,
      "amt": 2181
    },
    {
      "name": "DevOps",
      "uv": 2390,
      "pv": 55,
      "amt": 2500
    },
    {
      "name": "Manager",
      "uv": 3490,
      "pv": 10,
      "amt": 2100
    }
  ]


  return (
    <div>
      <h1 className="text-xl font-semibold">Dashboard</h1>

      <div className='flex flex-row justify-between items-center mt-5'>
        {/* <LineChart width={800} height={450} data={data} className='border shadow-md rounded-lg py-3'
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart> */}

        <BarChart
          width={800}
          height={450}
          data={applicants}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          className='border shadow-md rounded-lg py-3'

        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="jobTitle" />
          <YAxis name='Number of applicants' />
          <Tooltip cursor={{ fill: 'transparent' }} />
          <Legend />
          <Bar dataKey="applicantCount" name='Applicant Count' fill="#d3d3d3" stroke='#898989' radius={2} barSize={60} />
        </BarChart>

      </div>
    </div>
  )
}

export default DashboardHome