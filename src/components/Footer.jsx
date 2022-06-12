import React from "react";
import styled from "styled-components";

function Footer() {
  return (
    <Container>
      <div>Developed by Mubeen @2021</div>
    </Container>
  );
}

const Container = styled.footer`
  position: relative;
  height: 80px;
  bottom: 0px;
  margin-top: 100px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 17px;
  letter-spacing: 1.3px;
  background-color: #000000;
  @media (max-width: 768px) {
    bottom: -80px;
  }
`;

export default Footer;
