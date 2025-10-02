import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Section = styled.section`
  padding: 0rem 2rem;
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
              I'm a recent Computer Science graduate with a double major in Software Development and Data Science. I started out in chemistry, then spent two years teaching English in Japan before returning to New Zealand to focus on building a career in technology.
            </p>
            <p>
              I first became interested in tech while studying chemistry, when I realized I enjoyed solving problems and making sense of data more than working in the lab. A friend suggested I explore programming and data science, and the idea stayed with me. After my time in Japan I decided to pursue it seriously, returning to study software development and data science. There I discovered I could bring the same problem solving and experimental mindset from chemistry into building software and working with data. 
            </p>
            <p>
              I've since built full stack apps, contributed to research, and explored everything from data analysis to real-time interactive web and mobile apps, often in Agile settings. I've also worked as a mentor supporting other computer science students, which strengthened my communication and leadership skills.
            </p>
            <p>
              I'm curious by nature, love discovering how things work, and enjoy combining creativity and logic to solve problems. Outside of tech, I enjoy reading, scrapbooking, and playing board and trading card games (TCGs).
            </p>
          </Content>
        </Section>
    );
};

export default About;