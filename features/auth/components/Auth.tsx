import React from 'react'
import type { PropsWithChildren } from 'react'
// حذف Card و CardContent و استفاده از یک div ساده بدون border
import { Avatar, AvatarImage } from "../../../src/components/ui/avatar"

const Auth: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="w-full h-full flex flex-col lg:flex-row justify-center items-center relative bg-white dark:bg-zinc-900 rounded-2xl">
      <div className="flex lg:hidden absolute top-4 right-4 z-10 p-0">
        <div className="w-24 h-12 flex justify-center items-center rounded-lg  bg-white dark:bg-zinc-900">
          <div className="flex justify-center items-center p-0 w-full h-full">
            <Avatar className="w-full h-full">
              <AvatarImage
                src="/assets/image/logo-light-full.png"
                alt="logo"
                className="object-contain max-w-[100px] max-h-[40px] sm:max-w-[150px] sm:max-h-[50px]"
                width={100}
                height={40}
              />
            </Avatar>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2 h-full flex items-center justify-center p-0">
        {children}
      </div>
      <div className="hidden z-10 lg:flex w-1/2 h-screen justify-center items-center p-0 relative overflow-hidden rounded-2xl">
        <video
          className="absolute inset-0 w-full h-full object-cover bg-video"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/assets/video/bg-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="relative w-full h-full z-10" />
      </div>
    </div>
  )
}

export default Auth