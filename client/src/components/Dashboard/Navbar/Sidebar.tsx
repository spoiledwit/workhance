import React from 'react'
import { BiMenu, BiBriefcase, BiSolidGroup } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <>
            <div className='w-[60px] bg-[#2D2D2D] gap-2 h-full'>
                <Link to={'/dashboard'}>
                    <div className='flex flex-row justify-center items-center hover:bg-[#5f5f5f] transition-all rounded p-2 m-2 '>
                        <BiMenu size={25} color={"#ffffff"} />
                    </div>
                </Link>

                <Link to={'/job-posts'}>
                    <div className='flex flex-row justify-center items-center hover:bg-[#5f5f5f] transition-all rounded p-2 m-2'>
                        <BiBriefcase size={25} color={"#ffffff"} />

                    </div>
                </Link>

                <Link to={'/candidates'}>
                    <div className='flex flex-row justify-center items-center hover:bg-[#5f5f5f] transition-all rounded p-2 m-2'>
                        <BiSolidGroup size={25} color={"#ffffff"} />

                    </div>
                </Link>
            </div >
        </>
    )
}

export default Sidebar; 