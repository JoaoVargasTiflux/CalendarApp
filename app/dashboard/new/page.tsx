import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { SelectGroup } from '@radix-ui/react-select'
import React from 'react'

export default function NewEventRoute() {
  return (
    <div className='w-full h-full flex flex-1 items-center justify-center'>
      <Card>
        <CardHeader>
          <CardTitle>
            Criar novo event type
          </CardTitle>
          <CardDescription>
            let people book you
          </CardDescription>
        </CardHeader>
        <form>
          <CardContent className='grid gap-y-2'>
            <div className='flex flex-col gap-y-2'>
              <Label>Title</Label>
              <Input placeholder='30min meeting'/>
            </div>
            <div className='flex flex-col gap-y-2'>
              <Label>Event url</Label>
              <div className='flex rounded-md'>
                <span className='inline-flex items-center px-3 rounded-l-md border border-r-0 border-muted bg-muted text-sm text-muted-foreground'>localhost:3000/</span>
                <Input 
                placeholder='event-url' className='rounded-l-none'/>
              </div>
            </div>
            <div className='flex flex-col gap-y-2'>
              <Label>Description</Label>
              <Textarea placeholder='Meet me in this meeting'/>
            </div>
            <div className='flex flex-col gap-y-2'>
              <Label>Duration</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder='Select duration'/>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>
                      Duration
                    </SelectLabel>
                    <SelectItem value='15'>
                      15 mins
                    </SelectItem>
                    <SelectItem value='30'>
                      30 mins
                    </SelectItem>
                    <SelectItem value='45'>
                      45 mins
                    </SelectItem>
                    <SelectItem value='60'>
                      1 hour
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className='grid gap-y-2'>
              <Label>
                Video call provider
              </Label>
              <ButtonGroup>
                <Button className=''>Zoom</Button>
                <Button>Google Meet</Button>
                <Button>Microsoft Teams</Button>
              </ButtonGroup>
            </div>
          </CardContent>
        </form>
      </Card>
    </div>
  )
}
