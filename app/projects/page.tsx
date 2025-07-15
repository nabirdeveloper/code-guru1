"use client";
import React, { useState, useEffect } from 'react';
import type { JSX } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiFilter, FiX, FiSearch, FiChevronDown } from 'react-icons/fi';
import { FaReact, FaNodeJs, FaDatabase, FaAws } from 'react-icons/fa';
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiGraphql, SiDocker, SiKubernetes } from 'react-icons/si';

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  technologies: string[];
  imageUrl: string;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  date: string;
}

const projectsData: Project[] = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution with product listings, cart functionality, and payment processing.',
    tags: ['Featured', 'Fullstack', 'E-Commerce'],
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    imageUrl: '/images/portfolio.png',
    githubUrl: 'https://github.com/yourusername/ecommerce-platform',
    liveUrl: 'https://ecommerce-demo.com',
    featured: true,
    date: '2023-06'
  },
  {
    id: 2,
    title: 'Portfolio Website',
    description: 'My personal portfolio website showcasing my projects and skills with smooth animations.',
    tags: ['Frontend', 'Portfolio'],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    imageUrl: '/images/portfolio2.png',
    githubUrl: 'https://github.com/yourusername/portfolio',
    liveUrl: 'https://myportfolio.com',
    date: '2023-04'
  },
  {
    id: 3,
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates and team functionality.',
    tags: ['Fullstack', 'Productivity'],
    technologies: ['React', 'GraphQL', 'Node.js', 'PostgreSQL'],
    imageUrl: '/images/portfolio3.png',
    githubUrl: 'https://github.com/yourusername/task-management',
    date: '2023-02'
  },
  {
    id: 4,
    title: 'Weather Dashboard',
    description: 'Real-time weather forecasting application with location-based services and historical data.',
    tags: ['Frontend', 'API'],
    technologies: ['React', 'TypeScript', 'Chart.js'],
    imageUrl: '/images/portfolio4.png',
    githubUrl: 'https://github.com/yourusername/weather-app',
    liveUrl: 'https://weather-demo.com',
    date: '2022-11'
  },
  {
    id: 5,
    title: 'DevOps Pipeline',
    description: 'Automated CI/CD pipeline with Docker containers and Kubernetes orchestration.',
    tags: ['DevOps', 'Backend'],
    technologies: ['Docker', 'Kubernetes', 'AWS'],
    imageUrl: '/images/portfolio5.png',
    githubUrl: 'https://github.com/yourusername/devops-pipeline',
    date: '2023-01'
  },
  {
    id: 6,
    title: 'AI Content Generator',
    description: 'Application leveraging OpenAI API to generate creative content based on user prompts.',
    tags: ['AI', 'Fullstack'],
    technologies: ['Next.js', 'Node.js', 'OpenAI API'],
    imageUrl: '/images/portfolio.png',
    liveUrl: 'https://ai-content-demo.com',
    date: '2023-05'
  }
];

const technologyIcons: Record<string, JSX.Element> = {
  'React': <FaReact className="text-blue-500" />,
  'Node.js': <FaNodeJs className="text-green-500" />,
  'MongoDB': <FaDatabase className="text-green-600" />,
  'TypeScript': <SiTypescript className="text-blue-600" />,
  'Next.js': <SiNextdotjs className="text-black dark:text-white" />,
  'Tailwind CSS': <SiTailwindcss className="text-cyan-500" />,
  'GraphQL': <SiGraphql className="text-pink-600" />,
  'Docker': <SiDocker className="text-blue-400" />,
  'Stripe': <div className="w-4 h-4 bg-purple-500 rounded-sm"></div>,
  'PostgreSQL': <FaDatabase className="text-blue-700" />,
  'AWS': <FaAws className="text-yellow-500" />,
  'Kubernetes': <SiKubernetes className="text-blue-500" />,
  'OpenAI API': <div className="w-4 h-4 bg-green-500 rounded-sm"></div>
};

const Projects = () => {
  const [filter, setFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Get all unique tags from projects
  const allTags = ['All', ...new Set(projectsData.flatMap(project => project.tags))];

  // Filter projects based on selected filter and search query
  const filteredProjects = projectsData.filter(project => {
    const matchesFilter = filter === 'All' || project.tags.includes(filter);
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  // Sort projects by date (newest first)
  const sortedProjects = [...filteredProjects].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.mobile-menu') && !target.closest('.mobile-menu-toggle')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <section id="projects" className="py-8 sm:py-12 md:py-16 bg-gray-900 min-h-screen text-white">
      <div className="container mx-auto px-3 sm:px-4 max-w-7xl">
        <div className="text-center mb-8 sm:mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-2"
          >
            My Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4"
          >
            A collection of my work, from full-stack applications to experimental projects
          </motion.p>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden mb-6">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="mobile-menu-toggle w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex items-center justify-between"
          >
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Filters & Search
            </span>
            <FiChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${isMobileMenuOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mobile-menu md:hidden mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-4 space-y-4">
                {/* Search */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10 text-sm"
                  />
                  <FiSearch className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
                </div>

                {/* Filter Tags */}
                <div>
                  <label className="block text-sm text-gray-600 dark:text-gray-300 mb-2">Filter by category:</label>
                  <div className="grid grid-cols-2 gap-2">
                    {allTags.map(tag => (
                      <button
                        key={tag}
                        onClick={() => setFilter(tag)}
                        className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                          filter === tag
                            ? 'bg-blue-500 text-white shadow-md'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop Controls */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden md:flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8"
        >
          <div className="relative w-full lg:w-1/2">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FiSearch className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
          </div>

          <div className="flex flex-wrap gap-2 w-full lg:w-auto">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setFilter(tag)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                  filter === tag
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        {sortedProjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            <AnimatePresence>
              {sortedProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 touch-manipulation"
                >
                  <div className="relative h-40 sm:h-48 overflow-hidden">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      style={{ objectFit: 'cover' }}
                      priority={index < 2}
                    />
                    {project.featured && (
                      <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        Featured
                      </div>
                    )}
                  </div>
                  <div className="p-4 sm:p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">
                        {project.title}
                      </h3>
                      <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                        {project.date}
                      </span>
                    </div>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1 sm:gap-2 mb-4">
                      {project.technologies.slice(0, 3).map(tech => (
                        <div 
                          key={tech} 
                          className="flex items-center bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md text-xs"
                        >
                          {technologyIcons[tech] || <div className="w-3 h-3 bg-gray-400 rounded-sm mr-1"></div>}
                          <span className="ml-1">{tech}</span>
                        </div>
                      ))}
                      {project.technologies.length > 3 && (
                        <div className="flex items-center bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md text-xs">
                          <span>+{project.technologies.length - 3}</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 sm:gap-2 mb-4">
                      {project.tags.map(tag => (
                        <span 
                          key={tag} 
                          className="px-2 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors text-sm"
                        >
                          <FiGithub className="mr-1" /> Code
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors text-sm"
                        >
                          <FiExternalLink className="mr-1" /> Demo
                        </a>
                      )}
                      <button 
                        onClick={() => setSelectedProject(project)}
                        className="ml-auto text-sm text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 sm:p-8 text-center"
          >
            <div className="text-gray-400 dark:text-gray-500 mb-4">
              <FiX className="w-12 h-12 sm:w-16 sm:h-16 mx-auto" />
            </div>
            <h3 className="text-lg sm:text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
              No projects found
            </h3>
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-4">
              Try adjusting your filters or search query
            </p>
            <button
              onClick={() => {
                setFilter('All');
                setSearchQuery('');
                setIsMobileMenuOpen(false);
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
            >
              Reset Filters
            </button>
          </motion.div>
        )}

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              >
                <div className="relative">
                  <Image
                    src={selectedProject.imageUrl}
                    alt={selectedProject.title}
                    width={1200}
                    height={400}
                    className="w-full h-48 sm:h-64 object-cover"
                    style={{ objectFit: 'cover' }}
                    priority
                  />
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/80 dark:bg-gray-800/80 rounded-full p-2 text-gray-800 dark:text-white hover:bg-white dark:hover:bg-gray-700 transition-colors"
                  >
                    <FiX className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
                <div className="p-4 sm:p-6 lg:p-8">
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-2">
                        {selectedProject.title}
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tags.map(tag => (
                          <span 
                            key={tag} 
                            className="px-2 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 sm:gap-3 mt-4 lg:mt-0">
                      {selectedProject.githubUrl && (
                        <a
                          href={selectedProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center px-3 sm:px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm"
                        >
                          <FiGithub className="mr-2" /> Code
                        </a>
                      )}
                      {selectedProject.liveUrl && (
                        <a
                          href={selectedProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center px-3 sm:px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                        >
                          <FiExternalLink className="mr-2" /> Demo
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-6 lg:mb-8">
                    <div className="lg:col-span-2">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white mb-3">
                        Project Overview
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 sm:mb-6">
                        {selectedProject.description}
                      </p>
                      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                        This project demonstrates modern web development practices with a focus on user experience, performance, and scalability. Built with cutting-edge technologies and best practices.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white mb-3">
                        Project Details
                      </h3>
                      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                        <div className="mb-4">
                          <h4 className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                            TECHNOLOGIES
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedProject.technologies.map(tech => (
                              <div 
                                key={tech} 
                                className="flex items-center bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded-md text-xs sm:text-sm"
                              >
                                {technologyIcons[tech] || <div className="w-3 h-3 bg-gray-400 rounded-sm mr-1"></div>}
                                <span className="ml-1">{tech}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="mb-4">
                          <h4 className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                            DATE
                          </h4>
                          <p className="text-sm sm:text-base text-gray-800 dark:text-gray-200">
                            {new Date(selectedProject.date).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long' 
                            })}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                            STATUS
                          </h4>
                          <p className="text-sm sm:text-base text-gray-800 dark:text-gray-200">
                            {selectedProject.liveUrl ? 'Live' : 'In Development'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white mb-4">
                      Key Features
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {[
                        'Responsive design for all devices',
                        'Secure authentication system',
                        'Real-time data updates',
                        'Scalable backend architecture',
                        'Comprehensive testing suite',
                        'Performance optimized'
                      ].map((feature, index) => (
                        <div key={index} className="flex items-start">
                          <div className="bg-blue-100 dark:bg-blue-900/50 rounded-full p-1 mr-3 mt-0.5 flex-shrink-0">
                            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">{feature}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default function YourPage() {
  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Projects />
    </div>
  );
}

