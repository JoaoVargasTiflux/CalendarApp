'use client'

import React, { useState } from 'react'
import { useFormState } from 'react-dom'
import Link from 'next/link'

import { useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'

import { EditEventTypeAction } from '../action'
import { eventSchema } from '../lib/zodSchemas'

import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card'
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectLabel, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ButtonGroup } from '@/components/ui/button-group'
import { Button } from '@/components/ui/button'
import { SubmitButton } from './SubmitButtons'

type VideoCallProvider = "Zoom Meeting" | "Google Meet" | "Microsoft Teams"

interface iAppProps {
  id: string;
  title: string;
  url: string;
  description: string;
  duration: number;
  callProvider: string;
}

export default function EditEventForm({
  id,
  title,
  url,
  description,
  duration,
  callProvider
}: iAppProps
) {
  const [ activePlatform, setActivePlatform ] = useState<VideoCallProvider>(callProvider as VideoCallProvider)
  const [ lastResult, action ] = useFormState(EditEventTypeAction, undefined)
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
            Editar event type
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
          <Input 
          type='hidden' 
          name='id'
          value={id}/>
          <CardContent className='grid gap-y-2'>
            <div className='flex flex-col gap-y-2'>
              <Label>Title</Label>
              <Input 
              name={fields.title.name}
              key={fields.title.key}
              defaultValue={title}
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
                defaultValue={url}
                placeholder='event-url' className='rounded-l-none'/>
              </div>
              <p className='text-red-500 text-sm'>{fields.url.errors}</p>
            </div>
            <div className='flex flex-col gap-y-2'>
              <Label>Description</Label>
              <Textarea 
              name={fields.description.name}
              key={fields.description.key}
              defaultValue={description}
              placeholder='Meet me in this meeting'/>
            </div>
            <p className='text-red-500 text-sm'>{fields.description.errors}</p>
            <div className='flex flex-col gap-y-2'>
              <Label>Duration</Label>
              <Select
                name={fields.duration.name}
                key={fields.duration.key}
                defaultValue={String(duration)}>
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
            <SubmitButton text='Edit'/>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
