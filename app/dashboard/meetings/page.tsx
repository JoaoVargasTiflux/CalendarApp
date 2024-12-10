import EmptyState from '@/app/components/EmptyState'
import prisma from '@/app/lib/db'
import { requireUser } from '@/app/lib/hooks'
import { nylas } from '@/app/lib/nylas'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { format, fromUnixTime } from 'date-fns'
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
              {
                data.data.map((item, index) => (
                  <div 
                  key={item.id}
                  className='grid grid-cols-3 justify-between items-center'>
                    <div>
                      <p className='text-muted-foreground text-sm'>
                        {format(fromUnixTime(item.when.startTime), 'EEE, dd MMM')}
                      </p>
                      <p className='text-muted-foreground text-xs pt-1'>
                        {format(fromUnixTime(item.when.startTime), 'hh:mm')}
                        {' - '}
                        {format(fromUnixTime(item.when.endTime), 'hh:mm')}
                      </p>
                    </div>
                  </div>
                ))
              }
            </CardContent>
          </Card>
        )
      }
    </>
  )
}
