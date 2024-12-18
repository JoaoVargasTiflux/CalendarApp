import { notFound } from "next/navigation";
import prisma from "../lib/db";
import { requireUser } from "../lib/hooks";
import EmptyState from "../components/EmptyState";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ExternalLinkIcon, PenIcon, SettingsIcon, TrashIcon, Users2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import CopyLinkMenuItem from "../components/CopyLinkMenu";
import MenuActiveSwitcher from "../components/EventTypeSwitcher";

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
          <EmptyState 
          title="No event types?"
          description="Crate one by clicking the create event type button...." 
          buttonText="Create Event Type"
          href="/dashboard/new"/>
        :
          <>
            <div className="flex items-center justify-between px-2">
              <div className="hidden sm:grid gap-1">
                <h1 className="text-3xl md:text-4xl font-semibold">Event Types</h1>
                <p className="text-muted-foreground">Create and manage events</p>
              </div>
              <Button asChild>
                <Link href='/dashboard/new'>
                  Create new event
                </Link>
              </Button>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {data.eventType.map((item) => (
                <div 
                key={item.id}
                className="overflow-hidden shadow rounded-lg border relative">
                  <div className="absolute top-2 right-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant='outline' size='icon'>
                          <SettingsIcon className="size-4"/>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>
                          Event
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuGroup>
                          <DropdownMenuItem asChild>
                            <Link href={`/${data.userName}/${item.url}`}>
                              <ExternalLinkIcon className="mr-2 size-4" />
                              Preview
                            </Link>
                          </DropdownMenuItem>
                          <CopyLinkMenuItem meetingUrl={`${process.env.NEXT_PUBLIC_URL}/${data.userName}/${item.url}`} />
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/event/${item.id}`}>
                              <PenIcon className="mr-2 size-4"/>
                              Edit
                            </Link>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href={`dashboard/event/${item.id}/delete`}>
                            <TrashIcon className="mr-2 size-4"/>
                            Delete
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <Link href={`/${data.userName}/${item.url}`} className="flex items-center p-5">
                    <div className="flex-shrink-0">
                      <Users2 className="size-6"/>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-muted-foreground">
                          {item.duration} minutes Meting
                        </dt>
                        <dd className="text-lg font-medium">
                          {item.title}
                        </dd>
                      </dl>
                    </div>
                  </Link>
                  <div className="bg-muted/50 px-5 py-3 justify-between items-center flex">
                    <MenuActiveSwitcher 
                    initialChecked={item.active}
                    eventTypeId={item.id}/>

                    <Button asChild>
                      <Link href={`/dashboard/event/${item.id}`}>
                        Edit event
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </>
      }
    </>
  )
}