"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { sendEmailOtp, verifySecret } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";

const OtpModal = ({ accountId, email }: { accountId: string; email: string }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    if (resendTimer <= 0) return;
    const interval = setInterval(() => setResendTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const sessionId = await verifySecret({ accountId, password });
      if (sessionId) {
        router.push("/");
      } else {
        setErrorMessage("Invalid OTP code. Please try again.");
      }
    } catch (error) {
      console.log("Failed to verify OTP! ", error);
      setErrorMessage("Verification failed. Please check your code.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setPassword("");
    setErrorMessage("");
    setResendTimer(30);
    await sendEmailOtp({ email });
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="w-full max-w-[480px] bg-white rounded-[24px] p-8 shadow-2xl space-y-6">
        <AlertDialogHeader className="flex flex-col items-center justify-center gap-2 relative">
          <AlertDialogTitle className="text-2xl font-bold text-center text-[#333F4E] w-full">
            Enter your OTP!
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute right-0 top-0 cursor-pointer"
            >
              <Image
                src="/assets/icons/close-dark.svg"
                alt="close"
                width={20}
                height={20}
              />
            </button>
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm font-medium text-[#333F4E]/80 text-center">
            We&apos;ve sent a code to{" "}
            <span className="text-[#FA7275] font-semibold">{email}</span>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="flex justify-center w-full my-4">
          <InputOTP maxLength={6} value={password} onChange={setPassword}>
            <InputOTPGroup className="flex justify-center gap-2 sm:gap-3 w-full">
              {Array.from({ length: 6 }).map((_, index) => (
                <InputOTPSlot
                  key={index}
                  index={index}
                  className="w-12 h-14 text-2xl font-semibold border-2 border-slate-200 rounded-xl text-[#FA7275] shadow-sm flex items-center justify-center"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>

        {errorMessage && (
          <p className="text-sm text-center text-red-500 font-medium">
            {errorMessage}
          </p>
        )}

        <AlertDialogFooter className="w-full sm:justify-center">
          <div className="flex w-full flex-col gap-4">
            <AlertDialogAction
              onClick={handleSubmit}
              className="w-full h-12 bg-[#FA7275] hover:bg-[#EA6365] text-white rounded-full font-medium transition-colors flex items-center justify-center disabled:opacity-50"
              type="button"
              disabled={isLoading || password.length < 6}
            >
              Submit!
              {isLoading && (
                <Image
                  src="/assets/icons/loader.svg"
                  alt="loader"
                  width={22}
                  height={22}
                  className="ml-2 animate-spin"
                />
              )}
            </AlertDialogAction>

            <div className="text-sm text-center text-[#333F4E]">
              Didn&apos;t get a code?{" "}
              <Button
                type="button"
                variant="link"
                disabled={resendTimer > 0}
                className="p-0 h-auto font-medium text-[#FA7275] hover:underline disabled:opacity-50"
                onClick={handleResendOtp}
              >
                {resendTimer > 0
                  ? `Resend in ${resendTimer}s`
                  : "Click to resend!"}
              </Button>
            </div>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default OtpModal;