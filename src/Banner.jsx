import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";

class Banner extends React.Component {
  render() {
    return (
      <Jumbotron fluid id="jumbo">
        <Container>
          <h1>Lazy Tax</h1>
          <p>Indian Tax calculator - because you're bad at math</p>
          <i>FY 2025 - 2026</i>
        </Container>
        <div style={{ display: "block" }} id="myname">
          Aravind Balaji, {new Date().getFullYear()}
        </div>
        <br />
      </Jumbotron>
    );
  }
}

export default Banner;
