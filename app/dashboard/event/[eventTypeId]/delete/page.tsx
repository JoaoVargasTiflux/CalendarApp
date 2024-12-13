import { DeleteEventTypeAction } from '@/app/action'
import { SubmitButton } from '@/app/components/SubmitButtons'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import React from 'react'

export default function DeleteEventType({
  params
}: {
  params: {
    eventTypeId: string
  }
}) {
  return (
    <div className='flex flex-1 items-center justify-center'>
      <Card className='max-w-[450px] w-full'>
        <CardHeader>
          <CardTitle>
            Delete event
          </CardTitle>
          <CardDescription>
            Ctz?
          </CardDescription>
        </CardHeader>
        <CardFooter className='flex flex-1 justify-between'>
          <Button variant='outline' asChild>
            <Link href='/dashboard'>
              Cancel
            </Link>
          </Button>
          <form action={DeleteEventTypeAction}>
            <Input 
            type='hidden' 
            name='id'
            value={params.eventTypeId}/>
            <SubmitButton 
            variant='destructive' 
            text='Delete'/>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}
