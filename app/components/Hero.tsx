import React from 'react'
import AuthModal from './AuthModal'
import HeroImage from '@/public/hero_image.jpeg'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className='relative flex flex-col items-center justify-center py-12 lg:py-20'>
      <div className='text-center'>
        <span className='text-sm text-primary font-medium tracking-tight bg-primary/10 px-4 py-2 rounded-full'>Introdução Calendinho</span>
        <h1 className='mt-8 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium leading-none'>
          Scheduling made <span className='block text-primary -mt-2'>super easy</span>
        </h1>
        <p className='max-w-xl mx-auto mt-4 lg:text-lg text-muted-foreground'>
          Scheduling a meeting is a pain. 
        </p>
        <div className='mt-5 mb-12'>
          <AuthModal />
        </div>
      </div>

      <div className='relative items-center w-full py-12 mx-auto mt-12'>
        <div className='absolute inset-0 -mt-24 blur-3xl flex w-full justify-center items-center z-[-1]'>
          <div className="w-full h-full bg-gradient-to-l from-background via-amber-600/50 to-background">
          </div>
        </div>
        <Image 
        className='relative object-cover w-full border rounded-lg shadow-2xl lg:rounded-2xl' 
        src={HeroImage} 
        alt='Hero image'
        width={undefined}/>
      </div>
    </section>
  )
}
