import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import projectData from "../data/projects.json";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const Section = styled.section`
  padding: 6rem 2rem;
  max-width: 1000px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: ${({ theme }) => theme.accent};
  margin-bottom: 2rem;
`;

const TabContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const TabList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;

  button {
    padding: 0.5rem 1rem;
    background: none;
    border-left: 2px solid transparent;
    color: ${({ theme }) => theme.text};
    text-align: left;
    cursor: pointer;
    font-family: inherit;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &:hover,
    &:focus {
      background: ${({ theme }) => theme.card};
    }

    &.active {
      border-color: ${({ theme }) => theme.accent};
      color: ${({ theme }) => theme.accent};
      font-weight: bold;
    }
  }
`;

const Highlight = styled.div`
  position: absolute;
  top: ${({ index }) => `calc(${index} * 40px)`};
  left: 0;
  width: 2px;
  height: 40px;
  transition: top 0.3s ease;
`;

const Panel = styled(motion.div)`
  flex: 1;
  padding: 1rem;
  border-left: 2px solid ${({ theme }) => theme.card};
`;

const PanelTitle = styled.h3`
  margin-bottom: 0.5rem;
  font-size: 1.3rem;
`;

const PanelSub = styled.p`
  font-size: 0.9rem;
  font-family: monospace;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.text};
`;

const ProjectImage = styled.img`
  width: 100%;
  max-height: 300px;
  object-fit: contain;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const DescriptionList = styled.ul`
  list-style: disc;
  margin-left: 1.5rem;

  li {
    margin-bottom: 0.5rem;
    line-height: 1.6;
  }
`;

const TechBadges = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  span {
    background: ${({ theme }) => theme.card};
    padding: 0.3rem 0.7rem;
    border-radius: 12px;
    font-size: 0.8rem;
    color: ${({ theme }) => theme.accent};
    font-family: monospace;
  }
`;

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Section id="projects">
      <Title>Notable Projects</Title>
      <TabContainer>
        <TabList role="tablist">
          {projectData.map((project, i) => (
            <button
              key={i}
              className={activeIndex === i ? "active" : ""}
              onClick={() => setActiveIndex(i)}
              role="tab"
              aria-selected={activeIndex === i}
              aria-controls={`panel-${i}`}
              id={`tab-${i}`}
            >
              {project.title}
            </button>
          ))}
          <Highlight index={activeIndex} />
        </TabList>

        <AnimatePresence mode="wait">
          <Panel
            key={activeIndex}
            id={`panel-${activeIndex}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeIndex}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <PanelTitle>
              {projectData[activeIndex].title} {" "}
              <a href={projectData[activeIndex].url} target="_blank" rel="noreferrer">
              </a>
            </PanelTitle>
            <PanelSub>{projectData[activeIndex].type} &nbsp;&middot;&nbsp; {projectData[activeIndex].range}</PanelSub>

            {projectData[activeIndex].images &&
  projectData[activeIndex].images.length > 0 && (
    <Carousel
      showThumbs={false}
      showStatus={false}
      infiniteLoop
      useKeyboardArrows
      dynamicHeight
      autoPlay={false}
    >
      {projectData[activeIndex].images.map((img, idx) => (
        <div key={idx}>
          <img
            src={img}
            alt={`${projectData[activeIndex].title} screenshot ${idx + 1}`}
            style={{
              maxHeight: "300px",
              objectFit: "contain",
              borderRadius: "8px",
              width: "100%",
              backgroundColor: "#000000" // optional fallback background for visual polish
            }}
          />
        </div>
      ))}
    </Carousel>
)}


            <DescriptionList>
              {projectData[activeIndex].description.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </DescriptionList>
            <TechBadges>
              {projectData[activeIndex].tech.map((tech, i) => (
                <span key={i}>{tech}</span>
              ))}
            </TechBadges>
          </Panel>
        </AnimatePresence>
      </TabContainer>
    </Section>
  );
};

export default Projects;
