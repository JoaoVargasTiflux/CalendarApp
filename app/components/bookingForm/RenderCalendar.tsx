'use client'

import React from 'react'
import Calendar from './Calendar'
import { today, getLocalTimeZone } from '@internationalized/date'
import { DateValue } from '@react-aria/calendar'

interface IAppProps {
  availability: {
    day: string
    isActive: boolean
  }[]
}

export default function RenderCalendar({
  availability
}: IAppProps) {
  const isDateUnavailable = (date: DateValue) => {
    const dayOfWeek = date.toDate(getLocalTimeZone()).getDay()
    return !availability[dayOfWeek].isActive
  }

  return (
    <Calendar 
    minValue={today(getLocalTimeZone())}
    isDateUnavailable={isDateUnavailable}/>
  )
}
