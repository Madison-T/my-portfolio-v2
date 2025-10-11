import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import projectData from "../data/projects.json";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const Section = styled.section`
  padding: 6rem 2rem 3rem;
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
  gap: 0.5rem;

  button {
    padding: 0.6rem 1rem;
    background: none;
    border-left: 2px solid transparent;
    color: ${({ theme }) => theme.text};
    text-align: left;
    cursor: pointer;
    font-family: inherit;
    display: block;
    line-height: 1.3;
    max-width: 270px;
    white-space: normal;     /* wrap long titles */
    word-break: break-word;
    overflow: visible;
    text-overflow: unset;

    &:hover,
    &:focus {
      background: ${({ theme }) => theme.card};
      outline: none;
    }

    &.active {
      border-color: ${({ theme }) => theme.accent};
      color: ${({ theme }) => theme.accent};
      font-weight: 600;
      background: ${({ theme }) => theme.card};
    }
  }

  @media (max-width: 768px) {
    button {
      max-width: 100%;
    }
  }
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

/* Simple external link card (GitHub or generic) */
const LinkCard = styled.a`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding: 0.9rem 1rem;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.card};
  background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0.12));
  text-decoration: none;
  color: ${({ theme }) => theme.text};
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 14px rgba(0,0,0,0.28);
  }
`;

const LinkBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  height: 32px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 0.9rem;
  padding: 0 0.4rem;

  &.github { background: #6e40c922; border: 1px solid #6e40c955; color: #b392f0; } /* subtle GH purple */
  &.other  { background: #8882;     border: 1px solid #8885;     color: #aaa;    }
`;

const LinkMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;

  strong { line-height: 1.2; }
  small  { opacity: 0.8; font-family: monospace; }
`;

function hostname(url) {
  try { return new URL(url).hostname; } catch { return ""; }
}

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const project = projectData[activeIndex];

  const hasImages =
    project.images && Array.isArray(project.images) && project.images.length > 0;

  const url = project.url || "";
  const isGitHub = url.includes("github.com");

  return (
    <Section id="projects">
      <Title>Software Projects</Title>
      <TabContainer>
        <TabList role="tablist" aria-orientation="vertical">
          {projectData.map((p, i) => (
            <button
              key={i}
              className={activeIndex === i ? "active" : ""}
              onClick={() => setActiveIndex(i)}
              role="tab"
              aria-selected={activeIndex === i}
              aria-controls={`panel-${i}`}
              id={`tab-${i}`}
              title={p.title}
            >
              {p.title}
            </button>
          ))}
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
              {project.title}{" "}
              {url && (
                <a href={url} target="_blank" rel="noreferrer">
                  ↗
                </a>
              )}
            </PanelTitle>

            <PanelSub>
              {project.type} &nbsp;&middot;&nbsp; {project.range}
            </PanelSub>

            {/* Images or simple link card */}
            {hasImages ? (
              <Carousel
                showThumbs={false}
                showStatus={false}
                infiniteLoop
                useKeyboardArrows
                dynamicHeight
                autoPlay={false}
              >
                {project.images.map((img, idx) => (
                  <div key={idx}>
                    <img
                      src={img}
                      alt={`${project.title} screenshot ${idx + 1}`}
                      style={{
                        maxHeight: "300px",
                        objectFit: "contain",
                        borderRadius: "8px",
                        width: "100%",
                        backgroundColor: "#000000",
                      }}
                    />
                  </div>
                ))}
              </Carousel>
            ) : url ? (
              <LinkCard href={url} target="_blank" rel="noreferrer">
                <LinkBadge className={isGitHub ? "github" : "other"}>
                  {isGitHub ? "GH" : "↗"}
                </LinkBadge>
                <LinkMeta>
                  <strong>{isGitHub ? "Open Repository" : "Open Link"}</strong>
                  <small>{hostname(url)}</small>
                </LinkMeta>
              </LinkCard>
            ) : null}

            {Array.isArray(project.description) && (
              <DescriptionList>
                {project.description.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </DescriptionList>
            )}

            {Array.isArray(project.tech) && (
              <TechBadges>
                {project.tech.map((tech, i) => (
                  <span key={i}>{tech}</span>
                ))}
              </TechBadges>
            )}
          </Panel>
        </AnimatePresence>
      </TabContainer>
    </Section>
  );
};

export default Projects;
