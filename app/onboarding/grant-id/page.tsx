import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { CalendarCheck2 } from "lucide-react";

import VideoGif from "@/public/working.gif"

import Image from "next/image";
import Link from "next/link";

export default function OnboardingRouteTwo() {
  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>
            Quase lá
          </CardTitle>
          <CardDescription>
            Conectar calendario
          </CardDescription>
          <Image 
          unoptimized 
          src={VideoGif} 
          alt="Quase gif" 
          className="w-full rounded-lg" />
        </CardHeader>
        <CardContent>
          <Button className="w-full p-0">
            <Link href="/api/auth" className="w-full h-full flex justify-center items-center">
              <CalendarCheck2 className="size-4 mr-2" />
              Conncetar caledario
            </Link>
          </Button>
        </CardContent>
      </Card>

    </div>
  )
}
