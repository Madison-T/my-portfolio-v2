import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";

const HeroSection = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
  max-width: 900px;
  margin: auto;
`;

const flicker = keyframes`
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
`;

const Heading = styled.h1`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.accent};
  font-family: monospace;
  white-space: pre-wrap;
`;

const SubHeadingWrapper = styled.h2`
  font-size: 1.5rem;
  margin-top: 1rem;
  color: ${({ theme }) => theme.text};
  white-space: pre-wrap;
  font-family: monospace;
`;

const UnderscoreCursor = styled.span`
  display: inline-block;
  animation: ${flicker} 1s step-end infinite;
  color: ${({ theme }) => theme.accent};
`;

const BarCursor = styled.span`
  display: inline-block;
  width: 1px;
  height: 1.2em;
  background-color: ${({ theme }) => theme.text};
  animation: ${flicker} 1s step-end infinite;
  margin-left: 2px;
`;

const CTA = styled.a`
  margin-top: 2rem;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: ${({ theme }) => theme.accent};
  color: #000;
  border-radius: 4px;
  font-weight: bold;

  &:hover {
    background: #4ab6e0;
  }
`;

const Hero = () => {
  const headingText = "Hi, I'm Madison...";
  const subText = "I use code the way others use paint to create.";

  const [typedHeading, setTypedHeading] = useState("");
  const [typedSub, setTypedSub] = useState("");
  const [showBarCursor, setShowBarCursor] = useState(false);

  useEffect(() => {
    let index = 0;
    const headingInterval = setInterval(() => {
      if (index <= headingText.length) {
        setTypedHeading(headingText.slice(0, index));
        index++;
      } else {
        clearInterval(headingInterval);
      }
    }, 100);
    return () => clearInterval(headingInterval);
  }, []);

  useEffect(() => {
    let subIndex = 0;
    const delay = headingText.length * 100 + 1500;

    const timeout = setTimeout(() => {
      const subInterval = setInterval(() => {
        if (subIndex <= subText.length) {
          setTypedSub(subText.slice(0, subIndex));
          subIndex++;
        } else {
          clearInterval(subInterval);
          setShowBarCursor(true); // show bar only after typing ends
        }
      }, 60);
    }, delay);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <HeroSection
      id="hero"
      as={motion.section}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Heading>
        {typedHeading}
        {typedHeading.length < headingText.length && <UnderscoreCursor>_</UnderscoreCursor>}
      </Heading>
      <SubHeadingWrapper>
        {typedSub}
        {showBarCursor && <BarCursor />}
      </SubHeadingWrapper>
      <CTA href="#projects">View Projects</CTA>
    </HeroSection>
  );
};

export default Hero;
