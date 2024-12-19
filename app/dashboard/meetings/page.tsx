import { cancelMeetingAction } from '@/app/action'
import EmptyState from '@/app/components/EmptyState'
import { SubmitButton } from '@/app/components/SubmitButtons'
import prisma from '@/app/lib/db'
import { requireUser } from '@/app/lib/hooks'
import { nylas } from '@/app/lib/nylas'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { format, fromUnixTime } from 'date-fns'
import { CalendarIcon, ClockIcon, VideoIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

async function getData(userId: string) {
  const userData = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      grantId: true,
      grantEmail: true,
    },
  })

  if (!userData) {
    throw new Error('User not found')
  }
  
  const data = await nylas.events.list({
    identifier: userData.grantId as string,
    queryParams: {
      calendarId: userData.grantEmail as string,
    },
  })

  return data
}

export default async function MeetingsRoute() {
  const session = await requireUser();
  const data = await getData(session?.user?.id as string)
  

  return (
    <>
      {
        data && data.data.length < 1 
        ? (
          <EmptyState 
          title='No meetings' 
          description='zero' 
          buttonText='Create a meeting' 
          href='/dashboard/new' />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>
                Bookings
              </CardTitle>
              <CardDescription>
                See your next bookings and links
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div 
              className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg::grid-cols-4 justify-between items-center w-full gap-4'>
                {
                  data.data.map((item) => (
                    <form 
                    key={item.id}
                    action={cancelMeetingAction}>
                      <Input 
                      type='hidden'
                      name='eventId'
                      value={item.id}/>
                      <div className='p-4 border rounded'>
                        <div className='flex flex-col items-start'>
                          <h2 className='text-sm font-semibold'>{item.title}</h2>
                          <p className='text-sm text-muted-foreground'>You and {item.participants[0].name}</p>
                        </div>
                        <Separator className='mt-2 px-2' />
                        <div className='flex items-center mt-2'>
                          <CalendarIcon className='size-4 mr-2 text-muted-foreground' />
                          <p className='text-muted-foreground text-sm'>
                            {/* @ts-ignore */}
                            {format(fromUnixTime(item.when.startTime), 'EEE, dd MMM')}
                          </p>
                        </div>
                        <div className='flex items-center mt-1'>
                          <ClockIcon className='size-4 mr-2 text-muted-foreground' />
                          <p className='text-muted-foreground text-xs'>
                            {/* @ts-ignore */}
                            {format(fromUnixTime(item.when.startTime), 'HH:mm')}
                            {' - '}
                            {/* @ts-ignore */}
                            {format(fromUnixTime(item.when.endTime), 'HH:mm')}
                          </p>
                        </div>
                        <div className='flex items-center mt-1'>
                          <VideoIcon className='size-4 mr-2 text-primary' />
                          <Link 
                          //@ts-ignore 
                          href={item.conferencing.details.url} 
                          target='_blank' 
                          className='text-xs text-primary '>
                            Access Metting
                          </Link>
                        </div>
                        <SubmitButton 
                        text='Cancel' 
                        variant='destructive' 
                        className='w-fit flex ml-auto' />
                      </div>
                    </form>
                  ))
                }
              </div>
            </CardContent>
          </Card>
        )
      }
    </>
  )
}
