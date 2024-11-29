'use client'

import React, { useEffect, useState } from 'react'
import Calendar from './Calendar'
import { today, getLocalTimeZone, parseDate, CalendarDate } from '@internationalized/date'
import { DateValue } from '@react-aria/calendar'
import { useRouter, useSearchParams } from 'next/navigation'

interface IAppProps {
  availability: {
    day: string
    isActive: boolean
  }[]
}

export default function RenderCalendar({
  availability
}: IAppProps) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [ date, setDate ] = useState(() => {
    const dateParam = searchParams.get('date')

    return dateParam ? parseDate(dateParam) : today(getLocalTimeZone())
  })

  useEffect(() => {
    const dateParam = searchParams.get('date')

    if (dateParam) {
      setDate(parseDate(dateParam))
    }

  }, [searchParams])
  

  const handleDataChange = (date: DateValue) => {
    setDate(date as CalendarDate)

    const url = new URL(window.location.href)
    url.searchParams.set('date', date.toString())
    router.push(url.toString())
  }

  const isDateUnavailable = (date: DateValue) => {
    const dayOfWeek = date.toDate(getLocalTimeZone()).getDay()
    return !availability[dayOfWeek].isActive
  }

  return (
    <Calendar 
    minValue={today(getLocalTimeZone())}
    isDateUnavailable={isDateUnavailable}
    value={date}
    onChange={handleDataChange}/>
  )
}
