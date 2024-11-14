import { notFound } from "next/navigation";
import prisma from "../lib/db";
import { requireUser } from "../lib/hooks";
import EmptyState from "../components/EmptyState";

async function getData(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId as string
    },
    select: { 
      userName: true,
      eventType: {
        select: {
          id: true,
          active: true,
          title: true,
          url: true,
          duration: true,
        },
      },
    },
  })

  return data ? data : notFound()
}

export default async function DashboardPage(){
  const session = await requireUser();
  const data = await getData(session.user?.id as string)

  return (
    <>
      {
        data.eventType?.length === 0
        ?
          <EmptyState />
        :
          <p>events</p>
      }
    </>
  )
}