import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { useToast } from "../ui/use-toast";
import { Textarea } from "../ui/textarea";
import Locator from "../Locator/Locator";
import useAuthStore from "@/store/authStore";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  companyName: z.string().min(3).max(255),
  businessEmail: z.string().email(),
  companyWebsite: z.string().url().optional(),
  employeeCount: z.string().min(3).max(255),
  jobTitle: z.string().min(3).max(255),
  jobDescription: z.string().min(3).max(255),
  jobType: z.string().min(3).max(255),
  advertisingLocation: z.string().min(3).max(255),
  salary: z.object({
    min: z.string(),
    max: z.string(),
  }),
  updatesEmail: z.string().email(),
  requireCv: z.boolean().optional(),
});

const PostJobForm = () => {
  const [region, setRegion] = useState("");
  const [step, setStep] = useState(1);
  const { user } = useAuthStore();
  useEffect(() => {
    form.setValue("advertisingLocation", region);
  }, [region]);

  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const { toast } = useToast();

  const validateStep1 = () => {
    // checking if all the below fields are filled
    if (
      form.watch("jobTitle") &&
      form.watch("jobDescription") &&
      form.watch("jobType") &&
      form.watch("advertisingLocation") &&
      form.watch("salary")
    ) {
      setStep(2);
    }
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    const bigData = {
      ...data,
      employerId: user?.employerId,
    };
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URI}/job`, bigData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast({
        title: "Job Posted",
        description: "Your job would be verified and posted soon.",
      });
      window.location.href = "/";
    } catch (error: any) {
      toast({
        title: "Error",
        variant: "destructive",
        description: error.response.data.message,
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-3 w-full xl:max-w-[700px] lg:max-w-[700px] md:max-w-[700px] max-w-[900px]"
        >
          {step === 1 && (
            <>
              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Senior Software Engineer"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is the title of the job you are posting.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="jobDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tell us about the job</FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={loading}
                        placeholder="Senior Software Engineer with 5+ years experience"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is the description employees will see when they view
                      your job posting.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="jobType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Type</FormLabel>
                    <FormControl>
                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        {...field}
                      >
                        <option value="full-time">Full Time</option>
                        <option value="part-time">Part Time</option>
                        <option value="contract">Contract</option>
                        <option value="internship">Internship</option>
                        <option value="volunteer">Volunteer</option>
                        <option value="temporary">Temporary</option>
                      </select>
                    </FormControl>
                    <FormDescription>
                      This is the type of job you are posting.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="advertisingLocation"
                render={() => (
                  <FormItem>
                    <FormLabel>
                      Where do you want to advertise this job?
                    </FormLabel>
                    <FormControl>
                      <Locator
                        placeholder="Enter a location"
                        region={region}
                        selectRegion={setRegion}
                      />
                    </FormControl>
                    <FormDescription>
                      This is the location of the job you are posting.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/*  Salary */}

              <FormField
                control={form.control}
                name="salary"
                render={() => (
                  <FormItem>
                    <FormLabel>Salary (AED)</FormLabel>
                    <FormControl>
                      <div className="flex space-x-2">
                        <Input
                          disabled={loading}
                          placeholder="min"
                          type="number"
                          value={form.watch("salary.min")}
                          onChange={(e) => {
                            form.setValue("salary.min", e.target.value);
                          }}
                        />
                        <Input
                          disabled={loading}
                          placeholder="max"
                          type="number"
                          value={form.watch("salary.max")}
                          onChange={(e) => {
                            form.setValue("salary.max", e.target.value);
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      This is the salary of the job you are posting.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {step === 1 && (
            <div className="flex justify-end space-x-2">
              <Button
                onClick={() => {
                  validateStep1();
                }}
                disabled={loading}
                variant="secondary"
              >
                Next
              </Button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-2xl font-medium text-gray-800">
                Please tell us more about the company you are posting this job
                for.
              </h2>
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="microsoft"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is how your company will be displayed on the
                      platform.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="businessEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Email</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="hr@microsoft.com"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      You would receive verification emails on this email
                      address.
                    </FormDescription>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="companyWebsite"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Website</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="https://microsoft.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="employeeCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employee Count</FormLabel>
                    <FormControl>
                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        {...field}
                      >
                        <option value="1-10">1-10</option>
                        <option value="11-50">11-50</option>
                        <option value="51-200">51-200</option>
                        <option value="201-500">201-500</option>
                        <option value="501-1000">501-1000</option>
                        <option value="1001-5000">1001-5000</option>
                        <option value="5001-10000">5000+</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="updatesEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Where should we send updates related to this job?
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="hr@microsoft.com"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      You would receive updates on this email address.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="requireCv"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Require CV</FormLabel>
                    <FormControl>
                      <input className="ml-2" type="checkbox" {...field} />
                    </FormControl>
                    <FormDescription>
                      Do you require a CV from the applicants?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {step === 2 && (
            <div className="flex justify-between space-x-2">
              <Button
                onClick={() => {
                  setStep(1);
                }}
                disabled={loading}
                variant="secondary"
              >
                Back
              </Button>
              <Button disabled={loading} type="submit">
                {loading ? "Posting..." : "Post"}
              </Button>
            </div>
          )}
        </form>
      </Form >
    </div >
  );
};

export default PostJobForm;
