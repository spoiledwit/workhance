import Candidates from '@/components/Dashboard/Candidates/Candidates'
import DashboardHome from '@/components/Dashboard/Home/DashboardHome'
import Jobposts from '@/components/Dashboard/JobPosts/Jobposts'
import Sidebar from '@/components/Dashboard/Navbar/Sidebar'
import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import useAuthStore from "@/store/authStore";
import JobDetails from '@/components/Dashboard/JobPosts/JobDetails'
import CandidateDetails from '@/components/Dashboard/Candidates/CandidateDetails'
import JobUpdateForm from '@/components/Dashboard/JobPosts/JobUpdateForm'

interface DashboardProps {
    children: React.ReactNode;
}

const Dashboard: React.FC<DashboardProps> = ({ children }) => {

    const path = useLocation();
    const { user, employer } = useAuthStore();

    if (!user || !employer) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <p className="text-2xl font-bold text-gray-700">
                    You are not authorized to view this page. Please register as an employer.
                </p>
                <div className='flex flex-row gap-5'>

                    <Link
                        to={"/post-job"}
                    >
                        <p className="bg-violet-800 hover:bg-violet-900 text-white px-4 py-2 rounded-lg mt-4">
                            Become an Employer
                        </p>
                    </Link>
                    <Link
                        to={"/"}
                    >
                        <p className="bg-white text-violet-800 border border-violet-800 hover:bg-violet-900  px-4 py-2 rounded-lg mt-4">
                            Go Home
                        </p>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className='flex flex-row h-screen relative '>
                <Sidebar />

                <div className=' w-full py-5 px-12 border-black'>
                    {
                        path.pathname === '/dashboard' && <DashboardHome />
                    }
                    {
                        path.pathname === '/dashboard/job-posts' && <Jobposts />
                    }
                    {
                        path.pathname === '/dashboard/candidates' && <Candidates />
                    }
                    {
                        path.pathname === '/dashboard/job-details' && <JobDetails />
                    }
                    {
                        path.pathname === '/dashboard/candidate-details' && <CandidateDetails />
                    }
                    {
                        path.pathname === '/dashboard/job-update' && <JobUpdateForm />
                    }
                </div>


            </div>
        </>
    )
}

export default Dashboard