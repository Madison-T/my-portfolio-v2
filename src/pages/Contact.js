// 📁 src/pages/Contact.js
import React from "react";
import styled from "styled-components";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Section = styled.section`
  padding: 1rem 2rem;
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
`;

const Heading = styled.h2`
  font-size: 2rem;
  color: ${({ theme }) => theme.accent};
  margin-bottom: 2rem;
`;

const IconRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;

  a {
    color: ${({ theme }) => theme.text};
    font-size: 2rem;
    transition: color 0.3s ease;

    &:hover,
    &:focus {
      color: ${({ theme }) => theme.accent};
    }
  }
`;

const Contact = () => {
  return (
    <Section id="contact">
      <Heading>Contact Me</Heading>
      <IconRow>
        <a
          href="https://github.com/Madison-T"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <FaGithub />
        </a>
        <a
          href="https://linkedin.com/in/madison-tana"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <FaLinkedin />
        </a>
        <a href="mailto:madisonlilah@gmail.com" aria-label="Email">
          <FaEnvelope />
        </a>
      </IconRow>
    </Section>
  );
};

export default Contact;
