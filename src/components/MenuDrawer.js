import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(15, 17, 26, 0.95);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const NavItem = styled.a`
  font-size: 1.5rem;
  margin: 1rem 0;
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  
  &:hover {
  color: ${({ theme }) => theme.accent};
  }
`;

const MenuDrawer = ({ isOpen, toggleMenu }) => {
    if (!isOpen) return null;

    return (
        <Overlay 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <NavItem href="#about" onClick={toggleMenu}>About</NavItem>
          <NavItem href="#projects" onClick={toggleMenu}>Projects</NavItem>
          <NavItem href="/resume.pdf" onClick={toggleMenu} target="_blank" rel="noreferrer">Resume</NavItem>
        </Overlay>
    );
};

export default MenuDrawer;