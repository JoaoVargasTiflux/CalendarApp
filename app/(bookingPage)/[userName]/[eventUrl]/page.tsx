import prisma from '@/app/lib/db'
import { Card, CardContent } from '@/components/ui/card'
import { notFound } from 'next/navigation'
import React from 'react'

async function getData(eventUrl: string, userName: string) {
  const data = await prisma.eventType.findFirst({
    where: {
      url: eventUrl,
      User: {
        name: userName,
      },
      active: true
    },
    select: {
      id: true,
      description: true,
      title: true,
      duration: true,
      videoCallSoftware: true,
      User: {
        select: {
          image: true,
          name: true,
          availability: {
            select: {
              day: true,
              isActive: true,

            },
          },
        },
      },
    },
  })

  return data ? data : notFound();
}

export default async function BookingFormRoute({
  params,
}: {
  params: {
    userName: string; 
    eventUrl: string;
  }
}) {
  const data = await getData(params.eventUrl, params.userName)
  
  return (
    <div className='min-h-screen w-screen flex items-center justify-center'>
      <Card className='max-w-[1000px] w-full mx-auto'>
        <CardContent className='p-5 md:grid md:grid-cols-[1fr, auto, 1fr, auto, 1fr]'>
          <div>
            <img src={data.User?.image as string} alt='user profile' className='size-10 rounded-full' />
          </div>
        </CardContent>
      </Card>
      
    </div>
  )
}
