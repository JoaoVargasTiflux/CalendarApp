'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-dropdown-menu'
import React, { useState } from 'react'
import { SubmitButton } from './SubmitButtons'
import { useFormState } from 'react-dom'
import { SettingsAction } from '../action'
import { useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { settingsSchema } from '../lib/zodSchemas'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { UploadDropzone } from '../lib/uploadthing'
import { toast } from 'sonner'

interface iAppProps {
  fullName: string,
  email: string,
  profileImage: string
}

export function SettingsForm({email, fullName, profileImage}: iAppProps) {
  const [ lastResult, action ] = useFormState(SettingsAction, undefined)
  const [ currentProfileImage, setCurrentProfileImage ] = useState(profileImage)
  const [ form, fields ] = useForm({
    lastResult,

    onValidate({formData}) {
      return parseWithZod(formData, {
        schema: settingsSchema,
      })
    },

    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  })

  const handleDeleteImage = () => {
    setCurrentProfileImage('')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Settings
        </CardTitle>
        <CardDescription>
          Manage settings
        </CardDescription>
      </CardHeader>
      <form 
      id={form.id}
      onSubmit={form.onSubmit}
      action={action}
      noValidate>
        <CardContent className='flex flex-col gap-y-4'>
          <div className='flex flex-col gap-y-2'>
            <Label>
              Full name
            </Label>
            <Input 
            name={fields.fullName.name}
            key={fields.fullName.key}
            defaultValue={fullName}
            placeholder='Calendinho'/>
            <p className='text-red-500 text-sm'>{fields.fullName.errors}</p>
          </div>
          <div className='flex flex-col gap-y-2'>
            <Label>
              Email
            </Label>
            <Input 
            disabled
            defaultValue={email}
            placeholder='email@emaisl.com'/>
          </div>
          <div className='flex flex-col gap-y-5'>
            <Label>
              Image
            </Label>
            <input 
            type='hidden' 
            name={fields.profileImage.name}
            key={fields.profileImage.key}
            value={currentProfileImage}/>
            {
              currentProfileImage
              ? (
                <div className='relative size-20'>
                  <img 
                  src={currentProfileImage} 
                  alt="Profile image"
                  className='size-20 rounded-lg' />

                  <Button 
                  onClick={handleDeleteImage}
                  variant='destructive'
                  size='icon' 
                  type='button'
                  className='absolute -top-3 -right-3'>
                    <X className='size-4'/>
                  </Button>
                </div>
              )
              : (
                <UploadDropzone 
                endpoint='imageUploader'
                onClientUploadComplete={(res) => {
                  setCurrentProfileImage(res[0].url)
                  toast.success('Profile image uploaded')
                }} 
                onUploadError={(error) => {
                  console.error('Error with profile picture upload', error)
                  toast.error('Error with profile picture upload')
                }}/>
              )
            }
            <p className='text-red-500 text-sm'>{fields.profileImage.errors}</p>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton text='Save'/>
        </CardFooter>
      </form>
    </Card>
  )
}
