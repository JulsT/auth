import React, { Component } from 'react';
import styled, { css } from 'styled-components';

const activeTab = css`
  background-color: #ff0000;
  color: white;
  font-weight: 600;
  border-bottom: 3px solid #ff4747;
`;

const StyledTab = styled.li`
  padding: 30px;
  width: 50%;
  text-align: center;
  font-size: 1.5rem;
  color: #333;
  background-color: #fff;
  text-transform: uppercase;
  white-space: nowrap;
  z-index: 1;
  font-family: Roboto, Open Sans, Helvetica, Arial;
  ${props => (props.active ? activeTab : '')}
`;

class Tab extends Component {
  state = {};

  render() {
    const { activeTab, label, onhandleChangeTab } = this.props;
    return (
      <StyledTab active={activeTab === label} onClick={() => onhandleChangeTab(label)}>
        {label}
      </StyledTab>
    );
  }
}

export default Tab;
