import React, { useRef } from 'react'
import { mergeProps, useCalendarCell, useFocusRing } from 'react-aria'
import { CalendarState } from 'react-stately'
import { CalendarDate, getLocalTimeZone, isToday } from '@internationalized/date'
import { cn } from '@/lib/utils';


export default function CalendarCell({
  state,
  date,
  currentMonth,
}: {
  state: CalendarState;
  date: CalendarDate;
  currentMonth: CalendarDate;
}) {
  const ref = useRef(null);
  const {
    cellProps,
    buttonProps,
    isSelected,
    isOutsideVisibleRange,
    isDisabled,
    isUnavailable,
    formattedDate
  } = useCalendarCell({ date }, state, ref);

  const { focusProps, isFocused } = useFocusRing()
  const isDateToday = isToday(date, getLocalTimeZone())

  return (
    <td 
    className={`py-0.5 px-0.5 relative ${isFocused ? "z-10" : "z-0"}`}
    {...cellProps}
    >
      <div
      className='size-10 outline-none group rounded-md cell'
      ref={ref}
      {...mergeProps(buttonProps, focusProps)}
      >
        <div 
        className={cn(
          'size-full rounded-sm flex items-center justify-center text-sm font-semibold',
          isSelected ? 'bg-primary text-primary-foreground' : '',
          isDisabled ? 'text-muted-foreground cursor-not-allowed' : '',
          !isSelected && !isDisabled ? 'hover:bg-primary/10' : '',
        )}>
          {formattedDate}
          {isDateToday && (
            <div 
            className={cn(
              'absolute bottom-2 left-1/2 transform -translate-x-1/2 translate-y-1/2 size-1.5 bg-primary rounded-full',
              isSelected ? 'bg-primary-foreground' : ''
            )}>

            </div>
          )}
        </div>
      </div>
    </td>
  )
}
