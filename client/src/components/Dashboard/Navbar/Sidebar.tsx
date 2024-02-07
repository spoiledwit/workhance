import React from 'react'
import { BiMenu, BiBriefcase, BiSolidGroup } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <>
            <div className='w-[60px] bg-[#2D2D2D] group gap-2 h-full delay-500 hover:w-[200px] transition-all'>
                <Link to={'/dashboard'}>
                    <div className='flex group flex-row gap-2 text-white justify-start items-center hover:bg-[#5f5f5f] transition-all rounded p-2 m-2 '>
                        <BiMenu size={25} color={"#ffffff"} />
                        {/* <p className='hidden group-hover:block transition-all '>Dashboard</p> */}
                    </div>
                </Link>

                <Link to={'/dashboard/job-posts'}>
                    <div className='flex flex-row justify-start items-center hover:bg-[#5f5f5f] transition-all rounded p-2 m-2'>
                        <BiBriefcase size={25} color={"#ffffff"} />
                    </div>
                </Link>

                <Link to={'/dashboard/candidates'}>
                    <div className='flex flex-row justify-start items-center hover:bg-[#5f5f5f] transition-all rounded p-2 m-2'>
                        <BiSolidGroup size={25} color={"#ffffff"} />

                    </div>
                </Link>
            </div >
        </>
    )
}

export default Sidebar; 