'use client'

import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import React from 'react'
import { useFormStatus } from 'react-dom'

export function GoogleAuthButton() {
  const {pending} = useFormStatus()

  return (
    <>
      {
        pending
        ? (<Button disabled variant={'outline'} className='w-full'>
            <Loader2 />
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
            <Loader2 />
          </Button>) 
        : (<Button variant={'outline'} className='w-full'>
            Entrar com Giuthb
          </Button>)
      }
    </>
  )
}