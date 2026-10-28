import React from 'react'
import Link from "next/link"
import Image from 'next/image'
const Sidebar = () => {
  return (
    <aside className='sidebar'>
      <Link href="/">
<Image alt="logo" width={160} height={50} src="/assets/icons/logo-full-brand.svg" className='hidden h-auto lg:block'/>
<Image alt="logo" width={52} height={52} src="/assets/icons/logo-brand.svg" className=' lg:hidden'/>

      </Link>

      <nav className='sidebar-nav'>
<ul></ul>
      </nav>
    </aside>
  )
}

export default Sidebar
