import RenderCalendar from '@/app/components/bookingForm/RenderCalendar'
import prisma from '@/app/lib/db'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { CalendarX2Icon, ClockIcon, VideoIcon } from 'lucide-react'
import { notFound } from 'next/navigation'
import React from 'react'

async function getData(eventUrl: string, userName: string) {
  const data = await prisma.eventType.findFirst({
    where: {
      url: eventUrl,
      User: {
        userName: userName,
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
  searchParams,
}: {
  params: {
    userName: string; 
    eventUrl: string;
  },
  searchParams: {
    date?: string
  }
}) {
  const data = await getData(params.eventUrl, params.userName)

  const selectedDate = searchParams.date 
    ? new Date(searchParams.date) 
    : new Date()

  const formattedDate = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(selectedDate)
  
  return (
    <div className='min-h-screen w-screen flex items-center justify-center'>
      <Card className='max-w-[1000px] w-11/12 mx-auto'>
        <CardContent className='p-5 md:grid md:grid-cols-[1fr,auto,1fr,auto,1fr] gap-4'>
          <div>
            <img src={data.User?.image as string} alt='user profile' className='size-10 rounded-full' />
            <p className='text-sm font-medium text-muted-foreground mt-1'>
              {data.User?.name}
            </p>
            <h1 className='text-xl font-semibold mt-2'>
              {data.title}
            </h1>
            <p className='text-sm font-medium text-muted-foreground'>
              {data.description}
            </p>

            <div className='mt-5 flex flex-col gap-y-3'>
              <p className='flex items-center'>
                <CalendarX2Icon className='size-4 mr-2 text-primary'/>
                <span className='text-sm font-medium text-muted-foreground'>
                  {formattedDate}
                </span>
              </p>
              <p className='flex items-center'>
                <ClockIcon className='size-4 mr-2 text-primary'/>
                <span className='text-sm font-medium text-muted-foreground'>
                  {data.duration} minutes
                </span>
              </p>
              <p className='flex items-center'>
                <VideoIcon className='size-4 mr-2 text-primary'/>
                <span className='text-sm font-medium text-muted-foreground'>
                  {data.videoCallSoftware}
                </span>
              </p>
            </div>
          </div>
          <Separator 
          orientation='vertical' />
          <RenderCalendar availability={data.User?.availability as any} />
          <Separator 
          orientation='vertical' />
        </CardContent>
      </Card>
      
    </div>
  )
}
