import React from 'react'
import AuthModal from './AuthModal'
import TopHalfCircleGradient from './gradients/TopHalfCircle'

export default function Cta() {
  return (
    <section className='my-20 relative isolate overflow-hidden px-6 py-20 text-center sm:rounded-3xl sm:border sm:shadow-sm'>
      <h2 className='font-bold text-3xl tracking-tight sm:text-4xl'>
        Download this .exe right now!!!!
      </h2>
      <p className='text-muted-foreground text-lg mt-6 leading-8 max-w-sm mx-auto'>
        Calendinho makes it easy to to to to to to to to to to to to to to to to to to to to to to
      </p>
      <div className='mt-6'>
        <AuthModal />
      </div>
      
      <TopHalfCircleGradient className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]" />
    </section>
  )
}
