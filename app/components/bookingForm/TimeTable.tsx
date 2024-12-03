import React from 'react'
import { addMinutes, format, fromUnixTime, isAfter, isBefore, parse } from 'date-fns'
import prisma from '@/app/lib/db'
import { ptBR } from "date-fns/locale";
import { Prisma } from '@prisma/client';
import { nylas } from '@/app/lib/nylas';
import { GetFreeBusyRequest, GetFreeBusyResponse, NylasResponse } from 'nylas';

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

function calculateAvailableTimeSlots(
  date: string, 
  dbAvailability: {
    fromTime: string | undefined;
    tillTime: string | undefined;
  },
  nylasData: NylasResponse<GetFreeBusyResponse[]>,
  duration: number
) {
  const now = new Date()
  const availableFrom = parse(
    `${date} ${dbAvailability.fromTime}`, ' yyyy-MM-dd HH:mm', new Date()
  )
  const availableTill = parse(
    `${date} ${dbAvailability.tillTime}`, 'yyyy-MM-dd HH:mm', new Date()
  )

  const busySlots = nylasData.data[0].timeSlots.map((slot) => (
    {
      start: fromUnixTime(slot.startTime),
      end: fromUnixTime(slot.endTime)
    }
  ))

  const allSlots = []
  let currentSlot = availableFrom

  while (isBefore(currentSlot, availableTill)) {
    allSlots.push(currentSlot)
    currentSlot = addMinutes(currentSlot, duration)
  }

  const freeSlots = allSlots.filter((slot) => {
    const slotEnd = addMinutes(slot, duration)
    return (
      isAfter(slot, now) &&
      !busySlots.some(
        (busy: {start: any; end: any}) => 
        (!isBefore(slot, busy.start) && isBefore(slot, busy.end)) ||
        (isAfter(slot, busy.start) && !isAfter(slot, busy.end)) ||
        (isBefore(slot, busy.start) && isAfter(slot, busy.end))
      )
    )
  })

  return freeSlots.map((slot) => format(slot, 'HH:mm'))
} 

export default async function TimeTable({
  selectedDate,
  username
}: iAppProps) {

  const { data, nylasCalendarData} = await getData(username, selectedDate)
  const formattedDate = format(selectedDate, 'yyyy-MM-dd')
  const dbAvailability = {
    fromTime: data?.fromTime,
    tillTime: data?.tillTime,
  }
  const availableSlots = calculateAvailableTimeSlots(
    formattedDate,
    dbAvailability,
    nylasCalendarData,
    15
  )

  console.log(availableSlots);
  
  

  return (
    <div>
      <p className='text-base font-semibold'>
        {format(selectedDate, "EEE")}
        {" "}
        <span className='text-start text-muted-foreground'>
          {format(selectedDate, "MMM. d")}
        </span>
      </p>
      <div className=''>

      </div>
    </div>
  )
}
