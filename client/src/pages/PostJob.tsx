import useAuthStore from "@/store/authStore";
import EmployerReg from "@/components/PostJob/EmployerReg";
import EmployerVerification from "@/components/PostJob/EmployerVerification";
import PostJobForm from "@/components/PostJob/PostJob";

const PostJob = () => {
  const { user, employer } = useAuthStore();

  return (
    <div className="px-32 py-10">
      {user && !employer && <EmployerReg />}
      {employer && !employer?.isVerified && <EmployerVerification />}
      {employer && employer?.isVerified && <PostJobForm />}
    </div>
  );
};

export default PostJob;
