const ApprovalAwaiting = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-md mx-auto p-6 bg-violet-100 rounded-xl shadow-lg space-y-4 mt-40">
      <h1 className="text-xl font-semibold text-violet-800">
        Your account is awaiting approval
      </h1>
      <p className="text-center text-gray-600">
        Please wait for an admin to approve your account.
      </p>
    </div>
  );
};

export default ApprovalAwaiting;
