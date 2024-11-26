'use client'

import React from 'react'
import Calendar from './Calendar'
import { today, getLocalTimeZone } from '@internationalized/date'

export default function RenderCalendar() {
  return (
    <Calendar 
    minValue={today(getLocalTimeZone())}/>
  )
}
