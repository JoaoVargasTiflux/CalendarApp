'use client'

import { cn } from '@/lib/utils'
import React, { Children, cloneElement, ReactElement } from 'react'
import { ButtonProps } from './button';

interface iAppProps {
  className?: string;
  children: ReactElement<ButtonProps>[]
}

export function ButtonGroup({className, children}: iAppProps) {
  const totalButtons = Children.count(children)

  return (
    <div className={cn('flex w-full', className)}>
      {children.map((child, index) => {
        const isFirst = index === 0;
        const isLast = index === totalButtons - 1;

        return cloneElement(child, {
          className: cn(
            {
              'rounded-l-none': !isFirst,
              'rounded-r-none': !isLast,
              'border-l-0': !isFirst,
            },
            child.props.className?.concat(' w-full')
          )
        })
      })}
    </div>
  )
}
