import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const CustomError = styled.span`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
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
		const { tab, message, successMsg } = this.props;
    if (tab !== prevProps.tab) {
      this.setState({ isOpen: false });
    }
    if (message !== prevProps.message) {
      this.setState({ isOpen: true });
    }
    if (successMsg !== prevProps.successMsg) {
      this.setState({ isOpen: true });
    }
  }

  render() {
    const { isOpen } = this.state;
    const { message } = this.props;
    return <CustomError isOpen={isOpen}>{message}</CustomError>;
  }
}
Error.propTypes={
	tab:PropTypes.string,
	message:PropTypes.string, 
	successMsg:PropTypes.bool
}

export default Error;
