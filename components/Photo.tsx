import React from 'react'
import Image from 'next/image'
import nabir from '@/images/portfolio5.png'

const Photo = () => {
  return (
    <div className="w-full flex items-center justify-center py-8">
      <div className="relative group flex items-center justify-center rounded-full border-4 border-emerald-600 shadow-2xl bg-gradient-to-br from-emerald-100 via-white to-emerald-200 transition-transform duration-300 hover:scale-105 hover:shadow-emerald-300/60 w-32 h-32 sm:w-48 sm:h-48 md:w-72 md:h-72 lg:w-60 lg:h-60 xl:w-[500px] xl:h-[500px] aspect-square overflow-hidden">
        <Image
          src={nabir}
          alt="Nabir logo"
          className="rounded-full object-cover"
          fill
          sizes="(max-width: 640px) 128px, (max-width: 768px) 192px, (max-width: 1024px) 288px, (max-width: 1280px) 350px, 500px"
        />
      </div>
    </div>
  )
}

export default Photo