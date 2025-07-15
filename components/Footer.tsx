"use client";
import React, { useState } from 'react';
import { 
  FaGithub, FaTwitter, FaLinkedin, FaEnvelope, 
  FaChevronUp, FaChevronDown, FaPhone, FaMapMarkerAlt 
} from 'react-icons/fa';
import { SiDiscord } from 'react-icons/si';

interface FooterLink {
  title: string;
  url: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface FooterProps {
  companyName?: string;
  year?: number;
  logo?: React.ReactNode;
  sections?: FooterSection[];
  showBackToTop?: boolean;
  newsletterSubscribe?: boolean;
}

const defaultSections: FooterSection[] = [
  {
    title: 'Company',
    links: [
      { title: 'About Us', url: '/about' },
      { title: 'Careers', url: '/careers' },
      { title: 'Blog', url: '/blog' },
      { title: 'Press', url: '/press' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { title: 'Documentation', url: '/docs' },
      { title: 'Help Center', url: '/help' },
      { title: 'Community', url: '/community' },
      { title: 'Webinars', url: '/webinars' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { title: 'Privacy Policy', url: '/privacy' },
      { title: 'Terms of Service', url: '/terms' },
      { title: 'Cookie Policy', url: '/cookies' },
    ],
  },
];

const Footer: React.FC<FooterProps> = ({
  companyName = 'Your Company',
  year = new Date().getFullYear(),
  logo,
  sections = defaultSections,
  showBackToTop = true,
  newsletterSubscribe = true,
}) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [email, setEmail] = useState('');

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleSection = (title: string) => {
    setExpandedSection(expandedSection === title ? null : title);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle subscription logic here
    console.log('Subscribed with:', email);
    setEmail('');
    alert('Thank you for subscribing!');
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Company Info Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              {logo || (
                <span className="text-2xl font-bold text-white">
                  {companyName}
                </span>
              )}
            </div>
            <p className="mb-6">
              Building innovative solutions to help you grow your business and achieve your goals.
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-4 mb-6">
              <a href="#" className="text-gray-400 hover:text-white transition text-xl">
                <FaTwitter />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition text-xl">
                <FaLinkedin />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition text-xl">
                <FaGithub />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition text-xl">
                <SiDiscord />
              </a>
            </div>

            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center">
                <FaPhone className="mr-2 text-gray-400" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="mr-2 text-gray-400" />
                <span>contact@{companyName.toLowerCase().replace(/\s+/g, '')}.com</span>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt className="mr-2 text-gray-400" />
                <span>123 Business Ave, San Francisco, CA 94107</span>
              </div>
            </div>
          </div>

          {/* Dynamic Sections */}
          {sections.map((section) => (
            <div key={section.title} className="mb-6 md:mb-0">
              <button 
                className="flex justify-between items-center w-full md:block mb-4"
                onClick={() => toggleSection(section.title)}
              >
                <h4 className="text-lg font-semibold text-white">
                  {section.title}
                </h4>
                <span className="md:hidden">
                  {expandedSection === section.title ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </button>
              <ul className={`space-y-2 ${expandedSection === section.title ? 'block' : 'hidden md:block'}`}>
                {section.links.map((link) => (
                  <li key={link.title}>
                    <a 
                      href={link.url} 
                      className="text-gray-400 hover:text-white transition hover:underline"
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter Subscription */}
          {newsletterSubscribe && (
            <div className="lg:col-span-2 md:col-span-2">
              <h4 className="text-lg font-semibold text-white mb-4">
                Subscribe to our newsletter
              </h4>
              <p className="mb-4">
                Get the latest updates, news and product offers.
              </p>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-medium transition"
                >
                  Subscribe
                </button>
              </form>
              <p className="text-xs mt-2 text-gray-500">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6">
        <div className="container mx-auto px-4 max-w-7xl flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm mb-4 md:mb-0">
            &copy; {year} {companyName}. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/privacy" className="text-sm hover:text-white transition">
              Privacy Policy
            </a>
            <a href="/terms" className="text-sm hover:text-white transition">
              Terms of Service
            </a>
            <a href="/cookies" className="text-sm hover:text-white transition">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={handleBackToTop}
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition opacity-90 hover:opacity-100"
          aria-label="Back to top"
        >
          <FaChevronUp />
        </button>
      )}
    </footer>
  );
};

export default Footer;