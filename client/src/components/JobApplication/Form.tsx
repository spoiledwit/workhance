import axios from "axios";
import PDFUploader from "../Uploader/PdfUploader";
import { useState } from "react";
import UserRow from "../Feed/RightSideBar/UserRow";
import useAuthStore from "@/store/authStore";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

const Form = ({ job }: { job: any }) => {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [pdfMetaData, setpdfMetaData] = useState<any>(null);
  const [pdfs, setPdfs] = useState<string[]>([]);

  console.log(job);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (job.requireCv && !pdfs.length) {
      toast({
        title: "CV is required",
        description: "Please upload your CV",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URI}/application`,
        {
          jobId: job._id,
          applicantId: user?._id,
          cv: pdfs[0],
        }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
      );
      console.log(res);
      toast({
        title: "Success",
        description: "Your application has been submitted successfully",
        variant: "default",
      });
      setLoading(false);
    } catch (error: any) {
      console.log(error);
      toast({
        title: "Error",
        description: error.response.data.message,
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <h2 className="font-medium mb-1">Personal Information</h2>
        <p className="text-sm text-gray-500 mb-2">
          Applying as <span className="font-medium">{user?.name}</span>
        </p>
        {user && <UserRow user={user} />}
      </div>
      <hr className="my-4" />
      <div>
        <h2 className="font-medium mb-1">Upload your CV</h2>
        <p className="text-sm text-gray-500 mb-2">
          Please upload your CV in PDF format
        </p>
        <PDFUploader
          addedPdfs={pdfs}
          onChange={setPdfs}
          maxPdfs={1}
          metaData={pdfMetaData}
          setMetaData={setpdfMetaData}
        />
        {pdfMetaData && (
          <div>
            <p className="text-sm text-gray-500 mt-2">
              {pdfMetaData.name} - {(pdfMetaData.size / 1024 / 1024).toFixed(2)}{" "}
              MB
            </p>
          </div>
        )}
      </div>
      <p className="text-sm text-gray-500 mt-6">
        By clicking submit, you agree to our{" "}
        <a className="text-blue-500" href="#">
          Terms & Conditions
        </a>
      </p>
      <Button
        onClick={handleSubmit}
        disabled={user?.employerId == job.employerId._id ? true : false}
        className="mt-2 h-10 w-full">
        {loading ? "Loading..." : user?.employerId == job.employerId._id ? "Unable To Apply" : "Submit"}

      </Button>
    </div>
  );
};

export default Form;
