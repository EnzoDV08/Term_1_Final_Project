import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../css/Home.css';

function Home() {
  return (
    <>
      <Container fluid className="full-height">
        <Row className="full-height">
          {/* First Column */}
          <Col md={4} className="first-column">
            <div className="content">Column 1</div>
          </Col>
          {/* Second Column */}
          <Col md={4} className="second-column">
            <div className="content">Column 2</div>
          </Col>
          {/* Third Column */}
          <Col md={4} className="third-column">
            <div className="content">Column 3</div>
          </Col>
        </Row>
        <Row className="full-height">
          {/* Long Column Spanning 2 Rows */}
          <Col md={8} className="long-column">
            <div className="content">Long Column Spanning 2 Rows</div>
          </Col>
          {/* Placeholder Column */}
          <Col md={4} className="placeholder-column">
            <div className="content">Placeholder</div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;

