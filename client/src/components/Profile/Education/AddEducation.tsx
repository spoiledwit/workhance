import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import axios from "axios";

import { useState } from "react";

const schema = z.object({
  school: z
    .string()
    .min(2, { message: "School name is too short" })
    .max(50, { message: "School name is too long" }),
  degree: z
    .string()
    .min(2, { message: "Degree name is too short" })
    .max(50, { message: "Degree name is too long" }),
  fieldofstudy: z
    .string()
    .min(2, { message: "Field of study is too short" })
    .max(50, { message: "Field of study is too long" }),
  startYear: z
    .string()
    .min(4, { message: "Start year is too short" })
    .max(4, { message: "Start year is too long" }),
  endYear: z
    .string()
    .min(4, { message: "End year is too short" })
    .max(4, { message: "End year is too long" }),
  grade: z
    .string()
    .min(1, { message: "Grade is too short" })
    .max(50, { message: "Grade is too long" })
    .optional(),
  description: z
    .string()
    .min(2, { message: "Description is too short" })
    .max(50, { message: "Description is too long" })
    .optional(),
  isCurrent: z.boolean().optional(),
});

const AddEducation = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: any;
  userId: string;
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm({
    resolver: zodResolver(schema),
  });

  const handleAddEducation = async (values: any) => {
    try {
      setLoading(true);
      await axios.post(
        `${import.meta.env.VITE_BASE_URI}/auth/education`,
        {
          values,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      form.reset();
      setOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      window.location.reload();
    }
  };
  return (
    <Dialog onOpenChange={(open) => setOpen(open)} open={open}>
      <DialogContent className="max-h-[600px] xl:max-w-lg md:max-w-lg lg:max-w-lg sm:max-w-[400px] max-w-[350px] overflow-y-auto rounded">
        <DialogHeader>
          <DialogTitle>Add Education</DialogTitle>
          <DialogDescription>
            Add any school, bootcamp, etc that you have attended
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleAddEducation)}
            className="space-y-3 w-full max-w-[800px]"
          >
            <FormField
              control={form.control}
              name="school"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>School or Bootcamp</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="MIT" {...field} />
                  </FormControl>
                  <FormDescription>What school did you go to?</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="degree"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Degree or Certificate</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Software Engineering"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    What is your degree or certificate?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fieldofstudy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Field Of Study</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Computer Science"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    What is your field of study?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="startYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Year</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="2019" {...field} />
                  </FormControl>
                  <FormDescription>What year did you start?</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Year</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="2024" {...field} />
                  </FormControl>
                  <FormDescription>What year did you end?</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="grade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Grade</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="A" {...field} />
                  </FormControl>
                  <FormDescription>What is your grade?</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Tell us about your experience and what you learned"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Tell us about your experience and what you learned
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isCurrent"
              render={({ field }) => (
                <FormItem className="flex items-center gap-3">
                  <FormLabel>Are you currently studying here?</FormLabel>
                  <FormControl>
                    <Input
                      className="w-3 h-3"
                      disabled={loading}
                      type="checkbox"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="justify-start">
              <Button variant="default" type="submit" disabled={loading}>
                {loading ? "Loading..." : "Save"}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEducation;
