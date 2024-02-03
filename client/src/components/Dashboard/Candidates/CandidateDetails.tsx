import { Candidate} from '@/types';
import React from 'react'
import { useLocation } from 'react-router-dom';

type CandidateData = {
    state?: Candidate
}

const CandidateDetails = () => {

    const location = useLocation() as CandidateData;
    // const job = location.state;
    console.log(location);

    return (
        <>
            <div className='flex flex-row gap-2'>
                <div className='rounded-lg border w-3/4 p-7'>
                    <h1 className='text-2xl font-semibold'>Applicant Name</h1>
                    <p className='opacity-75'>candidate@gmail.com</p>
                    <hr className='my-3' />
                    <h2 className='text-xl font-semibold mb-1'>Resume / CV</h2>
                    {/* <p className='opacity-75'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo dicta aliquam, quam laboriosam placeat quibusdam ipsum eum alias eaque temporibus ullam, debitis facilis tempore exercitationem aliquid officiis quidem quis ea.</p> */}

                </div>
                <div className='border rounded-lg p-7 w-1/4 flex flex-col gap-3'>
                    <div className='text-center flex flex-col gap-1'>
                        <button className='hover:bg-[#2d2d2d] border border-[#2d2d2d] text-[#2d2d2d] hover:border-[#1a1a1a] transition-all font-semibold hover:text-white w-full py-2 rounded '>Shortlist</button>
                        <button className=' text-red-500 border border-red-500 w-full py-2 rounded hover:bg-red-700 hover:border-red-700 hover:text-white font-semibold transition-all '>Reject</button>
                    </div>
                    <hr className='my-2' />
                    <div className='flex flex-col gap-1 flex-wrap'>
                        <h4 className='text-lg font-semibold mb-1'>Job Details</h4>
                        {/* <p className='opacity-75'><span className='font-semibold'>Type:</span> Part-time</p> */}
                        <div className='flex flex-row opacity-75'>
                            <p className='w-1/2 font-semibold'>Type</p>
                            <p className='w-1/2'>Part-time</p>
                        </div>
                        <div className='flex flex-row opacity-75'>
                            <p className='w-1/2 font-semibold'>Salary</p>
                            <p className='w-1/2'>50000-75000 AED</p>
                        </div>
                        <div className='flex flex-row opacity-75'>
                            <p className='w-1/2 font-semibold'>Require CV</p>
                            <p className='w-1/2'>Yes</p>
                        </div>
                        <div className='flex flex-row opacity-75'>
                            <p className='w-1/2 font-semibold'>Advertising Location</p>
                            <p className='w-1/2 overflow-hidden'>Dubai - United Arab Emirates</p>
                        </div>
                        <div className='flex flex-row opacity-75'>
                            <p className='w-1/2 font-semibold'>Posted on</p>
                            <p className='w-1/2'>24 February, 2024</p>
                        </div>
                        <div className='flex flex-row opacity-75'>
                            <p className='w-1/2 font-semibold'>Email Updates</p>
                            <p className='w-1/2 overflow-hidden'>spoiledwit@gmail.com</p>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default CandidateDetails