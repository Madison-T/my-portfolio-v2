import React from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
  text-align: center;
  padding: 1rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.text};
  background: transparent;
`;

const Footer = () => {
  return <StyledFooter>© 2025 Madison</StyledFooter>;
};

export default Footer;
