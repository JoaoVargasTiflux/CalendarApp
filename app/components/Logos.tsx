import Image from 'next/image'
import React from 'react'

import Logo1 from '@/public/logo1.png'
import Logo2 from '@/public/logo2.png'
import Logo3 from '@/public/logo3.png'
import Logo4 from '@/public/logo4.png'

export default function Logos() {
  return (
    <div className='py-10'>
      <h2 className='text-center text-lg font-semibold leading-7'>
        Trusted by no one
      </h2>

      <div className='mt-10 grid max-w-lg mx-auto grid-cols-4 items-center gabpx8  gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5'>
        <Image src={Logo1}/>
        <Image src={Logo2}/>
        <Image src={Logo3}/>
        <Image src={Logo4}/>
        <Image src={Logo1}/>
        <Image src={Logo2}/>
        <Image src={Logo3}/>
        <Image src={Logo4}/>
        <Image src={Logo1}/>
        <Image src={Logo2}/>
      </div>
    </div>
  )
}
