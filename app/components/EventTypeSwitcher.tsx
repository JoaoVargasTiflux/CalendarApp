'use client'

import { Switch } from '@/components/ui/switch'
import React, { useEffect, useTransition } from 'react'
import { useFormState } from 'react-dom'
import { UpdateEventTypeStatusAction } from '../action'
import { toast } from 'sonner'

export default function MenuActiveSwitcher({
  initialChecked, 
  eventTypeId
}: {
  initialChecked: boolean 
  eventTypeId: string
}) {
  const [ isPending, startTransition ] = useTransition()
  const [ state, action ] = useFormState(UpdateEventTypeStatusAction, undefined)
  
  useEffect(() => {
    if (state?.status === 'success') {
      toast.success(state?.message)
      return
    }
    
    if (state?.message === 'error') {
      toast.error(state?.message)
      console.error(state?.message)      
    }

  }, [ state ])
  

  return (
    <Switch 
    disabled={isPending} 
    defaultChecked={initialChecked} 
    onCheckedChange={(isChecked) => {
      startTransition(() => {
        action({
          eventTypeId: eventTypeId, 
          isChecked: isChecked
        })
      })
    }}/>
  )
}
