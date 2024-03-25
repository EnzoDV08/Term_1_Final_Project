import React from 'react';
import LineChart from '../charts/LineChart';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Col } from 'react-bootstrap';
import '../css/Timeline.css';

function Timeline() {
    return (
        <div className='fullpage'>
            <Container>
                    <Col className='col-custom'>
                        <div className='chart-container'>
                            <LineChart />
                        </div>
                    </Col>
            </Container>
        </div>
    );
}

export default Timeline;