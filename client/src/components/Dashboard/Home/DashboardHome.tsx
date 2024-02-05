import { JobDetail } from '@/types';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';
import Card from './Card';

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

  function getTotalApplicants(arr: any[]) {
    let count = 0;

    arr.map(x => count += x.applicantCount);

    return count;
  }

  return (
    <div>
      <h1 className="text-xl font-semibold">Dashboard</h1>

      <div className='flex flex-row justify-between items-center mt-5 gap-3'>
        <div className='w-1/3 self-start flex flex-col gap-2'>
          <Card bgColor='#b3ffe5' textColor='#156348' borderColor='#25ffb3' label='Posted Jobs' data={applicants.length} />
          <Card bgColor='#FFC5CC' textColor='#FF495F' borderColor='#FF96A3' label="Total Applicants" data={getTotalApplicants(applicants)} />
        </div>

        <BarChart
          width={900}
          height={480}
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