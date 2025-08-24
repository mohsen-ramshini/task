import React from 'react'
import type { PropsWithChildren } from 'react'
import { Card, CardContent } from "../../../src/components/ui/card"
import { Avatar, AvatarImage } from "../../../src/components/ui/avatar"

const Auth: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Card className="w-full h-full flex flex-col lg:flex-row justify-center items-center relative">
      <CardContent className="flex lg:hidden absolute top-4 right-4 z-10 p-0">
        <Card className="w-24 h-12 flex justify-center items-center rounded-lg shadow">
          <CardContent className="flex justify-center items-center p-0 w-full h-full">
            <Avatar className="w-full h-full">
              <AvatarImage
                src="/logo-light-full.png"
                alt="logo"
                className="object-contain max-w-[100px] max-h-[40px] sm:max-w-[150px] sm:max-h-[50px]"
                width={100}
                height={40}
              />
            </Avatar>
          </CardContent>
        </Card>
      </CardContent>
      <CardContent className="w-full lg:w-1/2 h-full flex items-center justify-center p-0">
        {children}
      </CardContent>
      <CardContent className="hidden lg:flex w-1/2 h-screen justify-center items-center p-0">
        <Card className="w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url("/assets/images/background.png")' }}>
        </Card>
      </CardContent>
    </Card>
  )
}

export default Auth