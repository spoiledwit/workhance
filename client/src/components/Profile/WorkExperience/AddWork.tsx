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
  company: z
    .string()
    .min(2, { message: "Company name is too short" })
    .max(255, { message: "Company name is too long" }),
  position: z
    .string()
    .min(2, { message: "Position is too short" })
    .max(255, { message: "Position is too long" }),
  startYear: z
    .string()
    .min(4, { message: "Start year is too short" })
    .max(4, { message: "Start year is too long" }),
  endYear: z
    .string()
    .min(4, { message: "End year is too short" })
    .max(4, { message: "End year is too long" }),
  description: z
    .string()
    .min(2, { message: "Description is too short" })
    .max(255, { message: "Description is too long" }),
  isCurrent: z.boolean().optional(),
});

const AddWork = ({
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

  const handleAddWork = async (values: any) => {
    try {
      setLoading(true);
      await axios.post(
        `${import.meta.env.VITE_BASE_URI}/auth/Work`,
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
    }
  };
  return (
    <Dialog onOpenChange={(open) => setOpen(open)} open={open}>
      <DialogContent className="max-h-[600px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Work</DialogTitle>
          <DialogDescription>
            Add any Work experience that you have had in the past
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleAddWork)}
            className="space-y-3 w-full max-w-[800px]"
          >
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Microsoft"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>What is the company name?</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Sr. Software Developer"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    What is your position at the company?
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
                  <FormLabel>Are you currently working here?</FormLabel>
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

export default AddWork;
