'use client'

import React from 'react'
import { useFormStatus } from 'react-dom'

import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface iAppProps {
  text: string;
  variant?:
    | "default" 
    | "destructive" 
    | "outline" 
    | "secondary" 
    | "ghost" 
    | "link" 
    | null 
    | undefined;
  className?:string; 
}

export function SubmitButton({text, variant, className}: iAppProps) {
  const {pending} = useFormStatus()

  return (
    <>
      {
        pending
        ? (
          <Button disabled variant={'outline'} className={cn('w-fit', className)}>
            <Loader2 className='size-4 mr-2 animate-spin' />
            Await
          </Button>
        )
        : (
          <Button type='submit' variant={variant} className={cn('w-fit', className)}>
            {text}
          </Button>
        )
      }
    </>
  )
}

export function GoogleAuthButton() {
  const {pending} = useFormStatus()

  return (
    <>
      {
        pending
        ? (<Button disabled variant={'outline'} className='w-full'>
            <Loader2 className='size-4 mr-2 animate-spin'/>
          </Button>) 
        : (<Button variant={'outline'} className='w-full'>
            Entrar com Goolge
          </Button>)
      }
    </>
  )
}

export function GithubAuthButton() {
  const {pending} = useFormStatus()

  return (
    <>
      {
        pending
        ? (<Button disabled variant={'outline'} className='w-full'>
            <Loader2 className='size-4 mr-2 animate-spin'/>
          </Button>) 
        : (<Button variant={'outline'} className='w-full'>
            Entrar com Giuthb
          </Button>)
      }
    </>
  )
}
