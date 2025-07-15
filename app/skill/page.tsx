"use client";
import React, { useState, useEffect } from 'react';
import Headline from '@/components/Headline';
import type { JSX } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGitAlt, FaDocker, FaAws } from 'react-icons/fa';
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiExpress, SiMongodb, SiWebpack, SiJest, SiGraphql, SiPostgresql, SiRedis } from 'react-icons/si';
import { TbTestPipe } from 'react-icons/tb';

interface Skill {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  icon: JSX.Element;
  category: 'Frontend' | 'Backend' | 'Tools' | 'Testing' | 'DevOps';
  lastUsed?: string;
  projects?: number;
}

const skillsData: Skill[] = [
  // Frontend
  { name: 'HTML5', level: 'Advanced', icon: <FaHtml5 />, category: 'Frontend', lastUsed: 'Current', projects: 20 },
  { name: 'CSS3', level: 'Advanced', icon: <FaCss3Alt />, category: 'Frontend', lastUsed: 'Current', projects: 20 },
  { name: 'JavaScript', level: 'Advanced', icon: <FaJs />, category: 'Frontend', lastUsed: 'Current', projects: 15 },
  { name: 'TypeScript', level: 'Intermediate', icon: <SiTypescript />, category: 'Frontend', lastUsed: 'Current', projects: 8 },
  { name: 'React', level: 'Advanced', icon: <FaReact />, category: 'Frontend', lastUsed: 'Current', projects: 12 },
  { name: 'Next.js', level: 'Intermediate', icon: <SiNextdotjs />, category: 'Frontend', lastUsed: 'Current', projects: 5 },
  { name: 'Tailwind CSS', level: 'Advanced', icon: <SiTailwindcss />, category: 'Frontend', lastUsed: 'Current', projects: 10 },
  // Backend
  { name: 'Node.js', level: 'Intermediate', icon: <FaNodeJs />, category: 'Backend', lastUsed: 'Current', projects: 6 },
  { name: 'Express', level: 'Intermediate', icon: <SiExpress />, category: 'Backend', lastUsed: 'Current', projects: 5 },
  { name: 'MongoDB', level: 'Beginner', icon: <SiMongodb />, category: 'Backend', lastUsed: '1 year', projects: 3 },
  { name: 'GraphQL', level: 'Beginner', icon: <SiGraphql />, category: 'Backend', lastUsed: '1 year', projects: 2 },
  { name: 'PostgreSQL', level: 'Beginner', icon: <SiPostgresql />, category: 'Backend', lastUsed: '2+ years', projects: 1 },
  { name: 'Redis', level: 'Beginner', icon: <SiRedis />, category: 'Backend', lastUsed: '2+ years', projects: 1 },
  // Tools
  { name: 'Git', level: 'Advanced', icon: <FaGitAlt />, category: 'Tools', lastUsed: 'Current', projects: 20 },
  { name: 'Docker', level: 'Beginner', icon: <FaDocker />, category: 'Tools', lastUsed: '1 year', projects: 2 },
  { name: 'Webpack', level: 'Intermediate', icon: <SiWebpack />, category: 'Tools', lastUsed: 'Current', projects: 5 },
  // Testing
  { name: 'Jest', level: 'Intermediate', icon: <SiJest />, category: 'Testing', lastUsed: 'Current', projects: 4 },
  { name: 'Testing Library', level: 'Intermediate', icon: <TbTestPipe />, category: 'Testing', lastUsed: 'Current', projects: 3 },
  // DevOps
  { name: 'AWS', level: 'Beginner', icon: <FaAws />, category: 'DevOps', lastUsed: '1 year', projects: 1 },
];

const categories = ['Frontend', 'Backend', 'Tools', 'Testing', 'DevOps'] as const;

const Skills: React.FC = () => {
  const [filterLevel, setFilterLevel] = useState<string>('All');
  const [expandedCategory, setExpandedCategory] = useState<string>('Frontend');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'name' | 'level' | 'lastUsed' | 'projects'>('name');
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Filter and sort skills
  const filteredSkills = skillsData
    .filter((skill) => {
      const matchesLevel = filterLevel === 'All' || skill.level === filterLevel;
      const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesLevel && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'level') {
        const levelOrder = { 'Beginner': 0, 'Intermediate': 1, 'Advanced': 2 };
        return levelOrder[b.level] - levelOrder[a.level];
      }
      if (sortBy === 'lastUsed') {
        const lastUsedOrder = { 'Current': 0, '1 year': 1, '2+ years': 2 } as const;
        return lastUsedOrder[a.lastUsed] - lastUsedOrder[b.lastUsed || '2+ years'];
      }
      if (sortBy === 'projects') return (b.projects || 0) - (a.projects || 0);
      return 0;
    });

  const groupedSkills = categories.reduce((acc, category) => {
    acc[category] = filteredSkills.filter((skill) => skill.category === category);
    return acc;
  }, {} as Record<string, Skill[]>);

  // Calculate skill counts for each category
  const categoryCounts = categories.map(category => ({
    name: category,
    count: groupedSkills[category].length,
    icon: getCategoryIcon(category)
  }));

  function getCategoryIcon(category: string): JSX.Element {
    switch(category) {
      case 'Frontend': return <FaReact className="mr-2" />;
      case 'Backend': return <FaNodeJs className="mr-2" />;
      case 'Tools': return <FaGitAlt className="mr-2" />;
      case 'Testing': return <TbTestPipe className="mr-2" />;
      case 'DevOps': return <FaDocker className="mr-2" />;
      default: return <FaJs className="mr-2" />;
    }
  }

  const levelDescriptions = {
    'Advanced': 'Extensive experience, can solve complex problems',
    'Intermediate': 'Comfortable, can work independently',
    'Beginner': 'Learning, can complete basic tasks'
  };

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
    <section className="py-6 sm:py-8 md:py-12 bg-gray-900 min-h-screen text-white" id="skills">
      <div className="container mx-auto px-3 sm:px-4 max-w-7xl">
        
        <Headline />
      
        {/* Mobile Menu Toggle */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="mobile-menu-toggle w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex items-center justify-between"
          >
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Filters & Search
            </span>
            <svg
              className={`w-5 h-5 text-gray-500 transition-transform ${isMobileMenuOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
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
                    placeholder="Search skills..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10 text-sm"
                  />
                  <svg
                    className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>

                {/* Sort */}
                <div className="flex items-center justify-between">
                  <label className="text-sm text-gray-600 dark:text-gray-300">Sort by:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-white text-sm rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="name">Name</option>
                    <option value="level">Level</option>
                    <option value="lastUsed">Last Used</option>
                    <option value="projects">Project Count</option>
                  </select>
                </div>

                {/* Level Filters */}
                <div>
                  <label className="block text-sm text-gray-600 dark:text-gray-300 mb-2">Filter by level:</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['All', 'Advanced', 'Intermediate', 'Beginner'].map((level) => (
                      <button
                        key={level}
                        onClick={() => setFilterLevel(level)}
                        className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300 ${
                          filterLevel === level
                            ? 'bg-blue-500 text-white shadow-md'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-blue-400 hover:text-white'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop Controls */}
        <div className="hidden md:block bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="relative w-full lg:w-1/3">
              <input
                type="text"
                placeholder="Search skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              <div className="flex items-center">
                <label htmlFor="sort" className="mr-2 text-sm text-gray-600 dark:text-gray-300">
                  Sort by:
                </label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-white text-sm rounded-lg px-3 py-1.5 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="name">Name</option>
                  <option value="level">Level</option>
                  <option value="lastUsed">Last Used</option>
                  <option value="projects">Project Count</option>
                </select>
              </div>

              <div className="flex flex-wrap gap-2">
                {['All', 'Advanced', 'Intermediate', 'Beginner'].map((level) => (
                  <button
                    key={level}
                    onClick={() => setFilterLevel(level)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                      filterLevel === level
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-blue-400 hover:text-white'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Category Tabs - Mobile */}
        <div className="md:hidden mb-6">
          <div className="flex overflow-x-auto pb-2 scrollbar-hide -mx-3 px-3">
            <div className="flex space-x-2 min-w-max">
              {categoryCounts.map(({ name, count, icon }) => (
                <button
                  key={name}
                  onClick={() => setExpandedCategory(name)}
                  className={`px-4 py-3 font-medium text-sm flex items-center whitespace-nowrap rounded-lg transition-colors duration-200 flex-shrink-0 ${
                    expandedCategory === name
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {icon}
                  <span className="ml-2">{name}</span>
                  <span className="ml-2 bg-white/20 dark:bg-gray-800/50 rounded-full px-2 py-0.5 text-xs">
                    {count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Category Tabs - Desktop */}
        <div className="hidden md:flex overflow-x-auto pb-2 mb-6 scrollbar-hide">
          <div className="flex space-x-1">
            {categoryCounts.map(({ name, count, icon }) => (
              <button
                key={name}
                onClick={() => setExpandedCategory(name)}
                className={`px-4 py-2 font-medium text-sm flex items-center whitespace-nowrap rounded-lg transition-colors duration-200 ${
                  expandedCategory === name
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {icon}
                {name}
                <span className="ml-2 bg-white/20 dark:bg-gray-800/50 rounded-full px-2 py-0.5 text-xs">
                  {count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={expandedCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6"
          >
            {groupedSkills[expandedCategory].length > 0 ? (
              groupedSkills[expandedCategory].map((skill) => (
                <motion.div
                  key={`${skill.category}-${skill.name}`}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSelectedSkill(skill);
                    setIsModalOpen(true);
                  }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 sm:p-5 flex flex-col items-center text-center cursor-pointer hover:shadow-lg transition-all duration-300 border border-transparent hover:border-blue-500/20 touch-manipulation"
                >
                  <span className="text-3xl sm:text-4xl mb-3 text-blue-500">
                    {skill.icon}
                  </span>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white mb-1">
                    {skill.name}
                  </h3>
                  <div className="flex items-center mb-2">
                    <div
                      className={`w-2 h-2 rounded-full mr-1 ${
                        skill.level === 'Advanced'
                          ? 'bg-green-500'
                          : skill.level === 'Intermediate'
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                    />
                    <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                      {skill.level}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-3">
                    <div
                      className={`h-2 rounded-full ${
                        skill.level === 'Advanced'
                          ? 'bg-green-500'
                          : skill.level === 'Intermediate'
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                      style={{
                        width: `${
                          skill.level === 'Advanced'
                            ? '100%'
                            : skill.level === 'Intermediate'
                            ? '66%'
                            : '33%'
                        }`,
                      }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-auto space-y-1">
                    {skill.lastUsed && (
                      <span className="inline-block bg-gray-100 dark:bg-gray-700 rounded-full px-2 py-1 mr-1">
                        {skill.lastUsed}
                      </span>
                    )}
                    {skill.projects && (
                      <span className="inline-block bg-gray-100 dark:bg-gray-700 rounded-full px-2 py-1">
                        {skill.projects} project{skill.projects !== 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-8 sm:py-12 text-center">
                <div className="text-gray-400 dark:text-gray-500 mb-4">
                  <svg
                    className="w-12 h-12 sm:w-16 sm:h-16 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
                  No skills found
                </h3>
                <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-4">
                  Try adjusting your filters or search query
                </p>
                <button
                  onClick={() => {
                    setFilterLevel('All');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors"
                >
                  Reset filters
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Skill Modal */}
        <AnimatePresence>
          {isModalOpen && selectedSkill && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
              >
                <div className="p-4 sm:p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      <span className="text-3xl sm:text-4xl mr-3 sm:mr-4 text-blue-500">
                        {selectedSkill.icon}
                      </span>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
                          {selectedSkill.name}
                        </h3>
                        <div className="flex items-center">
                          <div
                            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full mr-2 ${
                              selectedSkill.level === 'Advanced'
                                ? 'bg-green-500'
                                : selectedSkill.level === 'Intermediate'
                                ? 'bg-yellow-500'
                                : 'bg-red-500'
                            }`}
                          />
                          <span className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">
                            {selectedSkill.level} - {levelDescriptions[selectedSkill.level]}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1"
                    >
                      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xs sm:text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">
                        CATEGORY
                      </h4>
                      <p className="text-sm sm:text-base text-gray-800 dark:text-gray-200">
                        {selectedSkill.category}
                      </p>
                    </div>

                    {selectedSkill.lastUsed && (
                      <div>
                        <h4 className="text-xs sm:text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">
                          LAST USED
                        </h4>
                        <p className="text-sm sm:text-base text-gray-800 dark:text-gray-200">
                          {selectedSkill.lastUsed === 'Current' ? 'Currently using' : `Last used ${selectedSkill.lastUsed} ago`}
                        </p>
                      </div>
                    )}

                    {selectedSkill.projects && (
                      <div>
                        <h4 className="text-xs sm:text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">
                          PROJECTS
                        </h4>
                        <p className="text-sm sm:text-base text-gray-800 dark:text-gray-200">
                          Used in {selectedSkill.projects} project{selectedSkill.projects !== 1 ? 's' : ''}
                        </p>
                      </div>
                    )}

                    <div>
                      <h4 className="text-xs sm:text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">
                        PROFICIENCY
                      </h4>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 sm:h-2.5 mb-2">
                        <div
                          className={`h-2 sm:h-2.5 rounded-full ${
                            selectedSkill.level === 'Advanced'
                              ? 'bg-green-500'
                              : selectedSkill.level === 'Intermediate'
                              ? 'bg-yellow-500'
                              : 'bg-red-500'
                          }`}
                          style={{
                            width: `${
                              selectedSkill.level === 'Advanced'
                                ? '100%'
                                : selectedSkill.level === 'Intermediate'
                                ? '66%'
                                : '33%'
                            }`,
                          }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {levelDescriptions[selectedSkill.level]}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Proficiency Levels */}
        <div className="mt-8 sm:mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Proficiency Levels
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(levelDescriptions).map(([level, description]) => (
              <div key={level} className="flex items-start">
                <div
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full mt-1 mr-3 flex-shrink-0 ${
                    level === 'Advanced'
                      ? 'bg-green-500'
                      : level === 'Intermediate'
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                  }`}
                />
                <div>
                  <h4 className="text-sm sm:text-base font-medium text-gray-800 dark:text-white">{level}</h4>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;

