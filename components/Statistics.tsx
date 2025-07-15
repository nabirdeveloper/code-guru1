"use client";
import React from 'react'
import { StatisticsData } from '@/constants'
import CountUp from 'react-countup'

const Statistics = () => {
  return (
    <div className='flex items-center flex-col md:flex-row gap-2.5 md:gap-5'>
      {StatisticsData?.map((item, index) => (
        <div key={index} className="flex flex-1 gap-2 md:gap-4 flex-col md:flex-row items-center justify-center lg:justify-start
         ">
          <CountUp 
            end={item?.value} 
            duration={2} 
            delay={0.2} 
            separator="," 
            className="text-4xl lg:text-5xl font-extrabold text-emerald-500"
          />
         <p className="max-w-[100px] leading-snug text-white/80 text-sm">{item?.title}</p>
        </div>
      ))}
    </div>
  )
}

export default Statistics