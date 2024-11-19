'use client'

import { createEventTypeAction } from '@/app/action'
import { SubmitButton } from '@/app/components/SubmitButtons'
import { eventSchema } from '@/app/lib/zodSchemas'
import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { SelectGroup } from '@radix-ui/react-select'
import Link from 'next/link'
import React, { useState } from 'react'
import { useFormState } from 'react-dom'

type VideoCallProvider = "Zoom Meeting" | "Google Meet" | "Microsoft Teams"

export default function NewEventRoute() {
  const [ activePlatform, setActivePlatform ] = useState<VideoCallProvider>("Google Meet")
  const [ lastResult, action ] = useFormState(createEventTypeAction, undefined)
  const [ form, fields ] = useForm({
    lastResult,
    onValidate({formData}) {
      return parseWithZod(formData, {
        schema: eventSchema,
      })
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput'
  })

  return (
    <div className='w-full h-full flex flex-1 items-center justify-center'>
      <Card>
        <CardHeader>
          <CardTitle>
            Criar novo event type
          </CardTitle>
          <CardDescription>
            let people book you
          </CardDescription>
        </CardHeader>
        <form 
        id={form.id}
        onSubmit={form.onSubmit}
        action={action}
        noValidate>
          <CardContent className='grid gap-y-2'>
            <div className='flex flex-col gap-y-2'>
              <Label>Title</Label>
              <Input 
              name={fields.title.name}
              key={fields.title.key}
              defaultValue={fields.title.initialValue}
              placeholder='30min meeting'/>
              <p className='text-red-500 text-sm'>{fields.title.errors}</p>
            </div>
            <div className='flex flex-col gap-y-2'>
              <Label>Event url</Label>
              <div className='flex rounded-md'>
                <span className='inline-flex items-center px-3 rounded-l-md border border-r-0 border-muted bg-muted text-sm text-muted-foreground'>localhost:3000/</span>
                <Input 
                name={fields.url.name}
                key={fields.url.key}
                defaultValue={fields.url.initialValue}
                placeholder='event-url' className='rounded-l-none'/>
              </div>
              <p className='text-red-500 text-sm'>{fields.url.errors}</p>
            </div>
            <div className='flex flex-col gap-y-2'>
              <Label>Description</Label>
              <Textarea 
              name={fields.description.name}
              key={fields.description.key}
              defaultValue={fields.description.initialValue}
              placeholder='Meet me in this meeting'/>
            </div>
            <p className='text-red-500 text-sm'>{fields.description.errors}</p>
            <div className='flex flex-col gap-y-2'>
              <Label>Duration</Label>
              <Select 
                name={fields.duration.name}
                key={fields.duration.key}
                defaultValue={fields.duration.initialValue}>
                <SelectTrigger>
                  <SelectValue placeholder='Select duration'/>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>
                      Duration
                    </SelectLabel>
                    <SelectItem value='15'>
                      15 mins
                    </SelectItem>
                    <SelectItem value='30'>
                      30 mins
                    </SelectItem>
                    <SelectItem value='45'>
                      45 mins
                    </SelectItem>
                    <SelectItem value='60'>
                      1 hour
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <p className='text-red-500 text-sm'>{fields.duration.errors}</p>
            </div>
            <div className='grid gap-y-2'>
              <Label>
                Video call provider
              </Label>
              <input 
              type="hidden"
              name={fields.videoCallSoftware.name}
              key={fields.videoCallSoftware.key}
              value={activePlatform}/>
              <ButtonGroup>
                <Button 
                key={"zoom"}
                type='button'
                className='' 
                onClick={() => setActivePlatform("Zoom Meeting")}
                variant={activePlatform === "Zoom Meeting" ? 'secondary' : 'outline'}>
                  Zoom
                </Button>
                <Button 
                key={"google"}
                type='button'
                className='' 
                onClick={() => setActivePlatform("Google Meet")}
                variant={activePlatform === "Google Meet" ? 'secondary' : 'outline'}>
                  Google Meet
                </Button>
                <Button 
                key={"teams"}
                type='button'
                className='' 
                onClick={() => setActivePlatform("Microsoft Teams")}
                variant={activePlatform === "Microsoft Teams" ? 'secondary' : 'outline'}>
                  Microsoft Teams
                </Button>
              </ButtonGroup>
              <p className='text-red-500 text-sm'>{fields.videoCallSoftware.errors}</p>
            </div>
          </CardContent>
          <CardFooter className='w-full flex justify-between'>
            <Button variant='secondary' asChild>
              <Link href='/dashboard'>Cancel</Link>
            </Button>
            <SubmitButton text='Create'/>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
