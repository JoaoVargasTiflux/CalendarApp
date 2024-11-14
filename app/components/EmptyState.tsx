import { Ban } from 'lucide-react'
import React from 'react'

export default function EmptyState() {
  return (
    <div className='flex flex-col flex-1 h-full items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50'>
      <Ban className='size-10 text-primary'/>
    </div>
  )
}
