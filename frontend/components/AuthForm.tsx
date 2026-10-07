"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {createAccount} from "@/lib/actions/user.actions"; // your backend call

type FormType = "sign-in" | "sign-up";

const authFormSchema = (formType: FormType) => {
  return z.object({
    fullName:
      formType === "sign-up"
        ? z.string().min(2, "Full name must be at least 2 characters").max(50)
        : z.string().optional(),
    email: z.string().min(1, "Required").email("Please enter a valid email"),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [accountId, setAccountId] = useState<string | null>(null);

  // Rebuild the schema only when the form type changes
  const formSchema = useMemo(() => authFormSchema(type), [type]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
    },
  });

  // Clear stale values and errors when switching between sign-in and sign-up
  useEffect(() => {
    form.reset();
    setErrorMessage("");
  }, [type, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const user =await createAccount({
        fullName:values.fullName||"",
        email:values.email
      });
      setAccountId(user.accountId);
    } catch (error) {
      setErrorMessage(
        type === "sign-up"
          ? "Failed to create account. Please try again."
          : "Failed to sign in. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
          <h1 className="form-title">
            {type === "sign-in" ? "Sign In" : "Sign Up"}
          </h1>

          {type === "sign-up" && (
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <div className="shad-form-item">
                    <FormLabel className="shad-form-label">Full name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your full name"
                        autoComplete="name"
                        className="shad-input w-full"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="shad-form-message" />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <div className="shad-form-item">
                  <FormLabel className="shad-form-label">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      autoComplete="email"
                      className="shad-input w-full"
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage className="shad-form-message" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="form-submit-button"
            disabled={isLoading}
          >
            {type === "sign-in" ? "Sign In" : "Sign Up"}
            {isLoading && (
              <Image
                src="/assets/icons/loader.svg"
                alt="Loading"
                width={24}
                height={24}
                className="ml-2 animate-spin"
              />
            )}
          </Button>

          {errorMessage && (
            <p className="error-message" role="alert">
              *{errorMessage}
            </p>
          )}

          <div className="body-2 flex justify-center">
            <p className="text-light-100">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="ml-1 font-medium text-brand"
            >
              {type === "sign-in" ? "Sign Up" : "Sign In"}
            </Link>
          </div>
        </form>
      </Form>

      {/* OTP verification: render your OTP modal here once accountId is set */}
      {/* {accountId && (
        <OtpModal email={form.getValues("email")} accountId={accountId} />
      )} */}
    </>
  );
};

export default AuthForm;