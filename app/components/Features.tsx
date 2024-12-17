import { CloudRainIcon } from 'lucide-react'
import React from 'react'

const features = [
  {
    name : 'Signup for free',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipiscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna.',
    icon: CloudRainIcon,
  },
  {
    name : 'Blazing fast',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipiscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna.',
    icon: CloudRainIcon,
  },
  {
    name : 'Super secure with nylas',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipiscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna.',
    icon: CloudRainIcon,
  },
  {
    name : 'Easy to use',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipiscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna.',
    icon: CloudRainIcon,
  },
]

export default function Features() {


  return (
    <div className='py-24'>
      <div className='max-w-2xl mx-auto lg:text-center'>
        <p className='font-semibold leading-7 text-primary'>
          Schedule shedules sheduling
        </p>
        <h1 className='mt-2 text-3xl font-bold tracking-tight sm:text-4xl'>
          Schedule meeting in hours
        </h1>
        <p className='mt-6 text-base leading-snug text-muted-foreground'>
          With Calendinho you can stop. Yeah you read right. You may be able  to finally stop, huh. This prolonged death has taken too much time already dont you think? You can close your eyes now. I'll allow it. Good night.
        </p>

        <div className='mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl'>
          <div className='grid max-w-xl gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16'>
            {
              features.map((feature, index) => (
                <div 
                key={index}
                className='relative pl-16'>
                  <div className='text-base font-medium leading-7 text-start'>
                    <div className='absolute left-0 top-0 flex size-10 items-center justify-center rounded-lg bg-primary'>
                      <feature.icon className='text-primary-foreground size-6'/>
                    </div>
                    {feature.name}
                    <p>

                    </p>
                  </div>
                  <p className='mt-2 text-sm text-muted-foreground leading-snug text-start'>
                    {feature.description}
                  </p>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}
