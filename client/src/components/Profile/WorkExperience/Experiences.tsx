import { WorkExperience } from "@/types";
import { useState } from "react";
import { BiTrashAlt } from "react-icons/bi";
import { MdOutlineEdit } from "react-icons/md";
import DeleteWorkExperience from "./DeleteWorkExperience";
import useAuthStore from "@/store/authStore";

const Experiences = ({ data, setOpen, userId }: { data: WorkExperience, setOpen: any, userId: string }) => {

  const [openDelete, setOpenDelete] = useState(false);
  const { user } = useAuthStore();

  function isCurrentUser() {
    if (user?._id == userId) {
      return true;
    }
    return false;
  }

  return (
    <>
      {
        openDelete && <DeleteWorkExperience open={true} setOpen={setOpenDelete} data={data} />
      }

      <div className="flex flex-row gap-20 items-center ">
        <h1 className="font-semibold text-lg">{data.company}<span className="font-normal text-sm opacity-70 ml-2">({data.startYear} - {data.isCurrent ? "Present" : data.endYear})</span></h1>
        <div className={"flex flex-row gap-5"}>
          <div className={`hover:bg-gray-200 cursor-pointer ml-[-10px] transition-all p-2 rounded-full`} onClick={() => setOpen(true)}>
            <MdOutlineEdit size={22} opacity={0.7} className={isCurrentUser() ? "" : "hidden"} />
          </div>
          <div className={`hover:bg-red-200 cursor-pointer ml-[-10px] transition-all p-2 rounded-full`} onClick={() => setOpenDelete(true)}>
            <BiTrashAlt size={22} opacity={0.7} className={isCurrentUser() ? "" : "hidden"} />
          </div>
        </div>
      </div >
      <p className="opacity-80 font-semibold">{data.position}</p>
      <p className="opacity-90 mt-2">{data.description}</p>
    </>
  )
}

export default Experiences;