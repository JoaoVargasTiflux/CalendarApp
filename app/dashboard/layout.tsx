import React, { ReactNode } from 'react'
import { requireUser } from '../lib/hooks'
import Link from 'next/link'
import Image from 'next/image'

import Logo from '@/public/shresus.png'
import DashboardLinks from '../components/DashboardLinks'

export default async function DefaultLayout({children}: {children: ReactNode}) {
  const session = await requireUser()

  return (
    <>
      <div className='min-h-screen w-full grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
        <div className='hidden md:block border-r bg-muted/40'>
          <div className='flex h-full max-h-screen flex-col gap-2'>
            <div className='flex h-14 items-center border-b px-4 lg:h-[60ps] lg:px-6'>
              <Link href='/' className='flex items-center gap-2'>
                <Image src={Logo} alt='Logo' className='size-10'/>
                <h4 className='text-xl font-semibold'>
                  Calen<span >dinho</span>
                </h4>
              </Link>
            </div>
            <div className='flex-1'>
              <nav className='grid items-start px-2 lg:px4'>
                <DashboardLinks />
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
