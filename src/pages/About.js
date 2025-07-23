import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Section = styled.section`
  padding: 6rem 2rem;
  max-width: 900px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: ${({ theme }) => theme.accent};
  margin-bottom: 1.5rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
  line-height: 1.7;
  
  @media (min-width: 768px) {
    font-size: 1.1rem;
  }
`;

const About = () => {
    return (
        <Section
          id="about"
          as={motion.section}
          initial={{ opacity: 0, y: 40}}
          whileInView={{ opacity: 1, y:0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
         <Title>About Me</Title>
          <Content>
          <p>
            I'm a recent Computer Science graduate with a double major in Software Development and Data Science. I started out in chemistry, then spent two years teaching English in Japan before discovering a passion for tech.
          </p>
          <p>
            A YouTube series on computer science sparked my curiosity, and I enrolled in uni again while still working full-time. I’ve since built full-stack apps, contributed to research, and explored everything from data analysis to real-time interactive web and mobile apps.
          </p>
          <p>
            I'm endlessly curious and love understanding how things work. Outside of tech, I enjoy reading, scrapbooking, playing board games and TCGs.
          </p>
        </Content>

        </Section>
    );
};

export default About;