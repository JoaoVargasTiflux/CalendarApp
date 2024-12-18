import React from 'react'
import YoutubeIcon from './icons/YoutubeIcon'
import LeftQuoteIcon from './icons/LeftQuoteIcon'

export default function Testimonial() {
  return (
    <div className='relative max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto'>
      <blockquote className='text-center lg:mx-auto lg:w-3/5'>
        <YoutubeIcon className='mx-auto w-20 h-auto sm:w-28'/>
        <p className='relative text-xl sm:text-2xl md:text-3xl md:leading-normal font-medium'>
          <LeftQuoteIcon className="absolute top-0 start-0 transform -translate-x-8 -translate-y-8 size-16 text-muted sm:h-24 sm:w-24" />
          <span className='relative z-10'>
            Once upon a time there was a lovely 
            princess. But she had an enchantment 
            upon her of a fearful sort which could 
            only be broken by love's first kiss. 
            She was locked away in a castle guarded 
            by a terrible fire-breathing dragon. 
            Many brave knights had attempted to 
            free her from this dreadful prison, 
            but non prevailed. She waited in the 
            dragon's keep in the highest room of 
            the tallest tower for her true love 
            and true love's first kiss. (laughs) 
            Like that's ever gonna happen. What 
            a load of - (toilet flush)
          </span>
        </p>
        <footer className='mt-6'>
          <p className='font-semibold'>
            Sherek
          </p>
          <p className='text-sm text-muted-foreground'>
            Ogre | Onion
          </p>
        </footer>
      </blockquote>
    </div>
  )
}