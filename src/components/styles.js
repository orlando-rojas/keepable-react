//import React from "react";
import styled from "@emotion/styled";

export const WelcomeMsg = styled.p`
  font-weight: bold;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 0.25px;
  color: #ffffff;
  margin-left: 117px;
`;

export const Head = styled.header`
  display: flex;
  align-items: center;
  width: 100%;
  height: 70px;
  padding-left: 30px;
  border-bottom: 2px solid #d1d1d1;
`;

export const Nav = styled.nav`
  padding-top: 10px;
  max-width: 280px;
  min-height: 100vh;
  height: auto;
  border-right: 2px solid #d1d1d1;
`;

export const NavItem = styled.li`
  display: flex;
  align-items: center;
  height: 50px;
  padding-left: 20px;
  border-radius: 0px 25px 25px 0px;
  width: 280px;
  color: #fff;
  cursor: pointer;
`;

export const NavItemText = styled.span`
  font-weight: normal;
  font-size: 18px;
  line-height: 20px;
  letter-spacing: 0.25px;
  margin-left: 20px;
`;

export const Circle = styled.div`
  height: 25px;
  width: 25px;
  border-radius: 50%;
  margin-right: 4px;
`;
