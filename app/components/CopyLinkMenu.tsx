'use client'

import React from 'react'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Link2Icon } from 'lucide-react'
import { toast } from 'sonner'

export default function CopyLinkMenuItem({meetingUrl}: {meetingUrl: string}) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(meetingUrl)
      toast.success('Url copied')
    } catch (error) {
      toast.error('Url no no copie')
      console.error(error);
    }
  }

  return (
    <DropdownMenuItem onSelect={handleCopy}>
      <Link2Icon className="mr-2 size-4"/>
      Copy
    </DropdownMenuItem>
  )
}
