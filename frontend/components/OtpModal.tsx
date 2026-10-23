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
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { sendEmailOtp, verifySecret } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";

const OtpModal = ({ accountId, email }: { accountId: string; email: string }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const sessionId = await verifySecret({ accountId, password });
      if (sessionId) {
        router.push("/");
      }
    } catch (error) {
      console.log("Failed to verify OTP! ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    await sendEmailOtp({ email });
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      {/* Explicit inline classes avoiding broken @apply classes */}
      <AlertDialogContent className="w-full max-w-[480px] bg-white rounded-[24px] p-8 shadow-2xl space-y-6">
        
        {/* Header container strictly in column direction */}
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
            We&apos;ve sent a code to <span className="text-[#FA7275] font-semibold">{email}</span>
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* OTP Input Centered */}
        <div className="flex justify-center w-full my-4">
          <InputOTP maxLength={6} value={password} onChange={setPassword}>
            <InputOTPGroup className="flex justify-center gap-2 sm:gap-3 w-full">
              <InputOTPSlot index={0} className="w-12 h-14 text-2xl font-semibold border-2 border-slate-200 rounded-xl text-[#FA7275] shadow-sm flex items-center justify-center" />
              <InputOTPSlot index={1} className="w-12 h-14 text-2xl font-semibold border-2 border-slate-200 rounded-xl text-[#FA7275] shadow-sm flex items-center justify-center" />
              <InputOTPSlot index={2} className="w-12 h-14 text-2xl font-semibold border-2 border-slate-200 rounded-xl text-[#FA7275] shadow-sm flex items-center justify-center" />
              <InputOTPSlot index={3} className="w-12 h-14 text-2xl font-semibold border-2 border-slate-200 rounded-xl text-[#FA7275] shadow-sm flex items-center justify-center" />
              <InputOTPSlot index={4} className="w-12 h-14 text-2xl font-semibold border-2 border-slate-200 rounded-xl text-[#FA7275] shadow-sm flex items-center justify-center" />
              <InputOTPSlot index={5} className="w-12 h-14 text-2xl font-semibold border-2 border-slate-200 rounded-xl text-[#FA7275] shadow-sm flex items-center justify-center" />
            </InputOTPGroup>
          </InputOTP>
        </div>

        {/* Submit & Footer */}
        <AlertDialogFooter className="w-full sm:justify-center">
          <div className="flex w-full flex-col gap-4">
            <AlertDialogAction
              onClick={handleSubmit}
              className="w-full h-12 bg-[#FA7275] hover:bg-[#EA6365] text-white rounded-full font-medium transition-colors flex items-center justify-center"
              type="button"
              disabled={isLoading}
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
                className="p-0 h-auto font-medium text-[#FA7275] hover:underline"
                onClick={handleResendOtp}
              >
                Click to resend!
              </Button>
            </div>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default OtpModal;