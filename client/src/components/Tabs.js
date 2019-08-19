import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Tab from './Tab';

const TabsContainer = styled.ul`
  width: 100%;
  display: flex;
  justify-content: space-around;
  list-style-type: none;
  padding: 0;
`;

class Tabs extends Component {
  state = {
    activeTab: this.props.children[0].props.label,
	};
	
  handleChangeTab = (tab) => {
    this.setState({ activeTab: tab });
  };

  render() {
    const { activeTab } = this.state;
		const { children } = this.props;
    return (
      <>
        <TabsContainer>
          {children.map((child) => (
            <Tab
              activeTab={activeTab}
              key={child.props.label}
              label={child.props.label}
              onhandleChangeTab={this.handleChangeTab}
            />
          ))}
        </TabsContainer>
        {children.map((child) => {
          if (child.props.label !== activeTab) return null;
          return React.cloneElement(child.props.children, { tab: activeTab });
        })}
      </>
    );
  }
}

Tabs.propTypes = {
	children: PropTypes.arrayOf(PropTypes.element.isRequired)
}

export default Tabs;
