import { EducationInfo } from "@/types";
import { useState } from "react";
import { BiTrashAlt } from "react-icons/bi";
import { MdOutlineEdit } from "react-icons/md";
import DeleteEducation from "./DeleteEducation";
import useAuthStore from "@/store/authStore";
import { capitalizeFirstLetter } from "@/lib/utils";

const Educations = ({ data, setOpen, userId }: { data: EducationInfo, setOpen: any, userId: string }) => {

  const [openDelete, setOpenDelete] = useState(false);
  const { user } = useAuthStore();

  function isCurrentUser() {
    if (user?._id == userId) {
      return true;
    }
    return false;
  }

  return (
    <div className="mt-3 border px-4 py-1 rounded-lg max-w-max shadow">
      {
        openDelete && <DeleteEducation open={true} setOpen={setOpenDelete} userId={userId} data={data} />
      }

      <div className="flex flex-row gap-20 items-center">
        <h1 className="font-semibold text-lg">{data.school}<span className="font-normal text-sm opacity-70 ml-2 text-nowrap">({data.startYear} - {data.endYear})</span></h1>
        <div className="flex flex-row gap-5">
          <div className="hover:bg-gray-200 cursor-pointer ml-[-10px] transition-all p-2 rounded-full" title="Edit" onClick={() => setOpen(data)}>
            <MdOutlineEdit size={22} opacity={0.7} className={isCurrentUser() ? "" : "hidden"} />
          </div>
          <div className="hover:bg-red-200 cursor-pointer ml-[-10px] transition-all p-2 rounded-full" title="Delete" onClick={() => setOpenDelete(true)}>
            <BiTrashAlt size={22} opacity={0.7} className={isCurrentUser() ? "" : "hidden"} />
          </div>
        </div>
      </div >
      <p className="opacity-80 font-semibold">{capitalizeFirstLetter(data.degree)}</p>
      <p className="opacity-80 text font-semibold">Grade: {capitalizeFirstLetter(data.grade)}</p>
      <p className="opacity-90 mt-2 mb-2">{capitalizeFirstLetter(data.description)}</p>
    </div>
  )
}

export default Educations;