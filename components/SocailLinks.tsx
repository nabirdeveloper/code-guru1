/*
import React from 'react'
import Link from 'next/link'
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@radix-ui/react-tooltip';
import { Youtube, Github, Linkedin, Facebook, Instagram } from 'lucide-react'

const SocialData = [
    {
        name: "Youtube", 
        Icon: <Youtube className="w-6 h-6"/>,
        Link: "https://www.youtube.com/",
    },
    {
        name: "Github",
        Icon: <Github className="w-6 h-6"/>, 
        Link: "https://github.com/",
    },
    {
        name: "Linkedin", 
        Icon: <Linkedin className="w-6 h-6" />,
        Link: "https://www.linkedin.com/",
    },
    {
        name: "Facebook", 
        Icon: <Facebook className="w-6 h-6"/>,
        Link: "https://www.facebook.com/",
    },
    {
        name: "Instagram",
        Icon: <Instagram className="w-6 h-6"/>,
        Link: "https://www.instagram.com/", 
    },
]

const SocialLinks = () => {
  return (
   <TooltipProvider delayDuration={200}>
  <div className="flex items-center gap-3">
    {SocialData?.map((item) => (
      <Tooltip key={item?.name}>
        <TooltipTrigger asChild>
          <Link
            href={item?.Link}
            aria-label={item.name}
            className="
              text-emerald-500/80 
              border border-emerald-500/20 
              p-2.5 rounded-full 
              hover:bg-emerald-500/10 
              hover:text-emerald-500 
              hover:border-emerald-500/40
              transition-all
              duration-300
              ease-in-out
              hover:scale-110
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-emerald-500/50
            "
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="text-lg">{item?.Icon}</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          sideOffset={8}
          className="
            bg-gray-900/95
            text-emerald-50
            text-xs
            font-medium
            px-2.5
            py-1.5
            rounded-md
            shadow-lg
            border
            border-gray-800
            animate-in
            fade-in-50
            zoom-in-95
            data-[side=bottom]:slide-in-from-top-1
            data-[side=top]:slide-in-from-bottom-1
            data-[side=left]:slide-in-from-right-1
            data-[side=right]:slide-in-from-left-1
          "
        >
          {item.name}
        </TooltipContent>
      </Tooltip>
    ))}
  </div>
</TooltipProvider>
  )
}

export default SocialLinks

*/

import React from "react";
import Link from "next/link";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@radix-ui/react-tooltip";
import { Youtube, Github, Linkedin, Facebook, Instagram } from "lucide-react";

const SocialData = [
  {
    name: "Youtube",
    Icon: <Youtube className="w-5 h-5" />,
    Link: "https://www.youtube.com/",
  },
  {
    name: "Github",
    Icon: <Github className="w-5 h-5" />,
    Link: "https://github.com/",
  },
  {
    name: "Linkedin",
    Icon: <Linkedin className="w-5 h-5" />,
    Link: "https://www.linkedin.com/",
  },
  {
    name: "Facebook",
    Icon: <Facebook className="w-5 h-5" />,
    Link: "https://www.facebook.com/",
  },
  {
    name: "Instagram",
    Icon: <Instagram className="w-5 h-5" />,
    Link: "https://www.instagram.com/",
  },
];

const SocialLinks = () => {
  return (
    <TooltipProvider delayDuration={100}>
      <div className="flex items-center gap-4">
        {SocialData?.map((item) => (
          <Tooltip key={item?.name}>
            <TooltipTrigger asChild>
              <Link
                href={item?.Link}
                aria-label={item.name}
                className="
                  relative
                  text-emerald-400/80 
                  border border-emerald-400/20 
                  p-2 rounded-full 
                  hover:bg-emerald-400/10 
                  hover:text-emerald-400 
                  hover:border-emerald-400/40
                  transition-all
                  duration-300
                  ease-out
                  hover:scale-110
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-emerald-400/50
                  hover:shadow-[0_0_15px_-3px_rgba(110,231,183,0.3)]
                  before:content-['']
                  before:absolute
                  before:inset-0
                  before:rounded-full
                  before:bg-emerald-400/0
                  before:hover:bg-emerald-400/10
                  before:transition-all
                  before:duration-500
                  after:content-['']
                  after:absolute
                  after:inset-0
                  after:rounded-full
                  after:scale-0
                  after:hover:scale-100
                  after:border after:border-emerald-400/30
                  after:transition-all
                  after:duration-300
                "
                target="_blank"
                rel="noopener noreferrer"
                >
                <span className="relative z-10 block transition-transform duration-300 group-hover:rotate-12">
                  {item?.Icon}
                </span>
              </Link>
            </TooltipTrigger>
            <TooltipContent
              side="top"
              sideOffset={8}
              className="
                bg-gray-800/95 backdrop-blur-sm
                text-emerald-100
                text-xs
                font-medium
                px-3
                py-1.5
                rounded-lg
                shadow-xl
                shadow-emerald-900/20
                border
                border-gray-700
                animate-in
                fade-in-50
                zoom-in-95
                data-[side=bottom]:slide-in-from-top-1
                data-[side=top]:slide-in-from-bottom-1
                data-[side=left]:slide-in-from-right-1
                data-[side=right]:slide-in-from-left-1
                will-change-transform
              "
            >
              {item.name}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
};

export default SocialLinks;
/*
import React from 'react'
import Link from 'next/link'
import { Youtube, Github, Linkedin, Facebook, Instagram } from 'lucide-react'

const SocialData = [
    {
        name: "Youtube",
        Icon: Youtube,
        link: "https://www.youtube.com/",
    },
    {
        name: "Github",
        Icon: Github,
        link: "https://github.com/",
    },
    {
        name: "Linkedin",
        Icon: Linkedin,
        link: "https://www.linkedin.com/",
    },
    {
        name: "Facebook",
        Icon: Facebook,
        link: "https://www.facebook.com/",
    },
    {
        name: "Instagram",
        Icon: Instagram,
        link: "https://www.instagram.com/",
    },
]

const SocialLinks = () => {
    return (

        <div className='flex gap-4'>
            {SocialData?.map((item) => (
                <Link 
                    key={item.name} 
                    href={item.link}
                    aria-label={item.name}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <item.Icon className='text-emerald-600/80 border border-emerald-600/30 p-2.5 rounded-full hover:text-emerald-600 hover:border-emerald-600' />
                </Link>
            ))}
        </div>
    )
}

export default SocialLinks

/*
import React from 'react';
import Link from 'next/link';
import { Youtube, Github, Linkedin, Facebook, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';

interface SocialItem {
  name: string;
  Icon: React.ReactNode;
  link: string;
  color?: string;
}

const socialData: SocialItem[] = [
  {
    name: "YouTube",
    Icon: <Youtube className="w-5 h-5" />,
    link: "https://www.youtube.com/",
    color: "#FF0000"
  },
  {
    name: "GitHub",
    Icon: <Github className="w-5 h-5" />,
    link: "https://github.com/",
    color: "#333"
  },
  {
    name: "LinkedIn",
    Icon: <Linkedin className="w-5 h-5" />,
    link: "https://www.linkedin.com/",
    color: "#0077B5"
  },
  {
    name: "Facebook",
    Icon: <Facebook className="w-5 h-5" />,
    link: "https://www.facebook.com/",
    color: "#4267B2"
  },
  {
    name: "Instagram",
    Icon: <Instagram className="w-5 h-5" />,
    link: "https://www.instagram.com/",
    color: "#E1306C"
  },
];

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  },
  hover: {
    y: -5,
    scale: 1.1,
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 10 
    }
  },
  tap: {
    scale: 0.9
  }
};

const SocialLinks = () => {
  return (
    <motion.div 
      className="flex gap-4"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {socialData.map((social) => (
        <motion.div
          key={social.name}
          variants={item}
          whileHover="hover"
          whileTap="tap"
        >
          <Link
            href={social.link}
            aria-label={social.name}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              text-emerald-600/80 
              border border-emerald-600/30 
              p-2.5 rounded-full 
              hover:bg-emerald-600/10 
              hover:text-emerald-600 
              hover:border-emerald-600
              transition-colors duration-200
              focus:outline-none focus:ring-2 focus:ring-emerald-600/50
              ${social.color ? `hover:!text-[${social.color}]` : ''}
            `}
          >
            {social.Icon}
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default SocialLinks;

 */
