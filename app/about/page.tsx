"use client";
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Mail, MapPin, Calendar, GraduationCap, Briefcase, Award, Heart } from 'lucide-react';
import Image from 'next/image';
import { QRCodeCanvas } from 'qrcode.react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Photo from "@/components/Photo";
ChartJS.register(ArcElement, Tooltip, Legend);

const testimonials = [
  {
    name: 'Jane Doe',
    role: 'Project Manager',
    text: 'Code Guru is a fantastic developer! Always delivers on time and exceeds expectations.',
    image: '/images/portfolio2.png',
  },
  {
    name: 'John Smith',
    role: 'CTO, Tech Solutions',
    text: 'A true professional with a passion for clean code and great UX.',
    image: '/images/portfolio3.png',
  },
  {
    name: 'Emily Chen',
    role: 'Designer',
    text: 'Working with Code Guru was a pleasure. Highly recommended for any web project!',
    image: '/images/portfolio4.png',
  },
];

const funFacts = [
  { icon: '🌏', label: 'Traveled 10+ countries' },
  { icon: '🎸', label: 'Plays guitar' },
  { icon: '☕', label: 'Coffee enthusiast' },
  { icon: '🏃‍♂️', label: 'Marathon runner' },
  { icon: '📚', label: 'Avid reader' },
];

const techStack = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS', 'MongoDB', 'GraphQL', 'Docker', 'AWS', 'Jest', 'Figma', 'Python', 'PHP', 'PostgreSQL', 'Redis',
];

const counters = [
  { label: 'Years of Experience', value: 5 },
  { label: 'Projects Completed', value: 25 },
  { label: 'Happy Clients', value: 10 },
  { label: 'Technologies Mastered', value: 14 },
];

function useAnimatedCounter(target: number, duration = 1200) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 16);
    let raf: number;
    function animate() {
      start += increment;
      if (start < target) {
        setCount(Math.floor(start));
        raf = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    }
    animate();
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return count;
}

// Timeline component
const Timeline = ({ items, type }: { items: any[]; type: 'experience' | 'education' }) => (
  <div className="relative pl-8 sm:pl-12">
    {/* Vertical line */}
    <div className="absolute left-3 sm:left-5 top-0 bottom-0 w-1 bg-emerald-100 dark:bg-emerald-900/30 rounded-full" />
    {items.map((item, idx) => (
      <motion.div
        key={idx}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: idx * 0.1 }}
        className="relative mb-10"
      >
        {/* Timeline dot */}
        <div className="absolute -left-5 sm:-left-7 top-2 w-6 h-6 bg-emerald-500 border-4 border-white dark:border-gray-800 rounded-full z-10 flex items-center justify-center">
          {type === 'experience' ? <Briefcase className="w-3 h-3 text-white" /> : <GraduationCap className="w-3 h-3 text-white" />}
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-5 ml-2">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
            <span className="text-sm text-emerald-500 font-medium">{item.year}</span>
            <span className="text-xs text-gray-400 dark:text-gray-500 mt-1 sm:mt-0">{type === 'experience' ? item.company : item.institution}</span>
          </div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">{type === 'experience' ? item.title : item.degree}</h4>
          <p className="text-gray-600 dark:text-gray-300 text-sm">{item.description}</p>
        </div>
      </motion.div>
    ))}
  </div>
);

const skillChartData = {
  labels: ['Frontend', 'Backend', 'UI/UX', 'DevOps', 'Database', 'Project Mgmt'],
  datasets: [
    {
      label: 'Skill Level',
      data: [95, 85, 80, 75, 90, 85],
      backgroundColor: [
        '#10b981', // emerald-500
        '#34d399', // emerald-400
        '#6ee7b7', // emerald-300
        '#a7f3d0', // emerald-200
        '#d1fae5', // emerald-100
        '#059669', // emerald-600
      ],
      borderWidth: 1,
    },
  ],
};

const skillChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: { color: '#059669', font: { size: 14 } },
    },
  },
};

const badges = [
  { label: 'Open Source Contributor', icon: '/images/portfolio2.png' },
  { label: 'AWS Certified', icon: '/images/portfolio3.png' },
  { label: 'Hackathon Winner', icon: '/images/portfolio4.png' },
  { label: 'Top Rated Freelancer', icon: '/images/portfolio5.png' },
];

const aboutMeText = {
  en: [
    "Hi there! 👋 I'm a passionate web developer with expertise in building responsive, user-friendly websites and web applications. I specialize in front-end development (HTML, CSS, JavaScript, React, Next.js) and back-end development (Node.js, Python, PHP) to create seamless, high-performance digital experiences.",
    "With over 5 years of experience in the industry, I've worked on diverse projects ranging from small business websites to complex enterprise applications. My approach combines technical expertise with creative problem-solving to deliver solutions that not only meet but exceed client expectations.",
    "I believe in continuous learning and staying updated with the latest technologies and best practices. When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community."
  ],
  bn: [
    "হ্যালো! 👋 আমি একজন প্যাশনেট ওয়েব ডেভেলপার, যিনি রেসপনসিভ ও ইউজার-ফ্রেন্ডলি ওয়েবসাইট ও ওয়েব অ্যাপ্লিকেশন তৈরি করতে দক্ষ। আমি ফ্রন্ট-এন্ড (HTML, CSS, JavaScript, React, Next.js) এবং ব্যাক-এন্ড (Node.js, Python, PHP) ডেভেলপমেন্টে পারদর্শী।",
    "৫ বছরেরও বেশি অভিজ্ঞতায়, আমি ছোট ব্যবসার ওয়েবসাইট থেকে শুরু করে জটিল এন্টারপ্রাইজ অ্যাপ্লিকেশন পর্যন্ত বিভিন্ন প্রকল্পে কাজ করেছি। আমার কাজের ধরন হলো টেকনিক্যাল দক্ষতা ও সৃজনশীল সমস্যা সমাধানের সমন্বয়।",
    "আমি সবসময় নতুন প্রযুক্তি ও বেস্ট প্র্যাকটিস শিখতে ভালোবাসি। অবসর সময়ে নতুন কিছু শেখা, ওপেন সোর্সে অবদান রাখা, কিংবা ডেভেলপার কমিউনিটিতে জ্ঞান শেয়ার করতে পছন্দ করি।"
  ]
};

const themes = [
  { name: 'Emerald', color: '#10b981', key: 'emerald' },
  { name: 'Blue', color: '#3b82f6', key: 'blue' },
  { name: 'Purple', color: '#a21caf', key: 'purple' },
  { name: 'Orange', color: '#f59e42', key: 'orange' },
];

const themeVars: Record<string, Record<string, string>> = {
  emerald: {
    '--theme-primary': '#10b981',
    '--theme-primary-light': '#6ee7b7',
    '--theme-primary-dark': '#059669',
  },
  blue: {
    '--theme-primary': '#3b82f6',
    '--theme-primary-light': '#93c5fd',
    '--theme-primary-dark': '#1d4ed8',
  },
  purple: {
    '--theme-primary': '#a21caf',
    '--theme-primary-light': '#e9d5ff',
    '--theme-primary-dark': '#6d28d9',
  },
  orange: {
    '--theme-primary': '#f59e42',
    '--theme-primary-light': '#fed7aa',
    '--theme-primary-dark': '#ea580c',
  },
};

const About = () => {
  const [lang, setLang] = useState<'en' | 'bn'>('en');
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const easterEggSequence = ['g', 'u', 'r', 'u'];
  const keyBuffer = useRef<string[]>([]);
  const [theme, setTheme] = useState('emerald');

  useEffect(() => {
    const saved = localStorage.getItem('about-theme');
    if (saved && themeVars[saved]) setTheme(saved);
  }, []);

  useEffect(() => {
    Object.entries(themeVars[theme]).forEach(([k, v]) => {
      document.documentElement.style.setProperty(k, v);
    });
    localStorage.setItem('about-theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keyBuffer.current.push(e.key.toLowerCase());
      if (keyBuffer.current.length > easterEggSequence.length) {
        keyBuffer.current.shift();
      }
      if (keyBuffer.current.join('') === easterEggSequence.join('')) {
        setShowEasterEgg(true);
        setTimeout(() => setShowEasterEgg(false), 8000);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white py-10 px-2">
      <section className="py-8 sm:py-12 md:py-16 bg-gray- dark:bg-gray-900 min-h-screen">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="relative w-full mb-8">
            <svg viewBox="0 0 1440 320" className="absolute top-0 left-0 w-full h-24 sm:h-32 md:h-40" preserveAspectRatio="none">
              <path fill="#10b981" fillOpacity="0.15" d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
            </svg>
          </div>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
              About Me
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Passionate developer with a love for creating exceptional digital experiences
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-end gap-2 mb-4">
            {themes.map(t => (
              <button
                key={t.key}
                onClick={() => setTheme(t.key)}
                style={{ background: t.color, color: '#fff', border: theme === t.key ? '2px solid #333' : 'none' }}
                className={`px-3 py-1 rounded-full font-medium shadow transition-all duration-200 ${theme === t.key ? 'ring-2 ring-offset-2 ring-[var(--theme-primary-dark)]' : ''}`}
                aria-label={`Switch to ${t.name} theme`}
              >
                {t.name}
              </button>
            ))}
          </div>

          <div className="flex justify-end mb-4">
            <button
              onClick={() => setLang('en')}
              className={`px-4 py-2 rounded-l-lg font-medium border border-emerald-500/30 ${lang === 'en' ? 'bg-emerald-500 text-white' : 'bg-white dark:bg-gray-800 text-emerald-700 dark:text-emerald-300'}`}
            >
              English
            </button>
            <button
              onClick={() => setLang('bn')}
              className={`px-4 py-2 rounded-r-lg font-medium border border-emerald-500/30 border-l-0 ${lang === 'bn' ? 'bg-emerald-500 text-white' : 'bg-white dark:bg-gray-800 text-emerald-700 dark:text-emerald-300'}`}
            >
              বাংলা
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Left Column - Photo & Personal Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-1"
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 sticky top-8">
                {/* Profile Photo */}
                <div className="text-center mb-6">
                
                  <Photo />
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                    Code Guru
                  </h2>
                  <div className="flex items-center justify-center mb-2">
                    <span className="relative flex h-4 w-4 mr-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Available for Work</span>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="aspect-w-16 aspect-h-9 w-full rounded-lg overflow-hidden shadow-lg">
                    <iframe
                      src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                      title="Video Introduction"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 border-none rounded-lg"
                    ></iframe>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">Video Introduction</p>
                </div>

                {/* Personal Information */}
                <div className="space-y-4 mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                    Personal Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-emerald-500" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                        <p className="text-gray-800 dark:text-white font-medium">codeguru@example.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-emerald-500" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                        <p className="text-gray-800 dark:text-white font-medium">Dhaka, Bangladesh</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-emerald-500" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Birthday</p>
                        <p className="text-gray-800 dark:text-white font-medium">January 15, 1995</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <GraduationCap className="w-4 h-4 text-emerald-500" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Degree</p>
                        <p className="text-gray-800 dark:text-white font-medium">BSc in Computer Science</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Download CV Button */}
                <a
                  href="/resume.pdf"
                  download=""
                  className="w-full bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2 font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="w-4 h-4" />
                  Download CV
                </a>

                <a
                  href="/codeguru.vcf"
                  download
                  className="w-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-6 py-3 rounded-lg hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-colors flex items-center justify-center gap-2 font-medium mt-3"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  Download vCard
                </a>

                <button
                  onClick={() => window.print()}
                  className="w-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 px-6 py-3 rounded-lg hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-colors flex items-center justify-center gap-2 font-medium mt-3"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21H5a2 2 0 01-2-2V7a2 2 0 012-2h5l2-2h5a2 2 0 012 2v12a2 2 0 01-2 2z" /></svg>
                  Download as PDF
                </button>
              </div>
            </motion.div>

            {/* Right Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2 space-y-8"
            >
              {/* About Me */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6" aria-label="About Me">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                  <Heart className="w-6 h-6 text-emerald-500" />
                  About Me
                </h3>
                <div className="space-y-4 text-gray-600 dark:text-gray-300">
                  {aboutMeText[lang].map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              </div>

              {/* Skills Progress */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6" aria-label="Skills & Expertise">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                  <Award className="w-6 h-6 text-emerald-500" />
                  Skills & Expertise
                </h3>
                <div className="space-y-4">
                  {[
                    { name: 'Frontend Development', percentage: 95 },
                    { name: 'Backend Development', percentage: 85 },
                    { name: 'UI/UX Design', percentage: 80 },
                    { name: 'DevOps & Deployment', percentage: 75 },
                    { name: 'Database Management', percentage: 90 },
                    { name: 'Project Management', percentage: 85 }
                  ].map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-800 dark:text-white font-medium">{skill.name}</span>
                        <span className="text-emerald-500 font-medium">{skill.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.percentage}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          className="h-2 bg-emerald-500 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Animated Skill Pie Chart */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-10 flex flex-col items-center" aria-label="Skill Distribution">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">📊 Skill Distribution</h3>
                <div className="w-full max-w-xs">
                  <Pie data={skillChartData} options={skillChartOptions} />
                </div>
              </div>

              {/* Social Proof Badges */}
              <div className="relative z-0 bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-10 flex flex-col items-center overflow-hidden" aria-label="Social Proof & Certifications">
                {/* Subtle gradient background */}
                <div className="absolute inset-0 z-0 pointer-events-none opacity-60 dark:opacity-40" style={{background: 'linear-gradient(135deg, #d1fae5 0%, #f0fdfa 100%)'}} />
                <h3 className="relative z-10 text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">🏅 Social Proof & Certifications</h3>
                <div className="relative z-10 flex flex-wrap gap-6 justify-center">
                  {badges.map((badge, idx) => (
                    <div
                      key={idx}
                      className="group flex flex-col items-center transition-transform duration-200 hover:scale-105 hover:shadow-xl hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-lg p-3 border-2 border-transparent hover:border-emerald-400 cursor-pointer"
                      style={{ minWidth: 90 }}
                    >
                      <Image
                        src={badge.icon}
                        alt={badge.label}
                        width={56}
                        height={56}
                        className="rounded-full mb-2 object-cover border-2 border-emerald-300 group-hover:border-emerald-500 transition-all duration-200 shadow-sm group-hover:shadow-md"
                      />
                      <span className="text-xs text-gray-700 dark:text-gray-200 text-center font-semibold tracking-wide group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors duration-200">
                        {badge.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience Timeline */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6" aria-label="Work Experience">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                  <Briefcase className="w-6 h-6 text-emerald-500" />
                  Work Experience
                </h3>
                <Timeline
                  type="experience"
                  items={[
                    {
                      year: '2022 - Present',
                      title: 'Senior Frontend Developer',
                      company: 'Tech Solutions Inc.',
                      description: 'Leading frontend development for enterprise applications using React, Next.js, and TypeScript.'
                    },
                    {
                      year: '2020 - 2022',
                      title: 'Full Stack Developer',
                      company: 'Digital Innovations',
                      description: 'Developed full-stack web applications using modern technologies and best practices.'
                    },
                    {
                      year: '2018 - 2020',
                      title: 'Junior Developer',
                      company: 'Startup Hub',
                      description: 'Started career with focus on responsive design and user experience optimization.'
                    }
                  ]}
                />
              </div>

              {/* Education Timeline */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6" aria-label="Education">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                  <GraduationCap className="w-6 h-6 text-emerald-500" />
                  Education
                </h3>
                <Timeline
                  type="education"
                  items={[
                    {
                      year: '2014 - 2018',
                      degree: 'BSc in Computer Science',
                      institution: 'University of Technology',
                      description: 'Graduated with honors, specialized in software engineering and web development.'
                    },
                    {
                      year: '2012 - 2014',
                      degree: 'Higher Secondary',
                      institution: 'Science College',
                      description: 'Completed with distinction in Mathematics and Computer Science.'
                    }
                  ]}
                />
              </div>

              {/* Animated Counters */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10">
                {counters.map((counter, idx) => {
                  const animated = useAnimatedCounter(counter.value, 1200 + idx * 200);
                  return (
                    <div key={counter.label} className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col items-center">
                      <span className="text-3xl font-bold text-emerald-500">{animated}+</span>
                      <span className="text-gray-700 dark:text-gray-200 text-sm mt-2 text-center">{counter.label}</span>
                    </div>
                  );
                })}
              </div>

              {/* Fun Facts / Hobbies */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-10">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">🎉 Fun Facts & Hobbies</h3>
                <div className="flex flex-wrap gap-4 justify-center">
                  {funFacts.map((fact, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                      <span className="text-3xl mb-2">{fact.icon}</span>
                      <span className="text-gray-700 dark:text-gray-200 text-sm text-center">{fact.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Testimonials Carousel */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-10">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">💬 Testimonials</h3>
                <div className="flex overflow-x-auto gap-6 pb-2 scrollbar-hide">
                  {testimonials.map((t, idx) => (
                    <div key={idx} className="min-w-[250px] max-w-xs bg-emerald-50 dark:bg-emerald-900/10 rounded-lg p-4 flex flex-col items-center shadow">
                      <Image src={t.image} alt={t.name} width={56} height={56} className="rounded-full mb-2 object-cover" />
                      <p className="text-gray-700 dark:text-gray-200 text-sm mb-2 italic">"{t.text}"</p>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">{t.name}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{t.role}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* QR Code for Portfolio */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-10 flex flex-col items-center">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">🔗 Portfolio QR Code</h3>
                <QRCodeCanvas value="https://your-portfolio-link.com" size={128} fgColor="#059669" bgColor="transparent" includeMargin={true} />
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">Scan to visit my portfolio</span>
              </div>

              {/* Tech Stack Tag Cloud */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-10">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">🛠️ Tech Stack</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {techStack.map((tech, idx) => (
                    <span key={idx} className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full text-xs font-medium shadow-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-10 max-w-2xl mx-auto" aria-label="Contact Form">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">✉️ Contact Me</h3>
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
                    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
                    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value;
                    window.location.href = `mailto:codeguru@example.com?subject=Message from ${encodeURIComponent(name)}&body=${encodeURIComponent(message + '\n\nFrom: ' + name + ' (' + email + ')')}`;
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition-colors font-medium"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {showEasterEgg && (
        <div className="flex flex-col items-center justify-center my-8 animate-bounce">
          <div className="text-5xl mb-2">🎉🥳</div>
          <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">You found the secret Guru Easter Egg!</div>
          <div className="text-gray-700 dark:text-gray-200 text-center mb-2">Keep exploring, keep learning, keep coding! 🚀</div>
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="40" cy="40" r="36" stroke="#10b981" strokeWidth="4" fill="#d1fae5" />
            <path d="M25 45 Q40 60 55 45" stroke="#10b981" strokeWidth="3" fill="none" />
            <circle cx="32" cy="35" r="3" fill="#10b981" />
            <circle cx="48" cy="35" r="3" fill="#10b981" />
          </svg>
        </div>
      )}

      {/* Animated SVG Signature */}
      <div className="flex justify-center mt-12 mb-4">
        <svg viewBox="0 0 300 80" width="220" height="60" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Signature">
          <path
            d="M10 60 Q 52 10, 90 60 Q 130 110, 170 60 Q 210 10, 250 60"
            stroke="#10b981"
            strokeWidth="3"
            fill="none"
            strokeDasharray="400"
            strokeDashoffset="400">
            <animate attributeName="stroke-dashoffset" from="400" to="0" dur="2s" fill="freeze" />
          </path>
          <text x="60" y="75" fontFamily="cursive" fontSize="28" fill="#10b981">Code Guru</text>
        </svg>
      </div>
    </div>
  );
};

export default About; 