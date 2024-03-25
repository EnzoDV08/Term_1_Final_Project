import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../css/Home.css';

function Home() {
  return (
    <>
      <Container fluid className="full-height">
        <Row className="full-height">
          <Col md={9} className="first-column">
            <div className="content3">
            <Row md={12} className='content1'>
            <Col  className="column-left">
                  {/* Content for the first column */}
                  <h1>hello</h1>
                </Col>
                <Col md={3} className="column-right">
                  {/* Content for the second column */}
                </Col>
              </Row>
              <Row md={11} className='content2'>
               
              </Row>

            </div>
          </Col>
          
          <Col md={2} className="second-column">
            <div className="content">
              
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;

