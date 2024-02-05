import { EducationInfo } from "@/types";
import { useState } from "react";
import { BiTrashAlt } from "react-icons/bi";
import { MdOutlineEdit } from "react-icons/md";
import DeleteEducation from "./DeleteEducation";

const Educations = ({ data, setOpen, userId }: { data: EducationInfo, setOpen: any, userId: string }) => {

  const [openDelete, setOpenDelete] = useState(false);

  return (
    <div className="mt-5">
      {
        openDelete && <DeleteEducation open={true} setOpen={setOpenDelete} userId={userId} data={data} />
      }

      <div className="flex flex-row gap-20 items-center">
        <h1 className="font-semibold text-lg">{data.school}<span className="font-normal text-sm opacity-70 ml-2">({data.startYear} - {data.endYear})</span></h1>
        <div className="flex flex-row gap-5">
          <div className="hover:bg-gray-200 cursor-pointer ml-[-10px] transition-all p-2 rounded-full" onClick={() => setOpen(data)}>
            <MdOutlineEdit size={22} opacity={0.7} />
          </div>
          <div className="hover:bg-red-200 cursor-pointer ml-[-10px] transition-all p-2 rounded-full" onClick={() => setOpenDelete(true)}>
            <BiTrashAlt size={22} opacity={0.7} />
          </div>
        </div>
      </div >
      <p className="opacity-80 font-semibold">{data.degree}</p>
      <p className="opacity-80 text font-semibold">Grade: {data.grade}</p>
      <p className="opacity-90 mt-2">{data.description}</p>
    </div>
  )
}

export default Educations;