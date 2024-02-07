import useAuthStore from "@/store/authStore";
import EmployerReg from "@/components/PostJob/EmployerReg";
import EmployerVerification from "@/components/PostJob/EmployerVerification";
import PostJobForm from "@/components/PostJob/PostJob";

const PostJob = () => {
  const { user, employer } = useAuthStore();

  return (
    <div className="xl:px-32 lg:px-32 md:px-32 px-8 py-10">
      {user && !employer && <EmployerReg />}
      {employer && !employer?.isVerified && <EmployerVerification />}
      {employer && employer?.isVerified && <PostJobForm />}
    </div>
  );
};

export default PostJob;
