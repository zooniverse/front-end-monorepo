import React from 'react';
import PropTypes from 'prop-types';
import { Anchor, Box, Image } from 'grommet';
import { FacebookOption, Twitter, Instagram } from 'grommet-icons';
import styled from 'styled-components';
import ZooniverseLogotype from '../zooniverse-logotype';

export const StyledFooterBox = styled(Box)`
  border-top: 5px solid #005D69;
  font-size: 16px;

  .footer__nav {
    font-size: 1em;
    min-width: 192px;
  }
`;

export const StyledFooterSection = styled(Box)`
  position: relative;

  &.small {
    font-size: 0.8em;
    line-height: 48px;
  }
`;

export const StyledNavListHeader = styled(Anchor)`
  color: #007482;
  font-weight: bold;
  letter-spacing: 1px;
  margin-bottom: 0.5em;
  text-transform: uppercase;
`;

export const StyledNavListItem = styled(Anchor)`
  color: #5C5C5C;
  font-size: 0.8em;
  font-weight: bold;
  &:hover, &:focus {
    color: #252525;
  }

  &.social-media {
    svg {
      fill: #007482;
    }
    
    svg:hover, svg:focus {
      fill: #004b54;
    }
  }
`;

export const StyledZooniverseLogotype = styled(ZooniverseLogotype)`
  g {
    fill: #007482;
  }
`;

export const StyledDivider = styled.hr`
  border: 0;
  border-top: 1px solid #979797;
  display: block;
  height: 1px;
  margin: 0;
  padding: 0;
  width: 100%;
`;

export const StyledEasterEgg = styled(Image)`
  bottom: 0;
  display: inline-block;
  height: 74px;
  margin: 0;
  opacity: 0;
  position: absolute;
  right: 0;
  transition: opacity 0.5s ease;
  transition-delay: 0.25s;
  width: 62px;
  z-index: 1;

  &:hover {
    opacity: 1;
  }
`;

const ZooFooter = (props) => {
  const createKeyedAnchorItem = (navItem, i) => (<span key={`navItem-${i}`}>{navItem}</span>);

  return (
    <StyledFooterBox
      align="center"
      background={props.mainSectionColorIndex}
      direction="column"
      pad={{ horizontal: 'none', vertical: 'none' }}
      tag="footer"
    >
      <StyledFooterSection
        direction="row"
        fill="horizontal"
        justify="between"
        pad={{ horizontal: 'large', vertical: 'medium' }}
        margin={{ horizontal: 'large', vertical: 'none' }}
        tag="section"
      >
        <Box>
          <Anchor href="https://www.zooniverse.org">
            <StyledZooniverseLogotype />
          </Anchor>
          {props.zooTagline}
        </Box>
        <Box
          className="footer__nav"
          direction="row"
          gap="medium"
          responsive={false}
        >
          {props.socialNavList.map((navItem, i) => createKeyedAnchorItem(navItem, i))}
        </Box>
      </StyledFooterSection>
      <Box
        fill="horizontal"
        pad={{ horizontal: 'large' }}
        tag="section"
      >
        <StyledDivider />
      </Box>
      <StyledFooterSection
        direction="row"
        fill="horizontal"
        pad={{ horizontal: 'large', vertical: 'medium' }}
        margin={{
          top: 'none', bottom: 'large', left: 'none', right: 'none'
        }}
        tag="section"
      >
        <Box
          direction="row"
          fill="horizontal"
          justify="start"
          wrap={true}
        >
          <Box className="footer__nav" flex={true} margin={{ horizontal: 'none', vertical: 'small' }}>
            {props.projectNavList.map((navItem, i) => createKeyedAnchorItem(navItem, i))}
          </Box>
          <Box className="footer__nav" flex={true} margin={{ horizontal: 'none', vertical: 'small' }}>
            {props.aboutNavList.map((navItem, i) => createKeyedAnchorItem(navItem, i))}
          </Box>
          <Box className="footer__nav" flex={true} margin={{ horizontal: 'none', vertical: 'small' }}>
            {props.getInvolvedNavList.map((navItem, i) => createKeyedAnchorItem(navItem, i))}
          </Box>
          <Box className="footer__nav" flex={true} margin={{ horizontal: 'none', vertical: 'small' }}>
            {props.talkNavList.map((navItem, i) => createKeyedAnchorItem(navItem, i))}
          </Box>
          <Box className="footer__nav" flex={true} margin={{ horizontal: 'none', vertical: 'small' }}>
            {props.buildNavList.map((navItem, i) => createKeyedAnchorItem(navItem, i))}
          </Box>
          <Box className="footer__nav" flex={true} margin={{ horizontal: 'none', vertical: 'small' }}>
            {props.newsNavList.map((navItem, i) => createKeyedAnchorItem(navItem, i))}
          </Box>
        </Box>
      </StyledFooterSection>
      <StyledFooterSection
        align="center"
        className="small"
        background={props.smallSectionColorIndex}
        direction="row"
        fill="horizontal"
        pad={{ horizontal: 'large', vertical: 'none' }}
        justify="between"
        tag="section"
      >
        <Box
          className="footer__nav"
          direction="row"
          gap="small"
          responsive={false}
        >
          {props.policyNavList.map((navItem, i) => createKeyedAnchorItem(navItem, i))}
        </Box>
        <div>
          {props.adminContainer}
          <StyledEasterEgg src="https://s3.amazonaws.com/zooniverse-static/assets/penguin.png" alt="" />
        </div>
      </StyledFooterSection>
    </StyledFooterBox>
  );
};

ZooFooter.defaultProps = {
  aboutNavList: [
    <StyledNavListHeader href="https://www.zooniverse.org/about">About</StyledNavListHeader>,
    <StyledNavListItem href="https://www.zooniverse.org/about/publications">Publications</StyledNavListItem>,
    <StyledNavListItem href="https://www.zooniverse.org/about/team">Team</StyledNavListItem>,
    <StyledNavListItem href="https://www.zooniverse.org/about/acknowledgements">Acknowledgements</StyledNavListItem>,
    <StyledNavListItem href="https://www.zooniverse.org/about/contact">Contact</StyledNavListItem>,
    <StyledNavListItem href="https://www.zooniverse.org/about/faq">FAQ</StyledNavListItem>
  ],
  adminContainer: null,
  buildNavList: [
    <StyledNavListHeader href="https://www.zooniverse.org/lab">Build a Project</StyledNavListHeader>,
    <StyledNavListItem href="https://www.zooniverse.org/help">Tutorial</StyledNavListItem>,
    <StyledNavListItem href="https://www.zooniverse.org/help/glossary">Glossary</StyledNavListItem>,
    <StyledNavListItem href="https://www.zooniverse.org/help/lab-policies">Policies</StyledNavListItem>,
    <StyledNavListItem href="https://www.zooniverse.org/lab-best-practices/introduction">Best Practices</StyledNavListItem>
  ],
  getInvolvedNavList: [
    <StyledNavListHeader href="https://www.zooniverse.org/get-involved">Get Involved</StyledNavListHeader>,
    <StyledNavListItem href="https://www.zooniverse.org/get-involved/education">Education</StyledNavListItem>,
    <StyledNavListItem href="https://www.zooniverse.org/get-involved/call-for-projects">Call for Projects</StyledNavListItem>,
    <StyledNavListItem href="https://www.zooniverse.org/collections">Collections</StyledNavListItem>
  ],
  mainSectionColorIndex: '#fff',
  newsNavList: [
    <StyledNavListHeader href="#">News</StyledNavListHeader>,
    <StyledNavListItem href="https://daily.zooniverse.org/">Daily Zooniverse</StyledNavListItem>,
    <StyledNavListItem href="https://blog.zooniverse.org/projects">Blog</StyledNavListItem>
  ],
  policyNavList: [
    <StyledNavListItem href="https://www.zooniverse.org/privacy">Privacy Policy</StyledNavListItem>,
    <StyledNavListItem href="http://jobs.zooniverse.org/">Jobs</StyledNavListItem>,
    <StyledNavListItem href="https://status.zooniverse.org/">System Status</StyledNavListItem>,
    <StyledNavListItem href="https://www.zooniverse.org/security">Security</StyledNavListItem>
  ],
  projectNavList: [
    <StyledNavListHeader href="https://www.zooniverse.org/projects">Projects</StyledNavListHeader>,
  ],
  smallSectionColorIndex: '#eef2f5',
  socialNavList: [
    <StyledNavListItem className="social-media" href="https://www.facebook.com/therealzooniverse" a11yTitle="Facebook"><FacebookOption colorIndex="brand" size="small" /> </StyledNavListItem>,
    <StyledNavListItem className="social-media" href="https://twitter.com/the_zooniverse" a11yTitle="Twitter"><Twitter colorIndex="brand" size="small" /></StyledNavListItem>,
    <StyledNavListItem className="social-media" href="https://www.instagram.com/the.zooniverse/" a11yTitle="Instagram"><Instagram colorIndex="brand" size="small" /></StyledNavListItem>
  ],
  talkNavList: [
    <StyledNavListHeader href="https://www.zooniverse.org/talk">Talk</StyledNavListHeader>
  ],
  zooTagline: 'People-Powered Research'
};

ZooFooter.propTypes = {
  aboutNavList: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string
  ])).isRequired,
  adminContainer: PropTypes.node,
  buildNavList: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string
  ])).isRequired,
  getInvolvedNavList: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string
  ])).isRequired,
  mainSectionColorIndex: PropTypes.string,
  newsNavList: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string
  ])).isRequired,
  policyNavList: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string
  ])).isRequired,
  projectNavList: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string
  ])).isRequired,
  smallSectionColorIndex: PropTypes.string,
  socialNavList: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string
  ])).isRequired,
  talkNavList: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string
  ])).isRequired,
  zooTagline: PropTypes.string
};

export default ZooFooter;
