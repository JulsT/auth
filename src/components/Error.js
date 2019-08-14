import React, { Component } from 'react';
import styled from 'styled-components';

const CustomError = styled.span`
  display: ${props => (props.isOpen ? 'block' : 'none')};
  color: red;
  font-size: 1.2rem;
  font-family: inherit;
  font-weight: normal;
  text-align: left;
  margin-bottom: 1rem;
`;

class Error extends Component {
  state = { isOpen: false };

  componentDidUpdate(prevProps) {
    const { tab, error } = this.props;
    if (tab !== prevProps.tab) {
      this.setState({ isOpen: false });
    }
    if (error !== prevProps.error) {
      this.setState({ isOpen: true });
    }
  }

  render() {
    const { isOpen } = this.state;
    const { error } = this.props;
    return <CustomError isOpen={isOpen}>{error}</CustomError>;
  }
}

export default Error;
