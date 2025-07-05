import React from "react";
import styled from "styled-components";
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

const Heading = styled.h1`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.accent};
`;

const SubHeading = styled.h2`
  font-size: 1.5rem;
  margin-top: 1rem;
  color: ${({ theme }) => theme.text};
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
    return (
        <HeroSection id="hero" as={motion.section} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <Heading>Hi, I'm Madison</Heading>
          <SubHeading>I build clean, thoughtful software experiences</SubHeading>  
          <CTA href="#projects">View Projects</CTA>
        </HeroSection>
    );
};

export default Hero;