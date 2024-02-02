import Candidates from '@/components/Dashboard/Candidates/Candidates'
import DashboardHome from '@/components/Dashboard/Home/DashboardHome'
import Jobposts from '@/components/Dashboard/JobPosts/Jobposts'
import Sidebar from '@/components/Dashboard/Navbar/Sidebar'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

const Dashboard = () => {
    return (
        <>
            <div className='flex flex-row h-screen relative '>
                <Sidebar />

                {/* <div className=''>Dashboard</div> */}
                <div className=' w-full py-5 px-12 border-black'>
                    <Jobposts />
                </div>
                <Routes>
                    <Route path="/dashboard" element={<DashboardHome />} />
                    <Route path="/job-posts" element={<Jobposts />} />
                    <Route path="/candidates" element={<Candidates />} />
                </Routes>

            </div>
        </>
    )
}

export default Dashboard