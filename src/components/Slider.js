import React, { Component } from 'react';
import styled from 'styled-components';
import data from '../utils/slider';

const Container = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
`;
const Slide = styled.div`
  height: 100%;
  width: 100%;
  background-image: url(${props => props.src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;
const Arrow = styled.button`
  border: none;
  background: none;
  color: white;
  font-size: 3.5rem;
  outline: transparent;
  cursor: pointer;
  position: absolute;
  top: 50%;
  margin-top: -44px;
  padding: 1.5rem;
  border-radius: 0 3px 3px 0;
  font-weight: bold;
  transition: 0.6s ease;
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;
const ArrowRight = styled(Arrow)`
  right: 0;
`;

class Slider extends Component {
  state = { slides: [], currentIndex: 0 };

  componentDidMount() {
    this.setState({ slides: data });
  }

  handleNextSlide = () => {
    const { currentIndex, slides } = this.state;
    const index = currentIndex >= slides.length - 1 ? 0 : currentIndex + 1;
    this.setState({ currentIndex: index });
  };

  handlePrevSlide = () => {
    const { currentIndex, slides } = this.state;
    const index = currentIndex <= 0 ? slides.length - 1 : currentIndex - 1;
    this.setState({ currentIndex: index });
  };

  render() {
    const { slides, currentIndex } = this.state;
    return (
      <Container>
        <Slide src={slides[currentIndex]} />
        <Arrow onClick={this.handlePrevSlide}>&#10094;</Arrow>
        <ArrowRight onClick={this.handleNextSlide}>&#10095;</ArrowRight>
      </Container>
    );
  }
}

export default Slider;
