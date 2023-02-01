import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'

class Banner extends React.Component 
{
    render() 
    {
        return (
            <Jumbotron fluid id="jumbo">
            <Container>
              <h1>Lazy Tax</h1>
              <p>Tax calculator - because you're bad at math</p>
              <i>FY 2023 - 2024</i>
            </Container>
            <span id="myname">- Aravind Balaji, {new Date().getFullYear()}</span>
          </Jumbotron>
        )
    }
  }

  export default Banner