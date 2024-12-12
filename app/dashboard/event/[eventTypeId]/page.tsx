import React from 'react'

import { notFound } from 'next/navigation'

import prisma from '@/app/lib/db'

import EditEventForm from '@/app/components/EditEventTypeForm'

async function getData(eventTypeId: string) {
  const data = prisma.eventType.findUnique({
    where: {
      id: eventTypeId,
    },
    select: {
      title: true,
      description: true,
      duration: true,
      url: true,
      id: true,
      videoCallSoftware: true,
    },
  })

  if (!data) {
    return notFound()
  }

  return data
}

export default async function EditRoute({
  params
}: {
  params: {
    eventTypeId: string
  }
}) {
  const data = await getData(params.eventTypeId)
  
  return (
    <EditEventForm 
    callProvider={data?.videoCallSoftware as string}
    description={data?.description as string}
    duration={data?.duration as number}
    id={data?.id as string}
    title={data?.title as string}
    url={data?.url as string}
    />
  )
}
