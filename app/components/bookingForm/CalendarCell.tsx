import React, { useRef } from 'react'
import { mergeProps, useCalendarCell, useFocusRing } from 'react-aria'
import { CalendarState } from 'react-stately'
import { CalendarDate } from '@internationalized/date'
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
  let ref = useRef(null);
  let {
    cellProps,
    buttonProps,
    isSelected,
    isOutsideVisibleRange,
    isDisabled,
    isUnavailable,
    formattedDate
  } = useCalendarCell({ date }, state, ref);

  const { focusProps, isFocused } = useFocusRing()

  return (
    <td 
    className={`py-0.5 px-0.5 relative ${
      isFocused 
        ? "z-10" 
        : "z-0"
    }`}
    {...cellProps}>
      <div
      ref={ref}
      className='size-10 outline-none group rounded-md cell'
      {...mergeProps({
        buttonProps,
        focusProps
      })}
      >
        <div 
        className={cn(
          'size-full rounded-sm flex items-center justify-center text-sm font-semibold'
        )}>
          {formattedDate}
        </div>
      </div>
    </td>
  )
}
