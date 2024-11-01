'use client'

import React from 'react'
import { useFormState } from 'react-dom'

import { useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { OnboardingAction } from '../action'
import { onboardingSchema } from '../lib/zodSchemas'
import { SubmitButton } from '../components/SubmitButtons'

export default function OnboardingRoute() {
  const [lastResult, action] = useFormState(OnboardingAction, undefined)

  const [form, fields] = useForm({
    lastResult,
    onValidate({formData}) {
      return parseWithZod(formData, {
        schema: onboardingSchema
      })
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput'
  })

  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Welcome</CardTitle>
          <CardDescription>Hmmmm data nham nham</CardDescription>
        </CardHeader>
        <form id={form.id} onSubmit={form.onSubmit} action={action}>
          <CardContent className='flex flex-col gap-y-5'>
            <div className='grid gap-y-2'>
              <Label>Name</Label>
              <Input name={fields.fullName.name} defaultValue={fields.fullName.initialValue} key={fields.fullName.key} placeholder='John'/>
              <p className='text-red-500 text-sm'>{fields.fullName.errors}</p>
            </div>
            <div className='grid gap-y-2'>
              <Label>Username</Label>
              <div className='flex rounded-md'>
                <span className='inline-flex items-center px-3 rounded-l-md border border-r-0 border-muted bg-muted text-sm text-muted-foreground'>localhost:3000/</span>
                <Input name={fields.userName.name} defaultValue={fields.userName.initialValue} key={fields.userName.key} placeholder='example-user' className='rounded-l-none'/>
              </div>
              <p className='text-red-500 text-sm'>{fields.userName.errors}</p>
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton text='Submit' className='w-full' />
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
