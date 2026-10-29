"use client";
import Link from "next/link"
import Image from 'next/image'
import { navItems } from "@/constants";
import { usePathname } from "next/navigation";
const Sidebar = () => {
  const pathName=usePathname();
  return (
    <aside className='sidebar'>
      <Link href="/">
<Image alt="logo" width={160} height={50} src="/assets/icons/logo-full-brand.svg" className='hidden h-auto lg:block'/>
<Image alt="logo" width={52} height={52} src="/assets/icons/logo-brand.svg" className=' lg:hidden'/>
 
      </Link>

      <nav className='sidebar-nav'>
<ul className='flex flex-1 flex-col gap-6 '>
  {
    navItems.map(
      (item)=>
      {
const active=pathname===item.url;
return <Link/>
      }
    )

  }
  
   </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
