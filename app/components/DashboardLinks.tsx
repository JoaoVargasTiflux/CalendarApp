'use client'

import { cn } from '@/lib/utils';
import { CalendarCheck, HomeIcon, LucideProps, Settings, Users2 } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

interface iAppProps {
  id: number;
  name: string;
  href: string;
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
  ;
}

export const dashboardLinks: iAppProps[] = [
  {
    id: 0,
    name: 'Event typer',
    href: '/dashboard',
    icon: HomeIcon
  },
  {
    id: 1,
    name: 'meetings',
    href: '/dashboard/meetings',
    icon: Users2
  },
  {
    id: 2,
    name: 'Availability',
    href: '/dashboard/availability',
    icon: CalendarCheck
  },
  {
    id: 3,
    name: 'Settings',
    href: '/dashboard/settings',
    icon: Settings
  },
]

export default function DashboardLinks() {
  const pathName = usePathname()

  return (
    <>
      {dashboardLinks.map((link) => (
        <Link className={cn(
          pathName === link?.href ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground', 
          'flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary'
        )} key={link.id} href={link.href}>
          <link.icon className='size-4'/>
          {link.name}
        </Link>
      ))}
    </>
  )
}
