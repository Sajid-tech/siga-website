import React from "react";
import { motion } from "framer-motion";

const DURATION = 0.25;
const STAGGER = 0.025;

const FlipLink = ({ children, href }) => {
  // Split into words first, then characters
  const words = children.split(" ");

  return (
    <motion.a
      initial="initial"
      whileHover="hovered"
      target="_blank"
      href={href}
      className="relative inline-block overflow-hidden whitespace-nowrap  uppercase"
      style={{ lineHeight: 0.8 }}
    >
      <div>
        {words.map((word, wordIndex) => (
          <React.Fragment key={`word-${wordIndex}`}>
            {word.split("").map((char, charIndex) => (
              <motion.span
                variants={{
                  initial: { y: 0 },
                  hovered: { y: "-100%" },
                }}
                transition={{
                  duration: DURATION,
                  ease: "easeInOut",
                  delay: STAGGER * (wordIndex * word.length + charIndex),
                }}
                className="inline-block"
                key={`char-${wordIndex}-${charIndex}`}
              >
                {char}
              </motion.span>
            ))}
            {/* Add space after each word except the last one */}
            {wordIndex < words.length - 1 && (
              <span className="inline-block" style={{ width: "0.25em" }}></span>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="absolute inset-0">
        {words.map((word, wordIndex) => (
          <React.Fragment key={`word-hover-${wordIndex}`}>
            {word.split("").map((char, charIndex) => (
              <motion.span
                variants={{
                  initial: { y: "100%" },
                  hovered: { y: 0 },
                }}
                transition={{
                  duration: DURATION,
                  ease: "easeInOut",
                  delay: STAGGER * (wordIndex * word.length + charIndex),
                }}
                className="inline-block"
                key={`char-hover-${wordIndex}-${charIndex}`}
              >
                {char}
              </motion.span>
            ))}
            {/* Add space after each word except the last one */}
            {wordIndex < words.length - 1 && (
              <span className="inline-block" style={{ width: "0.25em" }}></span>
            )}
          </React.Fragment>
        ))}
      </div>
    </motion.a>
  );
};

export default FlipLink;