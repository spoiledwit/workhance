import Candidates from '@/components/Dashboard/Candidates/Candidates'
import DashboardHome from '@/components/Dashboard/Home/DashboardHome'
import Jobposts from '@/components/Dashboard/JobPosts/Jobposts'
import Sidebar from '@/components/Dashboard/Navbar/Sidebar'
import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import useAuthStore from "../store/authStore";

interface DashboardProps {
    children: React.ReactNode;
}

const Dashboard: React.FC<DashboardProps> = ({ children }) => {

    const { user } = useAuthStore();
    const path = useLocation();

    console.log(user);

    return (
        <>
            <div className='flex flex-row h-screen relative '>
                <Sidebar />

                <div className=' w-full py-5 px-12 border-black'>
                    {
                        location.pathname === '/dashboard' && <DashboardHome />
                    }
                    {
                        location.pathname === '/dashboard/job-posts' && <Jobposts />
                    }
                    {
                        location.pathname === '/dashboard/candidates' && <Candidates />
                    }
                </div>


            </div>
        </>
    )
}

export default Dashboard