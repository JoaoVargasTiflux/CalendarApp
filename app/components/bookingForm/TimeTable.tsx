import React from 'react'
import { format } from 'date-fns'
import prisma from '@/app/lib/db'
import { ptBR } from "date-fns/locale";
import { Prisma } from '@prisma/client';
import { nylas } from '@/app/lib/nylas';

interface iAppProps {
  selectedDate: Date;
  username: string;
}

async function getData(username: string, selectedDate: Date) {
  let currentDay = format(selectedDate, 'EEEEEE', { locale: ptBR })
  currentDay = currentDay.charAt(0).toUpperCase() + currentDay.slice(1)

  const startOfDay = new Date(selectedDate)
  startOfDay.setHours(0,0,0,0)

  const endOfDay = new Date(selectedDate)
  endOfDay.setHours(23,59,59,999)

  const data = await prisma.availability.findFirst({
    where: {
      day: currentDay as Prisma.EnumDayFilter,
      user: {
        userName: username
      }
    },
    select: {
      fromTime: true,
      tillTime: true,
      id: true,
      user: {
        select: {
          grantEmail: true,
          grantId: true
        }
      }
    }
  })

  const nylasCalendarData = await nylas.calendars.getFreeBusy({
    identifier: data?.user?.grantId as string,
    requestBody: {
      startTime: Math.floor(startOfDay.getTime() / 1000),
      endTime: Math.floor(endOfDay.getTime() / 1000),
      emails: [
        data?.user?.grantEmail as string,
      ]
    }
  })

  return {
    data,
    nylasCalendarData
  }
}

export default async function TimeTable({
  selectedDate,
  username
}: iAppProps) {

  const { data, nylasCalendarData} = await getData(username, selectedDate)
  console.log(nylasCalendarData?.data[0]?.timeSlots);
  

  return (
    <div>
      <p className='text-base font-semibold'>
        {format(selectedDate, "EEE")}
        {" "}
        <span className='text-start text-muted-foreground'>
          {format(selectedDate, "MMM. d")}
        </span>
      </p>
    </div>
  )
}
