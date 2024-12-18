'use server'

import prisma from './lib/db'
import { requireUser } from './lib/hooks'
import { parseWithZod } from '@conform-to/zod'
import { eventSchema, onboardingSchemaValidation, settingsSchema } from './lib/zodSchemas'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { nylas } from './lib/nylas'

export async function OnboardingAction(previousState: any, formData: FormData) {
  const session = await requireUser()

  const submission = await parseWithZod(formData, {
    schema: onboardingSchemaValidation({
      async isUserNameUnique() {
        const existingUsername = await prisma.user.findUnique({
          where: {
            userName: formData.get('userName') as string,
          },
        })

        return !existingUsername
      },
    }),

    async: true
  })

  if (submission.status !== 'success') {
    return submission.reply()
  }

  const data = await prisma.user.update({
    where: {
      id: session?.user?.id,
    },
    data: {
      userName: submission.value.userName,
      name: submission.value.fullName,
      availability: {
        createMany: {
          data: [
            {
              day: 'Dom',
              fromTime: '07:00',
              tillTime: '17:00',
              weekDay: 0,
            },
            {
              day: 'Seg',
              fromTime: '07:00',
              tillTime: '17:00',
              weekDay: 1,
            },
            {
              day: 'Ter',
              fromTime: '07:00',
              tillTime: '17:00',
              weekDay: 2,
            },
            {
              day: 'Qua',
              fromTime: '07:00',
              tillTime: '17:00',
              weekDay: 3,
            },
            {
              day: 'Qui',
              fromTime: '07:00',
              tillTime: '17:00',
              weekDay: 4,
            },
            {
              day: 'Sex',
              fromTime: '07:00',
              tillTime: '17:00',
              weekDay: 5,
            },
            {
              day: 'Sab',
              fromTime: '07:00',
              tillTime: '17:00',
              weekDay: 6,
            },
          ]
        }
      }
    }
  })

  return redirect("/onboarding/grant-id")
}

export async function SettingsAction(previousState: any, formData: FormData) {
  const session = await requireUser()
  const submission = parseWithZod(formData, {
    schema: settingsSchema
  })

  if (!session) {
    return redirect("/dashboard")
  }

  if (submission.status !== 'success') {
    return submission.reply()
  }

  const user = await prisma.user.update({
    where: {
      id: session?.user?.id,
    },
    data: {
      name: submission.value.fullName ,
      image: submission.value.profileImage,
    },
  })

  return redirect('/dashboard')
}

export async function updateAvailabilityAction(formData: FormData) {
  const session = await requireUser()
  const rawData = Object.fromEntries(formData.entries())
  const availabilityData = Object.keys(rawData)
    .filter((key) => 
      key.startsWith('id-')
    )
    .map((key) => {
      const id = key.replace('id-', '')
      return {
        id,
        isActive: rawData[`isActive-${id}`] === 'on',
        fromTime: rawData[`fromTime-${id}`] as string,
        tillTime: rawData[`tillTime-${id}`] as string,
      }
    })

    try {
      await prisma.$transaction(
        availabilityData.map((item) => prisma.availability.update({
          where: {
            id: item.id,
          },
          data: {
            isActive: item.isActive,
            fromTime: item.fromTime,
            tillTime: item.tillTime,
          }
        }))
      )

      revalidatePath('/dashboard/availability')
    } catch (error) {
      console.error(error)
    }

}

export async function createEventTypeAction(previousState: any, formData: FormData) {
  const session = await requireUser()
  const submission = parseWithZod(formData, {
    schema: eventSchema,
  })

  if (submission.status !== 'success') {
    return submission.reply()
  } 

  await prisma.eventType.create({
    data: {
      title: submission.value.title,
      duration: submission.value.duration,
      url: submission.value.url,
      description: submission.value.description,
      videoCallSoftware: submission.value.videoCallSoftware,
      userId: session.user?.id,
    }
  })

  return redirect('/dashboard') 
}

export async function createMeetingAction(formData: FormData) {
  const getUserData = await prisma.user.findUnique({
    where: {
      userName: formData.get('username') as string,
    },
    select: {
      grantEmail: true,
      grantId: true,
    },
  })

  if (!getUserData) {
    throw new Error('User not found')
  }

  const eventTypeData = await prisma.eventType.findUnique({
    where: {
      id: formData.get('eventTypeId') as string,
    },
    select: {
      title: true,
      description: true,
    },
  })

  const fromTime = formData.get('fromTime') as string
  const eventDate = formData.get('eventDate') as string
  const startDateTime = new Date(`${eventDate}T${fromTime}:00`)

  const meetingLength = Number(formData.get('meetingLength'))
  const endDateTime = new Date(startDateTime.getTime() + meetingLength * 60000)

  const provider = formData.get('provider') as string

  await nylas.events.create({
    identifier: getUserData.grantId as string,
    requestBody: {
      title: eventTypeData?.title,
      description: eventTypeData?.description,
      when: {
        startTime: Math.floor(startDateTime.getTime() / 1000),
        endTime: Math.floor(endDateTime.getTime() / 1000)
      },
      conferencing: {
        autocreate: {},
        provider: provider as any,
      },
      participants: [
        {
          name: formData.get('name') as string,
          email: formData.get('email') as string,
          status: 'yes',
        }
      ],
    },
    queryParams: {
      calendarId: getUserData.grantEmail as string,
      notifyParticipants: true,
    }
  })

  return redirect('/success')
}

export async function cancelMeetingAction(formData: FormData) {
  const session = await requireUser()
  const userData = await prisma.user.findUnique({
    where: {
      id: session.user?.id,
    },
    select: {
      grantId: true,
      grantEmail: true,
    },
  })

  if (!userData) {
    throw new Error('user not found')
  }

  const data = await nylas.events.destroy({
    eventId: formData.get('eventId') as string,
    identifier: userData.grantId as string,
    queryParams: {
      calendarId: userData.grantEmail as string
    }
  })

  revalidatePath('/dashboard/meetings')
}

export async function EditEventTypeAction(previousState: any, formData: FormData) {
  const session = await requireUser()

  const submission = parseWithZod(formData, {
    schema: eventSchema,
  })

  if (submission.status !== 'success') {
    return submission.reply()

  }

  const data = await prisma.eventType.update({
    where: {
      id: formData.get('id') as string,
      userId: session.user?.id as string,
    },
    data: {
      title: submission.value.title,
      duration: submission.value.duration,
      url: submission.value.url,
      description: submission.value.description,
      videoCallSoftware: submission.value.videoCallSoftware
    },
  })

  return redirect('/dashboard')
}

export async function UpdateEventTypeStatusAction(
  prevState: any, {
  eventTypeId, 
  isChecked
}: {
  eventTypeId: string
  isChecked: boolean
}) {
  try {
    const session = await requireUser()
  
    const data = await prisma.eventType.update({
      where: {
        id: eventTypeId,
        userId: session.user?.id
      },
      data: {
        active: isChecked,
      },
    })

    revalidatePath('/dashboard')
  
    return {
      status: 'success',
      message: 'Event type status updated'
    }
  } catch (error) {
    return {
      status: 'error',
      message: 'deu ruim'
    }
  }
}

export async function DeleteEventTypeAction( formData: FormData) {
  const session = await requireUser()

  const data = await prisma.eventType.delete({
    where: {
      id: formData.get('id') as string,
      userId: session.user?.id
    },
  })

  return redirect('/dashboard')
}