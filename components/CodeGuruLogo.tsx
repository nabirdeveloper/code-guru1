"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface CodeGuruLogoProps {
  size?: number;
  animated?: boolean;
  className?: string;
}

const CodeGuruLogo: React.FC<CodeGuruLogoProps> = ({
  size = 100,
  animated = true,
  className = "",
}) => {
const logoRef = useRef<SVGSVGElement | null>(null);
  const bgRef = useRef<SVGRectElement>(null);
  const circuitLinesRef = useRef<SVGGElement>(null);

  useEffect(() => {
    if (!animated || !logoRef.current) return;

    // Main animation timeline
    const tl = gsap.timeline({ repeat: -1, yoyo: true });

    // Background gradient pulse animation
    tl.to(
      bgRef.current,
      {
        duration: 3,
        attr: { fill: "url(#)" },
        ease: "power1.inOut",
      },
      0
    )
      .to(
        "#gradient-stop-1",
        {
          duration: 3,
          attr: { offset: "10%" },
          ease: "sine.inOut",
        },
        0
      )
      .to(
        "#gradient-stop-2",
        {
          duration: 3,
          attr: { offset: "20%" },
          ease: "sine.inOut",
        },
        0
      )
      .to(
        "#gradient-stop-3",
        {
          duration: 3,
          attr: { offset: "30%" },
          ease: "sine.inOut",
        },
        0
      )
      .to(
        "#gradient-stop-4",
        {
          duration: 3,
          attr: { offset: "40%" },
          ease: "sine.inOut",
        },
        0
      )
      .to(
        "#gradient-stop-5",
        {
          duration: 3,
          attr: { offset: "50%" },
          ease: "sine.inOut",
        },
        0
      )
      .to(
        "#gradient-stop-6",
        {
          duration: 3,
          attr: { offset: "60%" },
          ease: "sine.inOut",
        },
        0
      )
      .to(
        "#gradient-stop-7",
        {
          duration: 3,
          attr: { offset: "70%" },
          ease: "sine.inOut",
        },
        0
      )
      .to(
        "#gradient-stop-8",
        {
          duration: 3,
          attr: { offset: "80%" },
          ease: "sine.inOut",
        },
        0
      )
      .to(
        "#gradient-stop-9",
        {
          duration: 3,
          attr: { offset: "90%" },
          ease: "sine.inOut",
        },
        0
      )
      .to(
        "#gradient-stop-10",
        {
          duration: 3,
          attr: { offset: "100%" },
          ease: "sine.inOut",
        },
        0
      )
      .to(
        "#circuit-pattern",
        {
          duration: 3,
          attr: { x: 5, y: 5 },
          ease: "sine.inOut",
        },
        0
      );

    // Circuit lines animation
    gsap.fromTo(
      circuitLinesRef.current!.children,
      { opacity: 0.3, scale: 0.95 },
      {
        opacity: 0.8,
        scale: 1.05,
        duration: 2,
        stagger: 0.1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      }
    );

    // Chip animation
    tl.to(
      "#chip-core",
      {
        duration: 1.5,
        fill: "#1e293b",
        ease: "power2.inOut",
      },
      0
    )
      .to(
        "#circuit-path",
        {
          duration: 1,
          strokeDashoffset: 0,
          ease: "power2.out",
        },
        0
      )
      .to(
        "#code-text",
        {
          duration: 0.5,
          fill: "#10b981",
          ease: "power2.out",
        },
        0.5
      )
      .to(
        "#guru-text",
        {
          duration: 0.5,
          fill: "#f59e0b",
          ease: "power2.out",
        },
        0.5
      );

    // Initial reveal animation
    gsap.from(logoRef.current?.querySelectorAll("path, text, rect"), {
      duration: 1,
      opacity: 0,
      stagger: 0.1,
      ease: "power2.out",
    });

    return () => {
      tl.kill();
      gsap.killTweensOf(circuitLinesRef.current!.children);
    };
  }, [animated]);

  return (
    <div className={`inline-flex flex-col  ${className} `}>
      <svg
        ref={logoRef}
        width={size - 20}
        height={size - 20}
        viewBox="0 0 200 200"
        fill="none"
        className="rounded-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="50%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>

          <linearGradient
            id="pulseGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop id="gradient-stop-1" offset="10%" stopColor="#0f172a" />
            <stop id="gradient-stop-2" offset="20%" stopColor="#3b82f6" />
            <stop id="gradient-stop-3" offset="30%" stopColor="#8b5cf6" />
            <stop id="gradient-stop-4" offset="40%" stopColor="#8b5cf6" />
            <stop id="gradient-stop-5" offset="50%" stopColor="#8b5cf6" />
            <stop id="gradient-stop-6" offset="60%" stopColor="#8b5cf6" />
            <stop id="gradient-stop-7" offset="70%" stopColor="#8b5cf6" />
            <stop id="gradient-stop-8" offset="80%" stopColor="#8b5cf6" />
            <stop id="gradient-stop-9" offset="90%" stopColor="#8b5cf6" />
            <stop id="gradient-stop-10" offset="100%" stopColor="#8b5cf6" />
          </linearGradient>

          <pattern
            id="circuitPattern"
            patternUnits="userSpaceOnUse"
            width="20"
            height="20"
            patternTransform="rotate(45)"
          >
            <circle cx="10" cy="10" r="5" fill="#64748b" opacity="0.5" />
            <path
              d="M10 0 V20 M0 10 H20"
              stroke="#64748b"
              strokeWidth="0.5"
              opacity="0.3"
            />
          </pattern>
        </defs>

        <rect
          ref={bgRef}
          width="200"
          height="200"
          rx="20"
          fill="url(#bgGradient)"
        />

        <rect
          id="circuit-pattern"
          width="200"
          height="200"
          rx="20"
          fill="url(#circuitPattern)"
          opacity="0.1"
        />

        <g ref={circuitLinesRef}>
          <path
            d="M20 50 H40"
            stroke="#3b82f6"
            strokeWidth="2"
            strokeDasharray="5 2"
          />
          <path
            d="M20 80 H40"
            stroke="#3b82f6"
            strokeWidth="2"
            strokeDasharray="5 2"
          />
          <path
            d="M20 120 H40"
            stroke="#3b82f6"
            strokeWidth="2"
            strokeDasharray="5 2"
          />
          <path
            d="M20 150 H40"
            stroke="#3b82f6"
            strokeWidth="2"
            strokeDasharray="5 2"
          />
          <path
            d="M160 50 H180"
            stroke="#8b5cf6"
            strokeWidth="2"
            strokeDasharray="5 2"
          />
          <path
            d="M160 80 H180"
            stroke="#8b5cf6"
            strokeWidth="2"
            strokeDasharray="5 2"
          />
          <path
            d="M160 120 H180"
            stroke="#8b5cf6"
            strokeWidth="2"
            strokeDasharray="5 2"
          />
          <path
            d="M160 150 H180"
            stroke="#8b5cf6"
            strokeWidth="2"
            strokeDasharray="5 2"
          />
          <path
            d="M50 20 V40"
            stroke="#3b82f6"
            strokeWidth="2"
            strokeDasharray="5 2"
          />
          <path
            d="M80 20 V40"
            stroke="#3b82f6"
            strokeWidth="2"
            strokeDasharray="5 2"
          />
          <path
            d="M120 20 V40"
            stroke="#8b5cf6"
            strokeWidth="2"
            strokeDasharray="5 2"
          />
          <path
            d="M150 20 V40"
            stroke="#8b5cf6"
            strokeWidth="2"
            strokeDasharray="5 2"
          />
          <path
            d="M50 160 V180"
            stroke="#3b82f6"
            strokeWidth="2"
            strokeDasharray="5 2"
          />
          <path
            d="M80 160 V180"
            stroke="#3b82f6"
            strokeWidth="2"
            strokeDasharray="5 2"
          />
          <path
            d="M120 160 V180"
            stroke="#8b5cf6"
            strokeWidth="2"
            strokeDasharray="5 2"
          />
          <path
            d="M150 160 V180"
            stroke="#8b5cf6"
            strokeWidth="2"
            strokeDasharray="5 2"
          />
        </g>

        <rect
          id="chip-base"
          x="50"
          y="50"
          width="100"
          height="100"
          rx="5"
          fill="#334155"
        />
        <rect
          id="chip-core"
          x="70"
          y="70"
          width="60"
          height="60"
          rx="5"
          fill=""
        />

        <path
          id="circuit-path"
          d="M30 80 H50 M150 80 H170 M30 120 H50 M150 120 H170 M80 30 V50 M120 30 V50 M80 150 V170 M120 150 V170"
          stroke="#94a3b8"
          strokeWidth="4"
          strokeDasharray="10"
          strokeDashoffset="1000"
        />

        <text
          id="code-text"
          x="100"
          y="96"
          textAnchor="middle"
          fill="#38bdf8"
          fontSize="24"
          fontWeight="bold"
          fontFamily="'Segoe UI', sans-serif"
        >
          Code
        </text>
        <text
          id="guru-text"
          x="100"
          y="125"
          textAnchor="middle"
          fill="#fbbf24"
          fontSize="24"
          fontWeight="bold"
          fontFamily="'Segoe UI', sans-serif"
        >
          Guru
        </text>

        <rect
          x="60"
          y="40"
          width="80"
          height="5"
          rx="2"
          fill="#64748b"
          opacity="0.8"
        />
        <rect
          x="60"
          y="155"
          width="80"
          height="5"
          rx="2"
          fill="#64748b"
          opacity="0.8"
        />
        <rect
          x="40"
          y="60"
          width="5"
          height="80"
          rx="2"
          fill="#64748b"
          opacity="0.8"
        />
        <rect
          x="155"
          y="60"
          width="5"
          height="80"
          rx="2"
          fill="#64748b"
          opacity="0.8"
        />
      </svg>
    </div>
  );
};

export default CodeGuruLogo;
