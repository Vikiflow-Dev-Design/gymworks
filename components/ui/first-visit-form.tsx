"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./button";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { createFreeTrialRequest } from "@/app/actions/freeTrialRequest";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(6, "Phone number is required"),
  fitnessGoals: z.string().optional(),
});

const FirstVisitForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isSignedIn } = useUser();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      fitnessGoals: "",
    },
  });

  useEffect(() => {
    // If user is signed in, set hasVisited to true
    if (isSignedIn) {
      localStorage.setItem("hasVisited", "true");
      return;
    }

    // For non-signed in users, check hasVisited status
    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 3000); // Show after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [isSignedIn]); // Add isSignedIn as dependency

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await createFreeTrialRequest(values);

      if (!response.success) {
        // If user has already requested, set hasVisited and close form
        if (response.error?.includes("already requested")) {
          localStorage.setItem("hasVisited", "true");
          setIsOpen(false);
          toast.info(
            "You've already requested a trial class. Check out our membership plans!"
          );
          router.push("/membership");
          return;
        }
        throw new Error(response.error);
      }

      // Save visit status
      localStorage.setItem("hasVisited", "true");

      // Close modal
      setIsOpen(false);

      toast.success("Thank you for your interest! We'll be in touch soon.");
      form.reset();

      // Redirect to membership page
      router.push("/membership");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden"
          >
            <div className="p-4 md:p-6">
              <h2 className="text-xl font-bold mb-1 dark:text-white">
                Get Your Free Trial Class!
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                Fill out this form to claim your complimentary CrossFit class.
                Our expert trainers will help you kickstart your fitness journey
                with a personalized introduction to our community.
              </p>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm dark:text-white">
                            First Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="First name"
                              {...field}
                              className="h-10 text-sm transition-colors focus:ring-2 focus:ring-primary/20"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm dark:text-white">
                            Last Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Last name"
                              {...field}
                              className="h-10 text-sm transition-colors focus:ring-2 focus:ring-primary/20"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm dark:text-white">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="your@email.com"
                            {...field}
                            className="h-10 text-sm transition-colors focus:ring-2 focus:ring-primary/20"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm dark:text-white">
                          Phone
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="Your phone number"
                            {...field}
                            className="h-10 text-sm transition-colors focus:ring-2 focus:ring-primary/20"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="fitnessGoals"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm dark:text-white">
                          What are your fitness goals? (Optional)
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about your fitness goals..."
                            className="min-h-[80px] text-sm transition-colors focus:ring-2 focus:ring-primary/20 resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-2 justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        localStorage.removeItem("hasVisited");
                        setIsOpen(false);
                      }}
                      className="text-sm h-9"
                    >
                      Maybe Later
                    </Button>
                    <Button
                      type="submit"
                      className="bg-primary hover:bg-primary/90 text-sm h-9"
                      disabled={form.formState.isSubmitting}
                    >
                      {form.formState.isSubmitting
                        ? "Submitting..."
                        : "Get Started"}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default FirstVisitForm;
