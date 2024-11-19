import { updateAvailabilityAction } from '@/app/action'
import { SubmitButton } from '@/app/components/SubmitButtons'
import prisma from '@/app/lib/db'
import { requireUser } from '@/app/lib/hooks'
import { times } from '@/app/lib/times'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { notFound } from 'next/navigation'
import React from 'react'

async function getData(userId: string) {
  const data = await prisma.availability.findMany({
    where: {
      userId: userId,
    },
  })

  if (!data) return notFound()

  return data
}

export default async function AvailabilityRoute() {
  const session = await requireUser()
  const data = await getData(session.user?.id as string)

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Availability
        </CardTitle>
        <CardDescription>
          Manage your availability
        </CardDescription>
      </CardHeader>
      <form action={updateAvailabilityAction}>
        <CardContent className='flex flex-col gap-y-4'>
          {data.map((item) => (
            <div 
            key={item.id}
            className='grid grid-cols-1 md:grid-cols-3 items-center gap-4'>
              <input 
              type='hidden' 
              name={`id-${item.id}`}
              value={item.id}/>
              <div className='flex items-center gap-x-3'>
                <Switch 
                defaultChecked={item.isActive} 
                name={`isActive-${item.id}`}/>
                <p>{item.day}</p>
              </div>
              <Select 
              defaultValue={item.fromTime}
              name={`fromTime-${item.id}`}>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='From Time' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {times.map((time) => (
                      <SelectItem key={time.id} value={time.time}>
                        {time.time}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select 
              defaultValue={item.tillTime}
              name={`tillTime-${item.id}`}>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Till Time' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {times.map((time) => (
                      <SelectItem key={time.id} value={time.time}>
                        {time.time}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <SubmitButton text='Save'/>
        </CardFooter>
      </form>
    </Card>
  )
}