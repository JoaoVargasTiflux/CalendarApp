import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import Logo from '@/public/shresus_2.png'
import AuthModal from './AuthModal'

export default function Navbar() {
  return (
    <div className='flex py-5 items-center justify-between'>
      <Link href="/" className='flex items-center gap-2'>
        <Image src={Logo} alt='Logo' className='size-10'/>
        <h4 className='text-3xl font-semibold'>
          Calen<span >dinho</span>
        </h4>
      </Link>
      <AuthModal />
    </div>
  )
}
