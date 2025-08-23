import React from 'react'

const SignupForm = () => {
  return (
          <div className="w-full h-full flex flex-col md:flex-row justify-center items-center bg-[#2574b7]">
        {/* این بخش همیشه دیده می‌شود و در موبایل تمام عرض را می‌گیرد */}
        <div className="w-full md:w-1/2 h-full">
          
        </div>
        {/* این بخش فقط در مدیوم و بالاتر دیده می‌شود */}
        <div className="hidden md:flex w-1/2 h-screen justify-center items-center">
          <div
            className="w-[95%] h-[95%] bg-cover bg-center rounded-lg shadow-2xl"
            style={{ backgroundImage: 'url("/assets/images/background.png")' }}
          >
            {/* <div className="w-36 h-20 bg-white flex justify-center items-center rounded-md m-5">
              <Image
                src={"/assets/images/logo.png"}
                alt="logo"
                className="max-w-[150px] max-h-[50px] sm:max-w-[250px] sm:max-h-[90px] md:max-w-[300px] md:max-h-[100px]"
                width={130}
                height={70}
              />
            </div> */}
          </div>
        </div>

      </div>
  )
}

export default SignupForm