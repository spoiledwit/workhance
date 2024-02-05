import { JobDetail } from '@/types';
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { capitalizeFirstLetter } from '@/lib/utils';
import axios from 'axios';
import { format } from 'timeago.js';

const JobDetails = () => {

    const location = useLocation();
    const job: JobDetail = location.state;
    const navigate = useNavigate();

    useEffect(() => {
        // console.log(job);
    }
        , [location]);

    async function deleteJob(jobId: string | undefined) {
        try {
            await axios.delete(`${import.meta.env.VITE_BASE_URI}/job/${jobId}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    },
                }).then(() => {
                    console.log("Deleted job posting");
                    navigate(-1);

                })
        } catch (error) {
            console.log("Error while deleting job post: ", error);
        }
    }

    return (
        <>
            <div className='flex flex-row gap-2'>
                <div className='rounded-lg border w-3/4 p-7'>
                    <h1 className='text-2xl font-semibold'>{job.jobTitle}</h1>
                    <p className='opacity-75'>{job.companyInfo.name}</p>
                    <hr className='my-3' />
                    <div className='flex flex-row mt-5 gap-3'>
                        <div className='border text-center p-5 rounded w-1/2'>
                            <h3 className='text-xl'>Applications</h3>
                            <p className='font-semibold text-xl'>{job.applications?.length}</p>
                        </div>
                        <div className='border text-center p-5 rounded w-1/2'>
                            <h3 className='text-xl'>Status</h3>
                            <p className='font-semibold text-xl'>{capitalizeFirstLetter(job.status)}</p>
                        </div>
                    </div>
                    <hr className='my-3' />
                    <h2 className='text-xl font-semibold mb-1'>Job Description</h2>
                    <p className='opacity-75'>{job.jobDescription}</p>
                </div>
                <div className='border rounded-lg p-7 w-1/4 flex flex-col gap-3'>
                    <div className='text-center flex flex-col gap-1'>
                        <button onClick={() => navigate(`/dashboard/job-update`, { state: job })} className='bg-[#2d2d2d] border border-[#2d2d2d] hover:bg-[#1a1a1a] hover:border-[#1a1a1a] transition-all font-semibold text-white w-full py-2 rounded '>Edit this job</button>
                        <button onClick={() => deleteJob(job._id)} className=' text-red-500 border border-red-500 w-full py-2 rounded hover:bg-red-700 hover:border-red-700 hover:text-white font-semibold transition-all '>Delete job post</button>
                    </div>
                    <hr className='my-2' />
                    <div className='flex flex-col gap-1 flex-wrap'>
                        <h4 className='text-lg font-semibold mb-1'>Job Details</h4>
                        {/* <p className='opacity-75'><span className='font-semibold'>Type:</span> Part-time</p> */}
                        <div className='flex flex-row opacity-75'>
                            <p className='w-1/2 font-semibold'>Type</p>
                            <p className='w-1/2'>{job.jobType}</p>
                        </div>
                        <div className='flex flex-row opacity-75'>
                            <p className='w-1/2 font-semibold'>Salary</p>
                            <p className='w-1/2'>{job.salary?.min}-{job.salary?.max} AED</p>
                        </div>
                        <div className='flex flex-row opacity-75'>
                            <p className='w-1/2 font-semibold'>Require CV</p>
                            <p className='w-1/2'>{job.requireCv ? "Yes" : "No"}</p>
                        </div>
                        <div className='flex flex-row opacity-75'>
                            <p className='w-1/2 font-semibold'>Advertising Location</p>
                            <p className='w-1/2 overflow-hidden'>{job.advertisingLocation}</p>
                        </div>
                        <div className='flex flex-row opacity-75'>
                            <p className='w-1/2 font-semibold'>Posted</p>
                            <p className='w-1/2'>{format(job.createdAt)}</p>
                        </div>
                        <div className='flex flex-row opacity-75'>
                            <p className='w-1/2 font-semibold'>Email Updates</p>
                            <p className='w-1/2 overflow-hidden'>{job.updatesEmail}</p>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default JobDetails