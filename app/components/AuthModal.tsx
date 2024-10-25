import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import React from 'react'

import Logo from '@/public/shresus.png'
import Image from 'next/image'
import { signIn } from '../lib/auth'


export default function AuthModal() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>Modal de Login</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[360px]'>
        <DialogHeader className='flex w-100 justify-center items-center'>
          <Image src={Logo} alt='Logo' className='size-[60px]'/>
        </DialogHeader>
        <div className="flex flex-col mt-5 gap-3">
          <form action={async () => {
            "use server"
            await signIn('google');
            
          }} className="w-full">
            <Button className="w-full">Entrar com Google</Button>
          </form>
          <Button>Entrar com Github</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
