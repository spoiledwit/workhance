import useAuthStore from '@/store/authStore'
import React from 'react'
import { BiCheck, BiTimeFive } from 'react-icons/bi'
import { RxCross2 } from 'react-icons/rx'

const VerifiedStatus = ({ verificationStatus, userId, setVerify }: { verificationStatus: string | undefined, userId: string, setVerify: any }) => {

    const { user } = useAuthStore();

    return (
        <>

            {
                verificationStatus == "Verified" && userId == user?._id ?
                    <div className="flex flex-row items-center justify-between gap-1 rounded border w-fit px-3  mt-2 transition-all text-green-700 border-green-700">
                        Verified
                        <BiCheck size={20} />
                    </div>
                    : null
            }
            {
                verificationStatus == "Pending" && userId == user?._id ?
                    <div className="flex flex-row gap-2 items-center rounded border w-fit px-3  mt-2 transition-all text-yellow-600 border-yellow-600">
                        Pending
                        <BiTimeFive size={17} />
                    </div>
                    : null
            }
            {
                verificationStatus == "Not Verified" && userId == user?._id ?
                    <div className="flex flex-row items-center gap-1 rounded border w-fit px-2 mt-2 hover:text-white hover:bg-[#2d2d2d] hover:border-[#2d2d2d] cursor-pointer transition-all text-gray-600 border-gray-500" onClick={() => setVerify(true)}>
                        Not Verified
                        <RxCross2 size={20} />
                    </div>
                    : null
            }
        </>
    )
}

export default VerifiedStatus