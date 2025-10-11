import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import dataProjects from "../data/DataProjects.json";
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

/* mirrored: tabs on the right */
const TabContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
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
    border-right: 2px solid transparent;
    color: ${({ theme }) => theme.text};
    text-align: right;
    cursor: pointer;
    font-family: inherit;
    display: block;
    line-height: 1.3;
    max-width: 270px;
    white-space: normal;
    word-break: break-word;
    overflow: visible;
    text-overflow: unset;
    margin-left: auto;

    box-shadow: -3px 3px 6px rgba(0, 0, 0, 0.15);

    &:hover,
    &:focus {
      background: ${({ theme }) => theme.card};
      box-shadow: -4px 4px 10px rgba(0, 0, 0, 0.25);
      outline: none;
    }

    &.active {
      border-color: ${({ theme }) => theme.accent};
      color: ${({ theme }) => theme.accent};
      font-weight: 600;
      background: ${({ theme }) => theme.card};
      box-shadow: -5px 5px 10px rgba(0, 0, 0, 0.35);
    }
  }

  @media (max-width: 768px) {
    button {
      max-width: 100%;
      text-align: left;
      margin-left: 0;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    }
  }
`;

/* mirrored: panel gets a RIGHT border (since tabs are on the right) */
const Panel = styled(motion.div)`
  flex: 1;
  padding: 1rem;
  border-right: 2px solid ${({ theme }) => theme.card};

  @media (max-width: 768px) {
    border-right: none;
    border-left: 2px solid ${({ theme }) => theme.card};
  }
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

/* GitHub OG preview (unchanged) */
const GitHubPreview = styled.a`
  display: block;
  margin-bottom: 1rem;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.card};
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

/* Generic external notebook preview (Kaggle / Colab) */
const NotebookPreview = styled.a`
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

const NotebookBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  height: 32px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 0.9rem;
  padding: 0 0.4rem;

  &.kaggle { background: #20beff22; border: 1px solid #20beff55; color: #20beff; }
  &.colab  { background: #f9ab0022; border: 1px solid #f9ab0055; color: #f9ab00; }
  &.other  { background: #8882; border: 1px solid #8885; color: #aaa; }
`;

const NotebookMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;

  strong { line-height: 1.2; }
  small  { opacity: 0.8; font-family: monospace; }
`;

function hostname(url) {
  try { return new URL(url).hostname; } catch { return ""; }
}

const DataProjects = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const project = dataProjects[activeIndex];

  const hasImages =
    project.images && Array.isArray(project.images) && project.images.length > 0;

  const url = project.url || "";
  const isGitHub = url.includes("github.com");
  const isKaggle = url.includes("kaggle.com");
  const isColab =
    url.includes("colab.research.google.com") || url.includes("colab.google.com");

  const githubPreview = isGitHub
    ? `https://opengraph.githubassets.com/1/${url.replace("https://github.com/", "")}`
    : null;

  return (
    <Section id="data-projects">
      <Title>Data Science Projects</Title>
      <TabContainer>
        {/* tabs on the right */}
        <TabList role="tablist" aria-orientation="vertical">
          {dataProjects.map((p, i) => (
            <button
              key={i}
              className={activeIndex === i ? "active" : ""}
              onClick={() => setActiveIndex(i)}
              role="tab"
              aria-selected={activeIndex === i}
              aria-controls={`datapanel-${i}`}
              id={`datatab-${i}`}
              title={p.title}
            >
              {p.title}
            </button>
          ))}
        </TabList>

        {/* panel on the left */}
        <AnimatePresence mode="wait">
          <Panel
            key={activeIndex}
            id={`datapanel-${activeIndex}`}
            role="tabpanel"
            aria-labelledby={`datatab-${activeIndex}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
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

            {/* Images or Fallback Preview */}
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
            ) : isGitHub && githubPreview ? (
              <GitHubPreview href={url} target="_blank" rel="noreferrer">
                <img src={githubPreview} alt={`${project.title} GitHub repository preview`} />
              </GitHubPreview>
            ) : (isKaggle || isColab) && url ? (
              <NotebookPreview href={url} target="_blank" rel="noreferrer">
                <NotebookBadge className={isKaggle ? "kaggle" : "colab"}>
                  {isKaggle ? "K" : "C"}
                </NotebookBadge>
                <NotebookMeta>
                  <strong>Open Notebook</strong>
                  <small>{hostname(url)}</small>
                </NotebookMeta>
              </NotebookPreview>
            ) : url ? (
              /* generic external link card */
              <NotebookPreview href={url} target="_blank" rel="noreferrer">
                <NotebookBadge className="other">↗</NotebookBadge>
                <NotebookMeta>
                  <strong>Open Link</strong>
                  <small>{hostname(url)}</small>
                </NotebookMeta>
              </NotebookPreview>
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

export default DataProjects;
