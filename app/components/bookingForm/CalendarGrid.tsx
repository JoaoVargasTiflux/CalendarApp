import React from 'react'
import { useLocale, useCalendarGrid } from 'react-aria'
import { CalendarState } from 'react-stately'
import { getWeeksInMonth, DateDuration, endOfMonth } from '@internationalized/date';
import CalendarCell from './CalendarCell';
import { DateValue } from '@react-aria/calendar';

export default function CalendarGrid({
  state,
  offset = {},
  isDateUnavailable
}: {
  state: CalendarState
  offset?: DateDuration
  isDateUnavailable?: (date: DateValue) => boolean
}) {
  const startDate = state.visibleRange.start.add(offset)
  const endDate = endOfMonth(startDate)
  const { locale } = useLocale();
  const { gridProps, headerProps, weekDays } = useCalendarGrid({
    startDate,
    endDate,
    weekdayStyle: 'short',
  }, state);
  const weeksInMonth = getWeeksInMonth(startDate, locale)


  return (
    <table
    cellPadding={0}
    className='flex-1'
    {...gridProps}>
    <thead
    className='text-sm font-medium'
    {...headerProps}>
      <tr>
        {weekDays.map((day, index) => (
          <th key={index}>{day}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {[...new Array(weeksInMonth).keys()]
        .map((weekIndex) => (
          <tr key={weekIndex}>
            {state
            .getDatesInWeek(weekIndex, startDate)
            .map((date, i) => (
              date
                ? (
                  <CalendarCell
                  key={i}
                  state={state}
                  date={date}
                  currentMonth={startDate}
                  isUnavailable={isDateUnavailable?.(date)}
                  />
                )
                : <td key={i} />
            ))}
          </tr>
        ))
      }
    </tbody>
  </table>
  )
}
