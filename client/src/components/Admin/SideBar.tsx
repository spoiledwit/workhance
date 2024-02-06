import { Link } from "react-router-dom";
import { BiBriefcase, BiMenu, BiSolidGroup, BiSolidUserCheck } from "react-icons/bi";

const SideBar = () => {

  return (
    <>
      <div className='w-[60px] bg-[#2D2D2D] gap-2 h-full delay-500 hover:w-[200px] transition-all'>
        <Link to={'/admin'}>
          <div className='flex flex-row justify-start items-center hover:bg-[#5f5f5f] transition-all rounded p-2 m-2'>
            <BiMenu size={25} color={"#ffffff"} />
          </div>
        </Link>

        <Link to={'/admin/users'}>
          <div className='flex flex-row justify-start items-center hover:bg-[#5f5f5f] transition-all rounded p-2 m-2'>
            <BiSolidGroup size={25} color={"#ffffff"} />
          </div>
        </Link>

        <Link to={'/admin/jobs'}>
          <div className='flex flex-row justify-start items-center hover:bg-[#5f5f5f] transition-all rounded p-2 m-2'>
            <BiBriefcase size={25} color={"#ffffff"} />

          </div>
        </Link>
        <Link to={'/admin/pending-users'}>
          <div className='flex flex-row justify-start items-center hover:bg-[#5f5f5f] transition-all rounded p-2 m-2'>
            <BiSolidUserCheck size={25} color={"#ffffff"} />

          </div>
        </Link>
      </div >
    </>
  )
};

export default SideBar;
