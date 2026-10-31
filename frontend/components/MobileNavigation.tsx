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
import { Separator } from "@/components/ui/separator";
import { navItems } from "@/constants";
import Link from "next/link"
import { cn } from "cn";
import FileUploader from "./FileUploader";
interface Props
{
  fullName:string,
  avatar:string,
  email:string;
}

const MobileNavigation = ({fullName,avatar,email}:Props) => {
  const [open,setOpen]=useState(false);
  const pathName=usePathname();
  return <header className="mobile-header ">
    <Image src="/assets/icons/logo-full-brand.svg" alt="Logo" width={120} height={52} className="h-auto" />
    <Sheet open={open} onOpenChange={setOpen}>
  <SheetTrigger>
    <Image src="/assets/icons/menu.svg" alt="Search" width={30} height={30}/>
  </SheetTrigger>
  <SheetContent className="shad-sheet h-screen px-3">
      <SheetTitle>
        <div className="header-user">
<Image src={avatar} alt="avatar" width={44} height={44} className="header-user-avatar"/>
      <div className="sm:hidden lg:block">
<p className="subtitle-2 capitalize">
  {fullName}
</p>
<p className="caption">
  {email}
</p>
      </div>

        </div>
        <Separator className="mb-4 bg-light-200/20"/>
      </SheetTitle>
      <nav className="mobile-nav">
<ul className="mobile-nav-list">

         {navItems.map(({ url, name, icon }) => {

            return (
              <Link key={name} href={url} className="lg:w-full">
              <li 
              className={cn("mobile-nav-item",pathName===url&& "shad-active")}>
                <Image src={icon}
                 alt={name}
                  width={24}
                 height={24} 
                className={cn("nav-icon", pathName===url && "nav-icon-active")}/>
            <p >{name}</p>
              </li>
              </Link>
            );
          })}

</ul>
      </nav>
      <Separator
      className="my-5 bg-light-200/20"
      />
      <div className="flex flex-col justify-between gap-5 pb-5">
        <FileUploader/>
        <button type="submit" className='mobile-sign-out-button' >
        <Image src="/assets/icons/logout.svg" alt="Logo!" width={24} height={24} className='w-6'/>
        <p>Logout</p>
        </button>
      </div>
  </SheetContent>
</Sheet>
  </header>
}

export default MobileNavigation
