import React from 'react';
import BarChart from '../charts/BarChart';
import PolarChart from '../charts/PolarChart';
import PieChart from '../charts/PieChart';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Copmarison.css';

function Comparison() {
    return (
        <div className='fullpage'>
            <Container>
                <Row>
                    <Col xs={12} className='col-custom'>
                        <div className='chart-container'>
                            <BarChart />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={6} className='lower col-custom'> 
                        <div className='chart-container'>
                            <PieChart />
                        </div>
                    </Col>
                    <Col xs={12} md={6} className='lower col-custom'> 
                        <div className='chart-container'>
                            <PolarChart />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Comparison;