"use client"
import Image from "next/image"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useState } from "react"
import { usePathname } from "next/navigation";


const MobileNavigation = () => {
  const [open,setOpen]=useState(false);
  const pathName=usePathname();
  return <header className="mobile-header ">
    <Image src="/assets/icons/logo-full-brand.svg" alt="Logo" width={120} height={52} className="h-auto" />
    <Sheet open={open} onOpenChange={setOpen}>
  <SheetTrigger>
    <Image src="/assets/icons/menu.svg" alt="Search" width={30} height={30}/>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Are you absolutely sure?</SheetTitle>
      <SheetDescription>This action cannot be undone.</SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>
  </header>
}

export default MobileNavigation
