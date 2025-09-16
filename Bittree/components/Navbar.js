"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname()
  // const showNavbar = ["/", ].includes(pathname)
  const showNavbar = ["/", "/generate"].includes(pathname)
  return (
    showNavbar && (
      <nav className='bg-white w-[80vw] flex justify-between fixed top-10 right-[10vw] rounded-full py-5 px-7'>
        <div className='logo flex gap-20 items-center'>
          <Link href={'/'}>
            <Image className='h-8' src='https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634daccb34e6d65a41c76d_download.svg' alt='' width={320} height={320} priority />
          </Link>
          <ul className='flex gap-10'>
            <li><Link href='/'>Templates</Link></li>
            <li><Link href='/'>Marketplace</Link></li>
            <li><Link href='/'>Discover</Link></li>
            <li><Link href='/'>Pricing</Link></li>
            <li><Link href='/'>Learn</Link></li>
          </ul>
        </div>
        <div className=' flex gap-2'>
          <button className='login bg-gray-400 p-4 rounded-lg font-bold'>Log in</button>
          <button className='signup bg-gray-900 text-white p-4 rounded-full font-bold'>Sign up Free</button>
        </div>
      </nav>
    )
  )
}

export default Navbar