import { Job, JobDetail } from '@/types';
import React from 'react'
import { useLocation } from 'react-router-dom';

type JobData = {
    state?: Job
};

const JobDetails = () => {

    const location = useLocation() as JobData;
    // const job = location.state;
    console.log(location);

    return (
        <>
            <div className='flex flex-row gap-2'>
                <div className='rounded-lg border w-3/4 p-7'>
                    <h1 className='text-2xl font-semibold'>Software Developer</h1>
                    <p className='opacity-75'>Company name</p>
                    <hr className='my-3' />
                    <div className='flex flex-row mt-5 gap-3'>
                        <div className='border text-center p-5 rounded w-1/2'>
                            <h3 className='text-xl'>Applications</h3>
                            <p className='font-semibold text-xl'>35</p>
                        </div>
                        <div className='border text-center p-5 rounded w-1/2'>
                            <h3 className='text-xl'>Status</h3>
                            <p className='font-semibold text-xl'>Pending</p>
                        </div>
                    </div>
                    <hr className='my-3' />
                    <h2 className='text-xl font-semibold mb-1'>Job Description</h2>
                    <p className='opacity-75'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo dicta aliquam, quam laboriosam placeat quibusdam ipsum eum alias eaque temporibus ullam, debitis facilis tempore exercitationem aliquid officiis quidem quis ea.</p>
                </div>
                <div className='border rounded-lg p-7 w-1/4 flex flex-col gap-3'>
                    <div className='text-center flex flex-col gap-1'>
                        <button className='bg-[#2d2d2d] border border-[#2d2d2d] hover:bg-[#1a1a1a] hover:border-[#1a1a1a] transition-all font-semibold text-white w-full py-2 rounded '>Edit this job</button>
                        <button className=' text-red-500 border border-red-500 w-full py-2 rounded hover:bg-red-700 hover:border-red-700 hover:text-white font-semibold transition-all '>Delete job post</button>
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

export default JobDetails