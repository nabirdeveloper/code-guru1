import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import React from 'react';
import { IconType } from 'react-icons/lib';
import { 
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGitAlt, FaDocker, FaAws, 
  FaGraduationCap, FaCertificate, FaChartLine, FaRoad, FaFilter 
} from 'react-icons/fa';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCategoryIcon(category: string): JSX.Element {
  const icons: Record<string, IconType> = {
    Frontend: FaHtml5,
    Backend: FaNodeJs,
    Tools: FaGitAlt,
    Testing: FaChartLine,
    DevOps: FaDocker
  };
  return React.createElement(icons[category] || FaGraduationCap);
}
