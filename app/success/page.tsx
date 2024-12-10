import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { CheckIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function SuccessRoute() {
  return (
    <div className='h-screen w-screen flex items-center justify-center'>
      <Card className='max-w-[1000px] min-w-[600px] w-3/6 mx-auto'>
        <CardContent className='p-6 flex flex-col w-full items-center'>
          <div className='size-16 bg-green-500/10 rounded-full flex justify-center items-center'>
            <CheckIcon className='size-8 text-green-500' />
          </div>
          <h1 className='text-2xl font-semibold mt-4'>
            Evento schedulado
          </h1>
          <p className='text-sm text-muted-foreground text-center mt-1'>
            Checa teu emial que ta la o invite
          </p>
        </CardContent>
        <CardFooter>
          <Button 
          asChild
          className='w-full'
          size='lg'>
            <Link href='/'>
              Fechar
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
