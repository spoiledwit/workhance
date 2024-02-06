import { Candidate } from '@/types';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { BiDownload } from "react-icons/bi";
import { format } from "timeago.js";

const CandidateDetails = () => {

    const location = useLocation();
    const candidate: Candidate = location.state;
    const navigate = useNavigate();

    useEffect(() => {
        console.log(candidate);
    }, [candidate])

    async function shortlistCandidate(applicationId: string | undefined) {
        try {
            await axios.put(`${import.meta.env.VITE_BASE_URI}/application/shortlist`,
                {
                    applicationId,
                    jobId: candidate.job?._id
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    },
                }).then(() => {
                    console.log("Shortlisted applicant");
                    navigate(-1);
                })
        } catch (error) {
            console.log("Error while shortlisting applicant: ", error);
        }
    }

    async function rejectCandidate(applicationId: string | undefined) {
        try {
            await axios.delete(`${import.meta.env.VITE_BASE_URI}/application/${applicationId}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    },
                }).then(() => {
                    console.log("Rejected applicant");
                    navigate(-1);

                })
        } catch (error) {
            console.log("Error while rejecting applicant: ", error);
        }
    }

    return (
        <>
            <div className='flex flex-row gap-2'>
                <div className='rounded-lg border w-3/4 p-7'>
                    <div className='flex flex-row gap-3 items-center '>
                        <img src={candidate.applicant.profilePicture} className='w-[4rem] rounded-full' />
                        <div className='w-full '>
                            <h1 className='text-2xl font-semibold'>{candidate.applicant.name}</h1>
                            <p className='opacity-75'>{candidate.applicant.email}</p>
                        </div>
                        <Link to={`/user/${candidate.applicant._id}`} className='border text-center border-[#2d2d2d] hover:bg-[#2d2d2d] hover:text-white transition-all text-[#2d2d2d] w-1/6 py-1 rounded'><button >Visit Profile</button></Link>
                    </div>
                    <hr className='my-3' />
                    <div className='flex flex-row items-center gap-5'>
                        <h2 className='text-xl font-semibold mb-1'>Resume / CV</h2>
                        <a className=' rounded p-1 bg-[#2d2d2d] cursor-pointer' href={candidate.cv} download="name.pdf"><BiDownload size={23} color={"#fff"} /></a>
                    </div>
                    {/* <iframe src={candidate.cv} className='w-full h-full' /> */}
                </div>
                <div className='border rounded-lg p-7 w-1/4 flex flex-col gap-3'>
                    <div className='text-center flex flex-col gap-1'>
                        <button onClick={() => shortlistCandidate(candidate.id)} className='hover:bg-[#2d2d2d] border border-[#2d2d2d] text-[#2d2d2d] hover:border-[#1a1a1a] transition-all font-semibold hover:text-white w-full py-2 rounded '>Shortlist</button>
                        <button onClick={() => rejectCandidate(candidate.id)} className=' text-red-500 border border-red-500 w-full py-2 rounded hover:bg-red-700 hover:border-red-700 hover:text-white font-semibold transition-all '>Reject</button>
                    </div>
                    <hr className='my-2' />
                    <div className='flex flex-col gap-1 flex-wrap'>
                        <h4 className='text-lg font-semibold mb-1'>Job Details</h4>
                        {/* <p className='opacity-75'><span className='font-semibold'>Type:</span> Part-time</p> */}
                        <div className='flex flex-row opacity-75'>
                            <p className='w-1/2 font-semibold'>Title</p>
                            <p className='w-1/2'>{candidate.job.jobTitle}</p>
                        </div>
                        <div className='flex flex-row opacity-75'>
                            <p className='w-1/2 font-semibold'>Description</p>
                            <p className='w-1/2 overflow-hidden max-h-[100px]'>{candidate.job.jobDescription}</p>
                        </div>
                        <div className='flex flex-row opacity-75'>
                            <p className='w-1/2 font-semibold'>Salary</p>
                            <p className='w-1/2'>{candidate.job.salary?.min}-{candidate.job.salary?.max} AED</p>
                        </div>
                        <div className='flex flex-row opacity-75'>
                            <p className='w-1/2 font-semibold'>Require CV</p>
                            <p className='w-1/2'>{candidate.job.requireCv ? "Yes" : "No"}</p>
                        </div>
                        <div className='flex flex-row opacity-75'>
                            <p className='w-1/2 font-semibold'>Advertising Location</p>
                            <p className='w-1/2 overflow-hidden'>{candidate.job.advertisingLocation}</p>
                        </div>
                        <div className='flex flex-row opacity-75'>
                            <p className='w-1/2 font-semibold'>Posted</p>
                            <p className='w-1/2'>{format(candidate.job.createdAt)}</p>
                        </div>
                        <div className='flex flex-row opacity-75'>
                            <p className='w-1/2 font-semibold'>Email Updates</p>
                            <p className='w-1/2 overflow-hidden'>{candidate.job.updatesEmail}</p>
                        </div>
                    </div>

                </div>
            </div >
        </>
    )
}

export default CandidateDetails