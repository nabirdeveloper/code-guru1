"use client";

import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

interface HeadlineProps {
  title: string;
  subtitle?: string;
  color?: string;
  highlightColor?: string;
  align?: "left" | "center" | "right";
  animated?: boolean;
  className?: string;
}

const Headline: React.FC<HeadlineProps> = ({
  title = "CodeGuru",
  subtitle = "Digital Solutions Mastery",
  color = "#1e293b", // slate-800
  highlightColor = "#6366f1", // indigo-500
  align = "center",
  animated = true,
  className = "",
}) => {
  const controls = useAnimation();
  const headlineRef = useRef<HTMLDivElement>(null);

  const textAlign = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  useEffect(() => {
    if (animated) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.3,
        },
      });
    }
  }, [animated, controls]);

  const titleWords = title.split(" ");
  const subtitleWords = subtitle.split(" ");

  return (
    <div
      ref={headlineRef}
      className={`max-w-3xl mx-auto ${textAlign[align]} ${className}`}
    >
      {/* Animated Title */}
      <motion.h1
        className="text-4xl md:text-5xl font-bold mb-4 tracking-tight"
        initial={animated ? { opacity: 0 } : {}}
        animate={controls}
      >
        {titleWords.map((word, i) => (
          <motion.span
            key={i}
            className="inline-block mr-2"
            style={{ color: word === "Code" ? highlightColor : color }}
            initial={animated ? { opacity: 0, y: 20 } : {}}
            animate={animated ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {word}
          </motion.span>
        ))}
      </motion.h1>

      {/* Animated Subtitle */}
      {subtitle && (
        <motion.p
          className="text-lg md:text-xl text-gray-500"
          initial={animated ? { opacity: 0 } : {}}
          animate={controls}
        >
          {subtitleWords.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-1"
              initial={animated ? { opacity: 0, x: -10 } : {}}
              animate={animated ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.4,
                delay: i * 0.1 + 0.5,
                ease: "backOut",
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.p>
      )}

      {/* Animated Underline (optional) */}
      {animated && (
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1, delay: 0.8 }}
          className="h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent mt-6"
          style={{
            maxWidth: "300px",
            margin:
              align === "center"
                ? "0 auto"
                : align === "right"
                ? "0 0 0 auto"
                : "",
          }}
        />
      )}
    </div>
  );
};

export default Headline;