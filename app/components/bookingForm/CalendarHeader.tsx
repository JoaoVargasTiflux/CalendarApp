import React from 'react'

import { CalendarState } from 'react-stately';
import { DOMAttributes, FocusableElement } from '@react-types/shared'
import { AriaButtonProps, useDateFormatter, VisuallyHidden } from 'react-aria';
import CalendarButton from './CalendarButton';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

export default function CalendarHeader({
  state,
  calendarProps,
  prevButtonProps,
  nextButtonProps,
}: {
  state: CalendarState;
  calendarProps: DOMAttributes<FocusableElement>;
  prevButtonProps: AriaButtonProps<'button'>;
  nextButtonProps: AriaButtonProps<'button'>;
}) {
  const monthDateFormatter = useDateFormatter({
    hour: 'numeric',
    month: '2-digit',
    year: 'numeric',
    timeZone: state.timeZone,
  })

  const [ monthName, _, year ] = monthDateFormatter
    .formatToParts(state.visibleRange.start.toDate(state.timeZone))
    .map((part) => part.value)

  return (
    <div className='flex items-center justify-between pb-4'>
      <VisuallyHidden>
        <h2>
          {calendarProps['aria-label']}
        </h2>
      </VisuallyHidden>

      <div className='flex items-center gap-2'>
        <CalendarButton {...prevButtonProps}>
          <ChevronLeftIcon className='size-4' />
        </CalendarButton>
      </div>

      <h2 className='font-semibold flex items-center gap-1'>
        <span>
          {monthName}  
        </span> 
        <span className='text-muted-foreground text-sm font-medium'>
          {_} {year}
        </span>
        {}
      </h2>

      <div className='flex items-center gap-2'>
        <CalendarButton {...nextButtonProps}>
          <ChevronRightIcon className='size-4' />
        </CalendarButton>
      </div>
    </div>
  )
}
