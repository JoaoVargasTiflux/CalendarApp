'use server'

import prisma from './lib/db'
import { requireUser } from './lib/hooks'
import { parseWithZod } from '@conform-to/zod'
import { eventSchema, onboardingSchema, onboardingSchemaValidation, settingsSchema } from './lib/zodSchemas'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

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
      name: submission.value.fullName
    }
  })

  return redirect("/onboarding/grant-id")
}

export async function SettingsAction(previousState: any, formData: FormData) {
  const session = await requireUser()
  const submission = parseWithZod(formData, {
    schema: settingsSchema
  })

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
      availability: {
        createMany: {
          data: [
            {
              day: 'Dom',
              fromTime: '07:00',
              tillTime: '17:00',
            },
            {
              day: 'Seg',
              fromTime: '07:00',
              tillTime: '17:00',
            },
            {
              day: 'Ter',
              fromTime: '07:00',
              tillTime: '17:00',
            },
            {
              day: 'Qua',
              fromTime: '07:00',
              tillTime: '17:00',
            },
            {
              day: 'Qui',
              fromTime: '07:00',
              tillTime: '17:00',
            },
            {
              day: 'Sex',
              fromTime: '07:00',
              tillTime: '17:00',
            },
            {
              day: 'Sab',
              fromTime: '07:00',
              tillTime: '17:00',
            },
          ]
        }
      }
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