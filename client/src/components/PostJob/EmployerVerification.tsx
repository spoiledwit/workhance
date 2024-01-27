import axios from "axios";
import useAuthStore from "@/store/authStore";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { useState } from "react";

const EmployerVerification = () => {
  const [loading, setLoading] = useState(false);
  const { employer } = useAuthStore();
  const { toast } = useToast();

  const handleResendVerificationEmail = async () => {
    try {
      setLoading(true);
      await axios.post(
        `${import.meta.env.VITE_BASE_URI}/employer/resend-verification-email`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast({
        title: "Verification email sent",
        description:
          "We have sent a verification email to your email address. Please verify your email address to continue.",
      });
    } catch (error: any) {
      console.log(error.response.data.message);
      toast({
        title: "Error",
        variant: "destructive",
        description: error.response.data.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="max-w-[600px] flex flex-col justify-center items-center py-20">
        <h1 className="mb-4 text-3xl font-medium text-center text-gray-800">
          Verify your email address
        </h1>
        <p className="mb-4 text-lg text-center text-gray-600">
          We have sent a verification email to{" "}
          <strong>{employer?.businessEmail}</strong>. Please verify your email
          address to continue.
        </p>
        <Button
          onClick={() => {
            handleResendVerificationEmail();
          }}
          disabled={loading}
        >
          {loading ? "Sending..." : "Resend verification email"}
        </Button>
      </div>
    </div>
  );
};

export default EmployerVerification;
