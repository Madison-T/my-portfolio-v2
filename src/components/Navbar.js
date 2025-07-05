import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FiMenu, FiX } from "react-icons/fi";
import MenuDrawer from "./MenuDrawer";

const BREAKPOINT = 900;

const Nav = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  height: 60px;
  background-color: rgba(15, 17, 26, 0.85);
  backdrop-filter: blur(10px);
  color: ${({ theme }) => theme.text};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  z-index: 1000;
  transition: all 0.3s ease;
`;

const Logo = styled.a`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.accent};
`;

const NavLinks = styled.ul`
  display: flex;
  gap: 2rem;
  list-style: none;
  
  @media (max-width: ${BREAKPOINT}px) {
    display: none;
  }
`;

const NavItem = styled.li`
  a {
    color: ${({ theme }) => theme.text};
    font-size: 1rem;
  }
    
  a:hover {
    color: ${({ theme }) => theme.accent};
  }
`;

const Hamburger = styled.div`
  display: none;
  z-index: 1001;
  cursor: pointer;
  
  @media (max-width: ${BREAKPOINT}px) {
    display: block;
  }
`;

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(prev => !prev);

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "auto";
    }, [isOpen]);

    return (
        <>
        <Nav>
        <Logo href="#">Madison</Logo>
        <Hamburger onClick={toggleMenu}>
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </Hamburger>
        <NavLinks>
            <NavItem><a href="#about">About</a></NavItem>
            <NavItem><a href="#projects">Projects</a></NavItem>
            <NavItem><a href="#skills">Skills</a></NavItem>
            <NavItem><a href="#contact">Contact</a></NavItem>
            <NavItem><a href="#/resume.pdf" target="_blank" rel="noreferrer">Resume</a></NavItem>
        </NavLinks>
        </Nav>

        <MenuDrawer isOpen={isOpen} toggleMenu={toggleMenu} />
        </>
    );
};

export default Navbar;